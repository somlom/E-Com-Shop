import Mailer from "../lib/mailer"


export const error_handler = (err, req, res) => {
    console.log(err)
    const mailer = new Mailer()
    mailer.send_email(process.env.ADMIN_EMAIL, "Error", "hello", { name: err.stack })

    return res.status(res.statusCode ? res.statusCode : 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : err.stack
    })
}