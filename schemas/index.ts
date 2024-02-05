import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export const LoginSchema = toTypedSchema(loginSchema)

export const RegisterSchema = toTypedSchema(
  z.object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z.string().min(6, {
      message: 'Minimum 6 characters required',
    }),
    name: z.string().min(1, {
      message: 'Name is required',
    }),
  }),
)
