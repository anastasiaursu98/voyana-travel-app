import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Tooltip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { designTokens, tokenAlpha } from '../../shared/constants/designTokens'
import { AppButton } from '../../shared/ui'

type AuthBackButtonProps = {
  to: string
}

export function AuthBackButton({ to }: AuthBackButtonProps) {
  return (
    <Tooltip title="Back">
      <AppButton
        intent="icon"
        component={RouterLink}
        to={to}
        aria-label="Back"
        icon={<ArrowBackRoundedIcon />}
        sx={{
          width: 44,
          height: 44,
          border: `1px solid ${tokenAlpha(designTokens.rgb.textInverseMuted, 0.18)}`,
          color: designTokens.colors.textInverse,
          bgcolor: tokenAlpha(designTokens.rgb.white, 0.08),
          backdropFilter: 'blur(18px)',
          boxShadow: designTokens.shadows.authBack,
          '&:hover': {
            bgcolor: tokenAlpha(designTokens.rgb.white, 0.14),
            borderColor: tokenAlpha(designTokens.rgb.buttonPrimary, 0.55),
          },
        }}
      />
    </Tooltip>
  )
}
