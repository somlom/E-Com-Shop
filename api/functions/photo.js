import multer from "multer"
import util from "util"

const allowedOutputFormats = ['image/jpg', 'image/png', "image/jpeg"];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'api/public/img');

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const found = allowedOutputFormats.find(type => file.mimetype === type)
        console.log(found, file.mimetype in allowedOutputFormats)
        if (found) {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
});

export const upload_photo = util.promisify(upload.single('image'));
export const upload_photos = util.promisify(upload.array('image', 10));