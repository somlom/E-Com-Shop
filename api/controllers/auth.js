import bcrypt from 'bcryptjs';

import {Users} from '../db/users';
import {get_token, verify_token} from '../lib/JWT';
import Mailer from '../lib/mailer';

export async function loginUser(req, res) {
    const {email, password} = req.body;

    // https://stripe.com/docs/api/payment_intents/object

    if (email && password) {
        const user = await Users.findOne({email});

        if (user) {
            const hash = await bcrypt.compare(password, user.password);

            if (hash === true) {
                return res.json(get_token(user._id));
            } else {
                return res.status(401).json('invalid_credentials');
            }
        } else {
            return res.status(401).json('invalid_credentials');
        }
    } else {
        return res.status(401).json('empty_fields');
    }
}

export async function registerUser(req, res) {
    const {name, surname, email, password, password2} = req.body;

    if (name && surname && email && password && password2) {
        const user = await Users.findOne({email});

        if (user) {
            return res.status(401).json('registered');
            // .json("Sorry, but this e-mail address is already registered")
        }
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);
        const are_same = await bcrypt.compare(password2, hash);
        if (!are_same) {
            return res.status(401).json('invalid_credentials');
            // .json("Invalid credentials")
        }
        const new_user = await Users.create({
            email: email,
            password: hash,
            name: name,
            surname: surname,
        });
        return res.json(get_token(new_user._id));
    } else {
        return res.status(401).json('empty_fields');
        // .json("Please, fill all fields")
    }
}

export async function check_token(req, res) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const response = await verify_token(token);

        if (response.status === true) {
            const user = await Users.findById(response.data.payload);
            if (user) {
                return res.status(200).json();
            } else {
                return res.status(401).json();
            }
        } else {
            return res.status(401).json();
        }
    } else {
        return res.status(401).json();
    }
}

export async function requestResetUser(req, res) {
    const {email} = req.body;
    const user = await Users.findOne({email: email});

    if (user) {
        const mailer = new Mailer();
        const token = get_token(user.email);
        mailer.send_email(user.email, 'Reset your password', 'password_reset', {
            url: `${process.env.PUBLIC_URL}/reset?token=${token}`,
        });
        return res.status(200).json();
    } else {
        return res.status(401).json();
    }
}

export async function resetUser(req, res) {
    const {token} = req.params;
    const {password, password2} = req.body;

    const user_email = await verify_token(token);
    if (user_email.status) {
        const user = await Users.findOne({email: user_email.data.payload});

        if (user) {
            const salt = await bcrypt.genSalt(5);
            const hash = await bcrypt.hash(password, salt);
            const are_same = await bcrypt.compare(password2, hash);
            if (!are_same) {
                return res.status(401).json('passwords_are_not_same');
                // "Passwords are not same"
            }
            const update_user = await Users.findByIdAndUpdate(user._id, {
                password: hash,
            });
            return res.json(get_token(update_user._id));
        } else {
            return res.status(400).json('smth_went_wrong1');
            // "Sorry, something went wrong"
        }
    } else {
        return res.status(400).json('smth_went_wrong2');
    }
}

// KEY removed
export async function adminLogin(req, res) {
    const user = await Users.findById(req.user);
    if (user) {
        if (user.email === process.env.ADMIN_EMAIL) {
            return res.status(200).json();
        } else {
            res.status(400);
            throw new Error();
        }
    } else {
        res.status(401);
        throw new Error();
    }
}
