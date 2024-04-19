/*const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com', // SMTP server hostname
  port: 2525, // Port number (587 for TLS, 465 for SSL)
  // true for 465, false for other ports
  auth: {
    user: 'bhuvaneshwarishetty07@gmail.com', // SMTP username
    pass: 'F00EDADA6914F7078EFC27145A7ECE54B2E6' // SMTP password
  }
});

module.exports = transporter;*/


const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  try {
    // Create a transporter using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'bhuvaneshwarishetty07@gmail.com', // Your Gmail email address
        pass: 'Puneeth@244' // Your Gmail password
      }
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Your App" bhuvaneshwarishetty07@gmail.com', // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text // Plain text body
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

module.exports = { sendEmail };

