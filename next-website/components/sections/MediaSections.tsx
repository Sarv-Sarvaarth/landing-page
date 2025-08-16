import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Play, Download, FileText, Award, Camera, Video, Users, Heart, Eye, Calendar, ExternalLink } from 'lucide-react'

// Photo Gallery Data
const photoCategories = [
  { id: 'all', name: 'All Photos', count: 24 },
  { id: 'medical', name: 'Medical Camps', count: 8 },
  { id: 'education', name: 'Education', count: 6 },
  { id: 'social', name: 'Social Welfare', count: 5 },
  { id: 'events', name: 'Events', count: 5 }
]

const photos = [
  // Medical Camps
  { id: 1, src: '/assets/img/causes/cataract.jpeg', category: 'medical', title: 'Eye Surgery Camp', description: 'Free cataract surgery for underprivileged patients' },
  { id: 2, src: '/assets/img/causes/cause1.jpg', category: 'medical', title: 'Health Checkup', description: 'Community health screening program' },
  { id: 3, src: '/assets/img/causes/cause3.jpg', category: 'medical', title: 'Medical Support', description: 'Providing medical assistance to those in need' },
  { id: 4, src: '/assets/img/gallery/medical-camp-1.jpg', category: 'medical', title: 'Mobile Medical Unit', description: 'Bringing healthcare to remote areas' },
  { id: 5, src: '/assets/img/gallery/medical-camp-2.jpg', category: 'medical', title: 'Eye Examination', description: 'Professional eye care services' },
  { id: 6, src: '/assets/img/gallery/medical-camp-3.jpg', category: 'medical', title: 'Surgery Preparation', description: 'Pre-surgery consultation and care' },
  { id: 7, src: '/assets/img/gallery/medical-camp-4.jpg', category: 'medical', title: 'Post-Surgery Care', description: 'Recovery and follow-up treatment' },
  { id: 8, src: '/assets/img/gallery/medical-camp-5.jpg', category: 'medical', title: 'Community Outreach', description: 'Healthcare awareness programs' },

  // Education
  { id: 9, src: '/assets/img/gallery/education-1.jpg', category: 'education', title: 'School Infrastructure', description: 'Building better learning environments' },
  { id: 10, src: '/assets/img/gallery/education-2.jpg', category: 'education', title: 'Student Support', description: 'Providing educational resources' },
  { id: 11, src: '/assets/img/gallery/education-3.jpg', category: 'education', title: 'Teacher Training', description: 'Capacity building for educators' },
  { id: 12, src: '/assets/img/gallery/education-4.jpg', category: 'education', title: 'Digital Learning', description: 'Technology in rural education' },
  { id: 13, src: '/assets/img/gallery/education-5.jpg', category: 'education', title: 'Book Distribution', description: 'Free educational materials' },
  { id: 14, src: '/assets/img/gallery/education-6.jpg', category: 'education', title: 'Scholarship Program', description: 'Supporting deserving students' },

  // Social Welfare
  { id: 15, src: '/assets/img/gallery/social-1.jpg', category: 'social', title: 'Food Distribution', description: 'Meals for underprivileged families' },
  { id: 16, src: '/assets/img/gallery/social-2.jpg', category: 'social', title: 'Clothing Drive', description: 'Warm clothes for winter' },
  { id: 17, src: '/assets/img/gallery/social-3.jpg', category: 'social', title: 'Senior Care', description: 'Support for elderly citizens' },
  { id: 18, src: '/assets/img/gallery/social-4.jpg', category: 'social', title: 'Skill Development', description: 'Vocational training programs' },
  { id: 19, src: '/assets/img/gallery/social-5.jpg', category: 'social', title: 'Women Empowerment', description: 'Supporting women entrepreneurs' },

  // Events
  { id: 20, src: '/assets/img/gallery/group-volunteers-with-donation-box.jpg', category: 'events', title: 'Volunteer Gathering', description: 'Annual volunteer meet and celebration' },
  { id: 21, src: '/assets/img/gallery/event-1.jpg', category: 'events', title: 'Fundraising Gala', description: 'Community fundraising event' },
  { id: 22, src: '/assets/img/gallery/event-2.jpg', category: 'events', title: 'Awareness Campaign', description: 'Health awareness in communities' },
  { id: 23, src: '/assets/img/gallery/event-3.jpg', category: 'events', title: 'Partnership Event', description: 'Collaboration with local organizations' },
  { id: 24, src: '/assets/img/gallery/event-4.jpg', category: 'events', title: 'Award Ceremony', description: 'Recognizing outstanding volunteers' }
]

// Video Gallery Data
const videos = [
  { id: 1, title: 'Eye Surgery Success Stories', description: 'Testimonials from patients who received free cataract surgery', thumbnail: '/assets/img/video-thumbnails/eye-surgery.jpg', duration: '3:45', views: '2.1K' },
  { id: 2, title: 'Rural School Development', description: 'Transforming education in remote villages', thumbnail: '/assets/img/video-thumbnails/school.jpg', duration: '5:20', views: '1.8K' },
  { id: 3, title: 'Medical Camp Highlights', description: 'Free healthcare reaching underserved communities', thumbnail: '/assets/img/video-thumbnails/medical-camp.jpg', duration: '4:15', views: '3.2K' },
  { id: 4, title: 'Volunteer Training Program', description: 'Preparing our volunteers for community service', thumbnail: '/assets/img/video-thumbnails/training.jpg', duration: '6:30', views: '1.5K' },
  { id: 5, title: 'Impact Stories 2024', description: 'Year in review - our achievements and impact', thumbnail: '/assets/img/video-thumbnails/impact.jpg', duration: '7:45', views: '4.1K' },
  { id: 6, title: 'Foundation Anniversary', description: 'Celebrating milestones and future goals', thumbnail: '/assets/img/video-thumbnails/anniversary.jpg', duration: '4:50', views: '2.8K' }
]

// Documents/Credentials Data
const documents = [
  { id: 1, title: 'Annual Report 2024', description: 'Comprehensive overview of our activities and impact', type: 'PDF', size: '2.4 MB', icon: FileText, color: 'text-red-600' },
  { id: 2, title: 'Financial Transparency Report', description: 'Detailed financial statements and fund utilization', type: 'PDF', size: '1.8 MB', icon: FileText, color: 'text-blue-600' },
  { id: 3, title: 'Registration Certificate', description: 'Official NGO registration and legal documentation', type: 'PDF', size: '0.9 MB', icon: Award, color: 'text-green-600' },
  { id: 4, title: '12A & 80G Certificates', description: 'Tax exemption certificates for donors', type: 'PDF', size: '1.2 MB', icon: Award, color: 'text-purple-600' },
  { id: 5, title: 'Impact Assessment Report', description: 'Third-party evaluation of our programs', type: 'PDF', size: '3.1 MB', icon: FileText, color: 'text-orange-600' },
  { id: 6, title: 'Partnership Guidelines', description: 'Information for potential partners and collaborators', type: 'PDF', size: '1.5 MB', icon: FileText, color: 'text-indigo-600' }
]

export const MediaStatsSection = () => (
  <section className="ngo-section bg-gradient-to-br from-blue-50 to-orange-50">
    <div className="ngo-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-ngo-blue mb-2">200+</h3>
          <p className="text-gray-600">Photos</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-ngo-orange mb-2">25+</h3>
          <p className="text-gray-600">Videos</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">15+</h3>
          <p className="text-gray-600">Documents</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-purple-600 mb-2">50K+</h3>
          <p className="text-gray-600">Views</p>
        </div>
      </div>
    </div>
  </section>
)

export const PhotoGallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === activeCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredPhotos.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
  }

  return (
    <section className="ngo-section bg-white">
      <div className="ngo-container">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
          </div>
          <h2 className="ngo-heading">Photo Gallery</h2>
          <p className="ngo-text text-xl max-w-3xl mx-auto">
            Explore our journey through images - from medical camps to educational initiatives
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {photoCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-ngo-blue text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-3">
                      <Eye className="w-6 h-6 text-ngo-blue" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900 mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <Image
                src={filteredPhotos[currentImageIndex]?.src || ''}
                alt={filteredPhotos[currentImageIndex]?.title || ''}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-xl font-semibold mb-2">{filteredPhotos[currentImageIndex]?.title}</h3>
                <p className="text-gray-300">{filteredPhotos[currentImageIndex]?.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export const VideoGallerySection = () => (
  <section className="ngo-section relative overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
    }}
  >
    {/* Decorative shapes */}
    <div className="absolute top-20 right-20 opacity-15">
      <Image src="/assets/img/shapes/three-round-big-green.png" alt="" width={96} height={96} className="w-24 h-24" />
    </div>
    <div className="absolute bottom-20 left-20 opacity-15">
      <Image src="/assets/img/shapes/circle-with-line-green.png" alt="" width={80} height={80} className="w-20 h-20" />
    </div>

    <div className="ngo-container relative">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">Video Gallery</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          Watch our impact in action - stories of transformation and hope
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <Card key={video.id} className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div className="relative aspect-video overflow-hidden group cursor-pointer">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={400}
                height={225}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg text-ngo-blue">{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{video.views} views</span>
                <Button variant="outline" size="sm" className="hover:bg-ngo-blue hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

export const DocumentsSection = () => (
  <section className="ngo-section bg-white">
    <div className="ngo-container">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">Documents & Credentials</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          Access our official documents, reports, and certificates for transparency
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {documents.map((doc) => {
          const IconComponent = doc.icon
          return (
            <Card key={doc.id} className="border-l-4 border-ngo-blue hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      doc.color === 'text-red-600' ? 'bg-red-100' :
                      doc.color === 'text-blue-600' ? 'bg-blue-100' :
                      doc.color === 'text-green-600' ? 'bg-green-100' :
                      doc.color === 'text-purple-600' ? 'bg-purple-100' :
                      doc.color === 'text-orange-600' ? 'bg-orange-100' :
                      'bg-indigo-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${doc.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">{doc.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{doc.description}</p>
                <Button className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Transparency Note */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-ngo-blue mb-4">Transparency & Accountability</h3>
          <p className="text-gray-700 leading-relaxed">
            We believe in complete transparency with our donors and stakeholders. All our financial reports,
            certificates, and operational documents are available for public access. We are committed to
            maintaining the highest standards of accountability in all our operations.
          </p>
        </div>
      </div>
    </div>
  </section>
)

export const MediaCTASection = () => (
  <section
    className="ngo-section relative text-white overflow-hidden"
    style={{
      backgroundImage: 'url(/assets/img/background/cta.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
  >
    <div className="absolute inset-0 bg-ngo-blue bg-opacity-90"></div>

    {/* Decorative shapes */}
    <div className="absolute top-10 left-10 opacity-20">
      <Image src="/assets/img/shapes/hand-glass.png" alt="" width={96} height={96} className="w-24 h-24" />
    </div>
    <div className="absolute bottom-10 right-10 opacity-20">
      <Image src="/assets/img/shapes/house-heart.png" alt="" width={80} height={80} className="w-20 h-20" />
    </div>

    <div className="ngo-container text-center relative">
      <div className="mb-6">
        <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-80" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">Share Your Story</h2>
      <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
        Have photos or videos from our events? We'd love to feature your perspective in our gallery.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact">
          <Button size="lg" className="bg-ngo-orange hover:bg-ngo-orange-light px-8 py-3 transform hover:scale-105 transition-all duration-200 shadow-lg">
            <Camera className="w-5 h-5 mr-2" />
            Submit Photos
          </Button>
        </Link>
        <Link href="/volunteer">
          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
            <Users className="w-5 h-5 mr-2" />
            Join Our Events
          </Button>
        </Link>
      </div>
    </div>
  </section>
)
