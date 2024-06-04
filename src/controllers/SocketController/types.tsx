export type handlerType = (data: any, response: ((code: number, data: any) => void), next: () => void) => void;

export interface RouteInfo {
    route: string,
    handler: handlerType
}

export interface MessageInfo {
    messageId?: number,
    route: string,
    data: Exclude<any, undefined>,
}
