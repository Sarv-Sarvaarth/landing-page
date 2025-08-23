import type { NextApiRequest, NextApiResponse } from 'next'

interface ApiResponse {
  success: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  // Clear the session cookie
  res.setHeader('Set-Cookie', [
    'admin-session=; Path=/; Max-Age=0; SameSite=Strict',
  ])

  return res.status(200).json({
    success: true,
    message: 'Logout successful'
  })
}
