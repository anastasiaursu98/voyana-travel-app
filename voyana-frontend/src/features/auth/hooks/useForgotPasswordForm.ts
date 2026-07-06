import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../app/router/routes'
import { forgotPasswordSchema } from '../schemas/auth.schemas'
import type { ForgotPasswordFormValues } from '../schemas/auth.schemas'
import { toTextFieldProps } from '../utils/formFieldProps'

export function useForgotPasswordForm() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const submitForm = handleSubmit(() => {
    setFormError(null)
    navigate(routes.otpVerification, {
      state: { backTo: routes.forgotPassword },
    })
  })

  return {
    formError,
    isSubmitting,
    submitForm,
    emailFieldProps: toTextFieldProps(register('email'), errors.email),
    onBackClick: () => navigate(routes.login),
  }
}

export type ForgotPasswordFormModel = ReturnType<typeof useForgotPasswordForm>
