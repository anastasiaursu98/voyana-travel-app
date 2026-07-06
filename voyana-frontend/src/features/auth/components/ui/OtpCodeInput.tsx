import { Box } from '@mui/material'
import { AppTextField } from '../../../../shared/ui'
import type { OtpDigitField } from '../../hooks/useOtpVerificationForm'

type OtpCodeInputProps = {
  fields: OtpDigitField[]
}

export function OtpCodeInput({ fields }: OtpCodeInputProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        gap: { xs: 1, sm: 1.5 },
      }}
    >
      {fields.map((field, index) => (
        <AppTextField
          key={index}
          value={field.value}
          onChange={field.onChange}
          onKeyDown={field.onKeyDown}
          slotProps={{
            htmlInput: {
              inputMode: 'numeric',
              maxLength: 1,
              pattern: '[0-9]*',
              'aria-label': field.ariaLabel,
              'data-otp-index': field.dataIndex,
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              minHeight: { xs: 48, sm: 56 },
              borderRadius: '8px',
            },
            '& .MuiOutlinedInput-input': {
              height: { xs: 48, sm: 56 },
              p: 0,
              textAlign: 'center',
              fontSize: { xs: 20, sm: 24 },
              fontWeight: 700,
            },
          }}
        />
      ))}
    </Box>
  )
}
