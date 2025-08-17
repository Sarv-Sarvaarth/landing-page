import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, AlertCircle, User, Mail, MapPin, CreditCard, FileText, Briefcase, Heart, Upload, X, QrCode, Building, Copy } from 'lucide-react'
import Image from 'next/image'

// Validation schema
const donationMembershipSchema = z.object({
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
    .max(1000, 'Description must be less than 1000 characters'),
  role: z.enum(['member', 'donor']).refine(
    val => !!val,
    { message: 'Please select your role with Sarvaarth' }
  ),
  donationAmount: z.number()
    .min(1, 'Donation amount must be at least ₹1')
    .optional(),
  paymentMode: z.enum(['cash', 'upi', 'netbanking']).refine(
    val => !!val,
    { message: 'Please select payment mode' }
  ),
  receipt: z.any().optional()
})

type DonationMembershipFormData = z.infer<typeof donationMembershipSchema>

const salutations = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' }
]

interface DonationMembershipFormProps {
  type: 'donation' | 'membership'
  onSuccess?: () => void
}

export default function DonationMembershipForm({ type, onSuccess }: DonationMembershipFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<DonationMembershipFormData>({
    resolver: zodResolver(donationMembershipSchema),
    mode: 'onChange',
    defaultValues: {
      role: type === 'membership' ? 'member' : 'donor',
      donationAmount: type === 'membership' ? 1000 : undefined
    }
  })

  const watchedRole = watch('role')
  const watchedPaymentMode = watch('paymentMode')
  const watchedDonationAmount = watch('donationAmount')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed')
        return
      }

      setSelectedFile(file)
      setValue('receipt', file)

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreview(null)
      }
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    setValue('receipt', undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type)
      setTimeout(() => setCopiedText(null), 2000)
    })
  }

  const onSubmit = async (data: DonationMembershipFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formData = new FormData()

      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'receipt' && value !== undefined) {
          formData.append(key, value.toString())
        }
      })

      // Add file if present
      if (selectedFile) {
        formData.append('receipt', selectedFile)
      }

      // Add type
      formData.append('type', type)

      const response = await fetch('/api/donation-membership', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Donation/Membership response:', result)

      setSubmitStatus('success')
      setSubmitMessage(
        watchedRole === 'member'
          ? 'Thank you for becoming a member! We will process your membership and contact you soon.'
          : 'Thank you for your generous donation! Your contribution will make a real difference.'
      )
      reset()
      removeFile()
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting form:', error)
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

  const getFormTitle = () => {
    if (type === 'membership') return 'Become a Member'
    return 'Make a Donation'
  }

  const getFormDescription = () => {
    if (type === 'membership') return 'Join our community and support our mission with a membership fee of ₹1000'
    return 'Support our cause with a donation of any amount you feel comfortable with'
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl border-0">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-ngo-blue to-ngo-blue-light rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-ngo-blue">{getFormTitle()}</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          {getFormDescription()}
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

          {/* Role Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Select your role with Sarvaarth <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                watchedRole === 'member' ? 'border-ngo-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  value="member"
                  {...register('role')}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Member</h3>
                    <p className="text-sm text-gray-600">Membership fee: ₹1000</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    watchedRole === 'member' ? 'border-ngo-blue bg-ngo-blue' : 'border-gray-300'
                  }`}>
                    {watchedRole === 'member' && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </label>

              <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                watchedRole === 'donor' ? 'border-ngo-orange bg-orange-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  value="donor"
                  {...register('role')}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Donor</h3>
                    <p className="text-sm text-gray-600">Custom donation amount</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    watchedRole === 'donor' ? 'border-ngo-orange bg-ngo-orange' : 'border-gray-300'
                  }`}>
                    {watchedRole === 'donor' && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Donation Amount for Donors */}
          {watchedRole === 'donor' && (
            <div className="space-y-2">
              <Label htmlFor="donationAmount" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Donation Amount (₹) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="donationAmount"
                type="number"
                min="1"
                placeholder="Enter your donation amount"
                {...register('donationAmount', { valueAsNumber: true })}
                className={`${errors.donationAmount ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-ngo-blue'} transition-colors`}
              />
              {errors.donationAmount && (
                <p className="text-sm text-red-600">{errors.donationAmount.message}</p>
              )}
            </div>
          )}

          {/* Payment Mode */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Mode <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => setValue('paymentMode', value as any, { shouldValidate: true })}>
              <SelectTrigger className={`${errors.paymentMode ? 'border-red-500' : 'border-gray-300'}`}>
                <SelectValue placeholder="Select your mode of payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="netbanking">Net Banking</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMode && (
              <p className="text-sm text-red-600">{errors.paymentMode.message}</p>
            )}
          </div>

          {/* Payment Instructions based on mode */}
          {watchedPaymentMode && (
            <div className="space-y-4">
              {/* Cash Payment */}
              {watchedPaymentMode === 'cash' && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-ngo-blue mb-3">Cash Payment Instructions</h3>
                    <p className="text-gray-700 mb-4">
                      Please make the cash payment in person and upload a receipt copy or screenshot below.
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor="cashReceipt" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Cash Receipt Copy / Screenshot
                      </Label>
                      <Input
                        id="cashReceipt"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500">PDF or Image files only (max 5MB)</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* UPI Payment */}
              {watchedPaymentMode === 'upi' && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-ngo-blue mb-3">UPI Payment Instructions</h3>
                    <p className="text-gray-700 mb-4">
                      Please scan the QR code below or use the UPI ID to make your payment.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-green-300 mb-3">
                          <div
                            className="cursor-pointer transition-transform hover:scale-105"
                            onClick={() => setIsQrModalOpen(true)}
                          >
                            <Image
                              src="/assets/img/latest/QR.jpg"
                              alt="UPI QR Code"
                              width={128}
                              height={128}
                              className="mx-auto rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Scan to Pay <span className="text-blue-600">(Click to enlarge)</span></p>
                        </div>
                        <p className="text-sm text-gray-600">Scan with any UPI app</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">UPI ID:</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-white px-3 py-2 rounded border text-sm flex-1">sarvaarth.sevaarth1860@sbi</code>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('sarvaarth@upi', 'upi')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          {copiedText === 'upi' && (
                            <p className="text-xs text-green-600 mt-1">Copied!</p>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Amount:</Label>
                          <div className="bg-white px-3 py-2 rounded border text-sm mt-1">
                            ₹{watchedRole === 'member' ? '1000' : watchedDonationAmount || '___'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="upiReceipt" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload UPI Reference Number Screenshot
                      </Label>
                      <Input
                        id="upiReceipt"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500">PDF or Image files only (max 5MB)</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Net Banking Payment */}
              {watchedPaymentMode === 'netbanking' && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-ngo-blue mb-3">Net Banking Payment Instructions</h3>
                    <p className="text-gray-700 mb-4">
                      Please use the following bank details to make your payment via net banking.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Bank Name:</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-white px-3 py-2 rounded border text-sm flex-1">STATE BANK OF INDIA</code>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('STATE BANK OF INDIA', 'bank')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          {copiedText === 'bank' && (
                            <p className="text-xs text-green-600 mt-1">Copied!</p>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Account Name:</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-white px-3 py-2 rounded border text-sm flex-1">SARVAARTH & SEVAARTH FOUNDATION</code>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('SARVAARTH & SEVAARTH FOUNDATION', 'account')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          {copiedText === 'account' && (
                            <p className="text-xs text-green-600 mt-1">Copied!</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Account Number:</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-white px-3 py-2 rounded border text-sm flex-1">42416653388</code>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('42416653388', 'accountno')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          {copiedText === 'accountno' && (
                            <p className="text-xs text-green-600 mt-1">Copied!</p>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">IFSC Code:</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-white px-3 py-2 rounded border text-sm flex-1">SBIN0017633</code>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard('SBIN0017633', 'ifsc')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          {copiedText === 'ifsc' && (
                            <p className="text-xs text-green-600 mt-1">Copied!</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-sm font-medium text-gray-700">Branch:</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="bg-white px-3 py-2 rounded border text-sm flex-1">BAGHDOLA, DWARKA SEC-8</code>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard('BAGHDOLA, DWARKA SEC-8', 'branch')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      {copiedText === 'branch' && (
                        <p className="text-xs text-green-600 mt-1">Copied!</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="netbankingReceipt" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload UTR Reference Number Screenshot
                      </Label>
                      <Input
                        id="netbankingReceipt"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500">PDF or Image files only (max 5MB)</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* File Preview */}
              {selectedFile && (
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={removeFile}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {filePreview && (
                      <div className="mt-3">
                        <Image
                          src={filePreview}
                          alt="File preview"
                          width={200}
                          height={150}
                          className="rounded border object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !watchedPaymentMode || (watchedPaymentMode !== 'cash' ? !selectedFile : false)}
              className="w-full bg-ngo-blue hover:bg-ngo-blue-light text-white py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing {watchedRole === 'member' ? 'Membership' : 'Donation'}...
                </>
              ) : (
                <>
                  Submit {watchedRole === 'member' ? 'Membership' : 'Donation'} Application
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Privacy & Security:</strong> Your personal and payment information is secure with us.
            We use PAN and Aadhaar numbers only for tax receipt purposes and identity verification.
            All uploaded receipts are encrypted and stored securely.
          </p>
        </div>

        {/* QR Code Modal */}
        {isQrModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={() => setIsQrModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-xl p-6 max-w-md mx-4 transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  UPI Payment QR Code
                </h3>

                <div className="bg-white p-4 rounded-lg border shadow-lg mb-4">
                  <Image
                    src="/assets/img/latest/QR.jpg"
                    alt="UPI QR Code"
                    width={300}
                    height={300}
                    className="mx-auto rounded-lg"
                    priority
                  />
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  Scan this QR code with any UPI app to make payment
                </p>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">UPI ID:</p>
                  <code className="text-sm font-mono text-gray-800">sarvaarth.sevaarth1860@sbi</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
