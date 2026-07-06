import { ForgotPasswordForm } from "../components/forms/ForgotPasswordForm";
import { AuthFormShell } from "../components/ui/AuthFormShell";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export function ForgotPasswordPage() {
  const forgotPasswordForm = useForgotPasswordForm();

  return (
    <AuthFormShell
      title="Reset Your Password"
      subtitle="We'll send a secure reset link to your email."
    >
      <ForgotPasswordForm {...forgotPasswordForm} />
    </AuthFormShell>
  );
}
