import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Calendar, MapPin, Users, Target, Heart, Play, Download, Share2, ExternalLink } from 'lucide-react'

export interface Activity {
  id: string
  title: string
  category: 'healthcare' | 'education' | 'social-welfare' | 'community-development'
  status: 'completed' | 'ongoing' | 'upcoming' | 'planned'
  date: string
  location: string
  description: string
  fullDescription: string
  objectives: string[]
  beneficiaries: number
  impact: string[]
  images: string[]
  videos?: string[]
  documents?: { name: string; url: string }[]
  team: string[]
  budget?: string
  sponsors?: string[]
  tags: string[]
}

interface ActivityModalProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export default function ActivityModal({ activity, isOpen, onClose }: ActivityModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'media' | 'team'>('overview')

  if (!isOpen || !activity) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'healthcare': return 'bg-red-100 text-red-800'
      case 'education': return 'bg-blue-100 text-blue-800'
      case 'social-welfare': return 'bg-green-100 text-green-800'
      case 'community-development': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activity.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + activity.images.length) % activity.images.length)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-ngo-blue to-ngo-blue-light text-white">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                {activity.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                {activity.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{activity.title}</h2>
            <div className="flex items-center gap-4 mt-2 text-blue-100">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{activity.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{activity.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{activity.beneficiaries} beneficiaries</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Image Gallery */}
          {activity.images.length > 0 && (
            <div className="relative h-80 bg-gray-100">
              <Image
                src={activity.images[currentImageIndex]}
                alt={activity.title}
                width={800}
                height={320}
                className="w-full h-full object-cover"
              />
              {activity.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                  >
                    <X className="w-4 h-4 transform rotate-45" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                  >
                    <X className="w-4 h-4 transform -rotate-45" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {activity.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'impact', label: 'Impact', icon: Heart },
                { id: 'media', label: 'Media', icon: Play },
                { id: 'team', label: 'Team', icon: Users }
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
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{activity.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Objectives</h3>
                  <ul className="space-y-2">
                    {activity.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-ngo-blue mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activity.budget && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Budget</h3>
                    <p className="text-2xl font-bold text-ngo-blue">{activity.budget}</p>
                  </div>
                )}

                {activity.sponsors && activity.sponsors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Sponsors & Partners</h3>
                    <div className="flex flex-wrap gap-2">
                      {activity.sponsors.map((sponsor, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {sponsor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-ngo-blue mb-2">{activity.beneficiaries}</div>
                      <div className="text-gray-600">Beneficiaries</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-ngo-orange mb-2">{activity.team.length}</div>
                      <div className="text-gray-600">Team Members</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                      <div className="text-gray-600">Success Rate</div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact Achieved</h3>
                  <ul className="space-y-3">
                    {activity.impact.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Heart className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                {activity.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {activity.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image
                            src={image}
                            alt={`${activity.title} - Image ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activity.videos && activity.videos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activity.videos.map((video, index) => (
                        <div key={index} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600">Video {index + 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activity.documents && activity.documents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents</h3>
                    <div className="space-y-2">
                      {activity.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{doc.name}</span>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activity.team.map((member, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-ngo-blue to-ngo-blue-light rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="font-medium text-gray-900">{member}</h4>
                          <p className="text-sm text-gray-600">Team Member</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-ngo-blue bg-opacity-10 text-ngo-blue rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
