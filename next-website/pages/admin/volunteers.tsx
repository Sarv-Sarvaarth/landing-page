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
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  UserCheck,
  UserX,
  RefreshCw,
  Calendar,
  Mail,
  MapPin,
  Briefcase,
  Star
} from 'lucide-react'

interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

interface Volunteer {
  id: number
  email: string
  salutation: string
  fullName: string
  address: string
  aadhaarNumber: string
  panNumber: string | null
  occupation: string
  professionalDetails: string
  skills: string | null
  availability: string | null
  preferredRoles: string | null
  status: string
  applicationDate: string
  approvedDate: string | null
  appliedRoleId: number | null
  phoneNumber: string | null
  emergencyContact: string | null
  notes: string | null
  // Role information
  roleTitle: string | null
  roleDescription: string | null
  roleLocation: string | null
  roleTimeCommitment: string | null
}

interface VolunteersPageProps {
  user: AdminUser | null
}

export default function VolunteersPage({ user }: VolunteersPageProps) {
  const router = useRouter()
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    } else {
      fetchVolunteers()
    }
  }, [user, router])

  const fetchVolunteers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/volunteer/manage')
      if (response.ok) {
        const result = await response.json()
        setVolunteers(result.data || [])
      } else {
        setError('Failed to fetch volunteers')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const filterVolunteers = useCallback(() => {
    let filtered = volunteers

    if (searchTerm) {
      filtered = filtered.filter(volunteer =>
        volunteer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.occupation.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(volunteer => volunteer.status === statusFilter)
    }

    setFilteredVolunteers(filtered)
  }, [volunteers, searchTerm, statusFilter])

  useEffect(() => {
    filterVolunteers()
  }, [volunteers, searchTerm, statusFilter, filterVolunteers])

  const updateVolunteerStatus = async (volunteerId: number, status: string, notes?: string) => {
    try {
      const response = await fetch('/api/volunteer/manage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          id: volunteerId,
          status,
          approvedBy: user?.id,
          notes
        })
      })

      if (response.ok) {
        setSuccess(`Volunteer status updated to ${status}`)
        fetchVolunteers()
        setSelectedVolunteer(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update status')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending_review': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending Review' },
      'approved': { color: 'bg-green-100 text-green-800', label: 'Approved' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      'active': { color: 'bg-blue-100 text-blue-800', label: 'Active' },
      'inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inactive' }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN')
  }

  const parseJsonField = (field: string | null): string[] => {
    if (!field) return []
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <AdminLayout user={user}>
      <Head>
        <title>Volunteers - Admin Dashboard</title>
        <meta name="description" content="Manage volunteer applications and volunteers" />
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
              <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
              <p className="text-sm text-gray-600">Manage volunteer applications and active volunteers</p>
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
                    placeholder="Search by name, email, or occupation..."
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
                <option value="pending_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button onClick={fetchVolunteers} disabled={isLoading}>
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
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Volunteers</p>
                  <p className="text-2xl font-bold">{volunteers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold">{volunteers.filter(v => v.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold">{volunteers.filter(v => v.status === 'pending_review').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold">{volunteers.filter(v => v.status === 'approved').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Volunteers List */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Applications</CardTitle>
            <CardDescription>
              {filteredVolunteers.length} of {volunteers.length} volunteers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Loading volunteers...</p>
              </div>
            ) : filteredVolunteers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {volunteers.length === 0 ? 'No volunteers found.' : 'No volunteers match your search criteria.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {volunteer.salutation} {volunteer.fullName}
                          </h3>
                          {getStatusBadge(volunteer.status)}
                          {volunteer.roleTitle && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              <Briefcase className="w-3 h-3 mr-1" />
                              {volunteer.roleTitle}
                            </Badge>
                          )}
                          {parseJsonField(volunteer.skills).length > 0 && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700">
                              <Star className="w-3 h-3 mr-1" />
                              {parseJsonField(volunteer.skills).length} skills
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {volunteer.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {volunteer.occupation}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Applied: {formatDate(volunteer.applicationDate)}
                          </div>
                          {volunteer.phoneNumber && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {volunteer.phoneNumber}
                            </div>
                          )}
                        </div>

                        <div className="text-sm text-gray-600">
                          <p><strong>Professional Details:</strong> {volunteer.professionalDetails.substring(0, 150)}{volunteer.professionalDetails.length > 150 ? '...' : ''}</p>
                          {volunteer.roleTitle && (
                            <p className="mt-1"><strong>Applied Role:</strong> {volunteer.roleTitle}
                              {volunteer.roleLocation && ` (${volunteer.roleLocation})`}
                              {volunteer.roleTimeCommitment && ` - ${volunteer.roleTimeCommitment}`}
                            </p>
                          )}
                          {parseJsonField(volunteer.skills).length > 0 && (
                            <p className="mt-1"><strong>Skills:</strong> {parseJsonField(volunteer.skills).join(', ')}</p>
                          )}
                          {parseJsonField(volunteer.preferredRoles).length > 0 && (
                            <p className="mt-1"><strong>Preferred Roles:</strong> {parseJsonField(volunteer.preferredRoles).join(', ')}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedVolunteer(volunteer)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {volunteer.status === 'pending_review' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateVolunteerStatus(volunteer.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateVolunteerStatus(volunteer.id, 'rejected')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <UserX className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}

                        {volunteer.status === 'approved' && (
                          <Button
                            size="sm"
                            onClick={() => updateVolunteerStatus(volunteer.id, 'active')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Activate
                          </Button>
                        )}

                        {volunteer.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateVolunteerStatus(volunteer.id, 'inactive')}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            Deactivate
                          </Button>
                        )}

                        {volunteer.status === 'inactive' && (
                          <Button
                            size="sm"
                            onClick={() => updateVolunteerStatus(volunteer.id, 'active')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Reactivate
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

        {/* Volunteer Detail Modal */}
        {selectedVolunteer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Volunteer Details</CardTitle>
                <CardDescription>
                  {selectedVolunteer.salutation} {selectedVolunteer.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedVolunteer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedVolunteer.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="text-sm text-gray-900">{selectedVolunteer.phoneNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Occupation</label>
                      <p className="text-sm text-gray-900">{selectedVolunteer.occupation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Application Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedVolunteer.applicationDate)}</p>
                    </div>
                    {selectedVolunteer.approvedDate && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Approved Date</label>
                        <p className="text-sm text-gray-900">{formatDate(selectedVolunteer.approvedDate)}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <p className="text-sm text-gray-900">{selectedVolunteer.address}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Professional Details</label>
                    <p className="text-sm text-gray-900">{selectedVolunteer.professionalDetails}</p>
                  </div>

                  {selectedVolunteer.roleTitle && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Applied Role</label>
                      <div className="mt-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 text-sm">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {selectedVolunteer.roleTitle}
                        </Badge>
                        {selectedVolunteer.roleDescription && (
                          <p className="text-sm text-gray-600 mt-2">{selectedVolunteer.roleDescription}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {selectedVolunteer.roleLocation && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              <MapPin className="w-3 h-3 mr-1" />
                              {selectedVolunteer.roleLocation}
                            </Badge>
                          )}
                          {selectedVolunteer.roleTimeCommitment && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              <Clock className="w-3 h-3 mr-1" />
                              {selectedVolunteer.roleTimeCommitment}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedVolunteer.skills).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Skills</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedVolunteer.skills).map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedVolunteer.preferredRoles).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Preferred Roles</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedVolunteer.preferredRoles).map((role, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedVolunteer.availability).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Availability</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedVolunteer.availability).map((time, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedVolunteer.emergencyContact && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                      <p className="text-sm text-gray-900">{selectedVolunteer.emergencyContact}</p>
                    </div>
                  )}

                  {selectedVolunteer.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                      <p className="text-sm text-gray-900">{selectedVolunteer.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setSelectedVolunteer(null)}>
                    Close
                  </Button>
                  {selectedVolunteer.status === 'pending_review' && (
                    <>
                      <Button
                        onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'rejected')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}

                  {selectedVolunteer.status === 'approved' && (
                    <Button
                      onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'active')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Activate
                    </Button>
                  )}

                  {selectedVolunteer.status === 'active' && (
                    <Button
                      variant="outline"
                      onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'inactive')}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Deactivate
                    </Button>
                  )}

                  {selectedVolunteer.status === 'inactive' && (
                    <Button
                      onClick={() => updateVolunteerStatus(selectedVolunteer.id, 'active')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Reactivate
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

export const getServerSideProps: GetServerSideProps<VolunteersPageProps> = async ({ req }) => {
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
