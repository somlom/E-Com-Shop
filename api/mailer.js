import nodemailer from "nodemailer"

const connection = {
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
};

const transporter = nodemailer.createTransport(connection)


export const send_email = (to, subject, html) => {
    const options = {
        from: `"interEcom" <${connection.auth.user}>`,
        to: to,
        subject: subject,
        html: html,
    };
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log("error " + err);
        }
    });

}