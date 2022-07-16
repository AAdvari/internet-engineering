import Joi from "joi";
import BadRequestResponseDto from "../../../utils/badRequestResponse.dto";
import {Group} from "../../../models/Group.entity";
import {User} from "../../../models/User.entity.js";
import {JoinRequest} from "../../../models/JoinRequest.entity";
import JoinRequestResponseDto from "../dtos/JoinRequestResponse.dto";


const joinService = {
    validateJoinGroup(obj) {
        const schema = Joi.object({
            groupId: Joi.string().required(),
            userId: Joi.string().required()
        });

        return schema.validate(obj);
    },

    validateAcceptRequest(obj) {
        const schema = Joi.object({
            joinRequestId: Joi.string().required(),
            userId: Joi.string().required()
        });
        return schema.validate(obj);
    },

    async createJoinRequest(joinData) {
        const {error} = this.validateJoinGroup(joinData);
        if (error)
            return {
                status: 400,
                response: BadRequestResponseDto
            }

        const {groupId, userId} = joinData;

        const group = await Group.findById(groupId)
            .populate('joinRequests');

        const user = await User.findById(userId)
            .populate('group')
            .populate('joinRequests');


        if (!group || user.group)
            return {status: 400, response: BadRequestResponseDto}

        const joinRequest = new JoinRequest();
        joinRequest.user = user._id;
        joinRequest.group = group._id;
        const jr = await joinRequest.save();

        user.joinRequests.push(jr._id);
        group.joinRequests.push(jr._id);

        await user.save();
        await group.save();
        await jr.save();

        return {status: 200, response: {message: 'successful'}};
    },

    async getAllJoinRequests(userId) {
        const jrs = await User.findById(userId)
            .populate('joinRequests')

        return {
            status: 200,
            response: {
                joinRequests: jrs.joinRequests
                                .sort((a, b) => b.date - a.date)
                                .map(jr => new JoinRequestResponseDto(jr))
            }
        };
    },

    async getOwnersJoinRequests(ownerId) {
        const user = await User.findById(ownerId).populate({
            path: 'group',
            populate: { path: 'joinRequests'}
        });

        if (!user.group || !user.isAdmin)
            return {status: 400, response: BadRequestResponseDto}

        return {
            status: 200,
            response: {
                joinRequests: user.group.joinRequests
                            .sort((a, b) => b.date - a.date)
                            .map(jr => new JoinRequestResponseDto(jr))
            }
        }
    },

    async acceptJoinRequest(arData) {
        const {error} = this.validateAcceptRequest(arData);
        if (error)
            return {status: 400, response: BadRequestResponseDto};

        const {joinRequestId, userId} = arData;
        const joinRequest = await JoinRequest.findById(joinRequestId);
        const user = await User.findById(joinRequest.user);
        const group = await Group.findById(joinRequest.group);


        if (group.admin.toString() !== userId)
            return {status: 400, response: BadRequestResponseDto}

        group.members.push(user);

        user.joinRequests = user.joinRequests.filter(jr => jr.toString() !== joinRequestId);
        user.group = group._id;

        group.joinRequests = user.joinRequests.filter(jr => jr.toString() !== joinRequestId);

        await JoinRequest.findByIdAndDelete(joinRequestId);
        await user.save();
        await group.save();

        return {status: 200, response: {message: 'successful'}}
    }
}


export default joinService;


