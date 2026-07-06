import { buildAuthOtpEmail } from "../email/authEmailTemplates";

describe("buildAuthOtpEmail", () => {
  it("should build an auth OTP email template", () => {
    const email = buildAuthOtpEmail({
      code: "123456",
      firstName: "Anastasia",
    });

    expect(email.subject).toBe("Verify your Voyana account");
    expect(email.previewText).toBe("Your Voyana security code is 123456.");
    expect(email.text).toContain("Hi Anastasia,");
    expect(email.text).toContain("Security code: 123456");
    expect(email.html).toContain("Verify your email");
    expect(email.html).toContain("123456");
  });

  it("should escape html values in the email template", () => {
    const email = buildAuthOtpEmail({
      code: "<123456>",
      firstName: "<script>",
    });

    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).toContain("&lt;123456&gt;");
    expect(email.html).not.toContain("<script>");
  });
});
