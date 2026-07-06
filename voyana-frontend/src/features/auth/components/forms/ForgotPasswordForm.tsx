import { Box } from '@mui/material'
import { AppButton, AppTextField } from '../../../../shared/ui'
import type { ForgotPasswordFormModel } from '../../hooks/useForgotPasswordForm'
import { FormErrorAlert } from '../ui/FormErrorAlert'

export function ForgotPasswordForm({
  formError,
  isSubmitting,
  submitForm,
  emailFieldProps,
  onBackClick,
}: ForgotPasswordFormModel) {
  return (
    <Box component="form" noValidate onSubmit={submitForm}>
      <FormErrorAlert message={formError} />

      <AppTextField
        label="Email address"
        placeholder="traveler@example.com"
        autoComplete="email"
        {...emailFieldProps}
      />

      <Box className="mt-7 flex flex-col gap-4">
        <AppButton fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending code...' : 'Send verification code'}
        </AppButton>

        <AppButton fullWidth intent="secondary" type="button" onClick={onBackClick}>
          Back to sign in
        </AppButton>
      </Box>
    </Box>
  )
}
