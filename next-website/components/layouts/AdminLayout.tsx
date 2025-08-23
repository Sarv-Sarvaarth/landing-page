import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Users,
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  user?: {
    id: number
    name: string
    email: string
    role: string
  } | null
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navigationItems = [
    {
      name: 'Volunteer Roles',
      href: '/admin',
      icon: Users,
      current: router.pathname === '/admin'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-ngo-blue mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Sarvaarth Admin
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        item.current
                          ? 'bg-ngo-blue text-white'
                          : 'text-gray-600 hover:text-ngo-blue hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  {/* User info */}
                  <div className="hidden md:block text-sm text-gray-600">
                    Welcome, <span className="font-medium">{user.name}</span>
                  </div>

                  {/* Logout button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="hidden md:flex"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-ngo-blue hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ngo-blue"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-ngo-blue text-white'
                        : 'text-gray-600 hover:text-ngo-blue hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 inline mr-2" />
                    {item.name}
                  </Link>
                )
              })}

              {user && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Welcome, <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-ngo-blue hover:bg-gray-50 rounded-md"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
