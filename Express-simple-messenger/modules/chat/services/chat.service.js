import Joi from "joi";
import BadRequestResponseDto from "../../../utils/badRequestResponse.dto";
import {Chat} from "../../../models/Chat.entity";
import {Message} from "../../../models/Message.entity";
import {User} from "../../../models/User.entity";
import groupService from "../../group/services/group.service";
import {MessageResponseDto} from "../dtos/MessageResponse.dto";
import {ChatResponseDto} from "../dtos/ChatResponse.dto";


const chatService = {

    validateSendMessageData(obj) {
        const schema = Joi.object({
            senderId: Joi.string().required(),
            receiverId: Joi.string().required(),
            content: Joi.string().required()
        });
        return schema.validate(obj);
    },
    async sendMessage(senderId, receiverId, content) {
        const {error} = this.validateSendMessageData({senderId, receiverId, content})
        if (error)
            return {status: 400, response: BadRequestResponseDto};
        if (!(await this.messageCanBeSent(senderId, receiverId)))
            return {status: 400, response: BadRequestResponseDto};
        let chat = await Chat.findOne({
            p1: {$in: [senderId, receiverId]},
            p2: {$in: [senderId, receiverId]}
        });

        if (!chat) {
            const newChat = new Chat();
            newChat.p1 = senderId;
            newChat.p2 = receiverId
            chat = await newChat.save();
        }

        const newMessage = new Message();
        newMessage.sender = senderId;
        newMessage.receiver = receiverId;
        newMessage.content = content;
        const message = await newMessage.save();

        chat.messages.push(message._id);
        await chat.save();

        return {
            status: 200, response: {
                message: 'successful'
            }
        };
    },
    async messageCanBeSent(senderId, receiverId) {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        if (!sender || !receiver || !sender.group || !receiver.group)
            return false;
        return (await groupService.isInGroup(receiverId, sender.group)) ||
            (await groupService.areConnected(sender.group, receiver.group));
    },
    async getChat(p1Id, p2Id) {
        let chat = await Chat.findOne({
            p1: {$in: [p1Id, p2Id]},
            p2: {$in: [p1Id, p2Id]}
        })
            .populate('messages')
            .populate(['p1', 'p2']);


        if (!chat)
            return {status: 400, response: BadRequestResponseDto}

        console.log(chat);
        return {
            status: 200,
            response: chat.messages
                .sort((a, b) => b.date - a.date)
                .map(message => new MessageResponseDto(message))
        }

    },
    async getAllChats(userId) {
        let chats= await Chat.find({
            $or: [{p1: userId}, {p2: userId}]
        })
            .populate(['p1', 'p2']);

        return {
            status: 200,
            response: {
                chats: chats
                    .sort((a, b) => b.date - a.date)
                    .map(c => new ChatResponseDto(c, userId))
            }
        }

    }

}


export default chatService;