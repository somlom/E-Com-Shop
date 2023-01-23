import { authenticator } from '@otplib/preset-default';
import qrcode from "qrcode"


export default class TOTP {

    constructor() {
        this.secret = authenticator.generateSecret();
        this.counter = Date.now() / 30
    }

    generateQRCode(user = "") {

        const otp = authenticator.keyuri(user, "interEcom", this.secret);

        qrcode.toString(otp, { type: "terminal", small: true }, (err, imageUrl) => {
            if (err) {
                console.log('Could not generate QR code', err);
                return;
            }
            console.log(imageUrl)
        });
    }

    isValid(token = "") {
        return authenticator.verify({ secret: this.secret, token: token })
    }
}