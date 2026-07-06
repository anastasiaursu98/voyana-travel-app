import bcrypt from "bcryptjs";
import { randomInt } from "crypto";
import { sendEmail } from "../../shared/email/email.service";
import { buildAuthOtpEmail } from "./email/authEmailTemplates";

export const EMAIL_VERIFICATION_CODE_EXPIRATION_MS = 1 * 60 * 1000; // 1 minute

type SendEmailVerificationCodeOptions = {
  email: string;
  firstName: string;
  verificationCode: string;
};

export const createEmailVerificationCode = async () => {
  const code = randomInt(100000, 999999).toString();
  return {
    code,
    hashedVerificationCode: await bcrypt.hash(code, 10),
    emailVerificationExpiresAt: new Date(
      Date.now() + EMAIL_VERIFICATION_CODE_EXPIRATION_MS,
    ),
  };
};

export const sendEmailVerificationCode = async ({
  email,
  verificationCode,
  firstName,
}: SendEmailVerificationCodeOptions) => {
  const emailTemplate = buildAuthOtpEmail({
    code: verificationCode,
    firstName,
    expiresInMinutes: EMAIL_VERIFICATION_CODE_EXPIRATION_MS / (60 * 1000),
  });

  await sendEmail({
    to: email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text,
  });
};
