import { send_email } from "../lib/mailer"

export const logging_handler = (req, res, next) => {

    console.log(req)

    // send_email()
    return next()
}