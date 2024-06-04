export interface VenueInfo {
    country: string,
    city: string
}

export interface StructureInfo {
    type: string,
    text?: string,
    icon?: string,
    name?: string,
    style?: string
}

export interface BlockInfo {
    id: string,
    title: string,
    description: string,
    background: string,
    fontColor: string,
    icon: string,
    startTime: number,
    endTime: number,
    venue: VenueInfo,
    structure: StructureInfo[][],
    widget: string,
    fields: Record<string, string>
}

export interface PlanInfo {
    id: string,
    author: number,
    title: string,
    startTime: number,
    endTime: number,
    description: string,
    visibility: 'public' | 'private' | 'friends' | 'link_access',
    isOnlyApproved: boolean,
    participants: number[],
    whitelist: number[],
    blacklist: number[],
    collaborators: number[],
    isFinished: boolean,
    type: 'worldtravel' | 'countrytravel' | 'game' | 'tour' | 'indoorparty' | 'outdoorparty' | 'virtualparty',
    venue: VenueInfo,
    theme: 'default' | string,
    blocks: BlockInfo[]
}

export interface AuthorInfo {
    id: number,
    username: string
}

export interface TimePoint {
    start: number,
    end: number,
    country: string,
    city: string,
    blockHeight: number,
    blockId: string
}
