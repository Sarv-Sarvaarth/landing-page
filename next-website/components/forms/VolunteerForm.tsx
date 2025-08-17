import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, AlertCircle, User, Mail, MapPin, CreditCard, FileText, Briefcase } from 'lucide-react'

// Validation schema
const volunteerSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  salutation: z.string()
    .min(1, 'Please select your title'),
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  address: z.string()
    .min(10, 'Please provide complete postal address')
    .max(500, 'Address must be less than 500 characters'),
  panNumber: z.string()
    .min(1, 'PAN number is required')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number (e.g., ABCDE1234F)')
    .transform(val => val.toUpperCase()),
  aadhaarNumber: z.string()
    .min(1, 'Aadhaar number is required')
    .regex(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits'),
  occupation: z.string()
    .min(2, 'Please specify your occupation')
    .max(100, 'Occupation must be less than 100 characters'),
  professionalDetails: z.string()
    .min(20, 'Please provide at least 20 characters describing your professional contribution')
    .max(1000, 'Description must be less than 1000 characters')
})

type VolunteerFormData = z.infer<typeof volunteerSchema>

const salutations = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' }
]

interface VolunteerFormProps {
  onSuccess?: () => void
}

export default function VolunteerForm({ onSuccess }: VolunteerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    mode: 'onChange'
  })

  const watchedSalutation = watch('salutation')

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Volunteer registration response:', result)

      setSubmitStatus('success')
      setSubmitMessage('Thank you for volunteering! We will contact you soon.')
      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting volunteer form:', error)
      setSubmitStatus('error')
      setSubmitMessage('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPanNumber = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
  }

  const formatAadhaarNumber = (value: string) => {
    return value.replace(/[^0-9]/g, '').slice(0, 12)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-ngo-blue to-ngo-blue-light rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-ngo-blue">Join Our Mission</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Help us create positive change in society by becoming a volunteer
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{submitMessage}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{submitMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register('email')}
              className={`${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Salutation and Full Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salutation" className="text-sm font-medium text-gray-700 flex items-center gap-2 h-5">
                <User className="w-4 h-4 opacity-60" />
                Title <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('salutation', value, { shouldValidate: true })}>
                <SelectTrigger className={`${errors.salutation ? 'border-red-500' : 'border-gray-300'}`}>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  {salutations.map((salutation) => (
                    <SelectItem key={salutation.value} value={salutation.value}>
                      {salutation.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.salutation && (
                <p className="text-sm text-red-600">{errors.salutation.message}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2 h-5">
                <User className="w-4 h-4" />
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Provide your complete name"
                {...register('fullName')}
                className={`${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </Label>
            <Textarea
              id="address"
              placeholder="Provide your complete postal address"
              rows={3}
              {...register('address')}
              className={`${errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors resize-none`}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* PAN and Aadhaar Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="panNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                PAN Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="panNumber"
                type="text"
                placeholder="ABCDE1234F"
                {...register('panNumber')}
                onChange={(e) => {
                  const formatted = formatPanNumber(e.target.value)
                  setValue('panNumber', formatted, { shouldValidate: true })
                }}
                className={`${errors.panNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors uppercase`}
                maxLength={10}
              />
              <p className="text-xs text-gray-500">For donation receipt and tax purposes</p>
              {errors.panNumber && (
                <p className="text-sm text-red-600">{errors.panNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhaarNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Aadhaar Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="aadhaarNumber"
                type="text"
                placeholder="123456789012"
                {...register('aadhaarNumber')}
                onChange={(e) => {
                  const formatted = formatAadhaarNumber(e.target.value)
                  setValue('aadhaarNumber', formatted, { shouldValidate: true })
                }}
                className={`${errors.aadhaarNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
                maxLength={12}
              />
              <p className="text-xs text-gray-500">For identity verification and tax receipts</p>
              {errors.aadhaarNumber && (
                <p className="text-sm text-red-600">{errors.aadhaarNumber.message}</p>
              )}
            </div>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Occupation/Profession
            </Label>
            <Input
              id="occupation"
              type="text"
              placeholder="What do you do professionally?"
              {...register('occupation')}
              className={`${errors.occupation ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
            />
            {errors.occupation && (
              <p className="text-sm text-red-600">{errors.occupation.message}</p>
            )}
          </div>

          {/* Professional Details */}
          <div className="space-y-2">
            <Label htmlFor="professionalDetails" className="text-sm font-medium text-gray-700">
              Brief Details about your Profession and Social Contribution
            </Label>
            <Textarea
              id="professionalDetails"
              placeholder="Please share how your skills or profession could help contribute to our society or Sarvaarth's mission."
              rows={4}
              {...register('professionalDetails')}
              className={`${errors.professionalDetails ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors resize-none`}
            />
            <p className="text-xs text-gray-500">
              Describe how your skills can contribute to our mission (minimum 20 characters)
            </p>
            {errors.professionalDetails && (
              <p className="text-sm text-red-600">{errors.professionalDetails.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                'Submit Volunteer Application'
              )}
            </Button>
          </div>
        </form>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Privacy Notice:</strong> Your personal information is secure with us. We use PAN and Aadhaar
            numbers only for tax receipt purposes and identity verification. All data is protected according to
            applicable privacy laws.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
