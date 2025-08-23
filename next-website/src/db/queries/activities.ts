import { eq, desc, and, sql, count, like, or } from 'drizzle-orm';
import { db } from '../index';
import { activitiesTable, usersTable, InsertActivity, SelectActivity } from '../schema';

// Insert new activity
export const insertActivity = async (data: InsertActivity): Promise<SelectActivity> => {
  try {
    const [result] = await db.insert(activitiesTable).values(data).returning();
    return result;
  } catch (error) {
    console.error('Error inserting activity:', error);
    throw new Error('Failed to save activity');
  }
};

// Get activity by ID
export const getActivityById = async (id: number): Promise<SelectActivity | null> => {
  try {
    const [result] = await db
      .select()
      .from(activitiesTable)
      .where(eq(activitiesTable.id, id))
      .limit(1);

    return result || null;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw new Error('Failed to fetch activity');
  }
};

// Get all activities with optional filters
export const getAllActivities = async (options: {
  category?: string;
  status?: string;
  featured?: boolean;
  published?: boolean;
  limit?: number;
  offset?: number;
} = {}): Promise<{
  activities: SelectActivity[];
  total: number;
}> => {
  try {
    const { category, status, featured, published, limit = 50, offset = 0 } = options;

    const conditions = [];

    if (category && category !== 'all') {
      conditions.push(eq(activitiesTable.category, category));
    }

    if (status && status !== 'all') {
      conditions.push(eq(activitiesTable.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(activitiesTable.featured, featured));
    }

    if (published !== undefined) {
      if (published) {
        conditions.push(sql`${activitiesTable.publishedAt} IS NOT NULL`);
      } else {
        conditions.push(sql`${activitiesTable.publishedAt} IS NULL`);
      }
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [activities, [{ total }]] = await Promise.all([
      db
        .select()
        .from(activitiesTable)
        .where(whereClause)
        .orderBy(desc(activitiesTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ total: count() })
        .from(activitiesTable)
        .where(whereClause)
    ]);

    return { activities, total };
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw new Error('Failed to fetch activities');
  }
};

// Get published activities for public display
export const getPublishedActivities = async (options: {
  category?: string;
  status?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{
  activities: SelectActivity[];
  total: number;
}> => {
  return getAllActivities({
    ...options,
    published: true
  });
};

// Get featured activities
export const getFeaturedActivities = async (limit = 6): Promise<SelectActivity[]> => {
  try {
    const activities = await db
      .select()
      .from(activitiesTable)
      .where(
        and(
          eq(activitiesTable.featured, true),
          sql`${activitiesTable.publishedAt} IS NOT NULL`
        )
      )
      .orderBy(desc(activitiesTable.updatedAt))
      .limit(limit);

    return activities;
  } catch (error) {
    console.error('Error fetching featured activities:', error);
    throw new Error('Failed to fetch featured activities');
  }
};

// Search activities
export const searchActivities = async (
  searchTerm: string,
  options: {
    category?: string;
    status?: string;
    published?: boolean;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{
  activities: SelectActivity[];
  total: number;
}> => {
  try {
    const { category, status, published, limit = 50, offset = 0 } = options;

    const conditions = [
      or(
        like(activitiesTable.title, `%${searchTerm}%`),
        like(activitiesTable.shortDescription, `%${searchTerm}%`),
        like(activitiesTable.fullDescription, `%${searchTerm}%`),
        like(activitiesTable.tags, `%${searchTerm}%`),
        like(activitiesTable.location, `%${searchTerm}%`)
      )
    ];

    if (category && category !== 'all') {
      conditions.push(eq(activitiesTable.category, category));
    }

    if (status && status !== 'all') {
      conditions.push(eq(activitiesTable.status, status));
    }

    if (published !== undefined) {
      if (published) {
        conditions.push(sql`${activitiesTable.publishedAt} IS NOT NULL`);
      } else {
        conditions.push(sql`${activitiesTable.publishedAt} IS NULL`);
      }
    }

    const whereClause = and(...conditions);

    const [activities, [{ total }]] = await Promise.all([
      db
        .select()
        .from(activitiesTable)
        .where(whereClause)
        .orderBy(desc(activitiesTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ total: count() })
        .from(activitiesTable)
        .where(whereClause)
    ]);

    return { activities, total };
  } catch (error) {
    console.error('Error searching activities:', error);
    throw new Error('Failed to search activities');
  }
};

// Update activity
export const updateActivity = async (
  id: number,
  data: Partial<InsertActivity>
): Promise<SelectActivity> => {
  try {
    const [result] = await db
      .update(activitiesTable)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(activitiesTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error updating activity:', error);
    throw new Error('Failed to update activity');
  }
};

// Delete activity
export const deleteActivity = async (id: number): Promise<void> => {
  try {
    await db
      .delete(activitiesTable)
      .where(eq(activitiesTable.id, id));
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw new Error('Failed to delete activity');
  }
};

// Publish/Unpublish activity
export const publishActivity = async (id: number, publish: boolean): Promise<SelectActivity> => {
  try {
    const [result] = await db
      .update(activitiesTable)
      .set({
        publishedAt: publish ? new Date().toISOString() : null,
        updatedAt: new Date()
      })
      .where(eq(activitiesTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error publishing activity:', error);
    throw new Error('Failed to publish activity');
  }
};

// Toggle featured status
export const toggleFeaturedActivity = async (id: number, featured: boolean): Promise<SelectActivity> => {
  try {
    const [result] = await db
      .update(activitiesTable)
      .set({
        featured,
        updatedAt: new Date()
      })
      .where(eq(activitiesTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error updating featured status:', error);
    throw new Error('Failed to update featured status');
  }
};

// Get activities statistics
export const getActivitiesStats = async (): Promise<{
  totalActivities: number;
  publishedActivities: number;
  featuredActivities: number;
  completedActivities: number;
  ongoingActivities: number;
  upcomingActivities: number;
  totalBeneficiaries: number;
  categoriesStats: { category: string; count: number }[];
}> => {
  try {
    const [
      [{ totalActivities }],
      [{ publishedActivities }],
      [{ featuredActivities }],
      [{ completedActivities }],
      [{ ongoingActivities }],
      [{ upcomingActivities }],
      [{ totalBeneficiaries }],
      categoriesStats
    ] = await Promise.all([
      // Total activities
      db
        .select({ totalActivities: count() })
        .from(activitiesTable),

      // Published activities
      db
        .select({ publishedActivities: count() })
        .from(activitiesTable)
        .where(sql`${activitiesTable.publishedAt} IS NOT NULL`),

      // Featured activities
      db
        .select({ featuredActivities: count() })
        .from(activitiesTable)
        .where(eq(activitiesTable.featured, true)),

      // Completed activities
      db
        .select({ completedActivities: count() })
        .from(activitiesTable)
        .where(eq(activitiesTable.status, 'completed')),

      // Ongoing activities
      db
        .select({ ongoingActivities: count() })
        .from(activitiesTable)
        .where(eq(activitiesTable.status, 'ongoing')),

      // Upcoming activities (upcoming + planned)
      db
        .select({ upcomingActivities: count() })
        .from(activitiesTable)
        .where(
          or(
            eq(activitiesTable.status, 'upcoming'),
            eq(activitiesTable.status, 'planned')
          )
        ),

      // Total beneficiaries
      db
        .select({ totalBeneficiaries: sql<number>`COALESCE(SUM(${activitiesTable.beneficiaries}), 0)` })
        .from(activitiesTable)
        .where(sql`${activitiesTable.publishedAt} IS NOT NULL`),

      // Categories stats
      db
        .select({
          category: activitiesTable.category,
          count: count()
        })
        .from(activitiesTable)
        .where(sql`${activitiesTable.publishedAt} IS NOT NULL`)
        .groupBy(activitiesTable.category)
    ]);

    return {
      totalActivities,
      publishedActivities,
      featuredActivities,
      completedActivities,
      ongoingActivities,
      upcomingActivities,
      totalBeneficiaries,
      categoriesStats
    };
  } catch (error) {
    console.error('Error fetching activities statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

// Get recent activities
export const getRecentActivities = async (limit = 5): Promise<SelectActivity[]> => {
  try {
    const activities = await db
      .select()
      .from(activitiesTable)
      .orderBy(desc(activitiesTable.createdAt))
      .limit(limit);

    return activities;
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw new Error('Failed to fetch recent activities');
  }
};
