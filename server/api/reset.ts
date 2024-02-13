import { getUserByEmail } from '../data/user'
import { sendPasswordResetEmail } from '../utils/mail'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { email } = body

    if (!email) {
      return {
        error: 'Email is required',
      }
    }

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return {
        error: 'Email does not exist!',
      }
    }

    const passwordResetToken = await generateVerificationToken(email)

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return {
      success: 'Password reset email sent',
    }
  }
  catch {
    return {
      error: 'Something went wrong',
    }
  }
})
