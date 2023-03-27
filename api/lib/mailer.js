import hbs from 'nodemailer-express-handlebars'
import nodemailer from 'nodemailer'
import path from 'path'

export default class Mailer {
    constructor() {
        this.email = process.env.EMAIL
        this.password = process.env.EMAIL_PASSWORD
        this.connection = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.email,
                pass: this.password,
            },
        }

        this.handlebarOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('public/emails'),
                defaultLayout: 'public/emails/main',
            },
            viewPath: path.resolve('public/emails'),
        }

        this.transporter = nodemailer.createTransport(this.connection)
        this.transporter.use('compile', hbs(this.handlebarOptions))
    }

    send_email(to = '', subject = '', template = '', context = {}) {
        const options = {
            from: `"interEcom" <${this.connection.auth.user}>`,
            to: to,
            subject: subject,
            template: template,
            context: context,
        }

        this.transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log('error ' + err)
            } else {
                console.log(
                    info.messageId + ' : sent email ' + subject + ' to ' + to
                )
            }
        })
    }
}
