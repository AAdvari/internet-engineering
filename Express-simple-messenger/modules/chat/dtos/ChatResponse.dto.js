export class ChatResponseDto {
    constructor(chat, forUserId) {
        this.userId = chat.p1.toString() === forUserId ? chat.p1._id.toString() : chat.p2._id.toString();
        this.name = chat.p1.toString() === forUserId ? chat.p1.name : chat.p2.name;
    }
}