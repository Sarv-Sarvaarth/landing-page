import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Heart, Phone, Mail, MapPin, Clock, Users, Award, Send, MessageCircle, Calendar } from 'lucide-react'
import { QuickStatsSection, ContactFormSection, LeadershipContactSection, LocationSection, ContactCTASection } from '@/components/sections/ContactSections'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Get in touch with SARVAARTH & SEVAARTH FOUNDATION. Contact us for support, partnerships, volunteering opportunities, or any questions about our healthcare and education initiatives." />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with us for support, partnerships, or any questions about our mission
            </p>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <QuickStatsSection />
      <ContactFormSection />
      <LeadershipContactSection />
      <LocationSection />
      <ContactCTASection />
    </>
  )
}
