const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({

    // Where to save the image
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    // What filename to give the image
    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

// Create multer upload middleware
const upload = multer({
    storage: storage
});

module.exports = upload;