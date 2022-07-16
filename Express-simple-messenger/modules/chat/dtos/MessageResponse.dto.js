export class MessageResponseDto {
    constructor(message) {
        this.message = message.content;
        this.date = message.date;
        this.sentBy = message.sender;
    }
}