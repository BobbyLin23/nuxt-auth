import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const LoginSchema = toTypedSchema(
  z.object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z.string().min(1, {
      message: 'Password is required',
    }),
  }),
)
