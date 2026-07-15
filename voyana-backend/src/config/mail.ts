import nodemailer from "nodemailer";

const mailProvider = process.env.MAIL_PROVIDER ?? "local";

export const mailFrom = {
  address: process.env.MAIL_FROM_ADDRESS as string,
  name: process.env.MAIL_FROM_NAME as string,
};

const createLocalTransport = () =>
  nodemailer.createTransport({
    host: process.env.LOCAL_SMTP_HOST ?? "localhost",
    port: Number(process.env.LOCAL_SMTP_PORT ?? 1025),
    secure: false,
  });

const createBrevoTransport = () => {
  const smtpPort = Number(process.env.BREVO_SMTP_PORT ?? 587);

  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST ?? "smtp-relay.brevo.com",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN as string,
      pass: process.env.BREVO_SMTP_KEY as string,
    },
  });
};

export const mailTransporter =
  mailProvider === "brevo" ? createBrevoTransport() : createLocalTransport();
