import { eq, and, desc, asc, count, like } from 'drizzle-orm';
import { db } from '../index';
import {
  InsertVolunteer,
  SelectVolunteer,
  InsertVolunteerRole,
  SelectVolunteerRole,
  volunteersTable,
  volunteerRolesTable
} from '../schema';

// ===== VOLUNTEER CRUD OPERATIONS =====

export async function createVolunteer(data: InsertVolunteer) {
  const result = await db.insert(volunteersTable).values(data).returning();
  return result[0];
}

export async function getVolunteerById(id: number): Promise<any | undefined> {
  const result = await db.select({
    id: volunteersTable.id,
    email: volunteersTable.email,
    salutation: volunteersTable.salutation,
    fullName: volunteersTable.fullName,
    address: volunteersTable.address,
    aadhaarNumber: volunteersTable.aadhaarNumber,
    panNumber: volunteersTable.panNumber,
    occupation: volunteersTable.occupation,
    professionalDetails: volunteersTable.professionalDetails,
    skills: volunteersTable.skills,
    availability: volunteersTable.availability,
    preferredRoles: volunteersTable.preferredRoles,
    status: volunteersTable.status,
    applicationDate: volunteersTable.applicationDate,
    approvedDate: volunteersTable.approvedDate,
    approvedBy: volunteersTable.approvedBy,
    appliedRoleId: volunteersTable.appliedRoleId,
    roleAssignedDate: volunteersTable.roleAssignedDate,
    phoneNumber: volunteersTable.phoneNumber,
    emergencyContact: volunteersTable.emergencyContact,
    notes: volunteersTable.notes,
    createdAt: volunteersTable.createdAt,
    updatedAt: volunteersTable.updatedAt,
    // Role information
    roleTitle: volunteerRolesTable.title,
    roleDescription: volunteerRolesTable.description,
    roleLocation: volunteerRolesTable.location,
    roleTimeCommitment: volunteerRolesTable.timeCommitment,
  })
    .from(volunteersTable)
    .leftJoin(volunteerRolesTable, eq(volunteersTable.appliedRoleId, volunteerRolesTable.id))
    .where(eq(volunteersTable.id, id));
  return result[0];
}

export async function getVolunteerByEmail(email: string): Promise<SelectVolunteer | undefined> {
  const result = await db.select().from(volunteersTable).where(eq(volunteersTable.email, email));
  return result[0];
}

export async function getAllVolunteers(
  page = 1,
  pageSize = 20,
  status?: string
): Promise<any[]> {
  const baseQuery = db.select({
    id: volunteersTable.id,
    email: volunteersTable.email,
    salutation: volunteersTable.salutation,
    fullName: volunteersTable.fullName,
    address: volunteersTable.address,
    aadhaarNumber: volunteersTable.aadhaarNumber,
    panNumber: volunteersTable.panNumber,
    occupation: volunteersTable.occupation,
    professionalDetails: volunteersTable.professionalDetails,
    skills: volunteersTable.skills,
    availability: volunteersTable.availability,
    preferredRoles: volunteersTable.preferredRoles,
    status: volunteersTable.status,
    applicationDate: volunteersTable.applicationDate,
    approvedDate: volunteersTable.approvedDate,
    approvedBy: volunteersTable.approvedBy,
    appliedRoleId: volunteersTable.appliedRoleId,
    roleAssignedDate: volunteersTable.roleAssignedDate,
    phoneNumber: volunteersTable.phoneNumber,
    emergencyContact: volunteersTable.emergencyContact,
    notes: volunteersTable.notes,
    createdAt: volunteersTable.createdAt,
    updatedAt: volunteersTable.updatedAt,
    // Role information
    roleTitle: volunteerRolesTable.title,
    roleDescription: volunteerRolesTable.description,
    roleLocation: volunteerRolesTable.location,
    roleTimeCommitment: volunteerRolesTable.timeCommitment,
  })
    .from(volunteersTable)
    .leftJoin(volunteerRolesTable, eq(volunteersTable.appliedRoleId, volunteerRolesTable.id));

  if (status) {
    return baseQuery
      .where(eq(volunteersTable.status, status))
      .orderBy(desc(volunteersTable.applicationDate))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  return baseQuery
    .orderBy(desc(volunteersTable.applicationDate))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function updateVolunteerStatus(
  id: number,
  status: string,
  approvedBy?: number,
  notes?: string
) {
  const updateData: Partial<InsertVolunteer> = {
    status,
    notes: notes || undefined,
  };

  if (status === 'approved' && approvedBy) {
    updateData.approvedDate = new Date().toISOString();
    updateData.approvedBy = approvedBy;
  }

  await db.update(volunteersTable)
    .set(updateData)
    .where(eq(volunteersTable.id, id));
}

export async function assignVolunteerToRole(volunteerId: number, roleId: number) {
  await db.update(volunteersTable)
    .set({
      appliedRoleId: roleId,
      roleAssignedDate: new Date().toISOString(),
    })
    .where(eq(volunteersTable.id, volunteerId));

  // Get current count of active volunteers for this role
  const currentCount = await db.select({ count: count() })
    .from(volunteersTable)
    .where(and(
      eq(volunteersTable.appliedRoleId, roleId),
      eq(volunteersTable.status, 'active')
    ));

  // Update the role's current volunteer count
  await db.update(volunteerRolesTable)
    .set({
      currentVolunteers: currentCount[0]?.count || 0,
    })
    .where(eq(volunteerRolesTable.id, roleId));
}

export async function searchVolunteers(searchTerm: string, page = 1, pageSize = 20) {
  return db.select({
    id: volunteersTable.id,
    email: volunteersTable.email,
    salutation: volunteersTable.salutation,
    fullName: volunteersTable.fullName,
    address: volunteersTable.address,
    aadhaarNumber: volunteersTable.aadhaarNumber,
    panNumber: volunteersTable.panNumber,
    occupation: volunteersTable.occupation,
    professionalDetails: volunteersTable.professionalDetails,
    skills: volunteersTable.skills,
    availability: volunteersTable.availability,
    preferredRoles: volunteersTable.preferredRoles,
    status: volunteersTable.status,
    applicationDate: volunteersTable.applicationDate,
    approvedDate: volunteersTable.approvedDate,
    approvedBy: volunteersTable.approvedBy,
    appliedRoleId: volunteersTable.appliedRoleId,
    roleAssignedDate: volunteersTable.roleAssignedDate,
    phoneNumber: volunteersTable.phoneNumber,
    emergencyContact: volunteersTable.emergencyContact,
    notes: volunteersTable.notes,
    createdAt: volunteersTable.createdAt,
    updatedAt: volunteersTable.updatedAt,
    // Role information
    roleTitle: volunteerRolesTable.title,
    roleDescription: volunteerRolesTable.description,
    roleLocation: volunteerRolesTable.location,
    roleTimeCommitment: volunteerRolesTable.timeCommitment,
  })
    .from(volunteersTable)
    .leftJoin(volunteerRolesTable, eq(volunteersTable.appliedRoleId, volunteerRolesTable.id))
    .where(
      like(volunteersTable.fullName, `%${searchTerm}%`)
    )
    .orderBy(desc(volunteersTable.applicationDate))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

// ===== VOLUNTEER ROLE CRUD OPERATIONS =====

export async function createVolunteerRole(data: InsertVolunteerRole) {
  const result = await db.insert(volunteerRolesTable).values(data).returning();
  return result[0];
}

export async function getAllVolunteerRoles(activeOnly = true): Promise<SelectVolunteerRole[]> {
  if (activeOnly) {
    return db.select()
      .from(volunteerRolesTable)
      .where(eq(volunteerRolesTable.isActive, true))
      .orderBy(asc(volunteerRolesTable.title));
  }

  console.log('activeOnly===========')

  return db.select()
    .from(volunteerRolesTable)
    .orderBy(asc(volunteerRolesTable.title));
}

export async function getVolunteerRoleById(id: number): Promise<SelectVolunteerRole | undefined> {
  const result = await db.select().from(volunteerRolesTable).where(eq(volunteerRolesTable.id, id));
  return result[0];
}

export async function updateVolunteerRole(id: number, data: Partial<InsertVolunteerRole>) {
  await db.update(volunteerRolesTable)
    .set(data)
    .where(eq(volunteerRolesTable.id, id));
}

export async function getAvailableVolunteerRoles(): Promise<SelectVolunteerRole[]> {
  return db.select()
    .from(volunteerRolesTable)
    .where(
      and(
        eq(volunteerRolesTable.isActive, true),
        // Only roles that haven't reached max capacity (or have no limit)
      )
    )
    .orderBy(asc(volunteerRolesTable.title));
}



// ===== ANALYTICS AND REPORTING =====

export async function getVolunteerStats() {
  const totalVolunteers = await db.select({ count: count() }).from(volunteersTable);
  const activeVolunteers = await db.select({ count: count() })
    .from(volunteersTable)
    .where(eq(volunteersTable.status, 'active'));
  const pendingApplications = await db.select({ count: count() })
    .from(volunteersTable)
    .where(eq(volunteersTable.status, 'pending_review'));

  return {
    total: totalVolunteers[0]?.count || 0,
    active: activeVolunteers[0]?.count || 0,
    pending: pendingApplications[0]?.count || 0,
  };
}

export async function getActiveVolunteers(limit = 10) {
  return db.select({
    id: volunteersTable.id,
    fullName: volunteersTable.fullName,
    email: volunteersTable.email,
    occupation: volunteersTable.occupation,
    appliedRoleId: volunteersTable.appliedRoleId,
  })
    .from(volunteersTable)
    .where(eq(volunteersTable.status, 'active'))
    .orderBy(desc(volunteersTable.applicationDate))
    .limit(limit);
}
