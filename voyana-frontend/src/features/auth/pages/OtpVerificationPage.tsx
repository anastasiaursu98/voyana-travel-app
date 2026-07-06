import { AuthFormShell } from '../components/ui/AuthFormShell'
import { OtpVerificationForm } from '../components/forms/OtpVerificationForm'
import { useOtpVerificationForm } from '../hooks/useOtpVerificationForm'
import { AuthSuccessState } from '../components/ui/AuthSuccessState'
import { AppButton } from '../../../shared/ui'

export function OtpVerificationPage() {
  const otpVerificationForm = useOtpVerificationForm()

  if (otpVerificationForm.isVerified) {
    return (
      <AuthSuccessState
        title="Email Verified Successfully"
        description="Your Voyana account is ready. Sign in to start planning your next journey."
        action={
          <AppButton fullWidth type="button" onClick={otpVerificationForm.onLoginClick}>
            Back to sign in
          </AppButton>
        }
      />
    )
  }

  return (
    <AuthFormShell
      title="Enter your security code"
      subtitle="Use the verification code we sent to your email to continue securely."
    >
      <OtpVerificationForm {...otpVerificationForm} />
    </AuthFormShell>
  )
}
