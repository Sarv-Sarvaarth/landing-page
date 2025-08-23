import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AdminLayout from '@/components/layouts/AdminLayout'
import {
  Search,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Users,
  Target,
  RefreshCw,
  Stethoscope,
  BookOpen,
  Heart,
  Building2
} from 'lucide-react'

interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

interface Activity {
  id: number
  title: string
  category: string
  status: string
  startDate: string | null
  endDate: string | null
  location: string
  shortDescription: string
  fullDescription: string
  objectives: string
  beneficiaries: number
  budget: string | null
  impact: string | null
  images: string | null
  videos: string | null
  documents: string | null
  team: string | null
  sponsors: string | null
  tags: string | null
  createdBy: number | null
  featured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: Date | null
}

interface ActivitiesPageProps {
  user: AdminUser | null
}

export default function ActivitiesPage({ user }: ActivitiesPageProps) {
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [publishedFilter, setPublishedFilter] = useState('all')
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    status: 'planned',
    startDate: '',
    endDate: '',
    location: '',
    shortDescription: '',
    fullDescription: '',
    objectives: '',
    beneficiaries: 0,
    budget: '',
    impact: '',
    team: '',
    sponsors: '',
    tags: '',
    featured: false
  })

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    } else {
      fetchActivities()
    }
  }, [user, router])

  const fetchActivities = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/activities')
      if (response.ok) {
        const result = await response.json()
        setActivities(result.data.activities || [])
      } else {
        setError('Failed to fetch activities')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const filterActivities = useCallback(() => {
    let filtered = activities

    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(activity => activity.category === categoryFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(activity => activity.status === statusFilter)
    }

    if (publishedFilter !== 'all') {
      if (publishedFilter === 'published') {
        filtered = filtered.filter(activity => activity.publishedAt !== null)
      } else {
        filtered = filtered.filter(activity => activity.publishedAt === null)
      }
    }

    setFilteredActivities(filtered)
  }, [activities, searchTerm, categoryFilter, statusFilter, publishedFilter])

  useEffect(() => {
    filterActivities()
  }, [activities, searchTerm, categoryFilter, statusFilter, publishedFilter, filterActivities])

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      status: 'planned',
      startDate: '',
      endDate: '',
      location: '',
      shortDescription: '',
      fullDescription: '',
      objectives: '',
      beneficiaries: 0,
      budget: '',
      impact: '',
      team: '',
      sponsors: '',
      tags: '',
      featured: false
    })
    setEditingActivity(null)
    setShowForm(false)
  }

  const loadActivityToEdit = (activity: Activity) => {
    const objectives = activity.objectives ? JSON.parse(activity.objectives) : []
    const impact = activity.impact ? JSON.parse(activity.impact) : []
    const team = activity.team ? JSON.parse(activity.team) : []
    const sponsors = activity.sponsors ? JSON.parse(activity.sponsors) : []
    const tags = activity.tags ? JSON.parse(activity.tags) : []

    setFormData({
      title: activity.title,
      category: activity.category,
      status: activity.status,
      startDate: activity.startDate || '',
      endDate: activity.endDate || '',
      location: activity.location,
      shortDescription: activity.shortDescription,
      fullDescription: activity.fullDescription,
      objectives: objectives.join('\n'),
      beneficiaries: activity.beneficiaries,
      budget: activity.budget || '',
      impact: impact.join('\n'),
      team: team.join('\n'),
      sponsors: sponsors.join('\n'),
      tags: tags.join(', '),
      featured: activity.featured
    })
    setEditingActivity(activity)
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
        category: formData.category,
        status: formData.status,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        location: formData.location,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        objectives: formData.objectives.split('\n').filter(o => o.trim()),
        beneficiaries: formData.beneficiaries,
        budget: formData.budget || null,
        impact: formData.impact ? formData.impact.split('\n').filter(i => i.trim()) : null,
        team: formData.team ? formData.team.split('\n').filter(t => t.trim()) : null,
        sponsors: formData.sponsors ? formData.sponsors.split('\n').filter(s => s.trim()) : null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : null,
        featured: formData.featured,
        createdBy: user?.id
      }

      const url = editingActivity
        ? `/api/admin/activities`
        : `/api/admin/activities`

      const method = editingActivity ? 'PUT' : 'POST'
      const body = editingActivity
        ? { id: editingActivity.id, ...payload }
        : payload

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setSuccess(editingActivity ? 'Activity updated successfully!' : 'Activity created successfully!')
        resetForm()
        fetchActivities()
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

  const togglePublished = async (activityId: number, currentlyPublished: boolean) => {
    try {
      const response = await fetch('/api/admin/activities?action=publish', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activityId,
          publish: !currentlyPublished
        })
      })

      if (response.ok) {
        setSuccess(`Activity ${!currentlyPublished ? 'published' : 'unpublished'} successfully`)
        fetchActivities()
      } else {
        setError('Failed to update publication status')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const toggleFeatured = async (activityId: number, currentlyFeatured: boolean) => {
    try {
      const response = await fetch('/api/admin/activities?action=toggle-featured', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activityId,
          featured: !currentlyFeatured
        })
      })

      if (response.ok) {
        setSuccess(`Activity ${!currentlyFeatured ? 'marked as featured' : 'removed from featured'} successfully`)
        fetchActivities()
      } else {
        setError('Failed to update featured status')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const deleteActivity = async (activityId: number) => {
    if (!confirm('Are you sure you want to delete this activity? This action cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/activities?id=${activityId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSuccess('Activity deleted successfully')
        fetchActivities()
        setSelectedActivity(null)
      } else {
        setError('Failed to delete activity')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'planned': { color: 'bg-gray-100 text-gray-800', label: 'Planned' },
      'upcoming': { color: 'bg-orange-100 text-orange-800', label: 'Upcoming' },
      'ongoing': { color: 'bg-blue-100 text-blue-800', label: 'Ongoing' },
      'completed': { color: 'bg-green-100 text-green-800', label: 'Completed' },
      'cancelled': { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healthcare': return Stethoscope
      case 'education': return BookOpen
      case 'social-welfare': return Heart
      case 'community-development': return Building2
      default: return Target
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set'
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
        <title>Activities - Admin Dashboard</title>
        <meta name="description" content="Manage foundation activities and programs" />
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
              <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
              <p className="text-sm text-gray-600">Manage foundation activities and programs</p>
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

        {/* Action Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-ngo-blue hover:bg-ngo-blue-light"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? 'Cancel' : 'Add New Activity'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingActivity ? 'Edit Activity' : 'Create New Activity'}</CardTitle>
              <CardDescription>
                {editingActivity ? 'Update the activity details' : 'Add a new activity to your foundation'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Free Eye Surgery Camp"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="social-welfare">Social Welfare</SelectItem>
                        <SelectItem value="community-development">Community Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Dwarka, New Delhi"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beneficiaries">Number of Beneficiaries</Label>
                    <Input
                      id="beneficiaries"
                      type="number"
                      value={formData.beneficiaries}
                      onChange={(e) => setFormData({ ...formData, beneficiaries: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief description for activity cards..."
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description *</Label>
                  <Textarea
                    id="fullDescription"
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Detailed description of the activity..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Objectives (one per line) *</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    placeholder="Primary objective&#10;Secondary objective&#10;Additional goal"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g., ₹3,50,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="healthcare, eye-surgery, cataract"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact">Impact Statements (one per line)</Label>
                  <Textarea
                    id="impact"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    placeholder="150 successful surgeries performed&#10;95% success rate achieved&#10;Community health improved"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team">Team Members (one per line)</Label>
                    <Textarea
                      id="team"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      placeholder="Dr. Rajesh Kumar&#10;Nurse Anita Singh&#10;Volunteer Coordinator"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sponsors">Sponsors (one per line)</Label>
                    <Textarea
                      id="sponsors"
                      value={formData.sponsors}
                      onChange={(e) => setFormData({ ...formData, sponsors: e.target.value })}
                      placeholder="Local Eye Hospital&#10;Medical Association&#10;Community Donors"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Mark as Featured Activity</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (editingActivity ? 'Update Activity' : 'Create Activity')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="social-welfare">Social Welfare</option>
                <option value="community-development">Community Development</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="planned">Planned</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
              <Button onClick={fetchActivities} disabled={isLoading} size="sm">
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Target className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Total</p>
                  <p className="text-lg font-bold">{activities.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Eye className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Published</p>
                  <p className="text-lg font-bold">{activities.filter(a => a.publishedAt).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-6 w-6 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Featured</p>
                  <p className="text-lg font-bold">{activities.filter(a => a.featured).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Beneficiaries</p>
                  <p className="text-lg font-bold">{activities.reduce((sum, a) => sum + a.beneficiaries, 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities List */}
        <Card>
          <CardHeader>
            <CardTitle>Activities</CardTitle>
            <CardDescription>
              {filteredActivities.length} of {activities.length} activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Loading activities...</p>
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {activities.length === 0 ? 'No activities found. Create your first activity to get started.' : 'No activities match your search criteria.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => {
                  const CategoryIcon = getCategoryIcon(activity.category)
                  return (
                    <div key={activity.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CategoryIcon className="w-5 h-5 text-ngo-blue" />
                            <h3 className="font-semibold text-lg">{activity.title}</h3>
                            {getStatusBadge(activity.status)}
                            {activity.publishedAt && (
                              <Badge className="bg-green-50 text-green-700">
                                <Eye className="w-3 h-3 mr-1" />
                                Published
                              </Badge>
                            )}
                            {activity.featured && (
                              <Badge className="bg-yellow-50 text-yellow-700">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {activity.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {activity.beneficiaries} beneficiaries
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(activity.startDate)}
                            </div>
                            {activity.budget && (
                              <div className="flex items-center gap-2">
                                <span>💰</span>
                                {activity.budget}
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{activity.shortDescription}</p>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePublished(activity.id, !!activity.publishedAt)}
                            className={activity.publishedAt ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                          >
                            {activity.publishedAt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(activity.id, activity.featured)}
                            className={activity.featured ? "text-yellow-600 hover:text-yellow-700" : "text-gray-600 hover:text-gray-700"}
                          >
                            {activity.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadActivityToEdit(activity)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteActivity(activity.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Activity Details</CardTitle>
                <CardDescription>{selectedActivity.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedActivity.category.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedActivity.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedActivity.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Beneficiaries</label>
                      <p className="text-sm text-gray-900">{selectedActivity.beneficiaries.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Start Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedActivity.startDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">End Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedActivity.endDate)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Description</label>
                    <p className="text-sm text-gray-900">{selectedActivity.fullDescription}</p>
                  </div>

                  {parseJsonField(selectedActivity.objectives).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Objectives</label>
                      <ul className="text-sm text-gray-900 list-disc pl-5 space-y-1">
                        {parseJsonField(selectedActivity.objectives).map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {parseJsonField(selectedActivity.impact).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Impact</label>
                      <ul className="text-sm text-gray-900 list-disc pl-5 space-y-1">
                        {parseJsonField(selectedActivity.impact).map((impact, index) => (
                          <li key={index}>{impact}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {parseJsonField(selectedActivity.team).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Team</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedActivity.team).map((member, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedActivity.sponsors).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sponsors</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedActivity.sponsors).map((sponsor, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                            {sponsor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedActivity.tags).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedActivity.tags).map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                    Close
                  </Button>
                  <Button onClick={() => loadActivityToEdit(selectedActivity)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps<ActivitiesPageProps> = async ({ req }) => {
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
