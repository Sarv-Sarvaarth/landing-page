import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllMemberships,
  getAllDonations,
  getPendingVerifications,
  updateMembershipDonationStatus,
  issueTaxReceipt,
  getActiveMemberships,
  getMembershipDonationStats,
  searchMembershipDonation,
  getMembershipDonationById
} from '@/src/db/queries/membership-donation'

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
  // Only allow GET and PUT requests
  if (!['GET', 'PUT'].includes(req.method!)) {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: `${req.method} is not allowed`
    })
  }

  try {
    if (req.method === 'GET') {
      return await handleGetRequest(req, res)
    } else if (req.method === 'PUT') {
      return await handlePutRequest(req, res)
    }
  } catch (error) {
    console.error('Admin API error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process request'
    })
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { action, id, type, search, page = '1', limit = '50' } = req.query

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

      const record = await getMembershipDonationById(parseInt(id))
      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Record fetched successfully',
        data: record
      })

    case 'list-memberships':
      const memberships = await getAllMemberships(limitNum, offset)
      return res.status(200).json({
        success: true,
        message: 'Memberships fetched successfully',
        data: memberships
      })

    case 'list-donations':
      const donations = await getAllDonations(limitNum, offset)
      return res.status(200).json({
        success: true,
        message: 'Donations fetched successfully',
        data: donations
      })

    case 'pending-verifications':
      const pending = await getPendingVerifications()
      return res.status(200).json({
        success: true,
        message: 'Pending verifications fetched successfully',
        data: pending
      })

    case 'active-memberships':
      const active = await getActiveMemberships()
      return res.status(200).json({
        success: true,
        message: 'Active memberships fetched successfully',
        data: active
      })

    case 'stats':
      const stats = await getMembershipDonationStats()
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

      const searchType = type && !Array.isArray(type) ? type as 'membership' | 'donation' : undefined
      const searchResults = await searchMembershipDonation(search, searchType)

      return res.status(200).json({
        success: true,
        message: 'Search completed successfully',
        data: searchResults
      })

    default:
      return res.status(400).json({
        success: false,
        message: 'Invalid action',
        error: 'Valid actions: get-by-id, list-memberships, list-donations, pending-verifications, active-memberships, stats, search'
      })
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { action } = req.query
  const { id, status, verifiedBy, notes, paymentReference } = req.body

  if (!id || !action) {
    return res.status(400).json({
      success: false,
      message: 'ID and action are required'
    })
  }

  const recordId = parseInt(id)
  if (isNaN(recordId)) {
    return res.status(400).json({
      success: false,
      message: 'Valid numeric ID is required'
    })
  }

  switch (action) {
    case 'update-status':
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required'
        })
      }

      // First get the record to know its type
      const existingRecord = await getMembershipDonationById(recordId)
      if (!existingRecord) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        })
      }

      const additionalData: any = {}
      if (notes) additionalData.notes = notes
      if (paymentReference) additionalData.paymentReference = paymentReference
      additionalData.type = existingRecord.type // Pass type for membership logic

      const updatedRecord = await updateMembershipDonationStatus(
        recordId,
        status,
        verifiedBy,
        additionalData
      )

      return res.status(200).json({
        success: true,
        message: `Status updated to ${status} successfully`,
        data: updatedRecord
      })

    case 'issue-tax-receipt':
      const recordWithReceipt = await issueTaxReceipt(recordId)

      return res.status(200).json({
        success: true,
        message: 'Tax receipt issued successfully',
        data: recordWithReceipt
      })

    default:
      return res.status(400).json({
        success: false,
        message: 'Invalid action',
        error: 'Valid actions: update-status, issue-tax-receipt'
      })
  }
}
