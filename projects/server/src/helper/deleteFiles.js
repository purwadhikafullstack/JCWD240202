const fs = require('fs');

const deleteFiles = (files) => {
    files.forEach((value) => {
        fs.unlink(value.path, function (err) {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
            }
        });
    });
};

const deleteSingleFile = (file) => {
    fs.unlink(file, function (err) {
        try {
            if (err) throw err;
        } catch (error) {
            console.log(error);
        }
    });
};

const deleteFilesPublic = (files) => {
    files.forEach((value) => {
        fs.unlink(`src/public/images/${value.dataValues?.name}`, function (err) {
            try {
                if (err) throw err;
            } catch (error) {
                console.log(error);
            }
        });
    });
};

module.exports = { deleteFiles, deleteSingleFile, deleteFilesPublic };
