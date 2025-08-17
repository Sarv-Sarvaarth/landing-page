import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DonationMembershipForm from '@/components/forms/DonationMembershipForm'
import { Heart, Users, HandHeart, Globe, Award, ArrowRight, CheckCircle, Star, Shield, TrendingUp, Target } from 'lucide-react'

export default function Donate() {
  const handleFormSuccess = () => {
    console.log('Donation form submitted successfully!')
  }

  const impactAreas = [
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Free medical camps and surgeries',
      impact: '5000+ patients treated',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Users,
      title: 'Education',
      description: 'School infrastructure and scholarships',
      impact: '1200+ students supported',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: HandHeart,
      title: 'Social Welfare',
      description: 'Food distribution and skill development',
      impact: '3000+ families helped',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Globe,
      title: 'Community Development',
      description: 'Infrastructure and awareness programs',
      impact: '25+ villages transformed',
      color: 'bg-purple-100 text-purple-600'
    }
  ]

  const donationBenefits = [
    {
      icon: Shield,
      title: '80G Tax Benefits',
      description: 'Get 50% tax deduction on your donations under section 80G'
    },
    {
      icon: CheckCircle,
      title: 'Transparent Usage',
      description: 'Track how your donation is being used with our transparency reports'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Receive certificates and updates on the impact of your contribution'
    },
    {
      icon: Heart,
      title: 'Direct Impact',
      description: 'Your donation directly reaches those who need it most'
    }
  ]

  const quickAmounts = [500, 1000, 2500, 5000, 10000]

  const stats = [
    { number: '₹50L+', label: 'Donations Received' },
    { number: '2000+', label: 'Donors' },
    { number: '95%', label: 'Fund Utilization' },
    { number: '100%', label: 'Transparency' }
  ]

  return (
    <>
      <Head>
        <title>Make a Donation - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Support our mission with a donation. Help us provide healthcare, education, and social welfare services to underprivileged communities. 80G tax benefits available." />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Make a Donation</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Your contribution can transform lives. Support healthcare, education, and social welfare initiatives.
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
              <DonationMembershipForm type="donation" onSuccess={handleFormSuccess} />
            </div>

            {/* Right Side - Information and Images */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Impact Areas Image Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-ngo-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-ngo-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Impact Areas Image</h3>
                    <p className="text-gray-500">Replace with collage of impact areas</p>
                  </div>
                </div>
              </div>

              {/* Quick Donation Amounts */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-ngo-blue flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Quick Donation Amounts
                  </CardTitle>
                  <CardDescription>Choose a preset amount or enter your own</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white"
                        onClick={() => {
                          const form = document.querySelector('form')
                          const amountInput = form?.querySelector('input[id="donationAmount"]') as HTMLInputElement
                          if (amountInput) {
                            amountInput.value = amount.toString()
                            amountInput.dispatchEvent(new Event('input', { bubbles: true }))
                          }
                        }}
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Donation Benefits */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-ngo-blue mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Why Donate with Us?
                  </h3>
                  <div className="space-y-4">
                    {donationBenefits.map((benefit, index) => {
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

              {/* Success Stories Image Placeholder */}
              <div className="aspect-[3/2] bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-ngo-orange bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-ngo-orange" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-1">Success Stories</h4>
                  <p className="text-gray-500 text-sm">Replace with beneficiary success stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="ngo-section bg-white">
        <div className="ngo-container">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">Your Donation Impact Areas</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              See how your contribution makes a difference across various social initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${area.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-sm font-medium text-ngo-blue">{area.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
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
            <h2 className="ngo-heading">How Your Donation Works</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              Simple and transparent process from donation to impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Make Donation', description: 'Fill the form and make payment via UPI, Net Banking, or Cash' },
              { step: '2', title: 'Verification', description: 'We verify your payment and generate official receipt' },
              { step: '3', title: 'Fund Allocation', description: 'Your donation is allocated to the most needed programs' },
              { step: '4', title: 'Impact Updates', description: 'Receive regular updates on how your donation is creating impact' }
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Every Rupee Counts</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of donors who are making a real difference in people's lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-ngo-orange hover:bg-ngo-orange-light px-8 py-3 transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
            <Link href="/volunteer">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
                <Users className="w-5 h-5 mr-2" />
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
