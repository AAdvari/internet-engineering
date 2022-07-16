import Joi from "joi";
import badRequestResponseDto from "../../../utils/badRequestResponse.dto";
import {User} from "../../../models/User.entity";
import bcrypt from "bcrypt";
import AuthenticationResponseDto from "../dtos/AuthenticationResponse.dto";
import jwt from "jsonwebtoken";

const privateKey = require('dotenv').config().parsed.JWT_PRIVATE_KEY;

const loginService = {

    validateLoginInputFormats(credentials) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(8).max(255).required()
        });
        return schema.validate(credentials);
    },

    generateAuthToken(id) {
        return jwt.sign({userId: id}, privateKey);
    },

    async login(data) {
        const {error} = this.validateLoginInputFormats(data);
        if (error)
            return {status: 400, response: badRequestResponseDto}

        let user = await User.findOne({email: data.email}).exec();
        if (!user)
            return {status: 400, response: badRequestResponseDto}

        const validPass = await bcrypt.compare(data.password, user.password);
        if (!validPass)
            return {status: 400, response: badRequestResponseDto}

        return {
            status: 200,
            response: new AuthenticationResponseDto(this.generateAuthToken(user._id.toString()), 'successful')
        }
    }
}
export default loginService;