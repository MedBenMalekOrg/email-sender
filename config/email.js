import nodemailer from 'nodemailer';

const _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

export const sendMail = (options) => {
    options.from = options.from || process.env.GMAIL_USER;
    _transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};