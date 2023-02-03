import { unlink, existsSync } from 'fs';
import multer from "multer"
import path from 'path';
import util from "util"

const allowedOutputFormats = ['image/jpg', 'image/png', "image/jpeg"];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname)
        console.log(path.join(__dirname, "../public/img"))
        cb(null, path.join(__dirname, "../public/img"));

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
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

// export const delete_photos = (files) => {
//     if (files.length > 0) {
//         files.map(img => {
//             const file_exists = existsSync('api/public/img/' + img)
//             if (file_exists === true) {
//                 unlink('api/public/img/' + img, (err) => {
//                     if (err) console.log("err",err);
//                 });
//             } 
//         })
//     }
// }

export const upload_photo = util.promisify(upload.single('image'));
export const upload_photos = util.promisify(upload.array('image', 8));