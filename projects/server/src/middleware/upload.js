const { multerUpload } = require('./../lib/multer');

const deleteFiles = require('./../helper/deleteFiles');

const upload = (req, res, next) => {
    const multerResult = multerUpload.fields([{ name: 'images', maxCount: 5 }]);
    console.log(multerResult)
    multerResult(req, res, function (err) {
        try {
            if (!req.files.images)
            return res.status(404).send({
                success: false,
                message: 'images is required!',
                data: null,
            });

            if (err) throw err;

            req.files.images.forEach((value) => {
                if (value.size > 100000000)
                    throw {
                        message: `${value.originalname} is Too Large`,
                        fileToDelete: req.files.images,
                    };
            });
            console.log('masukk siniii middleware upload')
            next();
        } catch (error) {
            if (error.fileToDelete) {
                deleteFiles(error.fileToDelete);
            }

            return res.status(404).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    });
};

module.exports = upload;
