import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getAllVolunteerRoles } from '@/src/db/queries/volunteer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AdminLayout from '@/components/layouts/AdminLayout'
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Settings,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  ArrowLeft
} from 'lucide-react'
import { VolunteerRole } from '@/src/types/volunteer'
import Link from 'next/link'

interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

interface VolunteerRolesPageProps {
  roles: VolunteerRole[]
  user: AdminUser | null
}

export default function VolunteerRolesPage({ roles: initialRoles, user }: VolunteerRolesPageProps) {
  const router = useRouter()
  const [roles, setRoles] = useState<VolunteerRole[]>(initialRoles)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingRole, setEditingRole] = useState<VolunteerRole | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Helper functions to safely parse JSON fields
  const parseArray = (field: string[] | string): string[] => {
    if (Array.isArray(field)) return field
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  }

  const getSkillsNeeded = (role: VolunteerRole): string[] => parseArray(role.skillsNeeded)
  const getRequirements = (role: VolunteerRole): string[] => parseArray(role.requirements)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    skillsNeeded: '',
    timeCommitment: '',
    location: '',
    isActive: true,
    maxVolunteers: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    }
  }, [user, router])

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      skillsNeeded: '',
      timeCommitment: '',
      location: '',
      isActive: true,
      maxVolunteers: ''
    })
    setEditingRole(null)
    setShowForm(false)
  }

  const loadRoleToEdit = (role: VolunteerRole) => {
    setFormData({
      title: role.title,
      description: role.description,
      requirements: getRequirements(role).join('\n'),
      skillsNeeded: getSkillsNeeded(role).join('\n'),
      timeCommitment: role.timeCommitment || '',
      location: role.location || '',
      isActive: role.isActive,
      maxVolunteers: role.maxVolunteers?.toString() || ''
    })
    setEditingRole(role)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        skillsNeeded: formData.skillsNeeded.split('\n').filter(s => s.trim()),
        timeCommitment: formData.timeCommitment || null,
        location: formData.location || null,
        isActive: formData.isActive,
        maxVolunteers: formData.maxVolunteers ? parseInt(formData.maxVolunteers) : null
      }

      const url = `/api/volunteer/roles`
      const method = editingRole ? 'PUT' : 'POST'
      const body = editingRole
        ? { id: editingRole.id, ...payload }
        : payload

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setSuccess(editingRole ? 'Role updated successfully!' : 'Role created successfully!')
        resetForm()
        // Refresh roles
        const rolesResponse = await fetch('/api/volunteer-roles')
        if (rolesResponse.ok) {
          const rolesResult = await rolesResponse.json()
          setRoles(rolesResult.data || [])
        }
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Operation failed')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role?')) return

    setIsLoading(true)
    try {
      // For now, we'll deactivate instead of delete
      const response = await fetch(`/api/volunteer/roles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: roleId, isActive: false })
      })

      if (response.ok) {
        setSuccess('Role deactivated successfully!')
        setRoles(roles.map(role =>
          role.id === roleId ? { ...role, isActive: false } : role
        ))
      } else {
        setError('Failed to deactivate role')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRoleStatus = async (roleId: number, currentStatus: boolean) => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/volunteer/roles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: roleId, isActive: !currentStatus })
      })

      if (response.ok) {
        const action = !currentStatus ? 'activated' : 'deactivated'
        setSuccess(`Role ${action} successfully!`)
        setRoles(roles.map(role =>
          role.id === roleId ? { ...role, isActive: !currentStatus } : role
        ))
      } else {
        setError('Failed to update role status')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <AdminLayout user={user}>
      <Head>
        <title>Volunteer Roles - Admin Dashboard</title>
        <meta name="description" content="Manage volunteer roles and opportunities" />
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
              <h1 className="text-2xl font-bold text-gray-900">Volunteer Roles</h1>
              <p className="text-sm text-gray-600">Manage volunteer opportunities and roles</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.filter(r => r.isActive).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roles.reduce((sum, role) => sum + role.currentVolunteers, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-ngo-blue hover:bg-ngo-blue-light"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? 'Cancel' : 'Add New Role'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</CardTitle>
              <CardDescription>
                {editingRole ? 'Update the volunteer role details' : 'Add a new volunteer role to your organization'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Role Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Medical Camp Volunteer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeCommitment">Time Commitment</Label>
                    <Input
                      id="timeCommitment"
                      value={formData.timeCommitment}
                      onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
                      placeholder="e.g., Weekends (6-8 hours)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role and responsibilities..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements (one per line)</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Available on weekends&#10;Good communication skills&#10;Willingness to travel"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skillsNeeded">Skills Needed (one per line)</Label>
                    <Textarea
                      id="skillsNeeded"
                      value={formData.skillsNeeded}
                      onChange={(e) => setFormData({ ...formData, skillsNeeded: e.target.value })}
                      placeholder="Healthcare background&#10;Basic first aid&#10;Local language skills"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Remote, On-site, Various"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxVolunteers">Max Volunteers</Label>
                    <Input
                      id="maxVolunteers"
                      type="number"
                      value={formData.maxVolunteers}
                      onChange={(e) => setFormData({ ...formData, maxVolunteers: e.target.value })}
                      placeholder="Leave empty for unlimited"
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isActive">Status</Label>
                    <Select
                      value={formData.isActive.toString()}
                      onValueChange={(value) => setFormData({ ...formData, isActive: value === 'true' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (editingRole ? 'Update Role' : 'Create Role')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Roles List */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Roles</CardTitle>
            <CardDescription>Manage all volunteer roles in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-all ${
                  !role.isActive ? 'bg-gray-50 border-gray-300 opacity-75' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{role.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          role.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {role.isActive ? (
                            <>
                              <Eye className="w-3 h-3 inline mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 inline mr-1" />
                              Inactive
                            </>
                          )}
                        </span>
                        {role.maxVolunteers && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {role.currentVolunteers}/{role.maxVolunteers} volunteers
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{role.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <strong>Time:</strong> {role.timeCommitment || 'Not specified'}
                        </div>
                        <div>
                          <strong>Location:</strong> {role.location || 'Not specified'}
                        </div>
                        {getSkillsNeeded(role).length > 0 && (
                          <div className="md:col-span-2">
                            <strong>Skills:</strong> {getSkillsNeeded(role).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleRoleStatus(role.id, role.isActive)}
                        className={role.isActive ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                        title={role.isActive ? "Deactivate role" : "Activate role"}
                      >
                        {role.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadRoleToEdit(role)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(role.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {roles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No volunteer roles found. Create your first role to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps<VolunteerRolesPageProps> = async ({ req }) => {
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

    // Fetch roles directly from database
    const rolesData = await getAllVolunteerRoles(false) // Get all roles, both active and inactive

    // Process the roles the same way the API does
    const roles: VolunteerRole[] = rolesData.map(role => ({
      ...role,
      requirements: role.requirements ? JSON.parse(role.requirements) : [],
      skillsNeeded: role.skillsNeeded ? JSON.parse(role.skillsNeeded) : [],
      createdAt: role.createdAt,
      updatedAt: role.updatedAt ? role.updatedAt.toISOString() : null,
    }))

    return {
      props: {
        roles,
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
