import { db } from './index'
import { volunteerRolesTable } from './schema'

const sampleRoles = [
  {
    title: 'Medical Camp Volunteer',
    description: 'Assist in organizing and conducting free medical camps for underserved communities',
    requirements: JSON.stringify([
      'Available on weekends',
      'Good communication skills',
      'Willingness to work in rural areas'
    ]),
    skillsNeeded: JSON.stringify([
      'Healthcare background preferred',
      'Basic first aid knowledge',
      'Local language skills'
    ]),
    timeCommitment: 'Weekends (6-8 hours per camp)',
    location: 'Rural and remote areas',
    isActive: true,
    maxVolunteers: 10,
    currentVolunteers: 3
  },
  {
    title: 'Education Support Volunteer',
    description: 'Help with teaching and educational program development for children and adults',
    requirements: JSON.stringify([
      'Patience with learners',
      'Flexible schedule',
      'Commitment for at least 3 months'
    ]),
    skillsNeeded: JSON.stringify([
      'Teaching or educational background',
      'Subject matter expertise',
      'Creative lesson planning'
    ]),
    timeCommitment: 'Flexible (4-6 hours per week)',
    location: 'Schools and community centers',
    isActive: true,
    maxVolunteers: 15,
    currentVolunteers: 8
  },
  {
    title: 'Event Coordination Volunteer',
    description: 'Support fundraising events, awareness campaigns, and community outreach programs',
    requirements: JSON.stringify([
      'Strong organizational skills',
      'Ability to work in teams',
      'Available for event days'
    ]),
    skillsNeeded: JSON.stringify([
      'Event planning experience',
      'Communication and coordination skills',
      'Social media knowledge'
    ]),
    timeCommitment: '10-15 hours per month',
    location: 'Various event venues',
    isActive: true,
    maxVolunteers: 8,
    currentVolunteers: 5
  },
  {
    title: 'Digital Marketing Volunteer',
    description: 'Help with social media management, content creation, and online outreach to expand our reach',
    requirements: JSON.stringify([
      'Access to reliable internet',
      'Creative mindset',
      'Understanding of social causes'
    ]),
    skillsNeeded: JSON.stringify([
      'Digital marketing experience',
      'Content creation skills',
      'Social media platform knowledge',
      'Basic graphic design'
    ]),
    timeCommitment: 'Remote (5-10 hours per week)',
    location: 'Remote work',
    isActive: true,
    maxVolunteers: 5,
    currentVolunteers: 2
  },
  {
    title: 'Community Outreach Volunteer',
    description: 'Connect with local communities to identify needs and build relationships for sustainable programs',
    requirements: JSON.stringify([
      'Strong interpersonal skills',
      'Cultural sensitivity',
      'Willingness to travel locally'
    ]),
    skillsNeeded: JSON.stringify([
      'Community engagement experience',
      'Local language proficiency',
      'Research and documentation skills'
    ]),
    timeCommitment: 'Part-time (20-25 hours per month)',
    location: 'Community centers and field visits',
    isActive: true,
    maxVolunteers: 6,
    currentVolunteers: 4
  }
]

export async function seedVolunteerRoles() {
  try {
    console.log('Seeding volunteer roles...')

    for (const role of sampleRoles) {
      await db.insert(volunteerRolesTable).values(role)
      console.log(`✅ Inserted role: ${role.title}`)
    }

    console.log('✅ All volunteer roles seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding volunteer roles:', error)
    throw error
  }
}

// Run this script directly if called
if (require.main === module) {
  seedVolunteerRoles()
    .then(() => {
      console.log('Seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}
