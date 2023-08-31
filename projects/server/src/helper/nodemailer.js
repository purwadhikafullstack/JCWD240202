const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jcwd2402@gmail.com',
        pass: 'scbgsnbbmpnieobh',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports = transporter;
