const mailer = require('nodemailer');
require('dotenv').config();

const { welcome } = require('./welcome_template');
const { purchase } = require('./purchase_template');

const getEmailTemplate = (to, name, token, template, actionData) => {
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
    case 'purchase':
      data = {
        from: 'Waves <murphyhsieh.dev@gmail.com>',
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData)
      };
      break;
    default:
      return data;
  }

  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'murphyhsieh.dev@gmail.com', // real email
      pass: process.env.EMAIL_PASS // real password, which is unsecure!
    }
  });

  const mail = getEmailTemplate(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) console.log(error);
    else console.log('Email sent');
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
