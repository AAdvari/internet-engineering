import MemberDetailDto from "./MemberDetail.dto";

export default class GroupDetailResponseDto {
    constructor(group) {
        this.name = group.name;
        this.description = group.description
        this.members = group.members.map(member => new MemberDetailDto(member));
    }
}