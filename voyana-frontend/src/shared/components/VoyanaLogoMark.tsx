import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'

export function VoyanaLogoMark(props: BoxProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      {...props}
      sx={{
        display: 'block',
        flex: '0 0 auto',
        color: 'currentColor',
        ...props.sx,
      }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.25 5.13C19.04 3.85 20.96 3.85 21.75 5.13L35.76 27.88C36.79 29.56 35.02 31.55 33.2 30.75L24.37 26.86L21.89 33.15C21.25 34.77 18.75 34.77 18.11 33.15L15.63 26.86L6.8 30.75C4.98 31.55 3.21 29.56 4.24 27.88L18.25 5.13ZM20 10.57L10.14 26.58L15.93 24.03C17.01 23.55 18.28 24.06 18.71 25.15L20 28.43L21.29 25.15C21.72 24.06 22.99 23.55 24.07 24.03L29.86 26.58L20 10.57Z"
      />
    </Box>
  )
}
