import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllProjects,
  getPublishedProjects,
  getFeaturedProjects,
  searchProjects,
  getProjectsStats,
  getProjectBySlug
} from '@/src/db/queries/projects'

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
      year,
      search,
      featured,
      slug,
      page = '1',
      limit = '50'
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const offset = (pageNum - 1) * limitNum

    switch (action) {
      case 'stats':
        const stats = await getProjectsStats()
        return res.status(200).json({
          success: true,
          message: 'Projects statistics retrieved successfully',
          data: stats
        })

      case 'featured':
        const featuredProjects = await getFeaturedProjects(limitNum)
        return res.status(200).json({
          success: true,
          message: 'Featured projects retrieved successfully',
          data: featuredProjects
        })

      case 'by-slug':
        if (!slug || Array.isArray(slug)) {
          return res.status(400).json({
            success: false,
            message: 'Project slug is required'
          })
        }

        const project = await getProjectBySlug(slug)
        if (!project || !project.publishedAt) {
          return res.status(404).json({
            success: false,
            message: 'Project not found'
          })
        }

        return res.status(200).json({
          success: true,
          message: 'Project retrieved successfully',
          data: project
        })

      case 'search':
        if (!search || Array.isArray(search)) {
          return res.status(400).json({
            success: false,
            message: 'Search term is required'
          })
        }

        const searchResults = await searchProjects(search, {
          category: category as string,
          status: status as string,
          year: year as string,
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
        // Get published projects with optional filters
        const projects = await getPublishedProjects({
          category: category as string,
          status: status as string,
          year: year as string,
          limit: limitNum,
          offset
        })

        return res.status(200).json({
          success: true,
          message: 'Projects retrieved successfully',
          data: projects
        })
    }

  } catch (error) {
    console.error('Error in projects API:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to fetch projects'
    })
  }
}
