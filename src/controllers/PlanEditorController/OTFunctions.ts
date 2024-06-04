import { EditInfo } from './types';

export enum TransformedRules{
    IGNORE = 0b00
};

export type OTReturnType = TransformedRules | EditInfo | EditInfo[];

export function Tii(ins1: EditInfo, ins2: EditInfo, ord?: boolean): OTReturnType {
    if (ins1.p === undefined || ins2.p === undefined ||
        ins1.d === undefined || ins2.d === undefined) {
        return TransformedRules.IGNORE;
    }

    if (ins1.bid !== ins2.bid || ins1.fname !== ins2.fname) {
        return ins1;
    } else if (ins1.p < ins2.p || (ins1.p === ins2.p && ord)) {
        return ins1;
    } else {
        const newIns = {
            ...ins1,
            p: ins1.p + ins2.d.length
        };
        return newIns;
    }
}

export function Tid(ins: EditInfo, del: EditInfo): OTReturnType {
    if (ins.p === undefined || ins.p === undefined ||
        del.p1 === undefined || del.p2 === undefined) {
        return TransformedRules.IGNORE;
    }

    if (ins.bid !== del.bid || ins.fname !== del.fname) {
        return ins;
    } else if (ins.p <= del.p1) {
        return ins;
    } else {
        const newIns = {
            ...ins,
            p: ins.p - Math.min(ins.p - del.p1, del.p2 - del.p1 + 1)
        };

        return newIns;
    }
}

export function Tdi(del: EditInfo, ins: EditInfo): OTReturnType {
    if (ins.p === undefined || ins.p === undefined ||
        del.p1 === undefined || del.p2 === undefined) {
        return TransformedRules.IGNORE;
    }

    if (del.bid !== ins.bid || del.fname !== ins.fname) {
        return del;
    } else if (del.p2 < ins.p) {
        return del;
    } else if (del.p1 >= ins.p) {
        const newDel = {
            ...del,
            p1: del.p1 + (ins.d?.length || 0),
            p2: del.p1 + (ins.d?.length || 0)
        };

        return newDel;
    } else {
        const newDelLeft = {
            ...del,
            p2: ins.p - 1
        };

        const newDelRight = {
            ...del,
            p1: ins.p + (ins.d?.length || 0),
            p2: del.p2 + (ins.d?.length || 0)
        };

        return [newDelLeft, newDelRight];
    }
}

export function Tdd(del1: EditInfo, del2: EditInfo): OTReturnType {
    if (del1.p1 === undefined || del1.p2 === undefined ||
        del2.p1 === undefined || del2.p2 === undefined) {
        return TransformedRules.IGNORE;
    }

    if (del1.bid !== del2.bid || del1.fname !== del2.fname) {
        return del1;
    } if (del1.p1 >= del2.p1 && del1.p2 <= del2.p2) {
        return TransformedRules.IGNORE;
    } else if (del1.p2 < del2.p1) {
        return del1;
    } else if (del1.p1 > del2.p2) {
        const newDel = {
            ...del1,
            p1: del1.p1 - (del2.p2 - del2.p1 + 1),
            p2: del1.p2 - (del2.p2 - del2.p1 + 1),
        };
    
        return newDel;
    } else {
        const newDel = {
            ...del1,
            p1: Math.min(del1.p1, del2.p1),
            p2: Math.max(del2.p1 - 1, del1.p2 - (del2.p2 - del2.p1 + 1))
        };

        return newDel;
    }
}

export function Trr(reord1: EditInfo, reord2: EditInfo, ord?: boolean): OTReturnType {
    if (reord1.p === undefined || reord1.prevp === undefined ||
        reord2.p === undefined || reord2.prevp === undefined) {
        return TransformedRules.IGNORE;
    }

    if (reord1.bid === reord2.bid && reord1.p === reord2.p) {
        return TransformedRules.IGNORE;
    } else if (reord1.bid === reord2.bid && ord) {
        return reord1;
    } else if (reord1.bid === reord2.bid) {
        return TransformedRules.IGNORE;
    } else if (reord1.p === reord2.p && ord) {
        return reord1;
    } else if (reord1.p === reord2.p) {
        const newReord = {
            ...reord1,
            p: reord1.p + 1
        };

        return newReord;
    } else if (reord1.p > reord2.p && reord1.p < reord2.prevp) {
        const newReord = {
            ...reord1,
            p: reord1.p + 1
        };

        return newReord;
    } else if (reord1.p < reord2.p && reord1.p > reord2.prevp) {
        const newReord = {
            ...reord1,
            p: reord1.p - 1
        };

        return newReord;
    } else {
        return reord1;
    }
}

export function Taa(action1: EditInfo, action2: EditInfo, ord?: boolean): OTReturnType {
    if (action1.stype === undefined || action2.stype === undefined) {
        return TransformedRules.IGNORE;
    }

    if (action1.stype === action2.stype && !ord) {
        return TransformedRules.IGNORE;
    } else {
        return action1;
    }
}
