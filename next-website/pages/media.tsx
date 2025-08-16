import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Camera, Video, FileText, Award, Play, Download } from 'lucide-react'
import { MediaStatsSection, PhotoGallerySection, VideoGallerySection, DocumentsSection, MediaCTASection } from '@/components/sections/MediaSections'

export default function Media() {
  return (
    <>
      <Head>
        <title>Media Gallery - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Explore our photo gallery, video collection, and official documents. See the impact of SARVAARTH & SEVAARTH FOUNDATION through images, videos, and transparency reports." />
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
        <div className="absolute inset-0 bg-ngo-blue bg-opacity-80"></div>

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Media Gallery</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Witness our journey through photos, videos, and documents showcasing our impact
            </p>

            {/* Quick Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-6 py-3"
                onClick={() => document.getElementById('photo-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Camera className="w-5 h-5 mr-2" />
                Photo Gallery
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-6 py-3"
                onClick={() => document.getElementById('video-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Video className="w-5 h-5 mr-2" />
                Video Gallery
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-6 py-3"
                onClick={() => document.getElementById('documents')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <FileText className="w-5 h-5 mr-2" />
                Documents
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Statistics */}
      <MediaStatsSection />

      {/* Photo Gallery */}
      <div id="photo-gallery">
        <PhotoGallerySection />
      </div>

      {/* Video Gallery */}
      <div id="video-gallery">
        <VideoGallerySection />
      </div>

      {/* Documents & Credentials */}
      <div id="documents">
        <DocumentsSection />
      </div>

      {/* Media CTA */}
      <MediaCTASection />
    </>
  )
}
