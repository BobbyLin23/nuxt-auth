import type { AuthConfig } from '@auth/core/types'
import Credentials from '@auth/core/providers/credentials'
import bcrypt from 'bcryptjs'
import { NuxtAuthHandler } from '#auth'

import { getUserByEmail } from '~/server/data/user'
import { loginSchema } from '~/schemas'

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  basePath: '/api/auth',
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password)
            return null

          const isValid = await bcrypt.compare(password, user.password)

          if (isValid)
            return user
        }

        return null
      },
    }),
  ],
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
