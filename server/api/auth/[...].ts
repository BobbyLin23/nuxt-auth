import type { AuthConfig } from '@auth/core/types'
import Credentials from '@auth/core/providers/credentials'
import Github from '@auth/core/providers/github'
import Google from '@auth/core/providers/google'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'

import { getUserByEmail, getUserById } from '~/server/data/user'
import { loginSchema } from '~/schemas'

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
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
        // @ts-expect-error type error about auth.js
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

          console.log(isValid)

          if (isValid)
            return user
        }

        return null
      },
    }),
    Github({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret,
    }),
    Google({
      clientId: runtimeConfig.google.clientId,
      clientSecret: runtimeConfig.google.clientSecret,
    }),
  ],
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
