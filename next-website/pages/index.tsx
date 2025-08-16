import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Eye, BookOpen, Users, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Head>
        <title>SARVAARTH & SEVAARTH FOUNDATION - READY TO HELP ALWAYS IN ALL WAYSn</title>
        <meta name="description" content="NGO founded in 2023, dedicated to filling voids in Indian Education, Climate, and Healthcare systems for the needy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-ngo-blue to-ngo-blue-light text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/img/hero/hero-two.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-ngo-blue bg-opacity-80"></div>

                {/* Decorative shapes */}
        <div className="absolute top-10 right-10 opacity-20">
          <Image src="/assets/img/shapes/circle-yellow.png" alt="" width={64} height={64} className="w-16 h-16" />
        </div>
        <div className="absolute top-32 left-10 opacity-30">
          <Image src="/assets/img/shapes/three-round-green.png" alt="" width={48} height={48} className="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-25">
          <Image src="/assets/img/shapes/heart.png" alt="" width={80} height={80} className="w-20 h-20" />
        </div>
        <div className="absolute bottom-32 left-16 opacity-20">
          <Image src="/assets/img/shapes/circle-green.png" alt="" width={56} height={56} className="w-14 h-14" />
      </div>

        <div className="relative ngo-container ngo-section">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-2 opacity-80" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Help Always in All Ways
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Filling voids in Indian Education, Climate, and Healthcare systems for the needy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button size="lg" className="bg-ngo-orange hover:bg-ngo-orange-light text-white px-8 py-3 transform hover:scale-105 transition-transform duration-200 shadow-lg">
                  Donate Now
                </Button>
              </Link>
              <Link href="/membership">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-transform duration-200">
                  Join Us
                </Button>
              </Link>
              <Link href="/volunteer">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-ngo-blue bg-transparent px-8 py-3 transform hover:scale-105 transition-transform duration-200">
                  Volunteer
                </Button>
              </Link>
            </div>
          </div>
      </div>
      </section>

      {/* Mission Overview */}
      <section className="ngo-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 opacity-10">
          <Image src="/assets/img/shapes/three-round-big-green.png" alt="" width={96} height={96} className="w-24 h-24" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Image src="/assets/img/shapes/circle-with-line-green.png" alt="" width={80} height={80} className="w-20 h-20" />
        </div>

        <div className="ngo-container relative">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">Our Focus Areas</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              We are committed to making a meaningful impact in three critical areas that affect millions of lives across India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Healthcare Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
              <div className="relative">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="/assets/img/causes/cause1.jpg"
                    alt="Healthcare"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-ngo-blue bg-opacity-20"></div>
                </div>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4 -mt-8 relative z-10">
                    <div className="w-16 h-16 bg-ngo-blue rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-ngo-blue font-bold">Free Healthcare & Medical Treatment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Providing essential medical care, treatments, and health services to underserved communities across India.
                  </CardDescription>
                </CardContent>
              </div>
            </Card>

            {/* Eye Care Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50"></div>
              <div className="relative">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="/assets/img/causes/cataract.jpeg"
                    alt="Eye Surgery"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-ngo-orange bg-opacity-20"></div>
                </div>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4 -mt-8 relative z-10">
                    <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-ngo-orange font-bold">Free Eye Surgeries & Spectacles</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Conducting eye camps, surgeries, and distributing spectacles to restore vision and improve quality of life.
                  </CardDescription>
                </CardContent>
              </div>
            </Card>

            {/* Education Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
              <div className="relative">
                <div className="h-48 overflow-hidden">
                  <Image
                    src="/assets/img/causes/cause3.jpg"
                    alt="Education"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-green-600 bg-opacity-20"></div>
                </div>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4 -mt-8 relative z-10">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-green-600 font-bold">Quality Education in Rural Areas</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Bridging educational gaps and ensuring quality learning opportunities reach rural and underserved communities.
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section
        className="ngo-section relative text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/img/background/counter-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-ngo-blue bg-opacity-85"></div>

        {/* Decorative shapes */}
        <div className="absolute top-16 right-16 opacity-20">
          <Image src="/assets/img/shapes/three-round-yellow.png" alt="" width={64} height={64} className="w-16 h-16" />
        </div>
        <div className="absolute bottom-16 left-16 opacity-20">
          <Image src="/assets/img/shapes/circle-with-line-red.png" alt="" width={80} height={80} className="w-20 h-20" />
        </div>

        <div className="ngo-container relative">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-80" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Our Impact So Far</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Since our foundation in October 2023, we've been working tirelessly to make a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-ngo-orange rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-100 font-medium">Lives Helped</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">150+</div>
                <div className="text-blue-100 font-medium">Eye Surgeries</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">300+</div>
                <div className="text-blue-100 font-medium">Children Educated</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-blue-100 font-medium">Volunteers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="ngo-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 opacity-15">
          <Image src="/assets/img/shapes/half-circle-with-dots.png" alt="" width={128} height={128} className="w-32 h-32" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-15">
          <Image src="/assets/img/shapes/circle-red.png" alt="" width={96} height={96} className="w-24 h-24" />
        </div>

        <div className="ngo-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="mb-6">
                <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mb-4 opacity-60" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Journey Began</h2>
              <p className="ngo-text mb-6 text-lg leading-relaxed">
                Our foundation was born from a moment of profound compassion. When Ms. Meneka Singh witnessed
                her housemaid's husband struggling with a serious health condition, unable to afford proper treatment,
                she knew something had to be done.
              </p>
              <p className="ngo-text mb-8 text-lg leading-relaxed">
                This incident sparked the creation of SARVAARTH & SEVAARTH FOUNDATION on October 4, 2023.
                What started as one person's desire to help has grown into a movement dedicated to filling
                the critical gaps in healthcare, education, and social welfare.
              </p>
              <Link href="/about">
                <Button className="bg-ngo-blue hover:bg-ngo-blue-light transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              {/* Background volunteer image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/assets/img/about/group-volunteers-with-donation-box.jpg"
                  alt="Volunteers"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover opacity-20"
                />
              </div>

              {/* Founder card overlay */}
              <div className="relative bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white border-opacity-50">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 bg-gradient-to-br from-ngo-blue to-ngo-blue-light rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute inset-0 w-32 h-32 border-4 border-ngo-orange border-opacity-30 rounded-full mx-auto animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-ngo-blue mb-2">Ms. Meneka Singh</h3>
                  <p className="text-ngo-orange font-semibold mb-4">President & Founder</p>
                  <div className="w-16 h-1 bg-ngo-orange mx-auto mb-4"></div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "Every life has value, and every person deserves access to basic healthcare and education.
                    Our foundation exists to bridge that gap and create lasting change."
                  </p>
                  <div className="mt-6">
                    <Image src="/assets/img/about/signature.png" alt="Signature" width={120} height={40} className="mx-auto opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="ngo-section relative text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/img/background/cta.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-ngo-blue bg-opacity-90"></div>

        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 opacity-20">
          <Image src="/assets/img/shapes/hand-glass.png" alt="" width={96} height={96} className="w-24 h-24" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Image src="/assets/img/shapes/house-heart.png" alt="" width={80} height={80} className="w-20 h-20" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Image src="/assets/img/shapes/three-round-red.png" alt="" width={64} height={64} className="w-16 h-16" />
        </div>

        <div className="ngo-container text-center relative">
          <div className="mb-6">
            <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-80" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Your support can transform lives. Whether through donations, volunteering, or becoming a member,
            every contribution creates positive change.
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
          </div>
      </div>
      </section>
    </>
  )
}
