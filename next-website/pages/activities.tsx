import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import ActivityModal, { Activity } from '@/components/modals/ActivityModal'
import { Search, Filter, Calendar, MapPin, Users, Target, Heart, BookOpen, Stethoscope, Home, Building2, Clock, CheckCircle2, AlertCircle, Calendar as CalendarIcon } from 'lucide-react'

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Placeholder activities data - this would come from an API in real implementation
  const activities: Activity[] = [
    {
      id: '1',
      title: 'Free Eye Surgery Camp - Dwarka',
      category: 'healthcare',
      status: 'completed',
      date: 'March 15-17, 2024',
      location: 'Dwarka, New Delhi',
      description: 'Comprehensive eye surgery camp providing free cataract surgeries to underprivileged patients.',
      fullDescription: 'Our comprehensive eye surgery camp in Dwarka successfully provided free cataract surgeries to over 150 underprivileged patients. The three-day camp included pre-operative consultations, surgical procedures, and post-operative care. Working with local healthcare partners, we were able to restore vision for patients who had been suffering from cataracts for years. The camp also included educational sessions about eye care and prevention of common eye diseases.',
      objectives: [
        'Provide free cataract surgeries to underprivileged patients',
        'Conduct comprehensive eye examinations',
        'Educate community about eye care and prevention',
        'Follow up with post-operative care and support'
      ],
      beneficiaries: 150,
      impact: [
        '150 successful cataract surgeries performed',
        '300+ comprehensive eye examinations conducted',
        '95% success rate in vision restoration',
        'Community education reached 500+ people',
        'Established ongoing eye care support network'
      ],
      images: [
        '/assets/img/activities/eye-surgery-1.jpg',
        '/assets/img/activities/eye-surgery-2.jpg',
        '/assets/img/activities/eye-surgery-3.jpg',
        '/assets/img/activities/eye-surgery-4.jpg'
      ],
      videos: [
        '/assets/video/eye-surgery-testimonials.mp4'
      ],
      documents: [
        { name: 'Medical Camp Report.pdf', url: '/documents/eye-surgery-report.pdf' },
        { name: 'Patient Statistics.xlsx', url: '/documents/eye-surgery-stats.xlsx' }
      ],
      team: ['Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Nurse Anita Singh', 'Volunteer Coordinator Raj'],
      budget: '₹3,50,000',
      sponsors: ['Local Eye Hospital', 'Delhi Medical Association', 'Community Donors'],
      tags: ['healthcare', 'eye-surgery', 'cataract', 'dwarka', 'medical-camp']
    },
    {
      id: '2',
      title: 'Rural School Development Project',
      category: 'education',
      status: 'ongoing',
      date: 'January 2024 - December 2024',
      location: 'Rajasthan Villages',
      description: 'Comprehensive school infrastructure development and educational support in rural Rajasthan.',
      fullDescription: 'Our ongoing rural school development project is transforming educational opportunities in 5 villages across Rajasthan. The project includes infrastructure development, teacher training, digital learning setup, and student support programs. We are working closely with local communities to ensure sustainable impact and long-term educational growth.',
      objectives: [
        'Develop modern school infrastructure in 5 villages',
        'Train 25 local teachers in modern teaching methods',
        'Establish digital learning centers',
        'Provide scholarships to deserving students',
        'Create sustainable education support systems'
      ],
      beneficiaries: 800,
      impact: [
        '3 schools renovated with modern facilities',
        '15 teachers trained in digital teaching methods',
        '2 computer labs established',
        '50 scholarships awarded to deserving students',
        'Library with 1000+ books created'
      ],
      images: [
        '/assets/img/activities/school-dev-1.jpg',
        '/assets/img/activities/school-dev-2.jpg',
        '/assets/img/activities/school-dev-3.jpg'
      ],
      team: ['Education Coordinator Meera', 'Infrastructure Manager Amit', 'Teacher Trainer Sunita', 'Field Coordinator Ravi'],
      budget: '₹15,00,000',
      sponsors: ['Education Ministry Grant', 'Private Donors', 'Local Business Community'],
      tags: ['education', 'rural-development', 'schools', 'rajasthan', 'infrastructure']
    },
    {
      id: '3',
      title: 'Community Food Distribution Drive',
      category: 'social-welfare',
      status: 'completed',
      date: 'December 20-25, 2023',
      location: 'Multiple Delhi Locations',
      description: 'Large-scale food distribution program during winter months for homeless and underprivileged families.',
      fullDescription: 'Our winter food distribution drive successfully provided nutritious meals and food packages to homeless individuals and underprivileged families across Delhi. The 6-day program included daily meal distribution, essential food packages, warm clothing distribution, and health checkups. We partnered with local restaurants, volunteers, and healthcare providers to maximize impact.',
      objectives: [
        'Provide nutritious meals to homeless individuals',
        'Distribute essential food packages to families',
        'Offer warm clothing and blankets',
        'Conduct basic health checkups',
        'Connect beneficiaries with ongoing support services'
      ],
      beneficiaries: 1200,
      impact: [
        '7,200 meals distributed over 6 days',
        '500 food packages provided to families',
        '800 pieces of warm clothing distributed',
        '300 health checkups conducted',
        '150 families connected to ongoing support programs'
      ],
      images: [
        '/assets/img/activities/food-distribution-1.jpg',
        '/assets/img/activities/food-distribution-2.jpg',
        '/assets/img/activities/food-distribution-3.jpg'
      ],
      team: ['Social Worker Kavita', 'Volunteer Manager Suresh', 'Cook Team Lead Radha', 'Medical Officer Dr. Anil'],
      budget: '₹2,80,000',
      sponsors: ['Local Restaurants', 'Grocery Stores', 'Individual Donors'],
      tags: ['social-welfare', 'food-distribution', 'homeless', 'winter-relief', 'delhi']
    },
    {
      id: '4',
      title: 'Village Water Purification Project',
      category: 'community-development',
      status: 'upcoming',
      date: 'April 2024 - June 2024',
      location: 'Haryana Villages',
      description: 'Installation of water purification systems and sanitation facilities in rural Haryana villages.',
      fullDescription: 'Our upcoming village water purification project aims to provide clean drinking water and improved sanitation facilities to 8 villages in Haryana. The project includes installation of community water purification systems, individual household water filters, sanitation facility upgrades, and community education about water hygiene and health.',
      objectives: [
        'Install 8 community water purification systems',
        'Provide household water filters to 200 families',
        'Upgrade sanitation facilities in villages',
        'Conduct water hygiene education programs',
        'Establish maintenance and monitoring systems'
      ],
      beneficiaries: 2000,
      impact: [
        'Clean drinking water access for 2000+ people',
        'Reduced waterborne disease incidents expected',
        'Improved community health and hygiene',
        'Local employment through maintenance jobs',
        'Sustainable water management practices'
      ],
      images: [
        '/assets/img/activities/water-project-1.jpg',
        '/assets/img/activities/water-project-2.jpg'
      ],
      team: ['Water Engineer Prakash', 'Community Coordinator Rekha', 'Health Educator Mohan'],
      budget: '₹8,50,000',
      sponsors: ['Water Ministry Grant', 'International NGO Partnership', 'Corporate CSR Funds'],
      tags: ['community-development', 'water-purification', 'sanitation', 'haryana', 'health']
    },
    {
      id: '5',
      title: 'Digital Literacy Program for Women',
      category: 'education',
      status: 'planned',
      date: 'July 2024 - December 2024',
      location: 'Urban Slums, Delhi',
      description: 'Comprehensive digital literacy and skill development program for women in urban slum areas.',
      fullDescription: 'Our planned digital literacy program will empower women in urban slum areas with essential digital skills and online earning opportunities. The 6-month program includes basic computer training, smartphone usage, online banking, digital payment systems, and introduction to online work opportunities.',
      objectives: [
        'Train 300 women in basic digital literacy',
        'Introduce online earning opportunities',
        'Enable digital banking and payment usage',
        'Create sustainable skill development network',
        'Establish ongoing mentorship programs'
      ],
      beneficiaries: 300,
      impact: [
        'Digital literacy for 300+ women',
        'Increased earning potential through online work',
        'Financial inclusion through digital banking',
        'Reduced dependency on traditional employment',
        'Empowered community leadership'
      ],
      images: [
        '/assets/img/activities/digital-literacy-1.jpg'
      ],
      team: ['IT Trainer Nisha', 'Women Coordinator Deepa', 'Skill Development Officer Arjun'],
      budget: '₹4,20,000',
      sponsors: ['Tech Company CSR', 'Skill Development Ministry', 'Women Empowerment Foundation'],
      tags: ['education', 'digital-literacy', 'women-empowerment', 'skill-development', 'delhi']
    },
    {
      id: '6',
      title: 'Mobile Healthcare Van Service',
      category: 'healthcare',
      status: 'ongoing',
      date: 'February 2024 - January 2025',
      location: 'Remote Villages, UP',
      description: 'Mobile healthcare van providing medical services to remote villages with limited healthcare access.',
      fullDescription: 'Our mobile healthcare van service brings essential medical care directly to remote villages in Uttar Pradesh. The van is equipped with basic medical equipment, medicines, and staffed by qualified healthcare professionals. The service includes regular health checkups, vaccination programs, maternal health support, and emergency medical assistance.',
      objectives: [
        'Provide regular healthcare access to remote areas',
        'Conduct preventive health screenings',
        'Support maternal and child health programs',
        'Deliver vaccination and immunization services',
        'Create health awareness in communities'
      ],
      beneficiaries: 5000,
      impact: [
        '2000+ health consultations provided',
        '500+ vaccinations administered',
        '100+ maternal health consultations',
        '50+ emergency medical assists',
        'Health awareness reached 3000+ people'
      ],
      images: [
        '/assets/img/activities/mobile-healthcare-1.jpg',
        '/assets/img/activities/mobile-healthcare-2.jpg',
        '/assets/img/activities/mobile-healthcare-3.jpg'
      ],
      team: ['Dr. Mobile Unit Head Sanjay', 'Nurse Coordinator Pinki', 'Driver-Technician Ramesh'],
      budget: '₹12,00,000',
      sponsors: ['Healthcare Foundation', 'Government Health Department', 'Medical Equipment Donors'],
      tags: ['healthcare', 'mobile-service', 'rural-health', 'preventive-care', 'uttar-pradesh']
    }
  ]

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

  const activityStats = {
    total: activities.length,
    completed: activities.filter(a => a.status === 'completed').length,
    ongoing: activities.filter(a => a.status === 'ongoing').length,
    upcoming: activities.filter(a => a.status === 'upcoming').length + activities.filter(a => a.status === 'planned').length,
    totalBeneficiaries: activities.reduce((sum, a) => sum + a.beneficiaries, 0)
  }

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
