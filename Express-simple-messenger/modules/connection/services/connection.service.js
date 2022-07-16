import Joi from "joi";
import {User} from "../../../models/User.entity";
import BadRequestResponseDto from "../../../utils/badRequestResponse.dto";
import {ConnectionRequest} from "../../../models/ConnectionRequest.entity";
import {Group} from "../../../models/Group.entity";
import ConnectionRequestResponseDto from "../dtos/ConnectionRequestResponse.dto";

const connectionService = {
    validateConnectionData(connectData) {
        const schema = Joi.object({
            userId: Joi.string().required(),
            groupId: Joi.string().required()
        });

        return schema.validate(connectData);
    },
    validateAcceptConnectionRequest(cr) {
        const schema = Joi.object({
            connectionRequestId: Joi.string().required(),
            userId: Joi.string().required()
        });
        return schema.validate(cr);
    },

    async connectionRequest(connectData) {
        const {error} = this.validateConnectionData(connectData);
        if (error)
            return {status: 400, response: BadRequestResponseDto}

        const {userId, groupId} = connectData;
        const user = await User.findById(userId);
        if (!user || !user.isAdmin)
            return {status: 400, response: BadRequestResponseDto}
        const destGroup = await Group.findById(groupId);
        if (!destGroup)
            return {status: 400, response: BadRequestResponseDto}

        const priorConnectionRequest = await ConnectionRequest.findOne({source: user.group, dest: destGroup._id });
        if (priorConnectionRequest)
            return {status: 400, response: BadRequestResponseDto}

        const connectionRequest = new ConnectionRequest();

        connectionRequest.source = user.group;
        connectionRequest.dest = destGroup._id;

        const cr = await connectionRequest.save();

        destGroup.connectionRequests.push(cr._id);

        await destGroup.save();

        return {status: 200, response: {message: 'successful'}};
    },
    async getConnectionRequests(adminId) {
        const user = await User.findById(adminId).populate({
            path: 'group',
            populate: {path: 'connectionRequests'}
        });
        if (!user.group || !user.isAdmin)
            return {status: 400, response: BadRequestResponseDto}
        return {
            status: 200,
            response: {
                requests: user.group.connectionRequests
                    .sort((a, b) => b.date - a.date)
                    .map(cr => new ConnectionRequestResponseDto(cr))
            }
        };
    },
    async acceptConnectionRequest(crData) {
        const {error} = this.validateAcceptConnectionRequest(crData);
        if (error)
            return {status: 400, response: BadRequestResponseDto}
        const {userId, connectionRequestId} = crData;
        const connectionRequest = await ConnectionRequest.findById(connectionRequestId)
            .populate('dest')
            .populate('source')


        const user = await User.findById(userId);

        if (!connectionRequest)
            return {status: 400, response: BadRequestResponseDto}

        const source = connectionRequest.source;
        const dest = connectionRequest.dest;

        if (!user.isAdmin || user.group.toString() !== dest._id.toString())
            return {status: 400, response: BadRequestResponseDto}
        dest.connected.push(source._id);
        source.connected.push(dest._id);

        dest.connectionRequests = dest.connectionRequests.filter(cr => cr.toString() !== connectionRequestId);

        await ConnectionRequest.findOneAndDelete(connectionRequestId);
        await dest.save();
        await source.save();

        return {status: 200, response: {message: 'successful'}};
    }
}

export default connectionService;