import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  Archive,
  Heart,
  BookOpen,
  Stethoscope,
  Building2,
  Home,
  Download,
  ExternalLink
} from 'lucide-react'

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
  publishedAt: string | null
  createdAt: string
}

interface ProjectDetailPageProps {
  project: Project | null
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )
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

  const parseImpactMetrics = (field: string | null): any[] => {
    if (!field) return []
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const parseDocuments = (field: string | null): any[] => {
    if (!field) return []
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'planned': { color: 'bg-gray-100 text-gray-800', label: 'Planned', icon: AlertCircle },
      'ongoing': { color: 'bg-blue-100 text-blue-800', label: 'Ongoing', icon: Clock },
      'completed': { color: 'bg-green-100 text-green-800', label: 'Completed', icon: CheckCircle2 },
      'paused': { color: 'bg-yellow-100 text-yellow-800', label: 'Paused', icon: Clock },
      'archived': { color: 'bg-gray-100 text-gray-800', label: 'Archived', icon: Archive }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'bg-gray-100 text-gray-800', label: status, icon: AlertCircle }
    const IconComponent = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    )
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
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const objectives = parseJsonField(project.objectives)
  const keyAchievements = parseJsonField(project.keyAchievements)
  const challenges = parseJsonField(project.challenges)
  const lessons = parseJsonField(project.lessons)
  const partners = parseJsonField(project.partners)
  const team = parseJsonField(project.team)
  const tags = parseJsonField(project.tags)
  const impactMetrics = parseImpactMetrics(project.impactMetrics)
  const documents = parseDocuments(project.documents)

  const CategoryIcon = getCategoryIcon(project.category)

  return (
    <>
      <Head>
        <title>{project.title} - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content={project.shortDescription} />
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

        <div className="relative ngo-container">
          <div className="max-w-4xl mx-auto">
            <Link href="/projects" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <CategoryIcon className="w-8 h-8 text-ngo-orange" />
              <Badge variant="outline" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                {project.category.replace('-', ' ').toUpperCase()}
              </Badge>
              {getStatusBadge(project.status)}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mb-8">
              {project.shortDescription}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{project.beneficiaries.toLocaleString()}</div>
                <div className="text-sm text-blue-100">Beneficiaries</div>
              </div>
              {project.totalBudget && (
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{project.totalBudget}</div>
                  <div className="text-sm text-blue-100">Total Budget</div>
                </div>
              )}
              {project.duration && (
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{project.duration}</div>
                  <div className="text-sm text-blue-100">Duration</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{formatDate(project.startDate).split(' ')[2]}</div>
                <div className="text-sm text-blue-100">Year Started</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="ngo-section">
        <div className="ngo-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-ngo-blue" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{project.fullDescription}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Objectives */}
              {objectives.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-ngo-blue" />
                      Project Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Key Achievements */}
              {keyAchievements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-ngo-orange" />
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {keyAchievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-ngo-orange mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Impact Metrics */}
              {impactMetrics.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Impact Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {impactMetrics.map((metric, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                          <div className="font-semibold text-gray-900 mb-1">{metric.metric}</div>
                          <div className="text-2xl font-bold text-ngo-blue mb-2">{metric.value}</div>
                          <div className="text-sm text-gray-600">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Challenges & Lessons */}
              {(challenges.length > 0 || lessons.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {challenges.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          Challenges Faced
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {lessons.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          Lessons Learned
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {lessons.map((lesson, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Team & Partners */}
              {(team.length > 0 || partners.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {team.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-ngo-blue" />
                          Project Team
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {team.map((member, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 mr-2 mb-2">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {partners.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-green-600" />
                          Partners
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {partners.map((partner, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 mr-2 mb-2">
                              {partner}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Documents */}
              {documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-gray-600" />
                      Project Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div>
                            <div className="font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-600">{doc.type}</div>
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
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Start Date</div>
                      <div className="text-sm text-gray-600">{formatDate(project.startDate)}</div>
                    </div>
                  </div>

                  {project.endDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">End Date</div>
                        <div className="text-sm text-gray-600">{formatDate(project.endDate)}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">{project.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Beneficiaries</div>
                      <div className="text-sm text-gray-600">{project.beneficiaries.toLocaleString()} people</div>
                    </div>
                  </div>

                  {project.totalBudget && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Total Budget</div>
                        <div className="text-sm text-gray-600">{project.totalBudget}</div>
                      </div>
                    </div>
                  )}

                  {project.fundsRaised && (
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Funds Raised</div>
                        <div className="text-sm text-gray-600">{project.fundsRaised}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              {tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Call to Action */}
              <Card className="bg-gradient-to-br from-ngo-blue to-ngo-blue-light text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Interested in Supporting?</h3>
                  <p className="text-blue-100 mb-4">Learn more about our work and how you can get involved.</p>
                  <div className="space-y-2">
                    <Link href="/donate" className="block">
                      <Button className="w-full bg-white text-ngo-blue hover:bg-gray-100">
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                    </Link>
                    <Link href="/volunteer" className="block">
                      <Button className="w-full bg-white text-ngo-blue hover:bg-gray-100">
                        <Users className="w-4 h-4 mr-2" />
                        Volunteer
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ProjectDetailPageProps> = async ({ params }) => {
  try {
    const { slug } = params!

    if (!slug || Array.isArray(slug)) {
      return { notFound: true }
    }

    // Import database function to avoid HTTP requests in serverless environment
    const { getProjectBySlug } = await import('@/src/db/queries/projects')

    // Fetch project by slug directly from database
    const project = await getProjectBySlug(slug)

    if (!project || !project.publishedAt) {
      return { notFound: true }
    }

    return {
      props: {
        project
      }
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return { notFound: true }
  }
}
