import { Alert } from '@mui/material'
import { designTokens, tokenAlpha } from '../../../../shared/constants/designTokens'

type FormErrorAlertProps = {
  message: string | null
}

export function FormErrorAlert({ message }: FormErrorAlertProps) {
  if (!message) {
    return null
  }

  return (
    <Alert
      severity="error"
      sx={{
        mb: 2.5,
        borderRadius: 2,
        border: `1px solid ${tokenAlpha(designTokens.rgb.danger, 0.42)}`,
        bgcolor: designTokens.colors.errorInverseSurface,
        color: designTokens.colors.textInverse,
        fontWeight: 700,
        alignItems: 'center',
        px: 2.25,
        py: 1.25,
        boxShadow: `0 14px 30px ${tokenAlpha(designTokens.rgb.black, 0.22)}`,
        backdropFilter: 'blur(10px)',
        '& .MuiAlert-icon': {
          color: designTokens.colors.errorInverse,
          opacity: 1,
          p: 0,
          mr: 1.5,
          alignItems: 'center',
        },
        '& .MuiAlert-message': {
          display: 'flex',
          alignItems: 'center',
          minHeight: 24,
          py: 0,
          lineHeight: 1.35,
        },
      }}
    >
      {message}
    </Alert>
  )
}
