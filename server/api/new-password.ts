import bcrypt from 'bcryptjs'

import { getPasswordResetTokenByToken } from '../data/password-reset-token'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { token, password } = body

    if (!token) {
      return {
        error: 'Missing token',
      }
    }

    if (!password) {
      return {
        error: 'Missing password',
      }
    }

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
      return {
        error: 'Invalid token',
      }
    }

    const hasExpired = new Date() > existingToken.expires

    if (hasExpired) {
      return {
        error: 'Token has expired',
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
      where: {
        id: existingToken.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })

    return {
      success: 'Password reset successfully',
    }
  }
  catch {
    return {
      error: 'Something went wrong',
    }
  }
})
