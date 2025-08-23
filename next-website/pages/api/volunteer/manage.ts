import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  assignVolunteerToRole,
  searchVolunteers,
  getVolunteerStats
} from '@/src/db/queries/volunteer'

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
  try {
    if (req.method === 'GET') {
      const { action, id, search, status, page = '1', limit = '20' } = req.query

      if (action === 'stats') {
        const stats = await getVolunteerStats()
        return res.status(200).json({
          success: true,
          message: 'Volunteer statistics retrieved successfully',
          data: stats
        })
      }

      if (action === 'search' && search) {
        const volunteers = await searchVolunteers(
          search as string,
          parseInt(page as string),
          parseInt(limit as string)
        )
        return res.status(200).json({
          success: true,
          message: 'Search results retrieved successfully',
          data: volunteers
        })
      }

      if (id) {
        const volunteer = await getVolunteerById(parseInt(id as string))
        if (!volunteer) {
          return res.status(404).json({
            success: false,
            message: 'Volunteer not found',
            error: 'No volunteer found with the provided ID'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Volunteer retrieved successfully',
          data: volunteer
        })
      }

      // Get all volunteers with optional status filter
      const volunteers = await getAllVolunteers(
        parseInt(page as string),
        parseInt(limit as string),
        status as string
      )

      return res.status(200).json({
        success: true,
        message: 'Volunteers retrieved successfully',
        data: volunteers
      })
    }

    if (req.method === 'PUT') {
      const { id, action, status, approvedBy, roleId, notes } = req.body

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Volunteer ID is required'
        })
      }

      if (action === 'update_status') {
        if (!status) {
          return res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: 'Status is required'
          })
        }

        await updateVolunteerStatus(id, status, approvedBy, notes)

        return res.status(200).json({
          success: true,
          message: `Volunteer status updated to ${status} successfully`
        })
      }

      if (action === 'assign_role') {
        if (!roleId) {
          return res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: 'Role ID is required'
          })
        }

        await assignVolunteerToRole(id, roleId)

        return res.status(200).json({
          success: true,
          message: 'Volunteer assigned to role successfully'
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid action',
        error: 'Unsupported action type'
      })
    }

    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET and PUT requests are allowed'
    })

  } catch (error) {
    console.error('Error in volunteer management API:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process volunteer management request'
    })
  }
}
