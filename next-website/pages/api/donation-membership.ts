import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

interface DonationMembershipData {
  email: string
  salutation: string
  fullName: string
  address: string
  panNumber: string
  aadhaarNumber: string
  occupation: string
  professionalDetails: string
  role: 'member' | 'donor'
  donationAmount?: number
  paymentMode: 'cash' | 'upi' | 'netbanking'
  type: 'donation' | 'membership'
  receipt?: {
    filename: string
    originalFilename: string
    mimetype: string
    size: number
    filepath: string
  }
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

// Simple validation function
const validateData = (data: any): { isValid: boolean; errors: string[] } => {
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

  // Role validation
  if (!data.role || !['member', 'donor'].includes(data.role)) {
    errors.push('Valid role selection is required')
  }

  // Donation amount validation for donors
  if (data.role === 'donor' && (!data.donationAmount || data.donationAmount < 1)) {
    errors.push('Donation amount must be at least ₹1')
  }

  // Payment mode validation
  if (!data.paymentMode || !['cash', 'upi', 'netbanking'].includes(data.paymentMode)) {
    errors.push('Valid payment mode is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

const parseForm = (req: NextApiRequest): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => {
        return mimetype?.includes('image') || mimetype?.includes('pdf') || false
      }
    })

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ fields, files })
    })
  })
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
    // Parse form data including files
    const { fields, files } = await parseForm(req)

    // Convert fields to proper types
    const data: DonationMembershipData = {
      email: Array.isArray(fields.email) ? fields.email[0] : fields.email,
      salutation: Array.isArray(fields.salutation) ? fields.salutation[0] : fields.salutation,
      fullName: Array.isArray(fields.fullName) ? fields.fullName[0] : fields.fullName,
      address: Array.isArray(fields.address) ? fields.address[0] : fields.address,
      panNumber: Array.isArray(fields.panNumber) ? fields.panNumber[0] : fields.panNumber,
      aadhaarNumber: Array.isArray(fields.aadhaarNumber) ? fields.aadhaarNumber[0] : fields.aadhaarNumber,
      occupation: Array.isArray(fields.occupation) ? fields.occupation[0] : fields.occupation,
      professionalDetails: Array.isArray(fields.professionalDetails) ? fields.professionalDetails[0] : fields.professionalDetails,
      role: Array.isArray(fields.role) ? fields.role[0] : fields.role,
      donationAmount: fields.donationAmount ? Number(Array.isArray(fields.donationAmount) ? fields.donationAmount[0] : fields.donationAmount) : undefined,
      paymentMode: Array.isArray(fields.paymentMode) ? fields.paymentMode[0] : fields.paymentMode,
      type: Array.isArray(fields.type) ? fields.type[0] : fields.type
    }

    // Handle uploaded receipt file
    const receiptFile = files.receipt
    if (receiptFile) {
      const file = Array.isArray(receiptFile) ? receiptFile[0] : receiptFile
      data.receipt = {
        filename: path.basename(file.filepath),
        originalFilename: file.originalFilename || 'receipt',
        mimetype: file.mimetype || 'application/octet-stream',
        size: file.size,
        filepath: file.filepath
      }
    }

    // Log the received data for debugging
    console.log('Received donation/membership data:', {
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      type: data.type,
      paymentMode: data.paymentMode,
      donationAmount: data.donationAmount,
      hasReceipt: !!data.receipt,
      timestamp: new Date().toISOString()
    })

    // Validate the data
    const validation = validateData(data)

    if (!validation.isValid) {
      console.log('Validation errors:', validation.errors)
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: validation.errors.join(', ')
      })
    }

    // Create record object (for now just structure the data)
    const record = {
      id: `${data.role.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: data.type,
      email: data.email,
      salutation: data.salutation,
      fullName: data.fullName,
      address: data.address,
      panNumber: data.panNumber,
      aadhaarNumber: data.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3'), // Mask for logging
      occupation: data.occupation,
      professionalDetails: data.professionalDetails,
      role: data.role,
      amount: data.role === 'member' ? 1000 : data.donationAmount,
      paymentMode: data.paymentMode,
      receipt: data.receipt ? {
        filename: data.receipt.filename,
        originalFilename: data.receipt.originalFilename,
        size: data.receipt.size,
        mimetype: data.receipt.mimetype
      } : null,
      registrationDate: new Date().toISOString(),
      status: 'pending_verification'
    }

    // Log the structured record (with masked sensitive data)
    console.log(`${data.role === 'member' ? 'Membership' : 'Donation'} processed successfully:`, {
      id: record.id,
      type: record.type,
      email: record.email,
      fullName: record.fullName,
      role: record.role,
      amount: record.amount,
      paymentMode: record.paymentMode,
      hasReceipt: !!record.receipt,
      status: record.status,
      registrationDate: record.registrationDate
    })

    // TODO: In the future, save to database
    // Example: await saveDonationMembershipToDatabase(record)

    // TODO: Process payment verification
    // Example: await verifyPaymentReceipt(record)

    // TODO: Send confirmation email
    // Example: await sendConfirmationEmail(data.email, record)

    // TODO: Notify admin team
    // Example: await notifyAdminTeam(record)

    // TODO: Generate tax receipt (for donations)
    // Example: if (data.role === 'donor') await generateTaxReceipt(record)

    // Return success response
    const responseMessage = data.role === 'member'
      ? 'Membership application submitted successfully! We will verify your payment and activate your membership soon.'
      : 'Donation submitted successfully! Thank you for your generous contribution. We will send you a tax receipt after verification.'

    return res.status(200).json({
      success: true,
      message: responseMessage,
      data: {
        registrationId: record.id,
        email: record.email,
        fullName: record.fullName,
        type: record.type,
        role: record.role,
        amount: record.amount,
        paymentMode: record.paymentMode,
        status: record.status,
        submittedAt: record.registrationDate
      }
    })

  } catch (error) {
    console.error('Error processing donation/membership:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process your request. Please try again later.'
    })
  }
}
