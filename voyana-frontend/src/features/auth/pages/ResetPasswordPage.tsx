import { AuthFormShell } from '../components/ui/AuthFormShell'
import { ResetPasswordForm } from '../components/forms/ResetPasswordForm'
import { useResetPasswordForm } from '../hooks/useResetPasswordForm'

export function ResetPasswordPage() {
  const resetPasswordForm = useResetPasswordForm()

  return (
    <AuthFormShell
      title="Set a new password"
      subtitle="Choose a secure password before returning to your Voyana travel account."
    >
      <ResetPasswordForm {...resetPasswordForm} />
    </AuthFormShell>
  )
}
