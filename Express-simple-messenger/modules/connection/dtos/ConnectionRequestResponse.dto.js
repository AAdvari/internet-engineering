export default class ConnectionRequestResponseDto {
    constructor(cr) {
        this.connectionRequestId = cr._id;
        this.groupId = cr.source._id;
        this.sent = cr.date;
    }
}