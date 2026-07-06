import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../../app/router/routes'
import { resetPasswordSchema } from '../schemas/auth.schemas'
import type { ResetPasswordFormValues } from '../schemas/auth.schemas'
import { toTextFieldProps } from '../utils/formFieldProps'
import { usePasswordVisibility } from './usePasswordVisibility'

const passwordHelperText = 'Use 8+ chars with uppercase, number, and special character.'

type ResetPasswordRouteState = {
  backTo?: string
}

export function useResetPasswordForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = location.state as ResetPasswordRouteState | null
  const passwordVisibility = usePasswordVisibility()
  const confirmPasswordVisibility = usePasswordVisibility()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const submitForm = handleSubmit(() => {
    setFormError(null)
    navigate(routes.passwordUpdated, { state: { backTo: routes.resetPassword } })
  })

  return {
    formError,
    isSubmitting,
    submitForm,
    passwordFieldProps: {
      ...toTextFieldProps(
        register('password'),
        errors.password,
        passwordHelperText,
      ),
      isVisible: passwordVisibility.isVisible,
      onToggleVisibility: passwordVisibility.toggleVisibility,
    },
    confirmPasswordFieldProps: {
      ...toTextFieldProps(register('confirmPassword'), errors.confirmPassword),
      isVisible: confirmPasswordVisibility.isVisible,
      onToggleVisibility: confirmPasswordVisibility.toggleVisibility,
    },
    onBackClick: () => navigate(routeState?.backTo ?? routes.otpVerification),
  }
}

export type ResetPasswordFormModel = ReturnType<typeof useResetPasswordForm>
