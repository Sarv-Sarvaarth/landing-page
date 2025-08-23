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


