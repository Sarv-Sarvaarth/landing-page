import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Eye, BookOpen, Users, Target, Calendar, Award } from 'lucide-react'

export const StatisticsSection = () => (
  <section
    className="ngo-section relative text-white overflow-hidden"
    style={{
      backgroundImage: 'url(/assets/img/background/counter-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
  >
    <div className="absolute inset-0 bg-ngo-blue bg-opacity-85"></div>

    <div className="ngo-container relative">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-80" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Our Commitment</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Since our foundation, we have been dedicated to serving those in need
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center group">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">1+</div>
            <div className="text-blue-100 font-medium">Years of Dedicated Service</div>
          </div>
        </div>
        <div className="text-center group">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">500</div>
            <div className="text-blue-100 font-medium">Target Cataract Surgeries in 5 Years</div>
          </div>
        </div>
        <div className="text-center group">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">1+</div>
            <div className="text-blue-100 font-medium">Project Completed</div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const HowToHelpSection = () => (
  <section className="ngo-section relative overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
    }}
  >
    <div className="ngo-container">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">How Could You Help?</h2>
        <p className="ngo-text text-xl max-w-4xl mx-auto">
          You can help our foundation in many ways like, If you are a qualified teacher then you can join our school,
          If you are a Doctor then you can join our mission for free health checkup camps & if you don't want to fully involved
          then simply you can donate for our schools or sponsor some patients for free Eye surgery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Become a Volunteer */}
        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
          <CardHeader className="text-center relative">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-ngo-blue font-bold">Become a Volunteer</CardTitle>
          </CardHeader>
          <CardContent className="text-center relative">
            <CardDescription className="text-gray-600 leading-relaxed mb-4">
              Join our mission as a volunteer for our ongoing & upcoming projects including medical camps, education programs, and environmental initiatives.
            </CardDescription>
            <Link href="/volunteer">
              <Button className="bg-ngo-blue hover:bg-ngo-blue-light">
                Join Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Fundraising */}
        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50"></div>
          <CardHeader className="text-center relative">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-ngo-orange font-bold">Quick Fundraising</CardTitle>
          </CardHeader>
          <CardContent className="text-center relative">
            <CardDescription className="text-gray-600 leading-relaxed mb-4">
              Help us raise funds quickly by encouraging your family & friends to support our cause and make a meaningful difference in people's lives.
            </CardDescription>
            <Link href="/donate">
              <Button className="bg-ngo-orange hover:bg-ngo-orange-light">
                Start Fundraising
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Start Donating */}
        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
          <CardHeader className="text-center relative">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-green-600 font-bold">Start Donating</CardTitle>
          </CardHeader>
          <CardContent className="text-center relative">
            <CardDescription className="text-gray-600 leading-relaxed mb-4">
              Start with as little as Rs 1/-. Simply scan our QR code and donate conveniently. Share your details via email for donation receipt.
            </CardDescription>
            <Link href="/donate">
              <Button className="bg-green-600 hover:bg-green-700">
                Donate Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
)

export const TeamSection = () => (
  <section className="ngo-section bg-white">
    <div className="ngo-container">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">Meet With Our Team</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          Our dedicated volunteers and team members work tirelessly to make a positive impact in the lives of those who need it most.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* President */}
        <div className="text-center group">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-ngo-blue to-ngo-blue-light rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-28 h-28 border-4 border-ngo-orange border-opacity-30 rounded-full mx-auto animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-ngo-blue mb-2">Ms. Meneka Singh</h3>
            <p className="text-ngo-orange font-semibold mb-4">President</p>
            <p className="text-gray-600 text-sm">
              The visionary founder who started this NGO with a compassionate heart to help those in need.
            </p>
          </div>
        </div>

        {/* Secretary */}
        <div className="text-center group">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-ngo-orange to-ngo-orange-light rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-28 h-28 border-4 border-ngo-blue border-opacity-30 rounded-full mx-auto animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-ngo-orange mb-2">Ms. Kusum Rathore</h3>
            <p className="text-ngo-blue font-semibold mb-4">Secretary</p>
            <p className="text-gray-600 text-sm">
              School Principal with extensive experience in education, dedicated to improving rural education quality.
            </p>
          </div>
        </div>

        {/* Vice President */}
        <div className="text-center group">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Eye className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-28 h-28 border-4 border-ngo-orange border-opacity-30 rounded-full mx-auto animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Mr. Manoj Singh</h3>
            <p className="text-ngo-blue font-semibold mb-4">Vice President</p>
            <p className="text-gray-600 text-sm">
              Owner of Sai Eye Care Hospital, Lucknow. Committed to providing free eye care services through our NGO.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const FAQSection = () => (
  <section className="ngo-section relative overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}
  >
    <div className="ngo-container">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">How can we help you?</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          If you have any questions about how we can support you or how our organization operates, find the answers below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h4 className="text-xl font-bold text-ngo-blue mb-4">How can I get help from your NGO?</h4>
          <p className="text-gray-600 leading-relaxed">
            We provide support to those in need through various programs. Please contact us through our website or visit our office for more information on how you can receive assistance.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h4 className="text-xl font-bold text-ngo-blue mb-4">What's Service We Provided?</h4>
          <p className="text-gray-600 leading-relaxed">
            We offer a variety of support services including medical assistance (free cataract surgeries), educational programs in rural areas, skill development, environmental initiatives, and social welfare activities.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h4 className="text-xl font-bold text-ngo-blue mb-4">How can I get involved with your NGO?</h4>
          <p className="text-gray-600 leading-relaxed">
            There are many ways to get involved including volunteering, donating, or spreading the word about our work. Visit our "Join Us" page or contact us directly for more details.
          </p>
        </div>
      </div>
    </div>
  </section>
)

export const ContactCTASection = () => (
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

    <div className="ngo-container text-center relative">
      <div className="mb-6">
        <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-80" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">Welcome To Save Lives And Make A Positive Impact</h2>
      <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
        Only when society comes together and contributes, we will be able to make a meaningful impact in the lives of those who need it most.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/donate">
          <Button size="lg" className="bg-ngo-orange hover:bg-ngo-orange-light px-8 py-3 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Donate Now
          </Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  </section>
)
