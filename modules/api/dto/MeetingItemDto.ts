export interface MeetingItemDto {
    title: String,
    description: String,
    itemType: MeetingItemType,
    order: number,
}

enum MeetingItemType {
    TEXT_FIELD
}