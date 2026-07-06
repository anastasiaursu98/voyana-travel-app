import { z } from 'zod'

const nameMessage = 'Use letters, spaces, apostrophes, or hyphens only.'
const passwordMessage =
  'Password must be at least 8 characters and include uppercase, number, and special character.'
const nameSchema = z
  .string()
  .trim()
  .min(2, 'Must be at least 2 characters.')
  .regex(/^[\p{L}' -]+$/u, nameMessage)
const passwordSchema = z
  .string()
  .min(8, passwordMessage)
  .regex(/[A-Z]/, passwordMessage)
  .regex(/\d/, passwordMessage)
  .regex(/[^a-zA-Z0-9]/, passwordMessage)

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  rememberFor30Days: z.boolean(),
})

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: z.string().trim().email('Enter a valid email address.'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
})

export const otpVerificationSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Enter the 6 digit verification code.'),
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type OtpVerificationFormValues = z.infer<typeof otpVerificationSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
