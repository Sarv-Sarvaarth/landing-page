import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Target,
  Heart,
  BookOpen,
  Stethoscope,
  Home,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  ArrowRight,
  Archive,
  TrendingUp,
  DollarSign,
  Award
} from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  category: 'healthcare' | 'education' | 'social-welfare' | 'community-development' | 'infrastructure'
  status: 'completed' | 'ongoing' | 'paused' | 'archived'
  startDate: string
  endDate?: string
  location: string
  description: string
  shortDescription: string
  totalBudget: string
  fundsRaised: string
  beneficiaries: number
  duration: string
  objectives: string[]
  keyAchievements: string[]
  challenges: string[]
  lessons: string[]
  partners: string[]
  team: string[]
  images: string[]
  documents: { name: string; type: string; url: string }[]
  tags: string[]
  impactMetrics: {
    metric: string
    value: string
    description: string
  }[]
}

interface ProjectsPageProps {
  initialProjects: Project[]
  initialStats: {
    total: number
    completed: number
    ongoing: number
    totalBeneficiaries: number
    totalBudget: number
  }
}

export default function Projects({ initialProjects, initialStats }: ProjectsPageProps) {
  // Helper function to safely parse JSON
  const safeJsonParse = (jsonString: string | null | undefined, fallback: any = []) => {
    if (!jsonString) return fallback
    try {
      return JSON.parse(jsonString)
    } catch (error) {
      console.error('Failed to parse JSON:', jsonString, error)
      return fallback
    }
  }

  // Convert database projects to frontend format
  const convertProjects = (dbProjects: any[]): Project[] => {
    return dbProjects.map(project => ({
      id: project.id.toString(),
      title: project.title,
      slug: project.slug,
      category: project.category as 'healthcare' | 'education' | 'social-welfare' | 'community-development' | 'infrastructure',
      status: project.status as 'completed' | 'ongoing' | 'paused' | 'archived',
      startDate: project.startDate,
      endDate: project.endDate,
      location: project.location,
      description: project.fullDescription,
      shortDescription: project.shortDescription,
      totalBudget: project.totalBudget || '₹0',
      fundsRaised: project.fundsRaised || '₹0',
      beneficiaries: project.beneficiaries,
      duration: project.duration || 'TBD',
      objectives: safeJsonParse(project.objectives, []),
      keyAchievements: safeJsonParse(project.keyAchievements, []),
      challenges: safeJsonParse(project.challenges, []),
      lessons: safeJsonParse(project.lessons, []),
      partners: safeJsonParse(project.partners, []),
      team: safeJsonParse(project.team, []),
      images: safeJsonParse(project.images, []),
      documents: safeJsonParse(project.documents, []),
      tags: safeJsonParse(project.tags, []),
      impactMetrics: safeJsonParse(project.impactMetrics, [])
    }))
  }

  // Convert projects immediately to avoid rendering raw database data
  const [projects, setProjects] = useState<Project[]>(() => convertProjects(initialProjects))
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const converted = convertProjects(initialProjects)
    setProjects(converted)
  }, [initialProjects])



  const categories = [
    { id: 'all', label: 'All Categories', icon: Target },
    { id: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'social-welfare', label: 'Social Welfare', icon: Heart },
    { id: 'community-development', label: 'Community Development', icon: Building2 },
    { id: 'infrastructure', label: 'Infrastructure', icon: Home }
  ]

  const statuses = [
    { id: 'all', label: 'All Status', icon: Target },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'ongoing', label: 'Ongoing', icon: Clock },
    { id: 'paused', label: 'Paused', icon: AlertCircle },
    { id: 'archived', label: 'Archived', icon: Archive }
  ]

  const years = [
    { id: 'all', label: 'All Years' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus

    const projectYear = new Date(project.startDate).getFullYear().toString()
    const matchesYear = selectedYear === 'all' || projectYear === selectedYear

    return matchesSearch && matchesCategory && matchesStatus && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
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

  const projectStats = initialStats

  return (
    <>
      <Head>
        <title>Our Projects Archive - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Explore our comprehensive project archive including completed, ongoing, and planned initiatives in healthcare, education, social welfare, and community development across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-ngo-blue to-ngo-blue-light text-white overflow-hidden py-20"
        style={{
          backgroundImage: 'url(/assets/img/background/page-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-ngo-blue bg-opacity-85"></div>

        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 opacity-20">
          <Image src="/assets/img/shapes/circle-yellow.png" alt="" width={64} height={64} className="w-16 h-16" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <Image src="/assets/img/shapes/heart.png" alt="" width={80} height={80} className="w-20 h-20" />
        </div>

        <div className="relative ngo-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-80" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Projects Archive</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              A comprehensive record of our journey in transforming communities across India
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{projectStats.total}</div>
                <div className="text-sm text-blue-100">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{projectStats.completed}</div>
                <div className="text-sm text-blue-100">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{projectStats.totalBeneficiaries.toLocaleString()}+</div>
                <div className="text-sm text-blue-100">Beneficiaries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">₹{(projectStats.totalBudget / 10000000).toFixed(1)}Cr</div>
                <div className="text-sm text-blue-100">Total Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="ngo-section bg-gray-50">
        <div className="ngo-container">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search projects by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-ngo-blue"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-ngo-blue text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-ngo-blue hover:text-ngo-blue'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => {
                  const IconComponent = status.icon
                  return (
                    <button
                      key={status.id}
                      onClick={() => setSelectedStatus(status.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                        selectedStatus === status.id
                          ? 'bg-ngo-orange text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-ngo-orange hover:text-ngo-orange'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {status.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Year
              </h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    className={`px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                      selectedYear === year.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600 hover:text-green-600'
                    }`}
                  >
                    {year.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-ngo-blue">{filteredProjects.length}</span> of{' '}
              <span className="font-semibold">{projects.length}</span> projects
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-8">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category)
              const completionPercentage = project.status === 'completed' ? 100 :
                                         project.status === 'ongoing' ? 75 :
                                         project.status === 'paused' ? 50 : 25

              return (
                <Card
                  key={project.id}
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                    {/* Project Image */}
                    <div className="lg:col-span-1">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                        <div className="text-center">
                          <CategoryIcon className="w-12 h-12 text-ngo-blue opacity-50 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Project Image</p>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-ngo-blue mb-2">{project.title}</h3>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getStatusColor(project.status)} text-xs`}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {project.category.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{project.shortDescription}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{project.startDate} - {project.endDate || 'Ongoing'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{project.beneficiaries.toLocaleString()} beneficiaries</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{project.totalBudget}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Project Progress</span>
                          <span className="text-ngo-blue font-medium">{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-ngo-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Actions */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        {/* Key Metrics */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                          <div className="space-y-2">
                            {project.impactMetrics.slice(0, 2).map((metric, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-sm text-gray-600">{metric.metric}:</span>
                                <span className="text-sm font-medium text-ngo-blue">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Link href={`/projects/${project.slug}`} className="block">
                            <Button className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white">
                              View Full Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full border-ngo-orange text-ngo-orange hover:bg-ngo-orange hover:text-white">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Impact Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedStatus('all')
                  setSelectedYear('all')
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async () => {
  try {
    // Fetch projects and stats from API
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const [projectsResponse, statsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/projects`),
      fetch(`${baseUrl}/api/projects?action=stats`)
    ])

    let projects = []
    let stats = {
      total: 0,
      completed: 0,
      ongoing: 0,
      totalBeneficiaries: 0,
      totalBudget: 0
    }

    if (projectsResponse.ok) {
      const projectsData = await projectsResponse.json()
      projects = projectsData.data?.projects || []
    }

    if (statsResponse.ok) {
      const statsData = await statsResponse.json()
      const dbStats = statsData.data || {}

      stats = {
        total: dbStats.publishedProjects || 0,
        completed: dbStats.completedProjects || 0,
        ongoing: dbStats.ongoingProjects || 0,
        totalBeneficiaries: dbStats.totalBeneficiaries || 0,
        totalBudget: dbStats.totalBudget || 0
      }
    }

    return {
      props: {
        initialProjects: projects,
        initialStats: stats
      }
    }
  } catch (error) {
    console.error('Error fetching projects data:', error)

    // Return empty data on error
    return {
      props: {
        initialProjects: [],
        initialStats: {
          total: 0,
          completed: 0,
          ongoing: 0,
          totalBeneficiaries: 0,
          totalBudget: 0
        }
      }
    }
  }
}
