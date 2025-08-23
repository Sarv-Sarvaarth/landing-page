import type { NextApiRequest, NextApiResponse } from 'next'
import { getAvailableVolunteerRoles } from '@/src/db/queries/volunteer'

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
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET requests are allowed'
    })
  }

  try {
    // Fetch available volunteer roles from database
    const roles = await getAvailableVolunteerRoles()

    // Parse JSON fields for better frontend consumption
    const processedRoles = roles.map(role => ({
      ...role,
      requirements: role.requirements ? JSON.parse(role.requirements) : [],
      skillsNeeded: role.skillsNeeded ? JSON.parse(role.skillsNeeded) : [],
    }))

    return res.status(200).json({
      success: true,
      message: 'Volunteer roles retrieved successfully',
      data: processedRoles
    })

  } catch (error) {
    console.error('Error fetching volunteer roles:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch volunteer roles'
    })
  }
}
