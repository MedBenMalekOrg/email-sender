import {sendMail} from "../config/email.js";
import Joi from 'joi';

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().alphanum().min(3).max(30).trim().required(),
    message: Joi.string().min(3).max(500).trim().required()
});

export default (app, path) => {
    app.post(path, (req, res) => {
        const {email, name, message} = req.body;
        const validate = emailSchema.validate({email, name, message});

        if (validate.error !== undefined) {
            const errors = {};
            const {details} = validate.error;
            for (let i = 0; i < details.length; i++) {
                const {path, message} = details[i];
                errors[path] = message;
            }
            res.status(400).json({msg: errors}).end();
            return;
        }
        sendMail({
            to: email,
            subject: 'RESUME: Message from ' + name,
            text: message + '\r\n\r\n' + name
        });
        res.status(200).json({msg: 'OK'}).end();
    });
}