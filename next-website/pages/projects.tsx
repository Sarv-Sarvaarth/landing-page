import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Target,
  Heart,
  BookOpen,
  Stethoscope,
  Home,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  ArrowRight,
  Archive,
  TrendingUp,
  DollarSign,
  Award
} from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  category: 'healthcare' | 'education' | 'social-welfare' | 'community-development' | 'infrastructure'
  status: 'completed' | 'ongoing' | 'paused' | 'archived'
  startDate: string
  endDate?: string
  location: string
  description: string
  shortDescription: string
  totalBudget: string
  fundsRaised: string
  beneficiaries: number
  duration: string
  objectives: string[]
  keyAchievements: string[]
  challenges: string[]
  lessons: string[]
  partners: string[]
  team: string[]
  images: string[]
  documents: { name: string; type: string; url: string }[]
  tags: string[]
  impactMetrics: {
    metric: string
    value: string
    description: string
  }[]
}

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')

  // Placeholder projects data - this would come from an API in real implementation
  const projects: Project[] = [
    {
      id: '1',
      title: 'Vision Restoration Initiative - Phase I',
      slug: 'vision-restoration-initiative-phase-1',
      category: 'healthcare',
      status: 'completed',
      startDate: '2023-01-15',
      endDate: '2023-12-30',
      location: 'Delhi, Haryana, Punjab',
      description: 'Comprehensive eye care project providing free cataract surgeries and vision correction services to underprivileged communities across North India.',
      shortDescription: 'Free cataract surgery program serving 2000+ patients across North India with complete post-operative care.',
      totalBudget: '₹25,00,000',
      fundsRaised: '₹25,00,000',
      beneficiaries: 2150,
      duration: '12 months',
      objectives: [
        'Provide free cataract surgeries to 2000+ patients',
        'Establish mobile eye care units in rural areas',
        'Train local healthcare workers in basic eye care',
        'Create awareness about preventable blindness',
        'Set up follow-up care network for patients'
      ],
      keyAchievements: [
        '2,150 successful cataract surgeries performed',
        '98% success rate in vision restoration',
        '25 mobile eye camps conducted',
        '150 healthcare workers trained',
        '5,000+ people educated about eye care'
      ],
      challenges: [
        'Limited transportation for patients in remote areas',
        'Language barriers in rural communities',
        'Seasonal accessibility issues during monsoons',
        'Initial resistance to surgical procedures'
      ],
      lessons: [
        'Community trust building is crucial for project success',
        'Local partnerships significantly improve reach',
        'Post-operative care follow-up requires dedicated resources',
        'Patient education improves surgical outcomes'
      ],
      partners: [
        'Delhi Eye Institute',
        'State Health Department',
        'Local Village Councils',
        'Rotary International'
      ],
      team: [
        'Dr. Rajesh Kumar - Project Director',
        'Dr. Priya Sharma - Senior Surgeon',
        'Anita Singh - Community Coordinator',
        'Raj Patel - Logistics Manager'
      ],
      images: [
        '/assets/img/projects/vision-restoration-1.jpg',
        '/assets/img/projects/vision-restoration-2.jpg',
        '/assets/img/projects/vision-restoration-3.jpg'
      ],
      documents: [
        { name: 'Project Final Report', type: 'PDF', url: '/documents/vision-restoration-final-report.pdf' },
        { name: 'Impact Assessment', type: 'PDF', url: '/documents/vision-restoration-impact.pdf' },
        { name: 'Financial Summary', type: 'Excel', url: '/documents/vision-restoration-finances.xlsx' }
      ],
      tags: ['healthcare', 'eye-care', 'surgery', 'rural-health', 'north-india'],
      impactMetrics: [
        { metric: 'Patients Treated', value: '2,150', description: 'Total number of patients who received cataract surgery' },
        { metric: 'Success Rate', value: '98%', description: 'Percentage of successful vision restoration surgeries' },
        { metric: 'Cost per Patient', value: '₹1,163', description: 'Average cost per patient including all services' },
        { metric: 'Quality of Life', value: '95%', description: 'Patients reporting improved quality of life post-surgery' }
      ]
    },
    {
      id: '2',
      title: 'Rural Education Excellence Program',
      slug: 'rural-education-excellence-program',
      category: 'education',
      status: 'completed',
      startDate: '2022-06-01',
      endDate: '2024-03-31',
      location: 'Rajasthan, Madhya Pradesh',
      description: 'Multi-year educational transformation project focusing on infrastructure development, teacher training, and digital literacy in rural schools.',
      shortDescription: 'Comprehensive education program transforming 50 rural schools with modern infrastructure and digital learning.',
      totalBudget: '₹1,20,00,000',
      fundsRaised: '₹1,20,00,000',
      beneficiaries: 8500,
      duration: '22 months',
      objectives: [
        'Upgrade infrastructure in 50 rural schools',
        'Train 200 teachers in modern teaching methods',
        'Establish computer labs and digital learning centers',
        'Improve student learning outcomes by 40%',
        'Create sustainable education support systems'
      ],
      keyAchievements: [
        '50 schools completely renovated and modernized',
        '220 teachers trained in digital teaching methods',
        '25 computer labs established with internet connectivity',
        '45% improvement in student test scores',
        'Zero dropout rate achieved in participating schools'
      ],
      challenges: [
        'Inconsistent electricity supply in remote areas',
        'Limited internet connectivity',
        'Resistance to change from traditional teaching methods',
        'Maintenance of computer equipment in rural settings'
      ],
      lessons: [
        'Teacher buy-in is essential for successful implementation',
        'Community involvement improves project sustainability',
        'Regular monitoring and feedback loops are crucial',
        'Local capacity building ensures long-term success'
      ],
      partners: [
        'State Education Department',
        'Microsoft Education',
        'Local School Management Committees',
        'Teacher Training Institutes'
      ],
      team: [
        'Meera Gupta - Education Director',
        'Amit Sharma - Infrastructure Lead',
        'Sunita Devi - Teacher Training Coordinator',
        'Ravi Kumar - Technology Specialist'
      ],
      images: [
        '/assets/img/projects/rural-education-1.jpg',
        '/assets/img/projects/rural-education-2.jpg',
        '/assets/img/projects/rural-education-3.jpg'
      ],
      documents: [
        { name: 'Project Completion Report', type: 'PDF', url: '/documents/education-program-report.pdf' },
        { name: 'Student Performance Analysis', type: 'PDF', url: '/documents/student-performance-analysis.pdf' },
        { name: 'Infrastructure Development Photos', type: 'ZIP', url: '/documents/infrastructure-photos.zip' }
      ],
      tags: ['education', 'rural-development', 'infrastructure', 'teacher-training', 'digital-literacy'],
      impactMetrics: [
        { metric: 'Schools Transformed', value: '50', description: 'Number of schools completely renovated and modernized' },
        { metric: 'Students Benefited', value: '8,500', description: 'Total students directly impacted by the program' },
        { metric: 'Learning Improvement', value: '45%', description: 'Average improvement in student test scores' },
        { metric: 'Teacher Satisfaction', value: '92%', description: 'Teachers reporting increased job satisfaction' }
      ]
    },
    {
      id: '3',
      title: 'Clean Water Access Initiative',
      slug: 'clean-water-access-initiative',
      category: 'infrastructure',
      status: 'completed',
      startDate: '2023-03-01',
      endDate: '2023-11-30',
      location: 'Uttar Pradesh, Bihar',
      description: 'Large-scale water infrastructure project providing clean drinking water access and sanitation facilities to rural communities.',
      shortDescription: 'Water purification and sanitation project serving 15,000 people across 25 villages.',
      totalBudget: '₹45,00,000',
      fundsRaised: '₹45,00,000',
      beneficiaries: 15000,
      duration: '9 months',
      objectives: [
        'Install water purification systems in 25 villages',
        'Build 50 community toilets with proper sanitation',
        'Train 100 community members in water system maintenance',
        'Reduce waterborne diseases by 80%',
        'Establish sustainable water management practices'
      ],
      keyAchievements: [
        '25 community water purification systems installed',
        '55 community toilets constructed',
        '120 community members trained as maintenance operators',
        '85% reduction in waterborne disease cases',
        '100% villages achieved ODF (Open Defecation Free) status'
      ],
      challenges: [
        'Seasonal water table fluctuations',
        'Initial community resistance to toilet usage',
        'Technical training for maintenance staff',
        'Ensuring long-term financial sustainability'
      ],
      lessons: [
        'Community ownership is key to project sustainability',
        'Regular maintenance training prevents system failures',
        'Health education must accompany infrastructure development',
        'Local materials reduce costs and improve acceptance'
      ],
      partners: [
        'Water and Sanitation Department',
        'Sulabh International',
        'Village Development Committees',
        'WHO India Office'
      ],
      team: [
        'Prakash Singh - Water Engineer',
        'Rekha Kumari - Community Mobilizer',
        'Mohan Lal - Sanitation Specialist',
        'Geeta Devi - Health Educator'
      ],
      images: [
        '/assets/img/projects/water-initiative-1.jpg',
        '/assets/img/projects/water-initiative-2.jpg',
        '/assets/img/projects/water-initiative-3.jpg'
      ],
      documents: [
        { name: 'Water Quality Test Reports', type: 'PDF', url: '/documents/water-quality-reports.pdf' },
        { name: 'Community Training Manual', type: 'PDF', url: '/documents/water-training-manual.pdf' },
        { name: 'Sustainability Plan', type: 'PDF', url: '/documents/water-sustainability-plan.pdf' }
      ],
      tags: ['water', 'sanitation', 'infrastructure', 'health', 'rural-development'],
      impactMetrics: [
        { metric: 'People Served', value: '15,000', description: 'Total population with access to clean water' },
        { metric: 'Disease Reduction', value: '85%', description: 'Reduction in waterborne disease cases' },
        { metric: 'Villages Covered', value: '25', description: 'Number of villages with complete water systems' },
        { metric: 'System Uptime', value: '96%', description: 'Average operational efficiency of water systems' }
      ]
    },
    {
      id: '4',
      title: 'Women Empowerment Through Skills',
      slug: 'women-empowerment-through-skills',
      category: 'social-welfare',
      status: 'ongoing',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      location: 'Urban Slums - Delhi, Mumbai',
      description: 'Comprehensive skill development and entrepreneurship program for women in urban slum areas focusing on financial independence.',
      shortDescription: 'Skill development program training 500 women in urban slums for entrepreneurship and employment.',
      totalBudget: '₹18,00,000',
      fundsRaised: '₹12,00,000',
      beneficiaries: 500,
      duration: '12 months',
      objectives: [
        'Train 500 women in marketable skills',
        'Establish 50 micro-enterprises',
        'Provide financial literacy education',
        'Create women self-help groups',
        'Achieve 80% employment rate post-training'
      ],
      keyAchievements: [
        '320 women trained in various skills (in progress)',
        '25 micro-enterprises established',
        '15 self-help groups formed',
        '₹2,50,000 collective savings generated',
        '70% women showing increased confidence levels'
      ],
      challenges: [
        'Balancing training with household responsibilities',
        'Limited initial capital for starting businesses',
        'Market linkage challenges for products',
        'Social barriers to women working outside home'
      ],
      lessons: [
        'Flexible training schedules improve participation',
        'Peer support networks enhance success rates',
        'Market research is crucial before skill selection',
        'Family support significantly impacts success'
      ],
      partners: [
        'National Skill Development Corporation',
        'Women Self Help Federation',
        'Local Microfinance Institutions',
        'Urban Development Department'
      ],
      team: [
        'Nisha Verma - Program Director',
        'Deepa Kumari - Skills Trainer',
        'Arjun Mehta - Business Mentor',
        'Kavita Singh - Community Coordinator'
      ],
      images: [
        '/assets/img/projects/women-empowerment-1.jpg',
        '/assets/img/projects/women-empowerment-2.jpg'
      ],
      documents: [
        { name: 'Interim Progress Report', type: 'PDF', url: '/documents/women-empowerment-interim.pdf' },
        { name: 'Skills Training Curriculum', type: 'PDF', url: '/documents/skills-curriculum.pdf' }
      ],
      tags: ['women-empowerment', 'skills-development', 'entrepreneurship', 'urban-slums', 'microfinance'],
      impactMetrics: [
        { metric: 'Women Trained', value: '320/500', description: 'Progress towards training target' },
        { metric: 'Businesses Started', value: '25', description: 'Number of micro-enterprises established' },
        { metric: 'Average Income', value: '₹8,500', description: 'Monthly income increase per participant' },
        { metric: 'Skill Retention', value: '88%', description: 'Participants still using learned skills' }
      ]
    },
    {
      id: '5',
      title: 'Digital Health Network Pilot',
      slug: 'digital-health-network-pilot',
      category: 'healthcare',
      status: 'archived',
      startDate: '2021-09-01',
      endDate: '2022-08-31',
      location: 'Kerala, Karnataka',
      description: 'Pilot project for establishing telemedicine and digital health record systems in rural primary health centers.',
      shortDescription: 'Telemedicine pilot connecting 20 rural health centers with urban specialists.',
      totalBudget: '₹15,00,000',
      fundsRaised: '₹15,00,000',
      beneficiaries: 3500,
      duration: '12 months',
      objectives: [
        'Connect 20 rural health centers with telemedicine',
        'Train 40 healthcare workers in digital systems',
        'Digitize health records for 3000+ patients',
        'Reduce specialist consultation wait times by 60%',
        'Create scalable telemedicine model'
      ],
      keyAchievements: [
        '20 health centers successfully connected',
        '45 healthcare workers trained',
        '3,200 patient records digitized',
        '65% reduction in specialist consultation wait times',
        'Telemedicine model adopted by state government'
      ],
      challenges: [
        'Poor internet connectivity in remote areas',
        'Resistance to technology adoption by older staff',
        'Data privacy and security concerns',
        'High initial setup and maintenance costs'
      ],
      lessons: [
        'Reliable internet infrastructure is prerequisite',
        'Gradual technology adoption works better than sudden changes',
        'Data security training is essential',
        'Government partnership ensures scalability'
      ],
      partners: [
        'State Health Department',
        'Indian Institute of Science',
        'Telecommunications Provider',
        'Medical Equipment Suppliers'
      ],
      team: [
        'Dr. Sanjay Menon - Technical Director',
        'Priya Nair - Training Coordinator',
        'Ramesh Kumar - IT Specialist',
        'Anitha Rao - Data Manager'
      ],
      images: [
        '/assets/img/projects/digital-health-1.jpg',
        '/assets/img/projects/digital-health-2.jpg'
      ],
      documents: [
        { name: 'Pilot Evaluation Report', type: 'PDF', url: '/documents/digital-health-evaluation.pdf' },
        { name: 'Scalability Framework', type: 'PDF', url: '/documents/telemedicine-framework.pdf' },
        { name: 'Technical Documentation', type: 'PDF', url: '/documents/technical-docs.pdf' }
      ],
      tags: ['healthcare', 'telemedicine', 'digital-health', 'pilot-project', 'south-india'],
      impactMetrics: [
        { metric: 'Health Centers Connected', value: '20', description: 'Rural centers with telemedicine access' },
        { metric: 'Consultation Reduction', value: '65%', description: 'Reduction in wait times for specialists' },
        { metric: 'Records Digitized', value: '3,200', description: 'Patient health records converted to digital' },
        { metric: 'Cost Savings', value: '40%', description: 'Reduction in patient travel and consultation costs' }
      ]
    },
    {
      id: '6',
      title: 'Community Resilience Building',
      slug: 'community-resilience-building',
      category: 'community-development',
      status: 'paused',
      startDate: '2023-10-01',
      endDate: '2025-03-31',
      location: 'Assam, West Bengal',
      description: 'Multi-faceted community development project focusing on disaster preparedness, livelihood diversification, and social cohesion in flood-prone areas.',
      shortDescription: 'Disaster preparedness and livelihood program for flood-affected communities in Eastern India.',
      totalBudget: '₹35,00,000',
      fundsRaised: '₹20,00,000',
      beneficiaries: 6000,
      duration: '18 months',
      objectives: [
        'Train 200 community volunteers in disaster response',
        'Establish early warning systems in 30 villages',
        'Create alternative livelihood opportunities',
        'Build 10 community disaster shelters',
        'Develop community disaster management plans'
      ],
      keyAchievements: [
        '120 volunteers trained in disaster response',
        '15 early warning systems installed',
        '5 community shelters constructed',
        '25 alternative livelihood projects initiated',
        '8 village disaster management committees formed'
      ],
      challenges: [
        'Recurring floods disrupting project activities',
        'Limited access during monsoon seasons',
        'Coordination with multiple government agencies',
        'Securing additional funding for completion'
      ],
      lessons: [
        'Weather-dependent planning is crucial in flood-prone areas',
        'Multi-agency coordination requires dedicated effort',
        'Community leadership development takes time',
        'Flexible project timelines are essential'
      ],
      partners: [
        'Disaster Management Authority',
        'Red Cross Society',
        'Local Panchayati Raj Institutions',
        'Meteorological Department'
      ],
      team: [
        'Rajesh Das - Project Manager',
        'Mamata Choudhury - Community Organizer',
        'Bikash Sharma - Disaster Specialist',
        'Ruma Begum - Livelihood Coordinator'
      ],
      images: [
        '/assets/img/projects/resilience-building-1.jpg'
      ],
      documents: [
        { name: 'Interim Assessment Report', type: 'PDF', url: '/documents/resilience-interim.pdf' },
        { name: 'Disaster Preparedness Manual', type: 'PDF', url: '/documents/disaster-manual.pdf' }
      ],
      tags: ['disaster-preparedness', 'community-development', 'flood-management', 'livelihood', 'eastern-india'],
      impactMetrics: [
        { metric: 'Volunteers Trained', value: '120/200', description: 'Progress in training community volunteers' },
        { metric: 'Warning Systems', value: '15/30', description: 'Early warning systems installed' },
        { metric: 'Shelters Built', value: '5/10', description: 'Community disaster shelters completed' },
        { metric: 'Funding Secured', value: '57%', description: 'Percentage of total budget raised' }
      ]
    }
  ]

  const categories = [
    { id: 'all', label: 'All Categories', icon: Target },
    { id: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'social-welfare', label: 'Social Welfare', icon: Heart },
    { id: 'community-development', label: 'Community Development', icon: Building2 },
    { id: 'infrastructure', label: 'Infrastructure', icon: Home }
  ]

  const statuses = [
    { id: 'all', label: 'All Status', icon: Target },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'ongoing', label: 'Ongoing', icon: Clock },
    { id: 'paused', label: 'Paused', icon: AlertCircle },
    { id: 'archived', label: 'Archived', icon: Archive }
  ]

  const years = [
    { id: 'all', label: 'All Years' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus

    const projectYear = new Date(project.startDate).getFullYear().toString()
    const matchesYear = selectedYear === 'all' || projectYear === selectedYear

    return matchesSearch && matchesCategory && matchesStatus && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healthcare': return Stethoscope
      case 'education': return BookOpen
      case 'social-welfare': return Heart
      case 'community-development': return Building2
      case 'infrastructure': return Home
      default: return Target
    }
  }

  const projectStats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    totalBeneficiaries: projects.reduce((sum, p) => sum + p.beneficiaries, 0),
    totalBudget: projects.reduce((sum, p) => {
      const budget = parseFloat(p.totalBudget.replace(/[^\d]/g, ''))
      return sum + budget
    }, 0)
  }

  return (
    <>
      <Head>
        <title>Our Projects Archive - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Explore our comprehensive project archive including completed, ongoing, and planned initiatives in healthcare, education, social welfare, and community development across India." />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Projects Archive</h1>
            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              A comprehensive record of our journey in transforming communities across India
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{projectStats.total}</div>
                <div className="text-sm text-blue-100">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{projectStats.completed}</div>
                <div className="text-sm text-blue-100">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">{projectStats.totalBeneficiaries.toLocaleString()}+</div>
                <div className="text-sm text-blue-100">Beneficiaries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ngo-orange mb-1">₹{(projectStats.totalBudget / 10000000).toFixed(1)}Cr</div>
                <div className="text-sm text-blue-100">Total Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="ngo-section bg-gray-50">
        <div className="ngo-container">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search projects by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-ngo-blue"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-ngo-blue text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-ngo-blue hover:text-ngo-blue'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => {
                  const IconComponent = status.icon
                  return (
                    <button
                      key={status.id}
                      onClick={() => setSelectedStatus(status.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                        selectedStatus === status.id
                          ? 'bg-ngo-orange text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-ngo-orange hover:text-ngo-orange'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {status.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Year
              </h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    className={`px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                      selectedYear === year.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600 hover:text-green-600'
                    }`}
                  >
                    {year.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-ngo-blue">{filteredProjects.length}</span> of{' '}
              <span className="font-semibold">{projects.length}</span> projects
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-8">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category)
              const completionPercentage = project.status === 'completed' ? 100 :
                                         project.status === 'ongoing' ? 75 :
                                         project.status === 'paused' ? 50 : 25

              return (
                <Card
                  key={project.id}
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                    {/* Project Image */}
                    <div className="lg:col-span-1">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                        <div className="text-center">
                          <CategoryIcon className="w-12 h-12 text-ngo-blue opacity-50 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Project Image</p>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-ngo-blue mb-2">{project.title}</h3>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getStatusColor(project.status)} text-xs`}>
                              {project.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {project.category.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{project.shortDescription}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{project.startDate} - {project.endDate || 'Ongoing'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{project.beneficiaries.toLocaleString()} beneficiaries</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{project.totalBudget}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Project Progress</span>
                          <span className="text-ngo-blue font-medium">{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-ngo-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Actions */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        {/* Key Metrics */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                          <div className="space-y-2">
                            {project.impactMetrics.slice(0, 2).map((metric, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-sm text-gray-600">{metric.metric}:</span>
                                <span className="text-sm font-medium text-ngo-blue">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Link href={`/projects/${project.slug}`} className="block">
                            <Button className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white">
                              View Full Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full border-ngo-orange text-ngo-orange hover:bg-ngo-orange hover:text-white">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Impact Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedStatus('all')
                  setSelectedYear('all')
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
