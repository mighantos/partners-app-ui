import {UserDto} from "@/modules/api/dto/UserDto";
import {MeetingItemDto} from "@/modules/api/dto/MeetingItemDto";

export interface MeetingPlanDto {
    id?: string,
    title: string,
    creator?: UserDto,
    partner: UserDto,
    startingDate: Date,
    period: number,
    meetingItems: MeetingItemDto[],

}