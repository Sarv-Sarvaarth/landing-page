import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Heart, Phone, Mail, MapPin, Clock, Users, Award, Send, MessageCircle, Calendar } from 'lucide-react'

export const QuickStatsSection = () => (
  <section className="ngo-section bg-gray-50">
    <div className="ngo-container">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-ngo-blue mb-2">1+</h3>
          <p className="text-gray-600">Years Experience</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-ngo-orange mb-2">50+</h3>
          <p className="text-gray-600">Volunteers</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">1+</h3>
          <p className="text-gray-600">Projects Completed</p>
        </div>
      </div>
    </div>
  </section>
)

export const ContactFormSection = () => (
  <section className="ngo-section bg-white">
    <div className="ngo-container">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">Get In Touch</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 lg:p-10">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-ngo-blue rounded-full flex items-center justify-center mr-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-ngo-blue">Send us a message</h3>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                className="w-full min-h-[120px]"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white py-3">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Contact Details Cards */}
          <div className="space-y-6">
            {/* Phone Numbers */}
            <Card className="border-l-4 border-ngo-blue hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-ngo-blue rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-ngo-blue">Phone Numbers</CardTitle>
                    <CardDescription>Call us anytime</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">+ (91) 9313702100</p>
                  <p className="font-semibold text-gray-900">+ (91) 7011050120</p>
                </div>
              </CardContent>
            </Card>

            {/* Email Addresses */}
            <Card className="border-l-4 border-ngo-orange hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-ngo-orange rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-ngo-orange">Email Addresses</CardTitle>
                    <CardDescription>Send us an email</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">info@sarvaarth.in</p>
                  <p className="font-semibold text-gray-900">info.sarvaarth.sevaarth@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Office Address */}
            <Card className="border-l-4 border-green-600 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-green-600">Office Address</CardTitle>
                    <CardDescription>Visit us at our office</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <address className="not-italic text-gray-900 leading-relaxed">
                  <strong>RZF-756/48, RAJNAGAR-2, PALAM COLONY,</strong><br />
                  DWARKA SEC-8, NEW DELHI-110077<br />
                  <strong>INDIA</strong>
                </address>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-l-4 border-purple-600 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-600">Office Hours</CardTitle>
                    <CardDescription>When we're available</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-900"><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-900"><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-900"><strong>Sunday:</strong> Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const LeadershipContactSection = () => (
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
        <h2 className="ngo-heading">Our Leadership Team</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          Connect directly with our leadership team for specific inquiries or partnerships
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* President */}
        <Card className="text-center bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-ngo-blue to-ngo-blue-light rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-ngo-blue">Ms. Meneka Singh</CardTitle>
            <CardDescription className="text-ngo-orange font-semibold">President & Founder</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">
              For strategic partnerships, major donations, and organizational matters
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">Direct inquiries welcome</p>
            </div>
          </CardContent>
        </Card>

        {/* Secretary */}
        <Card className="text-center bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-ngo-orange to-ngo-orange-light rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-ngo-orange">Ms. Kusum Rathore</CardTitle>
            <CardDescription className="text-ngo-blue font-semibold">Secretary (School Principal)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">
              For education programs, school partnerships, and academic initiatives
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">Education sector expertise</p>
            </div>
          </CardContent>
        </Card>

        {/* Vice President */}
        <Card className="text-center bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-green-600">Mr. Manoj Singh</CardTitle>
            <CardDescription className="text-ngo-blue font-semibold">Vice President (Sai Eye Care Hospital)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4">
              For healthcare initiatives, medical camps, and eye care programs
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">Medical sector partnerships</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
)

export const LocationSection = () => (
  <section className="ngo-section bg-white">
    <div className="ngo-container">
      <div className="text-center mb-16">
        <div className="mb-4">
          <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
        </div>
        <h2 className="ngo-heading">Find Us</h2>
        <p className="ngo-text text-xl max-w-3xl mx-auto">
          Located in Dwarka, New Delhi - easily accessible by public transport
        </p>
      </div>

      <div className="bg-gray-100 rounded-2xl p-8 text-center">
        <div className="mb-6">
          <MapPin className="w-16 h-16 text-ngo-blue mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-ngo-blue mb-2">Visit Our Office</h3>
          <p className="text-gray-600">
            We welcome visitors during our office hours. Please call ahead to schedule important meetings.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Complete Address</h4>
          <address className="not-italic text-gray-700 leading-relaxed">
            <strong>SARVAARTH & SEVAARTH FOUNDATION</strong><br />
            RZF-756/48, RAJNAGAR-2, PALAM COLONY,<br />
            DWARKA SEC-8, NEW DELHI-110077<br />
            INDIA
          </address>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h5 className="font-semibold text-gray-900 mb-2">Getting Here</h5>
            <p className="text-sm text-gray-600">
              Nearest Metro: Dwarka Sector 8 Metro Station<br />
              Easy access by bus, auto-rickshaw, and taxi services
            </p>
          </div>
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
        Whether you want to volunteer, donate, or partner with us, we're here to help you make a positive impact.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/donate">
          <Button size="lg" className="bg-ngo-orange hover:bg-ngo-orange-light px-8 py-3 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Make a Donation
          </Button>
        </Link>
        <Link href="/volunteer">
          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
            Become a Volunteer
          </Button>
        </Link>
        <Link href="/membership">
          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-all duration-200">
            Join as Member
          </Button>
        </Link>
      </div>
    </div>
  </section>
)
