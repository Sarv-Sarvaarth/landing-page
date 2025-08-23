import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AdminLayout from '@/components/layouts/AdminLayout'
import {
  Search,
  ArrowLeft,
  Heart,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  TrendingUp,
  RefreshCw,
  Calendar,
  Mail,
  CreditCard,
  IndianRupee
} from 'lucide-react'

interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

interface Donor {
  id: number
  email: string
  salutation: string
  fullName: string
  address: string
  panNumber: string
  aadhaarNumber: string
  occupation: string
  professionalDetails: string
  amount: number
  paymentMode: string
  status: string
  receiptFilename: string | null
  taxReceiptNumber: string | null
  taxReceiptIssued: boolean
  taxReceiptDate: string | null
  createdAt: string
  verifiedDate: string | null
  notes: string | null
  paymentReference: string | null
}

interface DonorsPageProps {
  user: AdminUser | null
}

export default function DonorsPage({ user }: DonorsPageProps) {
  const router = useRouter()
  const [donors, setDonors] = useState<Donor[]>([])
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    } else {
      fetchDonors()
    }
  }, [user, router])

  const fetchDonors = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/membership-donation?action=list-donations')
      if (response.ok) {
        const result = await response.json()
        setDonors(result.data.donations || [])
      } else {
        setError('Failed to fetch donors')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const filterDonors = useCallback(() => {
    let filtered = donors

    if (searchTerm) {
      filtered = filtered.filter(donor =>
        donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.amount.toString().includes(searchTerm)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(donor => donor.status === statusFilter)
    }

    setFilteredDonors(filtered)
  }, [donors, searchTerm, statusFilter])

  useEffect(() => {
    filterDonors()
  }, [donors, searchTerm, statusFilter, filterDonors])

  const updateDonorStatus = async (donorId: number, status: string, notes?: string) => {
    try {
      const response = await fetch('/api/admin/membership-donation?action=update-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: donorId,
          status,
          verifiedBy: user?.id,
          notes
        })
      })

      if (response.ok) {
        setSuccess(`Donation status updated to ${status}`)
        fetchDonors()
        setSelectedDonor(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update status')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const issueTaxReceipt = async (donorId: number) => {
    try {
      const response = await fetch('/api/admin/membership-donation?action=issue-tax-receipt', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: donorId })
      })

      if (response.ok) {
        setSuccess('Tax receipt issued successfully')
        fetchDonors()
      } else {
        setError('Failed to issue tax receipt')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending_verification': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      'payment_verified': { color: 'bg-blue-100 text-blue-800', label: 'Verified' },
      'approved': { color: 'bg-green-100 text-green-800', label: 'Approved' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN')
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN')
  }

  const totalDonationAmount = donors
    .filter(donor => donor.status === 'approved')
    .reduce((sum, donor) => sum + donor.amount, 0)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <AdminLayout user={user}>
      <Head>
        <title>Donors - Admin Dashboard</title>
        <meta name="description" content="Manage foundation donors and donations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Donors</h1>
              <p className="text-sm text-gray-600">Manage foundation donors and donations</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
            <Button variant="outline" size="sm" onClick={() => setError('')} className="ml-auto">
              Dismiss
            </Button>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{success}</p>
            <Button variant="outline" size="sm" onClick={() => setSuccess('')} className="ml-auto">
              Dismiss
            </Button>
          </div>
        )}

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, email, or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending_verification">Pending</option>
                <option value="payment_verified">Verified</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button onClick={fetchDonors} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold">{donors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold">₹{formatCurrency(totalDonationAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{donors.filter(d => d.status === 'pending_verification').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tax Receipts</p>
                  <p className="text-2xl font-bold">{donors.filter(d => d.taxReceiptIssued).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donors List */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Records</CardTitle>
            <CardDescription>
              {filteredDonors.length} of {donors.length} donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Loading donations...</p>
              </div>
            ) : filteredDonors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {donors.length === 0 ? 'No donations found.' : 'No donations match your search criteria.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDonors.map((donor) => (
                  <div key={donor.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {donor.salutation} {donor.fullName}
                          </h3>
                          {getStatusBadge(donor.status)}
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <IndianRupee className="w-3 h-3 mr-1" />
                            {formatCurrency(donor.amount)}
                          </Badge>
                          {donor.taxReceiptNumber && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              Receipt: {donor.taxReceiptNumber}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {donor.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            {donor.paymentMode}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(donor.createdAt)}
                          </div>
                          {donor.paymentReference && (
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Ref: {donor.paymentReference}
                            </div>
                          )}
                        </div>

                        <div className="text-sm text-gray-600">
                          <p><strong>Occupation:</strong> {donor.occupation}</p>
                          <p className="mt-1"><strong>Professional Details:</strong> {donor.professionalDetails.substring(0, 100)}{donor.professionalDetails.length > 100 ? '...' : ''}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDonor(donor)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {donor.status === 'pending_verification' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateDonorStatus(donor.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateDonorStatus(donor.id, 'rejected')}
                              className="text-red-600 hover:text-red-700"
                            >
                              Reject
                            </Button>
                          </>
                        )}

                        {donor.receiptFilename && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/uploads/${donor.receiptFilename}`, '_blank')}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Receipt
                          </Button>
                        )}

                        {donor.status === 'approved' && !donor.taxReceiptIssued && (
                          <Button
                            size="sm"
                            onClick={() => issueTaxReceipt(donor.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Generate Tax Receipt
                          </Button>
                        )}

                        {donor.taxReceiptIssued && donor.taxReceiptNumber && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // TODO: Implement tax receipt download
                              alert(`Tax Receipt ${donor.taxReceiptNumber} - Download functionality to be implemented`)
                            }}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download Tax Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Donor Detail Modal */}
        {selectedDonor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Donation Details</CardTitle>
                <CardDescription>
                  {selectedDonor.salutation} {selectedDonor.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedDonor.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedDonor.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Donation Amount</label>
                      <p className="text-sm text-gray-900">₹{formatCurrency(selectedDonor.amount)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Payment Mode</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedDonor.paymentMode}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">PAN Number</label>
                      <p className="text-sm text-gray-900">{selectedDonor.panNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Donation Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedDonor.createdAt)}</p>
                    </div>
                    {selectedDonor.paymentReference && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Payment Reference</label>
                        <p className="text-sm text-gray-900">{selectedDonor.paymentReference}</p>
                      </div>
                    )}
                    {selectedDonor.taxReceiptNumber && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Tax Receipt Number</label>
                        <p className="text-sm text-gray-900">{selectedDonor.taxReceiptNumber}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <p className="text-sm text-gray-900">{selectedDonor.address}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Occupation</label>
                    <p className="text-sm text-gray-900">{selectedDonor.occupation}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Professional Details</label>
                    <p className="text-sm text-gray-900">{selectedDonor.professionalDetails}</p>
                  </div>

                  {selectedDonor.receiptFilename && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Receipt</label>
                      <p className="text-sm text-gray-900">{selectedDonor.receiptFilename}</p>
                    </div>
                  )}

                  {selectedDonor.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                      <p className="text-sm text-gray-900">{selectedDonor.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setSelectedDonor(null)}>
                    Close
                  </Button>

                  {selectedDonor.receiptFilename && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`/uploads/${selectedDonor.receiptFilename}`, '_blank')}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Payment Receipt
                    </Button>
                  )}

                  {selectedDonor.status === 'pending_verification' && (
                    <>
                      <Button
                        onClick={() => updateDonorStatus(selectedDonor.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateDonorStatus(selectedDonor.id, 'rejected')}
                        className="text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {selectedDonor.status === 'approved' && !selectedDonor.taxReceiptIssued && (
                    <Button
                      onClick={() => issueTaxReceipt(selectedDonor.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Tax Receipt
                    </Button>
                  )}

                  {selectedDonor.taxReceiptIssued && selectedDonor.taxReceiptNumber && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        // TODO: Implement tax receipt download
                        alert(`Tax Receipt ${selectedDonor.taxReceiptNumber} - Download functionality to be implemented`)
                      }}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Tax Receipt
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps<DonorsPageProps> = async ({ req }) => {
  try {
    // Check authentication
    const session = req.cookies['admin-session']
    let user: AdminUser | null = null

    if (session) {
      try {
        const sessionData = JSON.parse(decodeURIComponent(session))
        if (sessionData.role === 'admin') {
          user = {
            id: sessionData.userId,
            name: sessionData.name,
            email: sessionData.email,
            role: sessionData.role
          }
        }
      } catch (error) {
        // Invalid session
      }
    }

    // If not authenticated, redirect to login
    if (!user) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      }
    }

    return {
      props: {
        user,
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)

    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
}
