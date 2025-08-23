import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import ActivityModal, { Activity } from '@/components/modals/ActivityModal'
import { Search, Filter, Calendar, MapPin, Users, Target, Heart, BookOpen, Stethoscope, Home, Building2, Clock, CheckCircle2, AlertCircle, Calendar as CalendarIcon } from 'lucide-react'

interface ActivitiesPageProps {
  initialActivities: Activity[]
  initialStats: {
    total: number
    completed: number
    ongoing: number
    upcoming: number
    totalBeneficiaries: number
  }
}

export default function Activities({ initialActivities, initialStats }: ActivitiesPageProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  // Convert database activities to frontend format
  const convertActivities = (dbActivities: any[]): Activity[] => {
    return dbActivities.map(activity => ({
      id: activity.id.toString(),
      title: activity.title,
      category: activity.category,
      status: activity.status,
      date: activity.startDate && activity.endDate
        ? `${new Date(activity.startDate).toLocaleDateString('en-IN')} - ${new Date(activity.endDate).toLocaleDateString('en-IN')}`
        : activity.startDate
        ? new Date(activity.startDate).toLocaleDateString('en-IN')
        : 'Date TBD',
      location: activity.location,
      description: activity.shortDescription,
      fullDescription: activity.fullDescription,
      objectives: activity.objectives ? JSON.parse(activity.objectives) : [],
      beneficiaries: activity.beneficiaries,
      impact: activity.impact ? JSON.parse(activity.impact) : [],
      images: activity.images ? JSON.parse(activity.images) : [],
      videos: activity.videos ? JSON.parse(activity.videos) : [],
      documents: activity.documents ? JSON.parse(activity.documents) : [],
      team: activity.team ? JSON.parse(activity.team) : [],
      budget: activity.budget || '',
      sponsors: activity.sponsors ? JSON.parse(activity.sponsors) : [],
      tags: activity.tags ? JSON.parse(activity.tags) : []
    }))
  }

  useEffect(() => {
    const converted = convertActivities(initialActivities)
    setActivities(converted)
  }, [initialActivities])



  const categories = [
    { id: 'all', label: 'All Categories', icon: Target },
    { id: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'social-welfare', label: 'Social Welfare', icon: Heart },
    { id: 'community-development', label: 'Community Development', icon: Building2 }
  ]

  const statuses = [
    { id: 'all', label: 'All Status', icon: Target },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'ongoing', label: 'Ongoing', icon: Clock },
    { id: 'upcoming', label: 'Upcoming', icon: CalendarIcon },
    { id: 'planned', label: 'Planned', icon: AlertCircle }
  ]

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const openModal = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedActivity(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
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

  const activityStats = initialStats

  return (
    <>
      <Head>
        <title>Our Activities - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Explore our comprehensive range of healthcare, education, social welfare, and community development activities. See how we're making a difference in communities across India." />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Our Activities</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of initiatives transforming communities across India
            </p>

            {/* Activity Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{activityStats.total}</div>
                <div className="text-sm text-blue-100">Total Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{activityStats.completed}</div>
                <div className="text-sm text-blue-100">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{activityStats.ongoing}</div>
                <div className="text-sm text-blue-100">Ongoing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{activityStats.totalBeneficiaries.toLocaleString()}+</div>
                <div className="text-sm text-blue-100">Beneficiaries</div>
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
                placeholder="Search activities by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-ngo-blue"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
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

          {/* Status Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Filter by Status
            </h3>
            <div className="flex flex-wrap gap-3">
              {statuses.map((status) => {
                const IconComponent = status.icon
                return (
                  <button
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
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

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-ngo-blue">{filteredActivities.length}</span> of{' '}
              <span className="font-semibold">{activities.length}</span> activities
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => {
              const CategoryIcon = getCategoryIcon(activity.category)
              return (
                <Card
                  key={activity.id}
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  onClick={() => openModal(activity)}
                >
                  {/* Activity Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center border-b-2 border-gray-200">
                      <div className="text-center">
                        <CategoryIcon className="w-16 h-16 text-ngo-blue opacity-50 mx-auto mb-2" />
                        <p className="text-gray-500">Activity Image Placeholder</p>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-ngo-blue border border-ngo-blue">
                        {activity.category.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg text-ngo-blue group-hover:text-ngo-blue-light transition-colors">
                      {activity.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {activity.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{activity.beneficiaries} beneficiaries</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button
                        className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white group-hover:shadow-md transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(activity)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedStatus('all')
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Activity Modal */}
      <ActivityModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ActivitiesPageProps> = async () => {
  try {
    // Fetch activities and stats from API
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const [activitiesResponse, statsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/activities`),
      fetch(`${baseUrl}/api/activities?action=stats`)
    ])

    let activities = []
    let stats = {
      total: 0,
      completed: 0,
      ongoing: 0,
      upcoming: 0,
      totalBeneficiaries: 0
    }

    if (activitiesResponse.ok) {
      const activitiesData = await activitiesResponse.json()
      activities = activitiesData.data?.activities || []
    }

    if (statsResponse.ok) {
      const statsData = await statsResponse.json()
      const dbStats = statsData.data || {}

      stats = {
        total: dbStats.publishedActivities || 0,
        completed: dbStats.completedActivities || 0,
        ongoing: dbStats.ongoingActivities || 0,
        upcoming: dbStats.upcomingActivities || 0,
        totalBeneficiaries: dbStats.totalBeneficiaries || 0
      }
    }

    return {
      props: {
        initialActivities: activities,
        initialStats: stats
      }
    }
  } catch (error) {
    console.error('Error fetching activities data:', error)

    // Return empty data on error
    return {
      props: {
        initialActivities: [],
        initialStats: {
          total: 0,
          completed: 0,
          ongoing: 0,
          upcoming: 0,
          totalBeneficiaries: 0
        }
      }
    }
  }
}
