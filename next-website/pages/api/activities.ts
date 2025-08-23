import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllActivities,
  getPublishedActivities,
  getFeaturedActivities,
  searchActivities,
  getActivitiesStats
} from '@/src/db/queries/activities'

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
  // Only allow GET requests for public API
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET requests are allowed'
    })
  }

  try {
    const {
      action,
      category,
      status,
      search,
      featured,
      page = '1',
      limit = '50'
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const offset = (pageNum - 1) * limitNum

    switch (action) {
      case 'stats':
        const stats = await getActivitiesStats()
        return res.status(200).json({
          success: true,
          message: 'Activities statistics retrieved successfully',
          data: stats
        })

      case 'featured':
        const featuredActivities = await getFeaturedActivities(limitNum)
        return res.status(200).json({
          success: true,
          message: 'Featured activities retrieved successfully',
          data: featuredActivities
        })

      case 'search':
        if (!search || Array.isArray(search)) {
          return res.status(400).json({
            success: false,
            message: 'Search term is required'
          })
        }

        const searchResults = await searchActivities(search, {
          category: category as string,
          status: status as string,
          published: true,
          limit: limitNum,
          offset
        })

        return res.status(200).json({
          success: true,
          message: 'Search completed successfully',
          data: searchResults
        })

      default:
        // Get published activities with optional filters
        const activities = await getPublishedActivities({
          category: category as string,
          status: status as string,
          limit: limitNum,
          offset
        })

        return res.status(200).json({
          success: true,
          message: 'Activities retrieved successfully',
          data: activities
        })
    }

  } catch (error) {
    console.error('Error in activities API:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch activities'
    })
  }
}
