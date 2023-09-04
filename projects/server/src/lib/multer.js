const multer = require('multer');
const fs = require('fs');
const path = require("path");

let defaultPath = path.join(__dirname, '../public');
var storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let isDirectoryExist = fs.existsSync(
            `${defaultPath}/${file.fieldname}`,
        );

        if (!isDirectoryExist) {
            await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
                recursive: true,
            });
        }

        if (file.fieldname === 'pdf') {
            cb(null, `${defaultPath}/${file.fieldname}`);
        }
        if (file.fieldname === 'images') {
            cb(null, `${defaultPath}/${file.fieldname}`);
        }
    },
    filename: (req, file, cb) => {
        cb(
            null,
            'PIMG' +
                '-' +
                Date.now() +
                Math.round(Math.random() * 1000000000) +
                '.' +
                file.mimetype.split('/')[1],
        );
    },
});

var fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
        // Accept
        cb(null, true);
    } else if (file.mimetype.split('/')[0] !== 'image') {
        // Reject
        cb(new Error('File Must Be Image!'));
    }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
