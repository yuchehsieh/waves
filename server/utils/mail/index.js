const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
require('dotenv').config();

const getEmailTemplate = (to, name, token, template) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: 'Waves <murphyhsieh.dev@gmail.com>',
        to,
        subject: `Welcome to waves ${name}`,
        html: welcome()
      };
      break;
    default:
      return data;
  }

  return data;
};

const sendEmail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'murphyhsieh.dev@gmail.com', // real email
      pass: process.env.EMAIL_PASS // real password, which is unsecure!
    }
  });

  const mail = getEmailTemplate(to, name, token, type);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) console.log(error);
    else console.log('Email sent');
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
