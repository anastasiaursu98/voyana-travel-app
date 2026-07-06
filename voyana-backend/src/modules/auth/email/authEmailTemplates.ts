type AuthOtpEmailOptions = {
  code: string;
  firstName?: string;
  expiresInMinutes?: number;
};

const SUBJECT = "Verify your Voyana account";
const HEADING = "Verify your email";
const INTRO = "Use this security code to finish creating your Voyana account.";
const FOOTER =
  "If you did not create a Voyana account, you can safely ignore this email.";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

export const buildAuthOtpEmail = ({
  code,
  firstName,
  expiresInMinutes = 10,
}: AuthOtpEmailOptions) => {
  const securityCode = code.trim();
  const displayName = firstName?.trim();
  const greeting = displayName ? `Hi ${displayName},` : "Hi,";
  const expiryText = `This code expires in ${expiresInMinutes} minutes.`;
  const previewText = `Your Voyana security code is ${securityCode}.`;

  return {
    subject: SUBJECT,
    previewText,
    text: [
      "Voyana",
      "",
      HEADING,
      "",
      greeting,
      "",
      INTRO,
      "",
      `Security code: ${securityCode}`,
      "",
      expiryText,
      "",
      FOOTER,
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#041117;font-family:Inter,Segoe UI,Arial,sans-serif;color:#ffffff;">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
      <div style="background:#071d25;border:1px solid rgba(89,171,174,0.28);border-radius:18px;padding:32px;">
        <p style="margin:0 0 12px;color:#59abae;font-size:12px;font-weight:800;text-transform:uppercase;">Voyana</p>
        <h1 style="margin:0 0 24px;color:#ffffff;font-size:28px;line-height:1.1;font-weight:900;">${HEADING}</h1>
        <p style="margin:0 0 14px;color:#c2d2cf;font-size:16px;line-height:1.6;">${escapeHtml(greeting)}</p>
        <p style="margin:0 0 24px;color:#c2d2cf;font-size:16px;line-height:1.6;">${INTRO}</p>
        <div style="margin:0 0 24px;padding:20px;text-align:center;border-radius:14px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);">
          <p style="margin:0 0 8px;color:#c2d2cf;font-size:12px;font-weight:800;text-transform:uppercase;">Security code</p>
          <p style="margin:0;color:#ffe09a;font-size:34px;line-height:1.2;font-weight:900;letter-spacing:8px;">${escapeHtml(securityCode)}</p>
        </div>
        <p style="margin:0 0 16px;color:#c2d2cf;font-size:14px;line-height:1.6;">${expiryText}</p>
        <p style="margin:0;color:#91a8a5;font-size:14px;line-height:1.6;">${FOOTER}</p>
      </div>
    </div>
  </body>
</html>`,
  };
};
