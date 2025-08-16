import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Eye, BookOpen, Users, ArrowRight, Award, Target, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { StatisticsSection, HowToHelpSection, TeamSection, FAQSection, ContactCTASection } from '@/components/sections/AboutSections'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Learn about our mission, vision, and the inspiring story behind SARVAARTH & SEVAARTH FOUNDATION. Founded in 2023 to fill voids in Indian Education, Climate, and Healthcare systems." />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Ready to Help Always in All Ways - Our mission since October 4, 2023
            </p>
            <div className="flex items-center justify-center mt-6 text-blue-100">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Founded: October 4, 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="ngo-section relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
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
            <h2 className="ngo-heading">What We Do...</h2>
            <p className="ngo-text text-xl max-w-4xl mx-auto">
              Sarvaarth & Sevaarth Foundation was created to fill a very important void in the Indian Education, Climate, Healthcare systems for the needy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-ngo-blue mb-6">Our Mission</h3>
              <p className="ngo-text mb-6 leading-relaxed">
                Access to free and timely health care. Our main goal is to provide a safe, affordable, and timely solution to needy citizens.
                More specifically, to assist those who are deprived from basic healthcare, Medical Treatment and surgery.
              </p>
              <p className="ngo-text mb-6 leading-relaxed">
                Our most important objective is to protect the poor and needy from lack of Medical Treatment. To offer Free Eye surgeries &
                offering free spectacles to deprived population.
              </p>
              <p className="ngo-text leading-relaxed">
                We are focusing on specifically Quality education in Rural areas. Our basic motto is to provide quality education at very
                affordable price. It is basically to fill a huge Gap between Schools in Rural villages & private expensive schools.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <Image
                  src="/assets/img/about/about-right.jpg"
                  alt="Our Mission"
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-gray-600 italic text-center">
                  "Providing education in a very healthy atmosphere to rural children bringing them at a level playing field amongst other private school children."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Story Section */}
      <section className="ngo-section bg-white">
        <div className="ngo-container">
          <div className="text-center mb-16">
            <div className="mb-4">
              <Image src="/assets/img/shapes/title-underline.png" alt="" width={120} height={20} className="mx-auto mb-4 opacity-60" />
            </div>
            <h2 className="ngo-heading">Our Foundation Story</h2>
            <p className="ngo-text text-xl max-w-3xl mx-auto">
              The inspiring journey that led to the creation of our NGO
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <Image src="/assets/img/shapes/heart.png" alt="" width={48} height={48} className="w-12 h-12" />
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  The first thought of having a NGO, popped her mind 2 years back when her housemaid's husband suddenly collapsed during
                  ongoing treatment in AIIMS, leaving behind wife (Illiterate) & 2 school going children.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  After her husband's sudden death maid was fully broken and then <strong className="text-ngo-blue">Ms. Meneka Singh</strong> stepped out and helped fully &
                  whole heartedly in getting all the claims like PF, LIC, Bank A/c etc to be get settled & then asked her husband
                  <strong className="text-ngo-blue"> Mr. D S Gautam</strong> to get her employed in nearby Office of NIMR as contractual worker so that she must at least get
                  some substantial amount to maintain her monthly expenses.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Apart from all this she started motivating maid's children to focus on their studies properly and even started giving
                  free tuitions as well. Then she discussed her idea with her husband and as he was also soft hearted so he immediately
                  approved the idea without giving it a second thought & started working on this idea.
                </p>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-ngo-orange">
                  <p className="text-lg leading-relaxed mb-4">
                    Finally <strong className="text-ngo-orange">"SARVAARTH & SEVAARTH FOUNDATION"</strong> took a shape and finally got into existence as an NGO on
                    <strong className="text-ngo-blue"> 4th Oct 2023</strong>.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our President <strong className="text-ngo-blue">Ms. Meneka Singh</strong> & Secretary <strong className="text-ngo-blue">Ms. Kusum Rathore</strong> (School Principal) has been the backbone of the foundation.
                    Apart from these 2 Ladies <strong className="text-ngo-blue">Mr. Manoj Singh</strong> (Vice President) owner of Sai Eye Care hospital, Lucknow has also showed
                    immense interest in taking up this responsibility of vice president as well as agreed on offering every possible free services through our NGO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Import additional sections */}
      <StatisticsSection />
      <HowToHelpSection />
      <TeamSection />
      <FAQSection />
      <ContactCTASection />
    </>
  )
}
