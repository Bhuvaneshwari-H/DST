const nodemailer = require('nodemailer');

module.exports = {
  initialize: function (cb) {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
      secure: false,
      auth: {
        user: 'bhuvaneshwarishetty07@gmail.com',
        pass: 'F00EDADA6914F7078EFC27145A7ECE54B2E6'
      }
    });

    // Define the sendEmail function
    async function sendEmail(to, subject, text) {
      try {
        console.log('Sending email...');
        // Send email using the transporter
        const info = await transporter.sendMail({
          from: 'bhuvaneshwarishetty07@gmail.com',
          to,
          subject,
          text
        });
        console.log(`Email sent: ${info.response}`);
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    }

    sails.hooks.email = {
      sendEmail: sendEmail
    };

    console.log('Email hook initialized');
    return cb();
  }
};
