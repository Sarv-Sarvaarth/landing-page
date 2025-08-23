import type { NextApiRequest, NextApiResponse } from 'next'
import { createVolunteer, getVolunteerByEmail } from '@/src/db/queries/volunteer'

interface VolunteerData {
  email: string
  salutation: string
  fullName: string
  address: string
  phoneNumber: string
  aadhaarNumber: string
  panNumber?: string
  occupation: string
  professionalDetails: string
  appliedRoleId?: number
  skills?: string[]
  availability?: string[]
  preferredRoles?: string[]
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

// Simple validation function
const validateVolunteerData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Email validation
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required')
  }

  // Required fields validation
  if (!data.salutation) errors.push('Salutation is required')
  if (!data.fullName || data.fullName.length < 2) {
    errors.push('Full name must be at least 2 characters')
  }
  if (!data.address || data.address.length < 10) {
    errors.push('Complete address is required')
  }

  // Phone number validation
  if (!data.phoneNumber || data.phoneNumber.length < 10) {
    errors.push('Valid phone number is required')
  }

  // PAN validation (optional)
  if (data.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber)) {
    errors.push('Valid PAN number format required (ABCDE1234F)')
  }

  // Aadhaar validation
  if (!data.aadhaarNumber || !/^[0-9]{12}$/.test(data.aadhaarNumber)) {
    errors.push('Valid 12-digit Aadhaar number is required')
  }

  // Occupation validation
  if (!data.occupation || data.occupation.length < 2) {
    errors.push('Occupation is required')
  }

  // Professional details validation
  if (!data.professionalDetails || data.professionalDetails.length < 20) {
    errors.push('Professional details must be at least 20 characters')
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
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are allowed'
    })
  }

  try {
    const volunteerData: VolunteerData = req.body

    // Log the received data for debugging
    console.log('Received volunteer registration data:', {
      email: volunteerData.email,
      fullName: volunteerData.fullName,
      occupation: volunteerData.occupation,
      timestamp: new Date().toISOString()
    })

    // Validate the data
    const validation = validateVolunteerData(volunteerData)

    if (!validation.isValid) {
      console.log('Validation errors:', validation.errors)
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: validation.errors.join(', ')
      })
    }

    // Check if volunteer already exists
    const existingVolunteer = await getVolunteerByEmail(volunteerData.email)
    if (existingVolunteer) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'A volunteer with this email address already exists. Please use a different email or contact us if you need to update your information.'
      })
    }

    // Prepare data for database insertion
    const volunteerRecord = {
      email: volunteerData.email,
      salutation: volunteerData.salutation,
      fullName: volunteerData.fullName,
      address: volunteerData.address,
      phoneNumber: volunteerData.phoneNumber,
      aadhaarNumber: volunteerData.aadhaarNumber, // Note: Should be encrypted in production
      panNumber: volunteerData.panNumber || null,
      occupation: volunteerData.occupation,
      professionalDetails: volunteerData.professionalDetails,
      appliedRoleId: volunteerData.appliedRoleId || null,
      skills: volunteerData.skills ? JSON.stringify(volunteerData.skills) : null,
      availability: volunteerData.availability ? JSON.stringify(volunteerData.availability) : null,
      preferredRoles: volunteerData.preferredRoles ? JSON.stringify(volunteerData.preferredRoles) : null,
      status: 'pending_review' as const,
    }

    // Save to database
    const savedVolunteer = await createVolunteer(volunteerRecord)

    // Log the successful registration (with masked sensitive data)
    console.log('Volunteer registration saved to database:', {
      id: savedVolunteer.id,
      email: savedVolunteer.email,
      fullName: savedVolunteer.fullName,
      occupation: savedVolunteer.occupation,
      status: savedVolunteer.status,
      applicationDate: savedVolunteer.applicationDate,
      appliedRoleId: savedVolunteer.appliedRoleId
    })

    // TODO: Send confirmation email
    // Example: await sendConfirmationEmail(volunteerData.email, savedVolunteer.id)

    // TODO: Notify admin team
    // Example: await notifyAdminTeam(savedVolunteer)

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Volunteer registration submitted successfully! We will review your application and contact you soon.',
      data: {
        registrationId: savedVolunteer.id,
        email: savedVolunteer.email,
        fullName: savedVolunteer.fullName,
        status: savedVolunteer.status,
        submittedAt: savedVolunteer.applicationDate,
        appliedRoleId: savedVolunteer.appliedRoleId
      }
    })

  } catch (error) {
    console.error('Error processing volunteer registration:', error)

    // Check if it's a database constraint error
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message
      if (errorMessage.includes('UNIQUE constraint failed')) {
        return res.status(409).json({
          success: false,
          message: 'Duplicate registration',
          error: 'This email address is already registered. Please use a different email.'
        })
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process volunteer registration. Please try again later.'
    })
  }
}
