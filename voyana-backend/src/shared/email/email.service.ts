import { mailFrom, mailTransporter } from "../../config/mail";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailOptions) => {
  return mailTransporter.sendMail({
    from: mailFrom,
    to: process.env.MAIL_TO_OVERRIDE ?? to,
    subject,
    html,
    text,
  });
};
