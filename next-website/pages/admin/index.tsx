import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { getMembershipDonationStats } from '@/src/db/queries/membership-donation'
import { getAllVolunteerRoles } from '@/src/db/queries/volunteer'
import { getActivitiesStats } from '@/src/db/queries/activities'
import { getProjectsStats } from '@/src/db/queries/projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AdminLayout from '@/components/layouts/AdminLayout'
import {
  Users,
  UserPlus,
  Heart,
  Crown,
  Settings,
  TrendingUp,
  ArrowUpRight,
  Activity
} from 'lucide-react'

interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

interface DashboardStats {
  totalMemberships: number
  activeMemberships: number
  totalDonations: number
  pendingVerifications: number
  totalAmount: number
  totalProjects: number
  totalActivities: number
  totalVolunteerRoles: number
  activeVolunteerRoles: number
  totalVolunteers: number
}

interface AdminPageProps {
  stats: DashboardStats
  user: AdminUser | null
}

export default function AdminDashboard({ stats, user }: AdminPageProps) {
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    }
  }, [user, router])

  const navigationCards = [
    {
      title: 'Projects',
      description: 'Manage foundation projects and initiatives',
      href: '/admin/projects',
      icon: TrendingUp,
      stats: `${stats.totalProjects || 0} total projects`,
      color: 'bg-indigo-500'
    },
    {
      title: 'Activities',
      description: 'Manage foundation activities and programs',
      href: '/admin/activities',
      icon: Activity,
      stats: `${stats.totalActivities || 0} total activities`,
      color: 'bg-orange-500'
    },
    {
      title: 'Volunteer Roles',
      description: 'Manage volunteer opportunities and roles',
      href: '/admin/volunteer-roles',
      icon: UserPlus,
      stats: `${stats.activeVolunteerRoles} active roles`,
      color: 'bg-blue-500'
    },
    {
      title: 'Volunteers',
      description: 'View and manage volunteer applications',
      href: '/admin/volunteers',
      icon: Users,
      stats: `${stats.totalVolunteers} total volunteers`,
      color: 'bg-green-500'
    },
    {
      title: 'Members',
      description: 'Manage membership applications and members',
      href: '/admin/members',
      icon: Crown,
      stats: `${stats.activeMemberships} active members`,
      color: 'bg-purple-500'
    },
    {
      title: 'Donors',
      description: 'View and manage donation records',
      href: '/admin/donors',
      icon: Heart,
      stats: `${stats.totalDonations} donations`,
      color: 'bg-red-500'
    }
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <AdminLayout user={user}>
      <Head>
        <title>Admin Dashboard - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Admin dashboard for managing the foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium">Total Raised</CardTitle>
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-bold">₹{stats.totalAmount?.toLocaleString('en-IN') || '0'}</div>
              <p className="text-xs text-muted-foreground">From all sources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium">Members</CardTitle>
              <Crown className="h-3 w-3 text-purple-600" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-bold">{stats.activeMemberships}</div>
              <p className="text-xs text-muted-foreground">of {stats.totalMemberships} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium">Donations</CardTitle>
              <Heart className="h-3 w-3 text-red-600" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-bold">{stats.totalDonations}</div>
              <p className="text-xs text-muted-foreground">Individual donations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium">Pending</CardTitle>
              <Activity className="h-3 w-3 text-orange-600" />
            </CardHeader>
            <CardContent className="pt-1">
              <div className="text-lg font-bold">{stats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">Need review</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationCards.map((card) => {
            const IconComponent = card.icon
            return (
              <Link key={card.title} href={card.href}>
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1 border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-base text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{card.description}</p>
                    <div className="text-xs font-medium text-gray-800">{card.stats}</div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Recent Activity Section */}
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription className="text-sm">Latest updates across your foundation</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
                            {stats.pendingVerifications > 0 && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
                  <Activity className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-orange-800">
                      {stats.pendingVerifications} payment{stats.pendingVerifications !== 1 ? 's' : ''} awaiting verification
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-blue-800">
                    {stats.totalVolunteers} volunteer{stats.totalVolunteers !== 1 ? 's' : ''} across {stats.activeVolunteerRoles} active roles
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
                <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-green-800">
                    Foundation raised ₹{stats.totalAmount?.toLocaleString('en-IN') || '0'} from {stats.totalMemberships + stats.totalDonations} contributions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps<AdminPageProps> = async ({ req }) => {
  try {
    // Check authentication
    const session = req.cookies['admin-session']
    let user: AdminUser | null = null

    if (session) {
      try {
        const sessionData = JSON.parse(decodeURIComponent(session))
        if (sessionData.role === 'admin') {
          user = {
            id: sessionData.userId,
            name: sessionData.name,
            email: sessionData.email,
            role: sessionData.role
          }
        }
      } catch (error) {
        // Invalid session
      }
    }

    // If not authenticated, redirect to login
    if (!user) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      }
    }

    // Fetch dashboard statistics
    const [membershipDonationStats, rolesData, activitiesStats, projectsStats] = await Promise.all([
      getMembershipDonationStats(),
      getAllVolunteerRoles(false), // Get all roles, both active and inactive
      getActivitiesStats(),
      getProjectsStats()
    ])

    // Calculate volunteer stats
    const totalVolunteerRoles = rolesData.length
    const activeVolunteerRoles = rolesData.filter(role => role.isActive).length
    const totalVolunteers = rolesData.reduce((sum, role) => sum + role.currentVolunteers, 0)

    const stats: DashboardStats = {
      ...membershipDonationStats,
      totalVolunteerRoles,
      activeVolunteerRoles,
      totalVolunteers,
      totalActivities: activitiesStats.totalActivities,
      totalProjects: projectsStats.totalProjects
    }

    return {
      props: {
        stats,
        user,
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)

    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
}
