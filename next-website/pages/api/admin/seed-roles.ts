import type { NextApiRequest, NextApiResponse } from 'next'
import { seedVolunteerRoles } from '@/src/db/seed-roles'

interface ApiResponse {
  success: boolean
  message: string
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
    await seedVolunteerRoles()

    return res.status(200).json({
      success: true,
      message: 'Volunteer roles seeded successfully'
    })

  } catch (error) {
    console.error('Error seeding volunteer roles:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to seed volunteer roles'
    })
  }
}
