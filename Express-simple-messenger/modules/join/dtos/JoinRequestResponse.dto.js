export default class JoinRequestResponseDto {
    constructor(joinRequest) {
        this.id = joinRequest._id;
        this.groupId = joinRequest.group;
        this.userId = joinRequest.user;
        this.date = joinRequest.date;
    }
}