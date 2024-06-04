import { AuthorInfo, BlockInfo, PlanInfo } from "../../components/PlanViewer/types";
import { FetchError } from "../../services/utilities";

export enum EditTypes {
    INSERT  = 0b00,
    DELETE  = 0b01,
    REORDER = 0b10,
    ACTION  = 0b11
};

export interface EditInfo {
    type: EditTypes,
    stype?: string,
    bid?: string,
    binfo?: BlockInfo,
    fname?: string,
    val?: string | number,
    p?: number,
    prevp?: number,
    p1?: number,
    p2?: number,
    d?: string
}

export interface SummarizedPlanInfo {
    plan?: PlanInfo,
    handleEdit?: (editInfo: EditInfo) => void,
    error?: FetchError,
    isConnected: boolean
}
