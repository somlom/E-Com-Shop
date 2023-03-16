import Multer, { diskStorage } from "multer"
import path from "path";
import { promisify } from "util";


const allowedOutputFormats = ['image/jpg', 'image/png', "image/jpeg"];

const storage = diskStorage({
    destination: function (req, _file, cb) {
        cb(null, "public/img");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = Multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const found = allowedOutputFormats.find(type => file.mimetype === type)

        if (found) {
            if (req.files.length < 8) {
                cb(null, true);
            } else {
                const err = new Error('Only 8 pics')
                return cb(err);
            }
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
});

export const upload_photo = promisify(upload.single('image'));
export const upload_photos = promisify(upload.array('image', 8));