import { Box, Typography } from '@mui/material'
import { AppButton } from '../../../../shared/ui'
import type { OtpVerificationFormModel } from '../../hooks/useOtpVerificationForm'
import { FormErrorAlert } from '../ui/FormErrorAlert'
import { OtpCodeInput } from '../ui/OtpCodeInput'

export function OtpVerificationForm({
  formError,
  resendMessage,
  codeError,
  digitFields,
  formattedSeconds,
  isResendAvailable,
  isResending,
  isSubmitDisabled,
  isSubmitting,
  submitForm,
  onResendCode,
  onBackClick,
}: OtpVerificationFormModel) {
  return (
    <Box component="form" noValidate onSubmit={submitForm}>
      <FormErrorAlert message={formError} />

      <OtpCodeInput fields={digitFields} />

      <Box className="mt-7 text-center">
        {isResendAvailable ? (
          <AppButton
            fullWidth
            intent="secondary"
            type="button"
            onClick={onResendCode}
            disabled={isResending}
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </AppButton>
        ) : (
          <Typography color="text.secondary" sx={{ fontSize: 16 }}>
            Resend available in{' '}
            <Box component="span" sx={{ color: 'secondary.main', fontWeight: 850 }}>
              00:{formattedSeconds}
            </Box>
          </Typography>
        )}
      </Box>

      {resendMessage ? (
        <Typography className="mt-3 text-center" color="text.secondary" sx={{ fontSize: 14 }}>
          {resendMessage}
        </Typography>
      ) : null}

      {codeError ? (
        <Typography className="mt-3 text-center" color="error" sx={{ fontSize: 14 }}>
          {codeError}
        </Typography>
      ) : null}

      <Box className="mt-8 flex flex-col gap-4">
        <AppButton fullWidth type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? 'Verifying...' : 'Verify code'}
        </AppButton>

        <AppButton fullWidth intent="secondary" type="button" onClick={onBackClick}>
          Back to sign in
        </AppButton>
      </Box>
    </Box>
  )
}
