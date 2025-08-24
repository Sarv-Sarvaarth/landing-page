import type { NextApiRequest, NextApiResponse } from 'next'
import { createContactMessage, getAllContactMessages, getContactMessagesStats } from '@/src/db/queries/contact'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type?: string
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

const validateContactData = (data: ContactFormData) => {
  const errors: string[] = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required')
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long')
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  if (data.phone && data.phone.trim() && !isValidPhone(data.phone)) {
    errors.push('Please provide a valid phone number')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPhone = (phone: string): boolean => {
  // Indian phone number validation (10 digits, optional +91)
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

const getClientInfo = (req: NextApiRequest) => {
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? (forwarded as string).split(',')[0] : req.connection.remoteAddress
  const userAgent = req.headers['user-agent'] || ''

  return { ip, userAgent }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method === 'POST') {
      const contactData: ContactFormData = req.body

      // Validate input data
      const validation = validateContactData(contactData)
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: validation.errors.join(', ')
        })
      }

      // Get client information
      const { ip, userAgent } = getClientInfo(req)

      // Prepare contact message data
      const messageData = {
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        phone: contactData.phone?.trim() || null,
        subject: contactData.subject.trim(),
        message: contactData.message.trim(),
        type: contactData.type || 'general',
        status: 'new',
        priority: 'normal',
        ipAddress: ip || null,
        userAgent: userAgent || null
      }

      // Save to database
      const savedMessage = await createContactMessage(messageData)

      return res.status(201).json({
        success: true,
        message: 'Thank you for contacting us! We have received your message and will get back to you soon.',
        data: {
          id: savedMessage.id,
          submittedAt: savedMessage.createdAt
        }
      })
    }

    if (req.method === 'GET') {
      const { action, page = '1', limit = '20', status, type, priority } = req.query

      if (action === 'stats') {
        const stats = await getContactMessagesStats()
        return res.status(200).json({
          success: true,
          message: 'Contact messages statistics retrieved successfully',
          data: stats
        })
      }

      // Get all contact messages (admin only - you might want to add auth here)
      const pageNum = parseInt(page as string)
      const limitNum = parseInt(limit as string)

      const result = await getAllContactMessages(
        pageNum,
        limitNum,
        status as string,
        type as string,
        priority as string
      )

      return res.status(200).json({
        success: true,
        message: 'Contact messages retrieved successfully',
        data: result
      })
    }

    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only GET and POST requests are allowed'
    })

  } catch (error) {
    console.error('Error in contact API:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process contact form submission'
    })
  }
}
