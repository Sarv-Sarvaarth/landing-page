import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
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
  Archive,
  DollarSign,
  TrendingUp,
  Award,
  Download,
  Share2,
  ExternalLink,
  Play,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// This would typically come from an API or database
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

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'team' | 'resources'>('overview')

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

  const nextImage = () => {
    if (project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  const CategoryIcon = getCategoryIcon(project.category)
  const completionPercentage = project.status === 'completed' ? 100 :
                             project.status === 'ongoing' ? 75 :
                             project.status === 'paused' ? 50 : 25

  return (
    <>
      <Head>
        <title>{project.title} - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content={project.shortDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.shortDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sarvaarth.org/projects/${project.slug}`} />
        {project.images[0] && <meta property="og:image" content={project.images[0]} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.shortDescription} />
        {project.images[0] && <meta name="twitter:image" content={project.images[0]} />}
      </Head>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="ngo-container">
          <div className="flex items-center justify-between py-4">
            <Link href="/projects" className="flex items-center gap-2 text-ngo-blue hover:text-ngo-blue-light transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share Project
              </Button>
              <Button size="sm" className="bg-ngo-orange hover:bg-ngo-orange-light">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="ngo-section bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="ngo-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${getStatusColor(project.status)} text-sm`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {project.category.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ngo-blue mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <div className="text-sm">Duration</div>
                    <div className="font-medium">{project.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <div className="text-sm">Location</div>
                    <div className="font-medium">{project.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <div>
                    <div className="text-sm">Beneficiaries</div>
                    <div className="font-medium">{project.beneficiaries.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5" />
                  <div>
                    <div className="text-sm">Budget</div>
                    <div className="font-medium">{project.totalBudget}</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Project Progress</span>
                  <span className="text-ngo-blue font-medium">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-ngo-blue h-3 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-ngo-blue bg-opacity-10 text-ngo-blue rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Image Gallery */}
            <div>
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                {project.images.length > 0 ? (
                  <>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                      <div className="text-center">
                        <CategoryIcon className="w-20 h-20 text-ngo-blue opacity-50 mx-auto mb-3" />
                        <p className="text-gray-500">Project Image Placeholder</p>
                        <p className="text-sm text-gray-400">({currentImageIndex + 1} of {project.images.length})</p>
                      </div>
                    </div>
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <CategoryIcon className="w-20 h-20 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No images available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="ngo-section bg-white">
        <div className="ngo-container">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex flex-wrap gap-0">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'impact', label: 'Impact & Metrics', icon: TrendingUp },
                { id: 'team', label: 'Team & Partners', icon: Users },
                { id: 'resources', label: 'Resources', icon: FileText }
              ].map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-ngo-blue text-ngo-blue bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-none">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Objectives */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-ngo-blue" />
                        Project Objectives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-ngo-blue bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-ngo-blue">{index + 1}</span>
                            </div>
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Key Achievements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-600" />
                        Key Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {project.keyAchievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Challenges & Lessons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          Challenges
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-600 mt-1">•</span>
                              <span className="text-sm text-gray-700">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          Lessons Learned
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {project.lessons.map((lesson, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span className="text-sm text-gray-700">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Project Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-ngo-blue" />
                        Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600">Start Date</div>
                          <div className="font-medium">{new Date(project.startDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</div>
                        </div>
                        {project.endDate && (
                          <div>
                            <div className="text-sm text-gray-600">End Date</div>
                            <div className="font-medium">{new Date(project.endDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-sm text-gray-600">Duration</div>
                          <div className="font-medium">{project.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Budget Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-ngo-blue" />
                        Budget
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-600">Total Budget</div>
                          <div className="text-lg font-bold text-ngo-blue">{project.totalBudget}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Funds Raised</div>
                          <div className="text-lg font-bold text-green-600">{project.fundsRaised}</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">100% Funded</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-8">
                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project.impactMetrics.map((metric, index) => (
                    <Card key={index} className="text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-ngo-blue mb-2">{metric.value}</div>
                        <div className="font-medium text-gray-900 mb-2">{metric.metric}</div>
                        <div className="text-sm text-gray-600">{metric.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Impact Story */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      Impact Story
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      This project has created significant positive change in the communities we serve.
                      Through dedicated effort and community partnership, we have successfully achieved
                      our primary objectives and created lasting impact that will benefit generations to come.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-ngo-blue" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.team.map((member, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-ngo-blue bg-opacity-10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-ngo-blue" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{member}</div>
                            <div className="text-sm text-gray-600">Team Member</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Partners */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-ngo-orange" />
                      Partners & Collaborators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.partners.map((partner, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-ngo-orange rounded-full"></div>
                          <span className="text-gray-700">{partner}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-ngo-blue" />
                      Project Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-600">{doc.type}</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-ngo-orange" />
                      Related Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700">Project Media Coverage</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700">Partner Organization Website</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700">Government Policy Reference</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="ngo-section bg-gray-50">
        <div className="ngo-container">
          <h2 className="text-2xl font-bold text-center text-ngo-blue mb-8">Related Projects</h2>
          <div className="text-center">
            <p className="text-gray-600 mb-4">Explore similar projects in our portfolio</p>
            <Link href="/projects">
              <Button variant="outline" className="border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white">
                View All Projects
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // In a real application, you would fetch this from your API
  const projects = [
    'vision-restoration-initiative-phase-1',
    'rural-education-excellence-program',
    'clean-water-access-initiative',
    'women-empowerment-through-skills',
    'digital-health-network-pilot',
    'community-resilience-building'
  ]

  const paths = projects.map((slug) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: 'blocking' // Enable ISR for new projects
  }
}

// This function gets called at build time for each project
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  // In a real application, you would fetch this from your API
  // For now, we'll return a placeholder project
  const project: Project = {
    id: '1',
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
    slug,
    category: 'healthcare',
    status: 'completed',
    startDate: '2023-01-15',
    endDate: '2023-12-30',
    location: 'Delhi, Haryana, Punjab',
    description: 'This is a placeholder project description. In a real application, this would be fetched from your database or API based on the project slug.',
    shortDescription: 'A comprehensive project that has created significant impact in the community.',
    totalBudget: '₹25,00,000',
    fundsRaised: '₹25,00,000',
    beneficiaries: 2150,
    duration: '12 months',
    objectives: [
      'Achieve primary project goals',
      'Create sustainable impact',
      'Build community partnerships',
      'Deliver measurable results'
    ],
    keyAchievements: [
      'Successfully completed all planned activities',
      'Exceeded beneficiary targets',
      'Created lasting community impact',
      'Built strong partnership network'
    ],
    challenges: [
      'Initial community resistance',
      'Logistical difficulties',
      'Resource constraints',
      'Weather-related delays'
    ],
    lessons: [
      'Community engagement is crucial',
      'Flexibility in planning is important',
      'Strong partnerships ensure success',
      'Regular monitoring improves outcomes'
    ],
    partners: [
      'Government Department',
      'Local NGO Partners',
      'Community Organizations',
      'International Donors'
    ],
    team: [
      'Project Director',
      'Field Coordinator',
      'Community Liaison',
      'Technical Specialist'
    ],
    images: [
      '/assets/img/projects/placeholder-1.jpg',
      '/assets/img/projects/placeholder-2.jpg',
      '/assets/img/projects/placeholder-3.jpg'
    ],
    documents: [
      { name: 'Project Final Report', type: 'PDF', url: '/documents/final-report.pdf' },
      { name: 'Impact Assessment', type: 'PDF', url: '/documents/impact-assessment.pdf' },
      { name: 'Financial Summary', type: 'Excel', url: '/documents/financial-summary.xlsx' }
    ],
    tags: ['healthcare', 'community', 'impact', 'transformation'],
    impactMetrics: [
      { metric: 'Beneficiaries Served', value: '2,150', description: 'Total number of direct beneficiaries' },
      { metric: 'Success Rate', value: '95%', description: 'Percentage of successful outcomes' },
      { metric: 'Community Satisfaction', value: '98%', description: 'Community satisfaction rating' },
      { metric: 'Sustainability Score', value: '90%', description: 'Long-term sustainability rating' }
    ]
  }

  // Return 404 if project not found
  if (!project) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      project
    },
    revalidate: 3600 // Revalidate every hour
  }
}
