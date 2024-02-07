import bcrypt from 'bcryptjs'

import { generateVerificationToken } from '../utils/token'
import { sendVerificationEmail } from '../utils/mail'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { name, email, password } = body

    if (!name || !email || !password) {
      return createError({
        statusCode: 400,
        statusMessage: 'Name, email and password are required',
      })
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return createError({
        statusCode: 400,
        statusMessage: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return user
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
