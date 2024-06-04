import { EditInfo, EditTypes, SummarizedPlanInfo } from './types';
import { Tii, Tid, Tdd, Tdi, Trr, Taa, TransformedRules, OTReturnType } from './OTFunctions';
import { BlockInfo, PlanInfo } from '../../components/PlanViewer/types';
import SocketController from '../SocketController';
import { MessageInfo } from '../SocketController/types';
import { useEffect, useRef, useState } from 'react';
import { viewPlan } from '../../services/plans';
import { FetchError } from '../../services/utilities';
import { handleUnknownError } from '../../handlers/errorHandlers';
import { useSocketController } from '../../contexts/SocketControllerContext';

const OTF: Record<EditTypes, Partial<Record<EditTypes, (e1: EditInfo, e2: EditInfo, ord?: boolean) => OTReturnType>>> = {
    [EditTypes.INSERT]: {
        [EditTypes.INSERT]: Tii,
        [EditTypes.DELETE]: Tid
    },
    [EditTypes.DELETE]: {
        [EditTypes.INSERT]: Tdi,
        [EditTypes.DELETE]: Tdd
    },
    [EditTypes.REORDER]: {
        [EditTypes.REORDER]: Trr
    },
    [EditTypes.ACTION]: {
        [EditTypes.ACTION]: Taa
    }
};

class PlanEditorController {
    planInfo!: PlanInfo;
    isConnected: boolean = false;

    _isEditSent: boolean = false;
    _pendingEdits: EditInfo[] = [];
    _lastRevision!: number;

    _socketController: SocketController;

    onplanupdate: ((planInfo: PlanInfo) => void) | null = null;
    onconnected: ((planInfo: PlanInfo) => void) | null = null;
    onerror: ((code: number, message: string) => void) | null = null;

    constructor(planId: string, socketController: SocketController) {
        this._socketController = socketController;

        this._socketController.send('planEditor/connect', { planId }, this._init.bind(this));
        this._socketController.use('planEditor/handleEdit', this._handleReceivedEdit.bind(this));

        this.handleEdit = this.handleEdit.bind(this);
    }

    _init(code: number, data: any) {
        if (code !== 200) {
            return this.onerror?.(code, data.message);
        }

        this.planInfo = data.planInfo;
        this._lastRevision = data.lastSyncedRevision;
        this.isConnected = true;

        this.onconnected?.(this.planInfo);
    }

    handleEdit(editInfo: EditInfo) {
        this._pendingEdits.push(editInfo);

        if (!this._isEditSent) this._sendOldestEdit();
    }

    _sendOldestEdit() {
        this._isEditSent = true;
        const editInfo = this._pendingEdits[0];

        this._socketController.send('planEditor/handleEdit', { 
            planId: this.planInfo.id,
            actionInfo: editInfo
        });
    }

    _handleReceivedEdit({ data: req }: { data: MessageInfo }) {
        const data: any = req.data;
        const planId: string = data.planId;
        const action: EditInfo & { sid: number} = data.actionInfo;

        if (planId !== this.planInfo.id) return;

        const edits = [...this._pendingEdits];
        const transformedEdits: EditInfo[] = [];
        for (let i = 0; i < this._pendingEdits.length; i++) {
            const pendingEdit = edits[i];
            const OTFunction = OTF[pendingEdit.type][action.type];

            if (!OTFunction) {
                transformedEdits.push(pendingEdit);
                continue;
            }

            const result = OTFunction(pendingEdit, action, this._socketController.socketId! < action.sid);

            if (result === TransformedRules.IGNORE) {
                continue;
            } else if (Array.isArray(result)) {
                transformedEdits.push(...result);
            } else {
                transformedEdits.push(result);
            }
        }

        this._pendingEdits = transformedEdits;

        this._updatePlan();
    }

    _updatePlan() {
        const updatedPlan = structuredClone(this.planInfo);

        for (const edit of this._pendingEdits) {
            this._applyEdit(updatedPlan, edit);
        }

        this.onplanupdate?.(updatedPlan);
    }
    
    _applyEdit(plan: PlanInfo, editInfo: EditInfo) {
        switch (editInfo.type) {
            case EditTypes.INSERT: {
                const { bid: blockId, fname: fieldName, p: pos, d: data } = editInfo;
                if (blockId === undefined || fieldName === undefined || 
                    pos === undefined || data === undefined) {
                    return;
                }

                this._applyInsert(plan, blockId, fieldName, pos, data);
                break;
            }

            case EditTypes.DELETE: {
                const { bid: blockId, fname: fieldName, p1: pos1, p2: pos2 } = editInfo;
                if (blockId === undefined || fieldName === undefined || 
                    pos1 === undefined || pos2 === undefined) {
                    return;
                }

                this._applyDelete(plan, blockId, fieldName, pos1, pos2);
                break;
            }

            case EditTypes.REORDER: {
                const { bid: blockId, p: pos } = editInfo;
                if (blockId === undefined || pos === undefined) {
                    return;
                }

                this._applyReorder(plan, blockId, pos);
                break;
            }

            case EditTypes.ACTION: {
                this._applyAction(plan, editInfo);
                break;
            }
        }
    }

    _applyInsert(plan: PlanInfo, blockId: string, fieldName: string, pos: number, data: string) {
        const block = plan.blocks.find(block => block.id === blockId);
        if (!block) return;

        const text = block.fields[fieldName];
        block.fields[fieldName] = text.slice(0, pos) + data + text.slice(pos);
    }

    _applyDelete(plan: PlanInfo, blockId: string, fieldName: string, pos1: number, pos2: number) {
        const block = plan.blocks.find(block => block.id === blockId);
        if (!block) return;

        const text = block.fields[fieldName];

        block.fields[fieldName] = text.slice(0, pos1) + text.slice(pos2 + 1);
    }

    _applyReorder(plan: PlanInfo, blockId: string, pos: number) {
        const block = plan.blocks.find(block => block.id === blockId);
        if (!block) return;

        const idx = plan.blocks.indexOf(block);

        plan.blocks.splice(idx, 1);
        plan.blocks.splice(pos, 0, block);
    }

    _applyAction(plan: PlanInfo, actionInfo: EditInfo) {
        switch(actionInfo.stype) {
            case ('deleteBlock'): {
                plan.blocks = plan.blocks.filter(block => block.id !== actionInfo.bid);
                break;
            }

            case ('createBlock'): {
                const blockInfo = actionInfo.binfo;
                if (!blockInfo) return;

                plan.blocks.push(blockInfo);
                break;
            }
            
            case ('setFieldValue'): {
                if (actionInfo.bid === undefined || actionInfo.fname === undefined) {
                    return;
                }

                let obj: PlanInfo | BlockInfo = plan;

                if (actionInfo.bid !== undefined) {
                    const result = plan.blocks.find(block => block.id === actionInfo.bid);
                    if (!result) return;

                    obj = result;
                }

                const fieldName = actionInfo.fname;
                const value = actionInfo.val;

                if (obj?.hasOwnProperty(fieldName)) {
                    (obj as any)[fieldName] = value;
                } else if (actionInfo.bid !== undefined && (obj as BlockInfo).fields?.hasOwnProperty(fieldName)) {
                    (obj as any).fields[fieldName] = value;
                }

                break;
            }
            
            default: break;
        }
    }
}

export default PlanEditorController;

export const usePlanEditor = (planId: string) => {
    const [socketController, socketState] = useSocketController();

    const planEditorInstance = useRef<PlanEditorController>();

    const [summarizedPlan, setSummarizedPlan] = useState<SummarizedPlanInfo>({
        isConnected: false
    });

    useEffect(() => {
        if (socketState !== WebSocket.OPEN) {
            return setSummarizedPlan({ isConnected: false });
        }

        const tryToConnect = async () => {
            const planEditor = new PlanEditorController(planId, socketController!);
            planEditor.onplanupdate = (planInfo: PlanInfo) => setSummarizedPlan(v => ({ 
                ...v, 
                plan: planInfo
            }));

            planEditor.onconnected = (planInfo: PlanInfo) => setSummarizedPlan({
                plan: planInfo,
                handleEdit: planEditor.handleEdit,
                isConnected: true
            });

            planEditorInstance.current = planEditor;
        };

        tryToConnect();
    }, [socketController, planId, socketState]);

    return summarizedPlan;
};
