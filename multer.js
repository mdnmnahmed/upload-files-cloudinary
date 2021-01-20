const multer = require('multer');


//Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file_uploads/')
    },
    filename: (function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    })
});

//File Validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        //prevent to upload
        cb({ message: 'Unsupported file format' }, false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
});

module.exports = upload;