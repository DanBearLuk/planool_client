import { useEffect, useState } from 'react';
import { ADDRESSES } from '../../config';
import { MessageInfo, RouteInfo, handlerType } from './types';
import { useUser } from '../../contexts/UserContext';

class SocketController {
    socket: WebSocket;
    socketId: number | undefined;
    
    _handlers = new Map<string, handlerType[]>();
    _lastReceivedMessageId = -1;
    _lastSentMessageId = -1;
    _pending = new Map<number, NodeJS.Timer>();

    _eventListeners = new Map<string, ((e: any) => void)[]>([
        ['open', []],
        ['close', []],
        ['error', []],
        ['statechange', []]
    ]);

    _responseListeners = new Map<number, (code: number, data: any) => void>();

    constructor() {
        this.socket = new WebSocket(ADDRESSES.WS);

        this.socket.onopen = this._onOpen.bind(this);
        this.socket.onmessage = this._onMessage.bind(this);
        this.socket.onerror = this._onError.bind(this);
        this.socket.onclose = this._onClose.bind(this);

        this.use('handshake', this._onHandshake.bind(this));
        this.use('response', this._handleResponse.bind(this));
    }

    addEventListener(eventType: string, handler: (e: Event) => void) {
        this._eventListeners.get(eventType)?.push(handler);
    }

    removeEventListener(eventType: string, handler: (e: Event) => void) {
        if (!this._eventListeners.has(eventType)) return;

        const handlers = this._eventListeners.get(eventType)!;
        this._eventListeners.set(eventType, handlers.filter(h => h !== handler));
    }

    _onOpen(e: Event) {
        this._eventListeners.get('open')?.forEach(handler => handler(e));
        this._eventListeners.get('statechange')?.forEach(handler => handler(e));

        console.log('established socket connection');
    }

    _onError(e: Event) {
        this._eventListeners.get('error')?.forEach(handler => handler(e));
        this._eventListeners.get('statechange')?.forEach(handler => handler(e));

        console.log('socket error');
    }

    _onClose(e: CloseEvent) {
        this._eventListeners.get('close')?.forEach(handler => handler(e));
        this._eventListeners.get('statechange')?.forEach(handler => handler(e));
        
        this._cancelPendings();

        console.log('socket closed: ', e.reason);
    }

    _onHandshake({ data: { socketId } }: { data: { socketId: number }}) {
        this.socketId = socketId;
    }

    _onMessage(e: MessageEvent) {
        console.log('received: ', e.data);

        let route: string;
        let data: Exclude<any, undefined>;
        let messageId: number | undefined;

        try {
            ({ route, data, messageId } = JSON.parse(e.data));

            if (typeof(route) !== 'string' || data === undefined) {
                throw new Error('Invalid request');
            }
        } catch (e) {
            return this.sendRaw(JSON.stringify({
                route: 'error',
                data: 'Invalid message'
            }));
        }

        if (route === 'reply') {
            return this._handleReply(data);
        } else if (route === 'error') {
            return console.error('Socket error: ', data);
        }
        
        if (messageId === undefined || !Number.isInteger(messageId)) {
            return this.sendRaw(JSON.stringify({ 
                route: 'error', 
                data: 'Invalid messageId'
            }));
        }

        if (this._lastReceivedMessageId >= messageId) return;
        
        this._lastReceivedMessageId = messageId;
        this._reply(messageId);

        const handlers = this._handlers.get(route);
        
        if (handlers === undefined) {
            return this.sendRaw(JSON.stringify({
                route: 'error',
                data: 'Invalid route'
            }));
        }

        const request: any = { data };

        const response = (code: number, data: any) => this.send('response', { 
            toMessage: messageId,
            code: code, 
            result: data
        });

        const handle = (handlerIndex: number) => {
            if (handlerIndex >= handlers.length) return;

            const handler = handlers[handlerIndex];
            handler(request, response, () => handle(++handlerIndex));
        };

        handle(0);
    }

    _handleReply(messageId: number) {
        const interval = this._pending.get(messageId);

        if (interval) {
            clearInterval(interval);
            this._pending.delete(messageId);
        }
    }

    _handleResponse({ data } : { data: { toMessage: number, code: number, result: any}}) {
        const { toMessage, code, result } = data;

        const listener = this._responseListeners.get(toMessage);
        if (!listener) return;

        listener(code, result);
        this._responseListeners.delete(toMessage);
    }

    _reply(messageId: number) {
        this.sendRaw(JSON.stringify({ 
            route: 'reply', 
            data: messageId, 
        }));
    }

    send(route: string, data: any, response?: (code: number, data: any) => void) {
        const message: MessageInfo = {
            messageId: ++this._lastSentMessageId,
            route,
            data
        };
        const messageString = JSON.stringify(message);

        const tryToSend = () => this.sendRaw(messageString);
        tryToSend();

        let attemptsLeft = 4;
        const interval = setInterval(
            () => attemptsLeft-- > 0 ? tryToSend() : this.close(), 
            1500
        );

        this._pending.set(message.messageId!, interval);

        if (response) {
            this._responseListeners.set(message.messageId!, response);
        }

        console.log('sent: ', message);
    }

    sendRaw(message: string) {
        this.socket.send(message);
    }

    close() {
        this.socket.close();
        this._cancelPendings();
    }

    _cancelPendings() {
        for (const interval of Array.from(this._pending.values())) {
            clearInterval(interval);
            this._pending.clear();
        }
    }

    use(route: string, handler: handlerType) {
        if (this._handlers.has(route)) {
            this._handlers.get(route)?.push(handler);
        } else {
            this._handlers.set(route, [handler]);
        }
    }
}

export default SocketController;
