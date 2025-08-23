import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Mail, Lock, Shield, AlertCircle } from 'lucide-react'

// Validation schema
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(1, 'Password is required')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  // Check if already logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const session = document.cookie
          .split('; ')
          .find(row => row.startsWith('admin-session='))
          ?.split('=')[1]

        if (session) {
          const sessionData = JSON.parse(decodeURIComponent(session))
          if (sessionData.role === 'admin') {
            router.push('/admin')
          }
        }
      } catch (error) {
        // Invalid session, continue to login
      }
    }

    checkAuth()
  }, [router])

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ngo-blue to-ngo-blue-light flex items-center justify-center p-4">
      <Head>
        <title>Admin Login - SARVAARTH & SEVAARTH FOUNDATION</title>
        <meta name="description" content="Admin access to manage volunteer programs and applications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-ngo-orange to-orange-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-ngo-blue">Admin Login</CardTitle>
            <CardDescription className="text-gray-600">
              Access the admin dashboard to manage volunteer programs
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@sarvaarth.org"
                  {...register('email')}
                  className={`${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className={`${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white py-3 text-lg font-medium transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
    </div>
  )
}
