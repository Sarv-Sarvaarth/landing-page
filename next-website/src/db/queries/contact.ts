import { eq, desc, asc, count, and, or, like } from 'drizzle-orm';
import { db } from '../index';
import {
  InsertContactMessage,
  SelectContactMessage,
  contactMessagesTable,
} from '../schema';

// ===== CONTACT MESSAGE CRUD OPERATIONS =====

export async function createContactMessage(data: InsertContactMessage) {
  const result = await db.insert(contactMessagesTable).values(data).returning();
  return result[0];
}

export async function getContactMessageById(id: number): Promise<SelectContactMessage | undefined> {
  const result = await db.select().from(contactMessagesTable).where(eq(contactMessagesTable.id, id));
  return result[0];
}

export async function getAllContactMessages(
  page = 1,
  pageSize = 20,
  status?: string,
  type?: string,
  priority?: string
): Promise<{
  messages: SelectContactMessage[];
  total: number;
}> {
  const conditions = [];

  if (status && status !== 'all') {
    conditions.push(eq(contactMessagesTable.status, status));
  }

  if (type && type !== 'all') {
    conditions.push(eq(contactMessagesTable.type, type));
  }

  if (priority && priority !== 'all') {
    conditions.push(eq(contactMessagesTable.priority, priority));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [messages, [{ total }]] = await Promise.all([
    db
      .select()
      .from(contactMessagesTable)
      .where(whereClause)
      .orderBy(desc(contactMessagesTable.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),

    db
      .select({ total: count() })
      .from(contactMessagesTable)
      .where(whereClause)
  ]);

  return { messages, total };
}

export async function updateContactMessageStatus(
  id: number,
  status: string,
  assignedTo?: number,
  adminNotes?: string
) {
  const updateData: Partial<InsertContactMessage> = {
    status,
    adminNotes: adminNotes || undefined,
  };

  if (assignedTo) {
    updateData.assignedTo = assignedTo;
  }

  if (status === 'replied') {
    updateData.repliedAt = new Date().toISOString();
  }

  if (status === 'resolved') {
    updateData.resolvedAt = new Date().toISOString();
  }

  await db.update(contactMessagesTable)
    .set(updateData)
    .where(eq(contactMessagesTable.id, id));
}

export async function searchContactMessages(
  searchTerm: string,
  page = 1,
  pageSize = 20
): Promise<{
  messages: SelectContactMessage[];
  total: number;
}> {
  const searchConditions = or(
    like(contactMessagesTable.name, `%${searchTerm}%`),
    like(contactMessagesTable.email, `%${searchTerm}%`),
    like(contactMessagesTable.subject, `%${searchTerm}%`),
    like(contactMessagesTable.message, `%${searchTerm}%`)
  );

  const [messages, [{ total }]] = await Promise.all([
    db
      .select()
      .from(contactMessagesTable)
      .where(searchConditions)
      .orderBy(desc(contactMessagesTable.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),

    db
      .select({ total: count() })
      .from(contactMessagesTable)
      .where(searchConditions)
  ]);

  return { messages, total };
}

// ===== ANALYTICS AND REPORTING =====

export async function getContactMessagesStats() {
  const [
    [{ totalMessages }],
    [{ newMessages }],
    [{ readMessages }],
    [{ resolvedMessages }],
    [{ highPriorityMessages }],
    typeStats
  ] = await Promise.all([
    // Total messages
    db
      .select({ totalMessages: count() })
      .from(contactMessagesTable),

    // New messages
    db
      .select({ newMessages: count() })
      .from(contactMessagesTable)
      .where(eq(contactMessagesTable.status, 'new')),

    // Read messages
    db
      .select({ readMessages: count() })
      .from(contactMessagesTable)
      .where(eq(contactMessagesTable.status, 'read')),

    // Resolved messages
    db
      .select({ resolvedMessages: count() })
      .from(contactMessagesTable)
      .where(eq(contactMessagesTable.status, 'resolved')),

    // High priority messages
    db
      .select({ highPriorityMessages: count() })
      .from(contactMessagesTable)
      .where(eq(contactMessagesTable.priority, 'high')),

    // Type statistics
    db
      .select({
        type: contactMessagesTable.type,
        count: count()
      })
      .from(contactMessagesTable)
      .groupBy(contactMessagesTable.type)
  ]);

  return {
    total: totalMessages || 0,
    new: newMessages || 0,
    read: readMessages || 0,
    resolved: resolvedMessages || 0,
    highPriority: highPriorityMessages || 0,
    typeStats: typeStats || []
  };
}

export async function getRecentContactMessages(limit = 10) {
  return db
    .select({
      id: contactMessagesTable.id,
      name: contactMessagesTable.name,
      email: contactMessagesTable.email,
      subject: contactMessagesTable.subject,
      type: contactMessagesTable.type,
      status: contactMessagesTable.status,
      priority: contactMessagesTable.priority,
      createdAt: contactMessagesTable.createdAt
    })
    .from(contactMessagesTable)
    .orderBy(desc(contactMessagesTable.createdAt))
    .limit(limit);
}

export async function markMessageAsRead(id: number) {
  await db.update(contactMessagesTable)
    .set({ status: 'read' })
    .where(eq(contactMessagesTable.id, id));
}

export async function assignMessageToAdmin(id: number, adminId: number) {
  await db.update(contactMessagesTable)
    .set({
      assignedTo: adminId,
      status: 'read' // Auto-mark as read when assigned
    })
    .where(eq(contactMessagesTable.id, id));
}
