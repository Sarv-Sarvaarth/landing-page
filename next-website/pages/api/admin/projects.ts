import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllProjects,
  getProjectById,
  insertProject,
  updateProject,
  deleteProject,
  publishProject,
  toggleFeaturedProject,
  getProjectsStats,
  searchProjects
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
    console.error('Admin projects API error:', error)
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
    year,
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

      const project = await getProjectById(parseInt(id))
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Project fetched successfully',
        data: project
      })

    case 'stats':
      const stats = await getProjectsStats()
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

      const searchResults = await searchProjects(search, {
        category: category as string,
        status: status as string,
        year: year as string,
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
      // Get all projects with filters (including unpublished for admin)
      const projects = await getAllProjects({
        category: category as string,
        status: status as string,
        year: year as string,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        published: published === 'true' ? true : published === 'false' ? false : undefined,
        limit: limitNum,
        offset
      })

      return res.status(200).json({
        success: true,
        message: 'Projects fetched successfully',
        data: projects
      })
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const {
    title,
    slug,
    category,
    status,
    startDate,
    endDate,
    location,
    shortDescription,
    fullDescription,
    objectives,
    totalBudget,
    fundsRaised,
    beneficiaries,
    duration,
    keyAchievements,
    challenges,
    lessons,
    partners,
    team,
    images,
    documents,
    impactMetrics,
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

  const projectData = {
    title,
    slug,
    category,
    status: status || 'planned',
    startDate,
    endDate,
    location,
    shortDescription,
    fullDescription,
    objectives: JSON.stringify(objectives),
    totalBudget,
    fundsRaised,
    beneficiaries: beneficiaries || 0,
    duration,
    keyAchievements: keyAchievements ? JSON.stringify(keyAchievements) : null,
    challenges: challenges ? JSON.stringify(challenges) : null,
    lessons: lessons ? JSON.stringify(lessons) : null,
    partners: partners ? JSON.stringify(partners) : null,
    team: team ? JSON.stringify(team) : null,
    images: images ? JSON.stringify(images) : null,
    documents: documents ? JSON.stringify(documents) : null,
    impactMetrics: impactMetrics ? JSON.stringify(impactMetrics) : null,
    tags: tags ? JSON.stringify(tags) : null,
    createdBy,
    featured: featured || false
  }

  const newProject = await insertProject(projectData)

  return res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: newProject
  })
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { action } = req.query
  const { id } = req.body

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Project ID is required'
    })
  }

  const projectId = parseInt(id)
  if (isNaN(projectId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid numeric ID is required'
    })
  }

  switch (action) {
    case 'publish':
      const { publish } = req.body
      const publishedProject = await publishProject(projectId, publish)

      return res.status(200).json({
        success: true,
        message: `Project ${publish ? 'published' : 'unpublished'} successfully`,
        data: publishedProject
      })

    case 'toggle-featured':
      const { featured: featuredStatus } = req.body
      const featuredProject = await toggleFeaturedProject(projectId, featuredStatus)

      return res.status(200).json({
        success: true,
        message: `Project ${featuredStatus ? 'marked as featured' : 'removed from featured'} successfully`,
        data: featuredProject
      })

    default:
      // Update project
      const {
        title,
        slug,
        category,
        status,
        startDate,
        endDate,
        location,
        shortDescription,
        fullDescription,
        objectives,
        totalBudget,
        fundsRaised,
        beneficiaries,
        duration,
        keyAchievements,
        challenges,
        lessons,
        partners,
        team,
        images,
        documents,
        impactMetrics,
        tags,
        featured
      } = req.body

      const updateData: any = {}

      if (title) updateData.title = title
      if (slug !== undefined) updateData.slug = slug
      if (category) updateData.category = category
      if (status) updateData.status = status
      if (startDate !== undefined) updateData.startDate = startDate
      if (endDate !== undefined) updateData.endDate = endDate
      if (location) updateData.location = location
      if (shortDescription) updateData.shortDescription = shortDescription
      if (fullDescription) updateData.fullDescription = fullDescription
      if (objectives) updateData.objectives = JSON.stringify(objectives)
      if (totalBudget !== undefined) updateData.totalBudget = totalBudget
      if (fundsRaised !== undefined) updateData.fundsRaised = fundsRaised
      if (beneficiaries !== undefined) updateData.beneficiaries = beneficiaries
      if (duration !== undefined) updateData.duration = duration
      if (keyAchievements !== undefined) updateData.keyAchievements = keyAchievements ? JSON.stringify(keyAchievements) : null
      if (challenges !== undefined) updateData.challenges = challenges ? JSON.stringify(challenges) : null
      if (lessons !== undefined) updateData.lessons = lessons ? JSON.stringify(lessons) : null
      if (partners !== undefined) updateData.partners = partners ? JSON.stringify(partners) : null
      if (team !== undefined) updateData.team = team ? JSON.stringify(team) : null
      if (images !== undefined) updateData.images = images ? JSON.stringify(images) : null
      if (documents !== undefined) updateData.documents = documents ? JSON.stringify(documents) : null
      if (impactMetrics !== undefined) updateData.impactMetrics = impactMetrics ? JSON.stringify(impactMetrics) : null
      if (tags !== undefined) updateData.tags = tags ? JSON.stringify(tags) : null
      if (featured !== undefined) updateData.featured = featured

      const updatedProject = await updateProject(projectId, updateData)

      return res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject
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

  const projectId = parseInt(id)
  if (isNaN(projectId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid numeric ID is required'
    })
  }

  await deleteProject(projectId)

  return res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  })
}
