import multer from "multer"

const allowedOutputFormats = ['jpg', 'png', "jpeg"];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'api/public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const upload_photo = upload.single('image');