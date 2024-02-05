import type { AuthConfig } from '@auth/core/types'
import Credentials from '@auth/core/providers/credentials'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'

import { getUserByEmail, getUserById } from '~/server/data/user'
import { loginSchema } from '~/schemas'

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  basePath: '/api/auth',
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials')
        return true

      if (!user || !user.id)
        return false

      const existingUser = await getUserById(user.id)

      if (!existingUser || !existingUser.emailVerified)
        return false

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user)
        session.user.id = token.sub

      if (token.role && session.user)
        session.user.role = token.role as UserRole

      return session
    },
    async jwt({ token }) {
      if (!token.sub)
        return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser)
        return token

      token.role = existingUser.role

      return token
    },
  },
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
