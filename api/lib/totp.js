import { authenticator } from '@otplib/preset-default';
import qrcode from "qrcode"
import { SafeString } from 'handlebars'

import Mailer from './mailer';


export default class TOTP {

    constructor() {
        this.secret = authenticator.generateSecret();
        // this.secret = process.env.ADMIN_SECRET
        this.counter = Date.now() / 30
        // this.secret = authenticator.generate(this.secret)
    }

    generateQRCode(user) {

        const mailer = new Mailer();
        const otp = authenticator.keyuri(user, "interEcom", this.secret);
 
        qrcode.toDataURL(otp, (err, imageUrl) => {
            if (err) {
                console.log('Could not generate QR code', err);
                return;
            }
            mailer.send_email("supersnus1331@gmail.com", "Admin access", "admin", { code: new SafeString(imageUrl).toHTML() })
        });
    }


    isValid(token) {
        return authenticator.verify({ secret: this.secret, token: token })
    }
}