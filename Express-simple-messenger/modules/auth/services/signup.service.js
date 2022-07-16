import Joi from "joi";
import badRequestResponseDto from "../../../utils/badRequestResponse.dto";
import {User} from "../../../models/User.entity";
import bcrypt from "bcrypt";
import AuthenticationResponseDto from "../dtos/AuthenticationResponse.dto";
import jwt from "jsonwebtoken";
const privateKey = require('dotenv').config().parsed.JWT_PRIVATE_KEY;

const signupService = {
    validateSignUpData(signupData) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            name: Joi.string().min(5).max(255).required(),
            password: Joi.string().min(8).max(255).alphanum().required()
        });
        return schema.validate(signupData);
    },

    async generateAuthToken(id) {
        return jwt.sign({userId: id}, privateKey);
    },

    async signup(data) {

        const {error} = this.validateSignUpData(data);
        if (error){
            console.log(error);
            return {status: 400, response: badRequestResponseDto}
        }

        const {name, email, password} = data;

        let existedUser = await User.findOne({email}).exec();

        if (existedUser)
            return {status: 400, response: badRequestResponseDto}

        const salt = await bcrypt.genSalt(10);

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, salt);
        user.isAdmin = false;

        const {_id} = await user.save();
        return {
            status: 200,
            response: new AuthenticationResponseDto(await this.generateAuthToken(_id.toString()), 'successful')
        }
    }

}

export default signupService;