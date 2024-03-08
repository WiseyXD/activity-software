"use strict";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
export default async function main(content: any, user: string | undefined) {
    // send mail with defined transport object
    try {
        console.log("Entered into mail function");
        const info = await transporter.sendMail({
            from: '"Aryan Nagbanshi 👻" <aryan@JS.com>',
            to: user,
            subject: `Event created successfully`,
            html: `<b>${content.title}</b> <br/> <br/>~${content.title}`,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}
