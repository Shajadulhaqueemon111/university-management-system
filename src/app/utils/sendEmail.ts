import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'mdshajdulhaqueemon@gmail.com',
      pass: 'mmep vuoe qbdo sxdu',
    },
  });
  await transporter.sendMail({
    from: '"👻" <mdshajdulhaqueemon@gmail.com>', // sender address
    to,
    // to: 'emdshajdulhaque@gmail.com', // list of receivers
    subject: 'Reset Your Password Within 10 minutes?', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
