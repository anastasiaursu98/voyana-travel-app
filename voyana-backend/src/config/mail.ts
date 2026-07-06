import nodemailer from "nodemailer";

import { MailtrapTransport } from "mailtrap";

export const mailFrom = {
  address: process.env.MAIL_FROM_ADDRESS as string,
  name: process.env.MAIL_FROM_NAME as string,
};

export const mailTransporter = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN as string,
  }),
);
