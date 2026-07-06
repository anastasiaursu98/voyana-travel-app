import { Box } from '@mui/material'
import { AppButton, AppPasswordField } from '../../../../shared/ui'
import type { ResetPasswordFormModel } from '../../hooks/useResetPasswordForm'
import { FormErrorAlert } from '../ui/FormErrorAlert'

export function ResetPasswordForm({
  formError,
  isSubmitting,
  submitForm,
  passwordFieldProps,
  confirmPasswordFieldProps,
  onBackClick,
}: ResetPasswordFormModel) {
  return (
    <Box component="form" noValidate onSubmit={submitForm}>
      <FormErrorAlert message={formError} />

      <Box className="space-y-5">
        <AppPasswordField
          label="New password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          {...passwordFieldProps}
        />

        <AppPasswordField
          label="Confirm new password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
          {...confirmPasswordFieldProps}
        />
      </Box>

      <Box className="mt-8 flex flex-col gap-4">
        <AppButton fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update password'}
        </AppButton>

        <AppButton fullWidth intent="secondary" type="button" onClick={onBackClick}>
          Back to sign in
        </AppButton>
      </Box>
    </Box>
  )
}
