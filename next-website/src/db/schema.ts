import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').notNull().default('user'), // user, admin
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// Volunteer Role Openings Table
export const volunteerRolesTable = sqliteTable('volunteer_roles', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  requirements: text('requirements'), // JSON string of requirements
  skillsNeeded: text('skills_needed'), // JSON string of skills
  timeCommitment: text('time_commitment'), // e.g., "2 hours/week", "weekends"
  location: text('location'), // "Remote", "On-site", "Hybrid", or specific location
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  maxVolunteers: integer('max_volunteers'), // null means unlimited
  currentVolunteers: integer('current_volunteers').default(0).notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// Volunteers Table
export const volunteersTable = sqliteTable('volunteers', {
  id: integer('id').primaryKey(),
  email: text('email').unique().notNull(),
  salutation: text('salutation').notNull(), // Mr., Ms., Mrs., Dr., Prof.
  fullName: text('full_name').notNull(),
  address: text('address').notNull(),
  aadhaarNumber: text('aadhaar_number').notNull(), // Encrypted in production
  panNumber: text('pan_number'), // Optional, for tax receipts
  occupation: text('occupation').notNull(),
  professionalDetails: text('professional_details').notNull(),
  skills: text('skills'), // JSON string of skills
  availability: text('availability'), // JSON string of available times
  preferredRoles: text('preferred_roles'), // JSON string of preferred volunteer areas

  // Application details
  status: text('status').default('pending_review').notNull(), // pending_review, approved, rejected, active, inactive
  applicationDate: text('application_date')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  approvedDate: text('approved_date'),
  approvedBy: integer('approved_by').references(() => usersTable.id), // Admin who approved

  // Role-specific application
  appliedRoleId: integer('applied_role_id').references(() => volunteerRolesTable.id), // null for general application
  roleAssignedDate: text('role_assigned_date'),

  // Contact and engagement
  phoneNumber: text('phone_number'),
  emergencyContact: text('emergency_contact'), // JSON with name, phone, relation
  notes: text('notes'), // Admin notes

  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});



// Type exports for volunteers
export type InsertVolunteerRole = typeof volunteerRolesTable.$inferInsert;
export type SelectVolunteerRole = typeof volunteerRolesTable.$inferSelect;

export type InsertVolunteer = typeof volunteersTable.$inferInsert;
export type SelectVolunteer = typeof volunteersTable.$inferSelect;

// Membership & Donation Table
export const membershipDonationTable = sqliteTable('membership_donation', {
  id: integer('id').primaryKey(),
  email: text('email').notNull(),
  salutation: text('salutation').notNull(), // Mr., Ms., Mrs., Dr., Prof.
  fullName: text('full_name').notNull(),
  address: text('address').notNull(),
  panNumber: text('pan_number').notNull(), // Required for tax receipts
  aadhaarNumber: text('aadhaar_number').notNull(), // For identity verification
  occupation: text('occupation').notNull(),
  professionalDetails: text('professional_details').notNull(),

  // Type and Role
  type: text('type').notNull(), // 'donation' or 'membership'
  role: text('role').notNull(), // 'member' or 'donor'

  // Payment Details
  amount: real('amount').notNull(), // Donation amount or membership fee (1000)
  paymentMode: text('payment_mode').notNull(), // 'cash', 'upi', 'netbanking'

  // Receipt Information
  receiptFilename: text('receipt_filename'), // Original filename
  receiptPath: text('receipt_path'), // File path/URL (for future S3 integration)
  receiptMimeType: text('receipt_mime_type'), // File type
  receiptSize: integer('receipt_size'), // File size in bytes

  // Status and Processing
  status: text('status').default('pending_verification').notNull(),
  // pending_verification, payment_verified, approved, active, rejected
  verifiedDate: text('verified_date'),
  verifiedBy: integer('verified_by').references(() => usersTable.id), // Admin who verified

  // For members
  membershipStartDate: text('membership_start_date'), // When membership becomes active
  membershipExpiryDate: text('membership_expiry_date'), // 1 year from start date
  membershipId: text('membership_id').unique(), // Generated membership ID

  // Tax receipt details
  taxReceiptNumber: text('tax_receipt_number').unique(), // Generated tax receipt number
  taxReceiptIssued: integer('tax_receipt_issued', { mode: 'boolean' }).default(false),
  taxReceiptDate: text('tax_receipt_date'),

  // Administrative
  notes: text('notes'), // Admin notes
  paymentReference: text('payment_reference'), // UPI/Bank reference from receipt

  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// Type exports for membership & donation
export type InsertMembershipDonation = typeof membershipDonationTable.$inferInsert;
export type SelectMembershipDonation = typeof membershipDonationTable.$inferSelect;

// Activities Table
export const activitiesTable = sqliteTable('activities', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(), // 'healthcare', 'education', 'social-welfare', 'community-development'
  status: text('status').notNull().default('planned'), // 'planned', 'upcoming', 'ongoing', 'completed', 'cancelled'
  startDate: text('start_date'), // Start date of activity
  endDate: text('end_date'), // End date of activity (nullable for ongoing)
  location: text('location').notNull(),

  // Content
  shortDescription: text('short_description').notNull(), // Brief description for cards
  fullDescription: text('full_description').notNull(), // Detailed description
  objectives: text('objectives').notNull(), // JSON array of objectives

  // Impact & Metrics
  beneficiaries: integer('beneficiaries').notNull().default(0),
  budget: text('budget'), // Budget amount as string (e.g., "₹3,50,000")
  impact: text('impact'), // JSON array of impact statements

  // Media & Documents
  images: text('images'), // JSON array of image paths/URLs
  videos: text('videos'), // JSON array of video paths/URLs
  documents: text('documents'), // JSON array of document objects {name, url}

  // Team & Organization
  team: text('team'), // JSON array of team member names
  sponsors: text('sponsors'), // JSON array of sponsor names
  tags: text('tags'), // JSON array of tags for searching

  // Admin fields
  createdBy: integer('created_by').references(() => usersTable.id),
  featured: integer('featured', { mode: 'boolean' }).default(false), // Featured on homepage
  publishedAt: text('published_at'), // When the activity was published

  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// Type exports for activities
export type InsertActivity = typeof activitiesTable.$inferInsert;
export type SelectActivity = typeof activitiesTable.$inferSelect;

// Projects Table
export const projectsTable = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(), // URL-friendly version of title
  category: text('category').notNull(), // 'healthcare', 'education', 'social-welfare', 'community-development', 'infrastructure'
  status: text('status').notNull().default('planned'), // 'planned', 'ongoing', 'completed', 'paused', 'archived'
  startDate: text('start_date'), // Start date of project
  endDate: text('end_date'), // End date of project (nullable for ongoing)
  location: text('location').notNull(),

  // Content
  shortDescription: text('short_description').notNull(), // Brief description for cards
  fullDescription: text('full_description').notNull(), // Detailed description
  objectives: text('objectives').notNull(), // JSON array of objectives

  // Financial & Impact
  totalBudget: text('total_budget'), // Total budget as string (e.g., "₹25,00,000")
  fundsRaised: text('funds_raised'), // Funds raised so far
  beneficiaries: integer('beneficiaries').notNull().default(0),
  duration: text('duration'), // Project duration (e.g., "12 months")

  // Project Details
  keyAchievements: text('key_achievements'), // JSON array of achievements
  challenges: text('challenges'), // JSON array of challenges faced
  lessons: text('lessons'), // JSON array of lessons learned
  partners: text('partners'), // JSON array of partner organizations
  team: text('team'), // JSON array of team members

  // Media & Documents
  images: text('images'), // JSON array of image paths/URLs
  documents: text('documents'), // JSON array of document objects {name, type, url}

  // Impact Metrics
  impactMetrics: text('impact_metrics'), // JSON array of impact metric objects
  tags: text('tags'), // JSON array of tags for searching

  // Admin fields
  createdBy: integer('created_by').references(() => usersTable.id),
  featured: integer('featured', { mode: 'boolean' }).default(false), // Featured on homepage
  publishedAt: text('published_at'), // When the project was published

  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// Type exports for projects
export type InsertProject = typeof projectsTable.$inferInsert;
export type SelectProject = typeof projectsTable.$inferSelect;

// Contact Messages Table
export const contactMessagesTable = sqliteTable('contact_messages', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'), // Optional phone number
  subject: text('subject').notNull(),
  message: text('message').notNull(),

  // Contact type/category
  type: text('type').notNull().default('general'), // 'general', 'support', 'partnership', 'volunteer', 'donation'

  // Status tracking
  status: text('status').notNull().default('new'), // 'new', 'read', 'replied', 'resolved', 'archived'
  priority: text('priority').notNull().default('normal'), // 'low', 'normal', 'high', 'urgent'

  // Admin fields
  assignedTo: integer('assigned_to').references(() => usersTable.id), // Admin assigned to handle this
  adminNotes: text('admin_notes'), // Internal notes for admins
  repliedAt: text('replied_at'), // When admin replied
  resolvedAt: text('resolved_at'), // When issue was resolved

  // Metadata
  ipAddress: text('ip_address'), // For spam prevention
  userAgent: text('user_agent'), // Browser info

  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

// Type exports for contact messages
export type InsertContactMessage = typeof contactMessagesTable.$inferInsert;
export type SelectContactMessage = typeof contactMessagesTable.$inferSelect;


