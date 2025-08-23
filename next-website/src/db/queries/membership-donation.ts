import { eq, desc, and, sql, count } from 'drizzle-orm';
import { db } from '../index';
import { membershipDonationTable, usersTable, InsertMembershipDonation, SelectMembershipDonation } from '../schema';

// Utility functions for ID generation
export const generateMembershipId = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `SSF${year}${month}${random}`;
};

export const generateTaxReceiptNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `TR${year}${month}${day}${random}`;
};

// Insert new membership or donation record
export const insertMembershipDonation = async (data: InsertMembershipDonation): Promise<SelectMembershipDonation> => {
  try {
    const [result] = await db.insert(membershipDonationTable).values(data).returning();
    return result;
  } catch (error) {
    console.error('Error inserting membership/donation record:', error);
    throw new Error('Failed to save membership/donation record');
  }
};

// Get membership/donation record by ID
export const getMembershipDonationById = async (id: number): Promise<SelectMembershipDonation | null> => {
  try {
    const [result] = await db
      .select()
      .from(membershipDonationTable)
      .where(eq(membershipDonationTable.id, id))
      .limit(1);

    return result || null;
  } catch (error) {
    console.error('Error fetching membership/donation record:', error);
    throw new Error('Failed to fetch record');
  }
};

// Get membership/donation record by email
export const getMembershipDonationByEmail = async (email: string): Promise<SelectMembershipDonation[]> => {
  try {
    const results = await db
      .select()
      .from(membershipDonationTable)
      .where(eq(membershipDonationTable.email, email))
      .orderBy(desc(membershipDonationTable.createdAt));

    return results;
  } catch (error) {
    console.error('Error fetching membership/donation records by email:', error);
    throw new Error('Failed to fetch records');
  }
};

// Get all memberships with pagination
export const getAllMemberships = async (limit = 50, offset = 0): Promise<{
  memberships: SelectMembershipDonation[];
  total: number;
}> => {
  try {
    const [memberships, [{ total }]] = await Promise.all([
      db
        .select()
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.type, 'membership'))
        .orderBy(desc(membershipDonationTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ total: count() })
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.type, 'membership'))
    ]);

    return { memberships, total };
  } catch (error) {
    console.error('Error fetching memberships:', error);
    throw new Error('Failed to fetch memberships');
  }
};

// Get all donations with pagination
export const getAllDonations = async (limit = 50, offset = 0): Promise<{
  donations: SelectMembershipDonation[];
  total: number;
}> => {
  try {
    const [donations, [{ total }]] = await Promise.all([
      db
        .select()
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.type, 'donation'))
        .orderBy(desc(membershipDonationTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ total: count() })
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.type, 'donation'))
    ]);

    return { donations, total };
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw new Error('Failed to fetch donations');
  }
};

// Get pending verifications
export const getPendingVerifications = async (): Promise<SelectMembershipDonation[]> => {
  try {
    const results = await db
      .select()
      .from(membershipDonationTable)
      .where(eq(membershipDonationTable.status, 'pending_verification'))
      .orderBy(desc(membershipDonationTable.createdAt));

    return results;
  } catch (error) {
    console.error('Error fetching pending verifications:', error);
    throw new Error('Failed to fetch pending verifications');
  }
};

// Update record status
export const updateMembershipDonationStatus = async (
  id: number,
  status: string,
  verifiedBy?: number,
  additionalData?: Partial<SelectMembershipDonation>
): Promise<SelectMembershipDonation> => {
  try {
    const updateData: Partial<SelectMembershipDonation> = {
      status,
      verifiedDate: new Date().toISOString(),
      verifiedBy,
      ...additionalData
    };

    // If approving a membership, set dates and generate membership ID
    if (status === 'approved' && additionalData?.type === 'membership') {
      const startDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      updateData.membershipStartDate = startDate.toISOString();
      updateData.membershipExpiryDate = expiryDate.toISOString();
      updateData.membershipId = generateMembershipId();
    }

    const [result] = await db
      .update(membershipDonationTable)
      .set(updateData)
      .where(eq(membershipDonationTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error updating membership/donation status:', error);
    throw new Error('Failed to update record status');
  }
};

// Issue tax receipt
export const issueTaxReceipt = async (id: number): Promise<SelectMembershipDonation> => {
  try {
    const taxReceiptNumber = generateTaxReceiptNumber();

    const [result] = await db
      .update(membershipDonationTable)
      .set({
        taxReceiptNumber,
        taxReceiptIssued: true,
        taxReceiptDate: new Date().toISOString()
      })
      .where(eq(membershipDonationTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error issuing tax receipt:', error);
    throw new Error('Failed to issue tax receipt');
  }
};

// Get active memberships (not expired)
export const getActiveMemberships = async (): Promise<SelectMembershipDonation[]> => {
  try {
    const currentDate = new Date().toISOString();

    const results = await db
      .select()
      .from(membershipDonationTable)
      .where(
        and(
          eq(membershipDonationTable.type, 'membership'),
          eq(membershipDonationTable.status, 'approved'),
          sql`${membershipDonationTable.membershipExpiryDate} > ${currentDate}`
        )
      )
      .orderBy(desc(membershipDonationTable.membershipStartDate));

    return results;
  } catch (error) {
    console.error('Error fetching active memberships:', error);
    throw new Error('Failed to fetch active memberships');
  }
};

// Get statistics
export const getMembershipDonationStats = async (): Promise<{
  totalMemberships: number;
  activeMemberships: number;
  totalDonations: number;
  pendingVerifications: number;
  totalAmount: number;
}> => {
  try {
    const currentDate = new Date().toISOString();

    const [
      [{ totalMemberships }],
      [{ activeMemberships }],
      [{ totalDonations }],
      [{ pendingVerifications }],
      [{ totalAmount }]
    ] = await Promise.all([
      // Total memberships
      db
        .select({ totalMemberships: count() })
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.type, 'membership')),

      // Active memberships
      db
        .select({ activeMemberships: count() })
        .from(membershipDonationTable)
        .where(
          and(
            eq(membershipDonationTable.type, 'membership'),
            eq(membershipDonationTable.status, 'approved'),
            sql`${membershipDonationTable.membershipExpiryDate} > ${currentDate}`
          )
        ),

      // Total donations
      db
        .select({ totalDonations: count() })
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.type, 'donation')),

      // Pending verifications
      db
        .select({ pendingVerifications: count() })
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.status, 'pending_verification')),

      // Total amount (approved only)
      db
        .select({ totalAmount: sql<number>`COALESCE(SUM(${membershipDonationTable.amount}), 0)` })
        .from(membershipDonationTable)
        .where(eq(membershipDonationTable.status, 'approved'))
    ]);

    return {
      totalMemberships,
      activeMemberships,
      totalDonations,
      pendingVerifications,
      totalAmount
    };
  } catch (error) {
    console.error('Error fetching membership/donation statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

// Search memberships/donations by name or email
export const searchMembershipDonation = async (
  searchTerm: string,
  type?: 'membership' | 'donation'
): Promise<SelectMembershipDonation[]> => {
  try {
    const whereConditions = [
      sql`(${membershipDonationTable.fullName} LIKE ${'%' + searchTerm + '%'} OR ${membershipDonationTable.email} LIKE ${'%' + searchTerm + '%'})`
    ];

    if (type) {
      whereConditions.push(eq(membershipDonationTable.type, type));
    }

    const results = await db
      .select()
      .from(membershipDonationTable)
      .where(and(...whereConditions))
      .orderBy(desc(membershipDonationTable.createdAt))
      .limit(100);

    return results;
  } catch (error) {
    console.error('Error searching membership/donation records:', error);
    throw new Error('Failed to search records');
  }
};
