import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DonationMembershipForm from '@/components/forms/DonationMembershipForm'
import { Heart, Users, HandHeart, Globe, Award, ArrowRight, CheckCircle, Star, Shield, TrendingUp, Crown, UserPlus } from 'lucide-react'

export default function Membership() {
  const handleFormSuccess = () => {
    console.log('Membership form submitted successfully!')
  }

  const membershipBenefits = [
    {
      icon: Crown,
      title: 'Exclusive Access',
      description: 'Priority access to events, workshops, and special programs'
    },
    {
      icon: CheckCircle,
      title: 'Impact Reports',
      description: 'Detailed quarterly reports on foundation activities and impact'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Official membership certificate and recognition in annual reports'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with like-minded individuals passionate about social change'
    },
    {
      icon: Shield,
      title: 'Tax Benefits',
      description: 'Membership fee is eligible for tax deduction under Section 80G'
    },
    {
      icon: Heart,
      title: 'Direct Involvement',
      description: 'Opportunity to participate in decision-making processes'
    }
  ]

  const stats = [
    { number: '1000+', label: 'Active Members' },
    { number: '25+', label: 'States Represented' },
    { number: '50+', label: 'Events Organized' },
    { number: '5+', label: 'Years of Service' }
  ]

  const membershipProcess = [
    {
      step: '1',
      title: 'Fill Application',
      description: 'Complete the membership form with your personal details'
    },
    {
      step: '2',
      title: 'Pay Membership Fee',
      description: 'Pay ₹1000 annual membership fee via UPI, Net Banking, or Cash'
    },
    {
      step: '3',
      title: 'Verification',
      description: 'We verify your application and payment details'
    },
    {
      step: '4',
      title: 'Welcome Package',
      description: 'Receive your membership certificate and welcome materials'
    }
  ]

  return (
    <>
      <Head>
        <title>Become a Member - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Join SARVAARTH & SEVAARTH FOUNDATION as an annual member. Get exclusive access to events, impact reports, and be part of our mission for social change. Membership fee: ₹1000 with tax benefits." />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Become a Member</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our community of changemakers and be part of our mission to transform lives.
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

      {/* Main Content - Form and Information Side by Side */}
      <section className="ngo-section bg-gray-50">
        <div className="ngo-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="order-2 lg:order-1">
              <DonationMembershipForm type="membership" onSuccess={handleFormSuccess} />
            </div>

            {/* Right Side - Information and Images */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Community Image Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-ngo-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-ngo-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Member Community Image</h3>
                    <p className="text-gray-500">Replace with member community photo</p>
                  </div>
                </div>
              </div>

              {/* Membership Plan */}
              <Card className="bg-white shadow-lg border-0 border-t-4 border-t-ngo-blue">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-ngo-blue">Annual Membership</CardTitle>
                  <CardDescription>Join our community for a full year</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-ngo-blue">₹1000</span>
                    <span className="text-gray-600 ml-2">per year</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-800 font-medium">Tax deductible under Section 80G</p>
                  </div>
                  <Button
                    className="w-full bg-ngo-blue hover:bg-ngo-blue-light"
                    onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Now
                  </Button>
                </CardContent>
              </Card>

              {/* Activities Image Placeholder */}
              <div className="aspect-[3/2] bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-ngo-orange bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HandHeart className="w-8 h-8 text-ngo-orange" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-1">Member Activities</h4>
                  <p className="text-gray-500 text-sm">Replace with member engagement activities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits Section */}
      <section className="ngo-section bg-white">
        <div className="ngo-container">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">Membership Benefits</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              Exclusive privileges and opportunities for our valued members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border-l-4 border-l-ngo-blue">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-ngo-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-ngo-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Membership Process Section */}
      <section className="ngo-section bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="ngo-container">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">How to Become a Member</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              Simple steps to join our community of changemakers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {membershipProcess.map((item, index) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Be part of a community that's making a real difference. Your membership helps us expand our reach and impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-ngo-orange hover:bg-ngo-orange-light px-8 py-3 transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Crown className="w-5 h-5 mr-2" />
              Become a Member
            </Button>
            <Link href="/donate">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
                <Heart className="w-5 h-5 mr-2" />
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
