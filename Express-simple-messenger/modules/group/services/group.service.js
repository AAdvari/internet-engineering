import Joi from "joi";
import BadRequestResponseDto from "../../../utils/badRequestResponse.dto";
import {User} from "../../../models/User.entity.js";
import {Group} from "../../../models/Group.entity";
import {GroupResponseDto} from "../dtos/GroupResponse.dto";
import GroupDetailResponseDto from "../dtos/GroupDetailResponse.dto";

const groupService = {
    validateCreateGroup(obj) {
        const schema = Joi.object({
            name: Joi.string().max(255),
            description: Joi.string().max(400),
            userId: Joi.string()
        });
        return schema.validate(obj);
    },

    async createGroup(creationData) {
        const {error} = groupService.validateCreateGroup(creationData);
        if (error)
            return {
                status: 400,
                response: BadRequestResponseDto
            }

        const {userId} = creationData;
        const user = await User.findById(userId).exec();
        if (user.group)
            return {
                status: 400,
                response: BadRequestResponseDto
            }

        const {name, description} = creationData;

        const newGroup = new Group();
        newGroup.name = name;
        newGroup.description = description;
        newGroup.members = [user._id];
        newGroup.admin = user._id;
        const group = await newGroup.save();
        user.group = group._id;
        user.isAdmin = true;
        await user.save();

        return {
            status: 200,
            response: {
                group: {
                    id: group._id.toString()
                },
                message: 'successful'
            }

        }
    },

    async getAllGroups() {
        const gps = await Group.find();
        return {
            status: 200,
            response: {
                groups: gps
                    .sort((a, b) => b.date - a.date)
                    .map(item => new GroupResponseDto(item))
            }
        }
    },

    async getGroupById(userId) {
        const user = await User.findById(userId)
            .populate({
                path: 'group',
                populate: {path: 'members'}
            }).exec();
        console.log(user)
        if (!user.group)
            return {
                status: 400,
                response: BadRequestResponseDto
            }
        return {
            status: 200,
            response: {
                group: new GroupDetailResponseDto(user.group)
            }
        }
    },
    async isInGroup(userId, groupId){
        const group = await Group.findById(groupId);
        return group.members.find(item => item.toString() === userId);
    },
    async areConnected(firstGId, secondGId) {
        const firstGroup = await Group.findById(firstGId);
        return firstGroup.connected.find(item => item.toString() === secondGId.toString());
    }
}

export default groupService;