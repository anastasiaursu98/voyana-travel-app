import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../app/router/routes'
import { loginSchema } from '../schemas/auth.schemas'
import type { LoginFormValues } from '../schemas/auth.schemas'
import { toCheckboxProps, toTextFieldProps } from '../utils/formFieldProps'
import { usePasswordVisibility } from './usePasswordVisibility'

export function useLoginForm() {
  const navigate = useNavigate()
  const passwordVisibility = usePasswordVisibility()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberFor30Days: false,
    },
  })

  const submitForm = handleSubmit(() => {
    setFormError(null)
    navigate(routes.home)
  })

  return {
    formError,
    isSubmitting,
    submitForm,
    emailFieldProps: toTextFieldProps(register('email'), errors.email),
    passwordFieldProps: {
      ...toTextFieldProps(register('password'), errors.password),
      isVisible: passwordVisibility.isVisible,
      onToggleVisibility: passwordVisibility.toggleVisibility,
    },
    rememberCheckboxProps: toCheckboxProps(register('rememberFor30Days')),
  }
}

export type LoginFormModel = ReturnType<typeof useLoginForm>
