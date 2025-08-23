import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllActivities,
  getActivityById,
  insertActivity,
  updateActivity,
  deleteActivity,
  publishActivity,
  toggleFeaturedActivity,
  getActivitiesStats,
  searchActivities
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
  // Only allow GET, POST, PUT, DELETE requests
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method!)) {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: `${req.method} is not allowed`
    })
  }

  try {
    if (req.method === 'GET') {
      return await handleGetRequest(req, res)
    } else if (req.method === 'POST') {
      return await handlePostRequest(req, res)
    } else if (req.method === 'PUT') {
      return await handlePutRequest(req, res)
    } else if (req.method === 'DELETE') {
      return await handleDeleteRequest(req, res)
    }
  } catch (error) {
    console.error('Admin activities API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process request'
    })
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const {
    action,
    id,
    category,
    status,
    published,
    featured,
    search,
    page = '1',
    limit = '50'
  } = req.query

  const pageNum = parseInt(page as string)
  const limitNum = parseInt(limit as string)
  const offset = (pageNum - 1) * limitNum

  switch (action) {
    case 'get-by-id':
      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: 'Valid ID is required'
        })
      }

      const activity = await getActivityById(parseInt(id))
      if (!activity) {
        return res.status(404).json({
          success: false,
          message: 'Activity not found'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Activity fetched successfully',
        data: activity
      })

    case 'stats':
      const stats = await getActivitiesStats()
      return res.status(200).json({
        success: true,
        message: 'Statistics fetched successfully',
        data: stats
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
        published: published === 'true' ? true : published === 'false' ? false : undefined,
        limit: limitNum,
        offset
      })

      return res.status(200).json({
        success: true,
        message: 'Search completed successfully',
        data: searchResults
      })

    default:
      // Get all activities with filters (including unpublished for admin)
      const activities = await getAllActivities({
        category: category as string,
        status: status as string,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        published: published === 'true' ? true : published === 'false' ? false : undefined,
        limit: limitNum,
        offset
      })

      return res.status(200).json({
        success: true,
        message: 'Activities fetched successfully',
        data: activities
      })
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const {
    title,
    category,
    status,
    startDate,
    endDate,
    location,
    shortDescription,
    fullDescription,
    objectives,
    beneficiaries,
    budget,
    impact,
    images,
    videos,
    documents,
    team,
    sponsors,
    tags,
    createdBy,
    featured
  } = req.body

  // Validation
  if (!title || !category || !location || !shortDescription || !fullDescription || !objectives) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      error: 'Title, category, location, short description, full description, and objectives are required'
    })
  }

  const activityData = {
    title,
    category,
    status: status || 'planned',
    startDate,
    endDate,
    location,
    shortDescription,
    fullDescription,
    objectives: JSON.stringify(objectives),
    beneficiaries: beneficiaries || 0,
    budget,
    impact: impact ? JSON.stringify(impact) : null,
    images: images ? JSON.stringify(images) : null,
    videos: videos ? JSON.stringify(videos) : null,
    documents: documents ? JSON.stringify(documents) : null,
    team: team ? JSON.stringify(team) : null,
    sponsors: sponsors ? JSON.stringify(sponsors) : null,
    tags: tags ? JSON.stringify(tags) : null,
    createdBy,
    featured: featured || false
  }

  const newActivity = await insertActivity(activityData)

  return res.status(201).json({
    success: true,
    message: 'Activity created successfully',
    data: newActivity
  })
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { action } = req.query
  const { id } = req.body

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Activity ID is required'
    })
  }

  const activityId = parseInt(id)
  if (isNaN(activityId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid numeric ID is required'
    })
  }

  switch (action) {
    case 'publish':
      const { publish } = req.body
      const publishedActivity = await publishActivity(activityId, publish)

      return res.status(200).json({
        success: true,
        message: `Activity ${publish ? 'published' : 'unpublished'} successfully`,
        data: publishedActivity
      })

        case 'toggle-featured':
      const { featured: featuredStatus } = req.body
      const featuredActivity = await toggleFeaturedActivity(activityId, featuredStatus)

      return res.status(200).json({
        success: true,
        message: `Activity ${featuredStatus ? 'marked as featured' : 'removed from featured'} successfully`,
        data: featuredActivity
      })

    default:
      // Update activity
      const {
        title,
        category,
        status,
        startDate,
        endDate,
        location,
        shortDescription,
        fullDescription,
        objectives,
        beneficiaries,
        budget,
        impact,
        images,
        videos,
        documents,
        team,
        sponsors,
        tags,
        featured
      } = req.body

      const updateData: any = {}

      if (title) updateData.title = title
      if (category) updateData.category = category
      if (status) updateData.status = status
      if (startDate !== undefined) updateData.startDate = startDate
      if (endDate !== undefined) updateData.endDate = endDate
      if (location) updateData.location = location
      if (shortDescription) updateData.shortDescription = shortDescription
      if (fullDescription) updateData.fullDescription = fullDescription
      if (objectives) updateData.objectives = JSON.stringify(objectives)
      if (beneficiaries !== undefined) updateData.beneficiaries = beneficiaries
      if (budget !== undefined) updateData.budget = budget
      if (impact !== undefined) updateData.impact = impact ? JSON.stringify(impact) : null
      if (images !== undefined) updateData.images = images ? JSON.stringify(images) : null
      if (videos !== undefined) updateData.videos = videos ? JSON.stringify(videos) : null
      if (documents !== undefined) updateData.documents = documents ? JSON.stringify(documents) : null
      if (team !== undefined) updateData.team = team ? JSON.stringify(team) : null
      if (sponsors !== undefined) updateData.sponsors = sponsors ? JSON.stringify(sponsors) : null
      if (tags !== undefined) updateData.tags = tags ? JSON.stringify(tags) : null
      if (featured !== undefined) updateData.featured = featured

      const updatedActivity = await updateActivity(activityId, updateData)

      return res.status(200).json({
        success: true,
        message: 'Activity updated successfully',
        data: updatedActivity
      })
  }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: 'Valid ID is required'
    })
  }

  const activityId = parseInt(id)
  if (isNaN(activityId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid numeric ID is required'
    })
  }

  await deleteActivity(activityId)

  return res.status(200).json({
    success: true,
    message: 'Activity deleted successfully'
  })
}
