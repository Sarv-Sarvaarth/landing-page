// Shared type definitions for volunteer-related data

export interface VolunteerRole {
  id: number
  title: string
  description: string
  requirements: string[]
  skillsNeeded: string[]
  timeCommitment: string | null
  location: string | null
  isActive: boolean
  maxVolunteers: number | null
  currentVolunteers: number
  createdAt?: string
  updatedAt?: string | null
}

export interface VolunteerRoleData {
  title: string
  description: string
  requirements?: string[]
  skillsNeeded?: string[]
  timeCommitment?: string
  location?: string
  maxVolunteers?: number
  isActive?: boolean
}
