import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createVolunteerRole,
  getAllVolunteerRoles,
  getVolunteerRoleById,
  updateVolunteerRole,
  getAvailableVolunteerRoles
} from '@/src/db/queries/volunteer'

interface VolunteerRoleData {
  title: string
  description: string
  requirements?: string[]
  skillsNeeded?: string[]
  timeCommitment?: string
  location?: string
  maxVolunteers?: number
  isActive?: boolean
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

const validateRoleData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!data.title || data.title.length < 3) {
    errors.push('Role title must be at least 3 characters')
  }

  if (!data.description || data.description.length < 10) {
    errors.push('Role description must be at least 10 characters')
  }

  if (data.maxVolunteers && (isNaN(data.maxVolunteers) || data.maxVolunteers < 1)) {
    errors.push('Maximum volunteers must be a positive number')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method === 'GET') {
      const { id, available } = req.query

      if (id) {
        const role = await getVolunteerRoleById(parseInt(id as string))
        if (!role) {
          return res.status(404).json({
            success: false,
            message: 'Role not found',
            error: 'No volunteer role found with the provided ID'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Volunteer role retrieved successfully',
          data: role
        })
      }

      if (available === 'true') {
        const roles = await getAvailableVolunteerRoles()
        return res.status(200).json({
          success: true,
          message: 'Available volunteer roles retrieved successfully',
          data: roles
        })
      }

      const roles = await getAllVolunteerRoles(false)

      return res.status(200).json({
        success: true,
        message: 'Volunteer roles retrieved successfully',
        data: roles
      })
    }

    if (req.method === 'POST') {
      const roleData: VolunteerRoleData = req.body

      const validation = validateRoleData(roleData)
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validation.errors.join(', ')
        })
      }

      const roleRecord = {
        title: roleData.title,
        description: roleData.description,
        requirements: roleData.requirements ? JSON.stringify(roleData.requirements) : null,
        skillsNeeded: roleData.skillsNeeded ? JSON.stringify(roleData.skillsNeeded) : null,
        timeCommitment: roleData.timeCommitment || null,
        location: roleData.location || null,
        maxVolunteers: roleData.maxVolunteers || null,
        isActive: roleData.isActive !== undefined ? roleData.isActive : true,
        currentVolunteers: 0
      }

      const savedRole = await createVolunteerRole(roleRecord)

      return res.status(201).json({
        success: true,
        message: 'Volunteer role created successfully',
        data: savedRole
      })
    }

    if (req.method === 'PUT') {
      const { id, ...updateData } = req.body

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Role ID is required'
        })
      }

      const validation = validateRoleData(updateData)
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validation.errors.join(', ')
        })
      }

      const roleUpdateRecord = {
        title: updateData.title,
        description: updateData.description,
        requirements: updateData.requirements ? JSON.stringify(updateData.requirements) : null,
        skillsNeeded: updateData.skillsNeeded ? JSON.stringify(updateData.skillsNeeded) : null,
        timeCommitment: updateData.timeCommitment || null,
        location: updateData.location || null,
        maxVolunteers: updateData.maxVolunteers || null,
        isActive: updateData.isActive !== undefined ? updateData.isActive : undefined
      }

      await updateVolunteerRole(id, roleUpdateRecord)

      return res.status(200).json({
        success: true,
        message: 'Volunteer role updated successfully'
      })
    }

    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET, POST, and PUT requests are allowed'
    })

  } catch (error) {
    console.error('Error in volunteer roles API:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process volunteer role request'
    })
  }
}
