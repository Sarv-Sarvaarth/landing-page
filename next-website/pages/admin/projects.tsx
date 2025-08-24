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
  Building2,
  Home,
  IndianRupee,
  Archive,
  Pause,
  AlertCircle
} from 'lucide-react'

interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

interface Project {
  id: number
  title: string
  slug: string
  category: string
  status: string
  startDate: string | null
  endDate: string | null
  location: string
  shortDescription: string
  fullDescription: string
  objectives: string
  totalBudget: string | null
  fundsRaised: string | null
  beneficiaries: number
  duration: string | null
  keyAchievements: string | null
  challenges: string | null
  lessons: string | null
  partners: string | null
  team: string | null
  images: string | null
  documents: string | null
  impactMetrics: string | null
  tags: string | null
  createdBy: number | null
  featured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: Date | null
}

interface ProjectsPageProps {
  user: AdminUser | null
}

export default function ProjectsPage({ user }: ProjectsPageProps) {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [publishedFilter, setPublishedFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    status: 'planned',
    startDate: '',
    endDate: '',
    location: '',
    shortDescription: '',
    fullDescription: '',
    objectives: '',
    totalBudget: '',
    fundsRaised: '',
    beneficiaries: 0,
    duration: '',
    keyAchievements: '',
    challenges: '',
    lessons: '',
    partners: '',
    team: '',
    impactMetrics: '',
    tags: '',
    featured: false
  })

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    } else {
      fetchProjects()
    }
  }, [user, router])



  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const result = await response.json()
        setProjects(result.data.projects || [])
      } else {
        setError('Failed to fetch projects')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjects = useCallback(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === categoryFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    if (publishedFilter !== 'all') {
      if (publishedFilter === 'published') {
        filtered = filtered.filter(project => project.publishedAt !== null)
      } else {
        filtered = filtered.filter(project => project.publishedAt === null)
      }
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, categoryFilter, statusFilter, publishedFilter])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, categoryFilter, statusFilter, publishedFilter, filterProjects])

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: '',
      status: 'planned',
      startDate: '',
      endDate: '',
      location: '',
      shortDescription: '',
      fullDescription: '',
      objectives: '',
      totalBudget: '',
      fundsRaised: '',
      beneficiaries: 0,
      duration: '',
      keyAchievements: '',
      challenges: '',
      lessons: '',
      partners: '',
      team: '',
      impactMetrics: '',
      tags: '',
      featured: false
    })
    setEditingProject(null)
    setShowForm(false)
  }

  const loadProjectToEdit = (project: Project) => {
    const objectives = project.objectives ? JSON.parse(project.objectives) : []
    const keyAchievements = project.keyAchievements ? JSON.parse(project.keyAchievements) : []
    const challenges = project.challenges ? JSON.parse(project.challenges) : []
    const lessons = project.lessons ? JSON.parse(project.lessons) : []
    const partners = project.partners ? JSON.parse(project.partners) : []
    const team = project.team ? JSON.parse(project.team) : []
    const impactMetrics = project.impactMetrics ? JSON.parse(project.impactMetrics) : []
    const tags = project.tags ? JSON.parse(project.tags) : []

    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      status: project.status,
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      location: project.location,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      objectives: objectives.join('\n'),
      totalBudget: project.totalBudget || '',
      fundsRaised: project.fundsRaised || '',
      beneficiaries: project.beneficiaries,
      duration: project.duration || '',
      keyAchievements: keyAchievements.join('\n'),
      challenges: challenges.join('\n'),
      lessons: lessons.join('\n'),
      partners: partners.join('\n'),
      team: team.join('\n'),
      impactMetrics: impactMetrics.map((m: any) => `${m.metric}: ${m.value} - ${m.description}`).join('\n'),
      tags: tags.join(', '),
      featured: project.featured
    })
    setEditingProject(project)
    setShowForm(true)
  }

  const parseImpactMetrics = (metricsText: string) => {
    if (!metricsText.trim()) return []

    return metricsText.split('\n').filter(line => line.trim()).map(line => {
      const parts = line.split(':')
      if (parts.length >= 2) {
        const metric = parts[0].trim()
        const rest = parts.slice(1).join(':').trim()
        const valueParts = rest.split(' - ')
        const value = valueParts[0].trim()
        const description = valueParts.slice(1).join(' - ').trim() || value

        return { metric, value, description }
      }
      return { metric: line.trim(), value: '', description: '' }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || undefined,
        category: formData.category,
        status: formData.status,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        location: formData.location,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        objectives: formData.objectives.split('\n').filter(o => o.trim()),
        totalBudget: formData.totalBudget || null,
        fundsRaised: formData.fundsRaised || null,
        beneficiaries: formData.beneficiaries,
        duration: formData.duration || null,
        keyAchievements: formData.keyAchievements ? formData.keyAchievements.split('\n').filter(a => a.trim()) : null,
        challenges: formData.challenges ? formData.challenges.split('\n').filter(c => c.trim()) : null,
        lessons: formData.lessons ? formData.lessons.split('\n').filter(l => l.trim()) : null,
        partners: formData.partners ? formData.partners.split('\n').filter(p => p.trim()) : null,
        team: formData.team ? formData.team.split('\n').filter(t => t.trim()) : null,
        impactMetrics: formData.impactMetrics ? parseImpactMetrics(formData.impactMetrics) : null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : null,
        featured: formData.featured,
        createdBy: user?.id
      }

      const url = `/api/admin/projects`
      const method = editingProject ? 'PUT' : 'POST'
      const body = editingProject
        ? { id: editingProject.id, ...payload }
        : payload

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setSuccess(editingProject ? 'Project updated successfully!' : 'Project created successfully!')
        resetForm()
        fetchProjects()
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

  const togglePublished = async (projectId: number, currentlyPublished: boolean) => {
    try {
      const response = await fetch('/api/admin/projects?action=publish', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: projectId,
          publish: !currentlyPublished
        })
      })

      if (response.ok) {
        setSuccess(`Project ${!currentlyPublished ? 'published' : 'unpublished'} successfully`)
        fetchProjects()
      } else {
        setError('Failed to update publication status')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const toggleFeatured = async (projectId: number, currentlyFeatured: boolean) => {
    try {
      const response = await fetch('/api/admin/projects?action=toggle-featured', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: projectId,
          featured: !currentlyFeatured
        })
      })

      if (response.ok) {
        setSuccess(`Project ${!currentlyFeatured ? 'marked as featured' : 'removed from featured'} successfully`)
        fetchProjects()
      } else {
        setError('Failed to update featured status')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const deleteProject = async (projectId: number) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/projects?id=${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSuccess('Project deleted successfully')
        fetchProjects()
        setSelectedProject(null)
      } else {
        setError('Failed to delete project')
      }
    } catch (error) {
      setError('Network error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'planned': { color: 'bg-gray-100 text-gray-800', label: 'Planned', icon: AlertCircle },
      'ongoing': { color: 'bg-blue-100 text-blue-800', label: 'Ongoing', icon: Clock },
      'completed': { color: 'bg-green-100 text-green-800', label: 'Completed', icon: CheckCircle },
      'paused': { color: 'bg-yellow-100 text-yellow-800', label: 'Paused', icon: Pause },
      'archived': { color: 'bg-gray-100 text-gray-800', label: 'Archived', icon: Archive }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800', label: status, icon: AlertCircle }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healthcare': return Stethoscope
      case 'education': return BookOpen
      case 'social-welfare': return Heart
      case 'community-development': return Building2
      case 'infrastructure': return Home
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

  const parseImpactMetricsField = (field: string | null): any[] => {
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
        <title>Projects - Admin Dashboard</title>
        <meta name="description" content="Manage foundation projects and initiatives" />
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
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-sm text-gray-600">Manage foundation projects and initiatives</p>
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
            {showForm ? 'Cancel' : 'Add New Project'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
              <CardDescription>
                {editingProject ? 'Update the project details' : 'Add a new project to your foundation'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Vision Restoration Initiative"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug (optional)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated if left empty"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 12 months"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="e.g., Delhi, Haryana, Punjab"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalBudget">Total Budget</Label>
                    <Input
                      id="totalBudget"
                      value={formData.totalBudget}
                      onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                      placeholder="e.g., ₹25,00,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fundsRaised">Funds Raised</Label>
                    <Input
                      id="fundsRaised"
                      value={formData.fundsRaised}
                      onChange={(e) => setFormData({ ...formData, fundsRaised: e.target.value })}
                      placeholder="e.g., ₹20,00,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief description for project cards..."
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
                    placeholder="Detailed description of the project..."
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
                    <Label htmlFor="keyAchievements">Key Achievements (one per line)</Label>
                    <Textarea
                      id="keyAchievements"
                      value={formData.keyAchievements}
                      onChange={(e) => setFormData({ ...formData, keyAchievements: e.target.value })}
                      placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">Challenges (one per line)</Label>
                    <Textarea
                      id="challenges"
                      value={formData.challenges}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      placeholder="Challenge 1&#10;Challenge 2&#10;Challenge 3"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lessons">Lessons Learned (one per line)</Label>
                    <Textarea
                      id="lessons"
                      value={formData.lessons}
                      onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                      placeholder="Lesson 1&#10;Lesson 2&#10;Lesson 3"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partners">Partners (one per line)</Label>
                    <Textarea
                      id="partners"
                      value={formData.partners}
                      onChange={(e) => setFormData({ ...formData, partners: e.target.value })}
                      placeholder="Partner Organization 1&#10;Partner Organization 2"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team">Team Members (one per line)</Label>
                    <Textarea
                      id="team"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      placeholder="Dr. John Doe - Project Director&#10;Jane Smith - Coordinator"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="healthcare, eye-care, surgery, rural-health"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impactMetrics">Impact Metrics (format: Metric: Value - Description)</Label>
                  <Textarea
                    id="impactMetrics"
                    value={formData.impactMetrics}
                    onChange={(e) => setFormData({ ...formData, impactMetrics: e.target.value })}
                    placeholder="Patients Treated: 2,150 - Total number of patients who received treatment&#10;Success Rate: 98% - Percentage of successful procedures"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Mark as Featured Project</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
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
                    placeholder="Search projects..."
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
                <option value="infrastructure">Infrastructure</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="planned">Planned</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="archived">Archived</option>
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
              <Button onClick={fetchProjects} disabled={isLoading} size="sm">
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
                  <p className="text-lg font-bold">{projects.length}</p>
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
                  <p className="text-lg font-bold">{projects.filter(p => p.publishedAt).length}</p>
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
                  <p className="text-lg font-bold">{projects.filter(p => p.featured).length}</p>
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
                  <p className="text-lg font-bold">{projects.reduce((sum, p) => sum + p.beneficiaries, 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              {filteredProjects.length} of {projects.length} projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {projects.length === 0 ? 'No projects found. Create your first project to get started.' : 'No projects match your search criteria.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => {
                  const CategoryIcon = getCategoryIcon(project.category)
                  return (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CategoryIcon className="w-5 h-5 text-ngo-blue" />
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            {getStatusBadge(project.status)}
                            {project.publishedAt && (
                              <Badge className="bg-green-50 text-green-700">
                                <Eye className="w-3 h-3 mr-1" />
                                Published
                              </Badge>
                            )}
                            {project.featured && (
                              <Badge className="bg-yellow-50 text-yellow-700">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {project.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {project.beneficiaries} beneficiaries
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(project.startDate)}
                            </div>
                            {project.totalBudget && (
                              <div className="flex items-center gap-2">
                                <IndianRupee className="w-4 h-4" />
                                {project.totalBudget}
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{project.shortDescription}</p>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePublished(project.id, !!project.publishedAt)}
                            className={project.publishedAt ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                          >
                            {project.publishedAt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(project.id, project.featured)}
                            className={project.featured ? "text-yellow-600 hover:text-yellow-700" : "text-gray-600 hover:text-gray-700"}
                          >
                            {project.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadProjectToEdit(project)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteProject(project.id)}
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

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>{selectedProject.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedProject.category.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedProject.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedProject.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Beneficiaries</label>
                      <p className="text-sm text-gray-900">{selectedProject.beneficiaries.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Start Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedProject.startDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">End Date</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedProject.endDate)}</p>
                    </div>
                    {selectedProject.totalBudget && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Total Budget</label>
                        <p className="text-sm text-gray-900">{selectedProject.totalBudget}</p>
                      </div>
                    )}
                    {selectedProject.fundsRaised && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Funds Raised</label>
                        <p className="text-sm text-gray-900">{selectedProject.fundsRaised}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Description</label>
                    <p className="text-sm text-gray-900">{selectedProject.fullDescription}</p>
                  </div>

                  {parseJsonField(selectedProject.objectives).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Objectives</label>
                      <ul className="text-sm text-gray-900 list-disc pl-5 space-y-1">
                        {parseJsonField(selectedProject.objectives).map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {parseJsonField(selectedProject.keyAchievements).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Key Achievements</label>
                      <ul className="text-sm text-gray-900 list-disc pl-5 space-y-1">
                        {parseJsonField(selectedProject.keyAchievements).map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {parseImpactMetricsField(selectedProject.impactMetrics).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Impact Metrics</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {parseImpactMetricsField(selectedProject.impactMetrics).map((metric, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="font-medium text-sm">{metric.metric}</div>
                            <div className="text-lg font-bold text-ngo-blue">{metric.value}</div>
                            <div className="text-xs text-gray-600">{metric.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedProject.team).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Team</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedProject.team).map((member, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedProject.partners).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Partners</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedProject.partners).map((partner, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseJsonField(selectedProject.tags).length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parseJsonField(selectedProject.tags).map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                  <Button onClick={() => loadProjectToEdit(selectedProject)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Project
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

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async ({ req }) => {
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
