import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserByEmailAndPassword } from '@/src/db/queries/user'

interface LoginData {
  email: string
  password: string
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are allowed'
    })
  }

  try {
    const { email, password }: LoginData = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Email and password are required'
      })
    }

    // Check credentials
    const user = await getUserByEmailAndPassword(email, password)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed',
        error: 'Invalid email or password'
      })
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
        error: 'Admin access required'
      })
    }

    // Set session cookie (simple approach)
    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString()
    }

    // In production, use secure httpOnly cookies with proper session management
    res.setHeader('Set-Cookie', [
      `admin-session=${JSON.stringify(sessionData)}; Path=/; Max-Age=86400; SameSite=Strict`,
    ])

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    })

  } catch (error) {
    console.error('Error during login:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Login failed'
    })
  }
}
