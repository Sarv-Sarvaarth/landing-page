import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import VolunteerForm from '@/components/forms/VolunteerForm'
import { Heart, Users, HandHeart, Globe, Award, ArrowRight, CheckCircle, Star } from 'lucide-react'

interface VolunteerRole {
  id: number
  title: string
  description: string
  requirements: string[]
  skillsNeeded: string[]
  timeCommitment: string
  location: string
  isActive: boolean
  maxVolunteers: number | null
  currentVolunteers: number
}

interface VolunteerPageProps {
  volunteerRoles: VolunteerRole[]
}

export default function Volunteer({ volunteerRoles }: VolunteerPageProps) {
  const handleFormSuccess = () => {
    // Could add additional success handling here
    console.log('Volunteer form submitted successfully!')
  }

  const benefits = [
    {
      icon: Heart,
      title: 'Make a Real Impact',
      description: 'Directly contribute to improving lives in your community'
    },
    {
      icon: Users,
      title: 'Join a Community',
      description: 'Connect with like-minded individuals passionate about social change'
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Gain valuable experience and develop new skills'
    },
    {
      icon: Globe,
      title: 'Recognition',
      description: 'Receive certificates and recognition for your contributions'
    }
  ]

  // Use roles from database, fallback to static data if no roles available
  const displayRoles = volunteerRoles && volunteerRoles.length > 0 ? volunteerRoles : [
    {
      id: 0,
      title: 'General Volunteer',
      description: 'Help us with various activities and programs',
      requirements: [],
      skillsNeeded: [],
      timeCommitment: 'Flexible',
      location: 'Various',
      isActive: true,
      maxVolunteers: null,
      currentVolunteers: 0
    }
  ]

  const stats = [
    { number: '500+', label: 'Active Volunteers' },
    { number: '25+', label: 'States Covered' },
    { number: '10K+', label: 'Lives Impacted' },
    { number: '15+', label: 'Programs Running' }
  ]

  return (
    <>
      <Head>
        <title>Become a Volunteer - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Join our team of dedicated volunteers and make a meaningful difference in people's lives. Apply now to become part of our mission for social change." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-ngo-blue to-ngo-blue-light text-white overflow-hidden py-20"
        style={{
          backgroundImage: 'url(/assets/img/latest/male-working-as-paediatrician.jpg)',
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Become a Volunteer</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our mission to create positive change in society. Your skills and passion can make a real difference.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{stat.number}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Form and Image Side by Side */}
      <section className="ngo-section bg-gray-50">
        <div className="ngo-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="order-2 lg:order-1">
              <VolunteerForm onSuccess={handleFormSuccess} availableRoles={volunteerRoles} />
            </div>

            {/* Right Side - Image and Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Main Image Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-ngo-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-ngo-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Volunteer Image Placeholder</h3>
                    <p className="text-gray-500">Replace with actual volunteer team photo</p>
                  </div>
                </div>
              </div>

              {/* Why Volunteer with Us */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-ngo-blue mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-2" />
                    Why Volunteer with Us?
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => {
                      const IconComponent = benefit.icon
                      return (
                        <div key={index} className="flex items-start">
                          <div className="w-12 h-12 bg-ngo-blue bg-opacity-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-ngo-blue" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Small Image Placeholder */}
              <div className="aspect-[3/2] bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-ngo-orange bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HandHeart className="w-8 h-8 text-ngo-orange" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-1">Impact Photo</h4>
                  <p className="text-gray-500 text-sm">Replace with impact/success story image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="ngo-section bg-white">
        <div className="ngo-container">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">Volunteer Opportunities</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              Find the perfect way to contribute based on your skills and availability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayRoles.map((role) => (
              <Card key={role.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-ngo-blue">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-ngo-blue">{role.title}</h3>
                    {role.maxVolunteers && (
                      <span className="text-xs bg-ngo-blue text-white px-2 py-1 rounded">
                        {role.currentVolunteers}/{role.maxVolunteers}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <div className="space-y-2">
                    {role.timeCommitment && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 w-24">Commitment:</span>
                        <span className="text-gray-600">{role.timeCommitment}</span>
                      </div>
                    )}
                    {role.location && (
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-700 w-24">Location:</span>
                        <span className="text-gray-600">{role.location}</span>
                      </div>
                    )}
                    {role.skillsNeeded && role.skillsNeeded.length > 0 && (
                      <div className="flex items-start text-sm">
                        <span className="font-medium text-gray-700 w-24">Skills:</span>
                        <span className="text-gray-600">{role.skillsNeeded.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="ngo-section bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="ngo-container">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">How to Get Started</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              Simple steps to begin your volunteering journey with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply Online', description: 'Fill out the volunteer application form with your details' },
              { step: '2', title: 'Review Process', description: 'Our team will review your application and background' },
              { step: '3', title: 'Orientation', description: 'Attend orientation session to learn about our programs' },
              { step: '4', title: 'Start Volunteering', description: 'Begin making a difference in your chosen area' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-ngo-blue mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block mt-4">
                    <ArrowRight className="w-6 h-6 text-ngo-orange mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Every small action counts. Join us in creating positive change in society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-ngo-orange hover:bg-ngo-orange-light px-8 py-3 transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <HandHeart className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
                <Users className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<VolunteerPageProps> = async () => {
  try {
    // Fetch volunteer roles from the API
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = process.env.VERCEL_URL || 'localhost:3000'
    const response = await fetch(`${protocol}://${host}/api/volunteer-roles`)

    let volunteerRoles: VolunteerRole[] = []

    if (response.ok) {
      const result = await response.json()
      if (result.success) {
        volunteerRoles = result.data || []
      }
    }

    return {
      props: {
        volunteerRoles,
      },
    }
  } catch (error) {
    console.error('Error fetching volunteer roles:', error)

    // Return empty array on error - component will show fallback
    return {
      props: {
        volunteerRoles: [],
      },
    }
  }
}
