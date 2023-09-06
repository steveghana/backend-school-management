import nodemailer from "nodemailer";
import { dashLogger } from "../logs/logger.ts";
const sendEmail = (req: any):boolean => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: req.email,
    subject: req.subject,
    html: req.text,
  };
  transporter.sendMail(mailOptions,  (err, info)=> {
    if (err) {
      dashLogger.error(`Error : ${err.message},Request : ${req.originalUrl}`);
      console.log(err);
      return false
    } else {
      // dashLogger.info(`Success : ${info.response},Request : SendMail`);
      console.log(info.response);
      return true;
    }
  });
  return true
};

export default sendEmail;
