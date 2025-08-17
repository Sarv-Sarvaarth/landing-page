import type { NextApiRequest, NextApiResponse } from 'next'

interface VolunteerData {
  email: string
  salutation: string
  fullName: string
  address: string
  panNumber: string
  aadhaarNumber: string
  occupation: string
  professionalDetails: string
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

  // PAN validation
  if (!data.panNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber)) {
    errors.push('Valid PAN number is required (format: ABCDE1234F)')
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

export default function handler(
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

    // Create volunteer record object (for now just structure the data)
    const volunteerRecord = {
      id: `VOL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: volunteerData.email,
      salutation: volunteerData.salutation,
      fullName: volunteerData.fullName,
      address: volunteerData.address,
      panNumber: volunteerData.panNumber,
      aadhaarNumber: volunteerData.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3'), // Mask for logging
      occupation: volunteerData.occupation,
      professionalDetails: volunteerData.professionalDetails,
      registrationDate: new Date().toISOString(),
      status: 'pending_review'
    }

    // Log the structured record (with masked sensitive data)
    console.log('Volunteer registration processed successfully:', {
      id: volunteerRecord.id,
      email: volunteerRecord.email,
      fullName: volunteerRecord.fullName,
      occupation: volunteerRecord.occupation,
      status: volunteerRecord.status,
      registrationDate: volunteerRecord.registrationDate
    })

    // TODO: In the future, save to database
    // Example: await saveVolunteerToDatabase(volunteerRecord)

    // TODO: Send confirmation email
    // Example: await sendConfirmationEmail(volunteerData.email, volunteerRecord.id)

    // TODO: Notify admin team
    // Example: await notifyAdminTeam(volunteerRecord)

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Volunteer registration submitted successfully! We will review your application and contact you soon.',
      data: {
        registrationId: volunteerRecord.id,
        email: volunteerRecord.email,
        fullName: volunteerRecord.fullName,
        status: volunteerRecord.status,
        submittedAt: volunteerRecord.registrationDate
      }
    })

  } catch (error) {
    console.error('Error processing volunteer registration:', error)
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process volunteer registration. Please try again later.'
    })
  }
}