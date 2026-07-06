import { zodResolver } from '@hookform/resolvers/zod'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../../../app/router/routes'
import { otpVerificationSchema } from '../schemas/auth.schemas'
import type { OtpVerificationFormValues } from '../schemas/auth.schemas'

const OTP_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 56

const createResendDeadline = () => Date.now() + RESEND_COOLDOWN_SECONDS * 1000

const getSecondsUntil = (deadline: number) =>
  Math.max(0, Math.ceil((deadline - Date.now()) / 1000))

type OtpRouteState = {
  backTo?: string
}

export type OtpDigitField = {
  value: string
  dataIndex: number
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  ariaLabel: string
}

export function useOtpVerificationForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = location.state as OtpRouteState | null
  const [resendDeadline, setResendDeadline] = useState(createResendDeadline)
  const [secondsLeft, setSecondsLeft] = useState(() => getSecondsUntil(resendDeadline))
  const [formError, setFormError] = useState<string | null>(null)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpVerificationFormValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      code: '',
    },
  })

  const code = useWatch({ control, name: 'code' }) ?? ''
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => code[index] ?? '')

  useEffect(() => {
    const updateSecondsLeft = () => {
      setSecondsLeft(getSecondsUntil(resendDeadline))
    }

    updateSecondsLeft()
    const timerId = window.setInterval(updateSecondsLeft, 1000)

    return () => window.clearInterval(timerId)
  }, [resendDeadline])

  const focusDigit = (index: number) => {
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>(`[data-otp-index="${index}"]`)?.focus()
    })
  }

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const nextDigits = [...digits]
    nextDigits[index] = digit

    setValue('code', nextDigits.join(''), { shouldValidate: true })

    if (digit && index < OTP_LENGTH - 1) {
      focusDigit(index + 1)
    }
  }

  const focusPreviousDigit = (index: number, event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusDigit(index - 1)
    }
  }

  const submitForm = handleSubmit(() => {
    setFormError(null)
    setIsVerified(true)
  })

  const resendCode = async () => {
    setFormError(null)
    setResendMessage(null)

    if (secondsLeft > 0) {
      return
    }

    setIsResending(true)
    setValue('code', '', { shouldValidate: false })
    setResendDeadline(createResendDeadline())
    setResendMessage('A new code was sent to your email.')
    setIsResending(false)
  }

  return {
    isVerified,
    formError,
    resendMessage,
    codeError: errors.code?.message,
    digitFields: digits.map((digit, index) => ({
      value: digit,
      dataIndex: index,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        updateDigit(index, event.target.value),
      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) =>
        focusPreviousDigit(index, event),
      ariaLabel: `Verification digit ${index + 1}`,
    })),
    formattedSeconds: secondsLeft.toString().padStart(2, '0'),
    isResendAvailable: secondsLeft === 0,
    isResending,
    isSubmitDisabled: isSubmitting || code.length !== OTP_LENGTH,
    isSubmitting,
    submitForm,
    onResendCode: resendCode,
    onLoginClick: () => navigate(routes.login),
    onBackClick: () => navigate(routeState?.backTo ?? routes.login),
  }
}

export type OtpVerificationFormModel = ReturnType<typeof useOtpVerificationForm>
