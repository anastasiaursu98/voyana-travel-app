import type { CheckboxProps, TextFieldProps } from '@mui/material'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export const toTextFieldProps = (
  field: UseFormRegisterReturn,
  error?: FieldError,
  helperText?: string,
): TextFieldProps => {
  const { ref, ...inputProps } = field

  return {
    ...inputProps,
    inputRef: ref,
    error: Boolean(error),
    helperText: error?.message ?? helperText,
  }
}

export const toCheckboxProps = (field: UseFormRegisterReturn): CheckboxProps => {
  const { ref, ...inputProps } = field

  return {
    ...inputProps,
    slotProps: {
      input: {
        ref,
      },
    },
  }
}
