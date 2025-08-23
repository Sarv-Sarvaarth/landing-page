import { eq, desc, and, sql, count, like, or } from 'drizzle-orm';
import { db } from '../index';
import { projectsTable, usersTable, InsertProject, SelectProject } from '../schema';

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Insert new project
export const insertProject = async (data: InsertProject): Promise<SelectProject> => {
  try {
    // Generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = generateSlug(data.title);

      // Check if slug already exists and make it unique
      let baseSlug = data.slug;
      let counter = 1;

      while (true) {
        const existing = await db
          .select({ id: projectsTable.id })
          .from(projectsTable)
          .where(eq(projectsTable.slug, data.slug))
          .limit(1);

        if (existing.length === 0) break;

        data.slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const [result] = await db.insert(projectsTable).values(data).returning();
    return result;
  } catch (error) {
    console.error('Error inserting project:', error);
    throw new Error('Failed to save project');
  }
};

// Get project by ID
export const getProjectById = async (id: number): Promise<SelectProject | null> => {
  try {
    const [result] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1);

    return result || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }
};

// Get project by slug
export const getProjectBySlug = async (slug: string): Promise<SelectProject | null> => {
  try {
    const [result] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.slug, slug))
      .limit(1);

    return result || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    throw new Error('Failed to fetch project');
  }
};

// Get all projects with optional filters
export const getAllProjects = async (options: {
  category?: string;
  status?: string;
  featured?: boolean;
  published?: boolean;
  year?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{
  projects: SelectProject[];
  total: number;
}> => {
  try {
    const { category, status, featured, published, year, limit = 50, offset = 0 } = options;

    const conditions = [];

    if (category && category !== 'all') {
      conditions.push(eq(projectsTable.category, category));
    }

    if (status && status !== 'all') {
      conditions.push(eq(projectsTable.status, status));
    }

    if (featured !== undefined) {
      conditions.push(eq(projectsTable.featured, featured));
    }

    if (published !== undefined) {
      if (published) {
        conditions.push(sql`${projectsTable.publishedAt} IS NOT NULL`);
      } else {
        conditions.push(sql`${projectsTable.publishedAt} IS NULL`);
      }
    }

    if (year && year !== 'all') {
      conditions.push(sql`strftime('%Y', ${projectsTable.startDate}) = ${year}`);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [projects, [{ total }]] = await Promise.all([
      db
        .select()
        .from(projectsTable)
        .where(whereClause)
        .orderBy(desc(projectsTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ total: count() })
        .from(projectsTable)
        .where(whereClause)
    ]);

    return { projects, total };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

// Get published projects for public display
export const getPublishedProjects = async (options: {
  category?: string;
  status?: string;
  year?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{
  projects: SelectProject[];
  total: number;
}> => {
  return getAllProjects({
    ...options,
    published: true
  });
};

// Get featured projects
export const getFeaturedProjects = async (limit = 6): Promise<SelectProject[]> => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .where(
        and(
          eq(projectsTable.featured, true),
          sql`${projectsTable.publishedAt} IS NOT NULL`
        )
      )
      .orderBy(desc(projectsTable.updatedAt))
      .limit(limit);

    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw new Error('Failed to fetch featured projects');
  }
};

// Search projects
export const searchProjects = async (
  searchTerm: string,
  options: {
    category?: string;
    status?: string;
    year?: string;
    published?: boolean;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{
  projects: SelectProject[];
  total: number;
}> => {
  try {
    const { category, status, year, published, limit = 50, offset = 0 } = options;

    const conditions = [
      or(
        like(projectsTable.title, `%${searchTerm}%`),
        like(projectsTable.shortDescription, `%${searchTerm}%`),
        like(projectsTable.fullDescription, `%${searchTerm}%`),
        like(projectsTable.tags, `%${searchTerm}%`),
        like(projectsTable.location, `%${searchTerm}%`)
      )
    ];

    if (category && category !== 'all') {
      conditions.push(eq(projectsTable.category, category));
    }

    if (status && status !== 'all') {
      conditions.push(eq(projectsTable.status, status));
    }

    if (year && year !== 'all') {
      conditions.push(sql`strftime('%Y', ${projectsTable.startDate}) = ${year}`);
    }

    if (published !== undefined) {
      if (published) {
        conditions.push(sql`${projectsTable.publishedAt} IS NOT NULL`);
      } else {
        conditions.push(sql`${projectsTable.publishedAt} IS NULL`);
      }
    }

    const whereClause = and(...conditions);

    const [projects, [{ total }]] = await Promise.all([
      db
        .select()
        .from(projectsTable)
        .where(whereClause)
        .orderBy(desc(projectsTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ total: count() })
        .from(projectsTable)
        .where(whereClause)
    ]);

    return { projects, total };
  } catch (error) {
    console.error('Error searching projects:', error);
    throw new Error('Failed to search projects');
  }
};

// Update project
export const updateProject = async (
  id: number,
  data: Partial<InsertProject>
): Promise<SelectProject> => {
  try {
    // Generate new slug if title is being updated
    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title);

      // Check if slug already exists (excluding current project)
      let baseSlug = data.slug;
      let counter = 1;

      while (true) {
        const existing = await db
          .select({ id: projectsTable.id })
          .from(projectsTable)
          .where(
            and(
              eq(projectsTable.slug, data.slug),
              sql`${projectsTable.id} != ${id}`
            )
          )
          .limit(1);

        if (existing.length === 0) break;

        data.slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const [result] = await db
      .update(projectsTable)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(projectsTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

// Delete project
export const deleteProject = async (id: number): Promise<void> => {
  try {
    await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

// Publish/Unpublish project
export const publishProject = async (id: number, publish: boolean): Promise<SelectProject> => {
  try {
    const [result] = await db
      .update(projectsTable)
      .set({
        publishedAt: publish ? new Date().toISOString() : null,
        updatedAt: new Date()
      })
      .where(eq(projectsTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error publishing project:', error);
    throw new Error('Failed to publish project');
  }
};

// Toggle featured status
export const toggleFeaturedProject = async (id: number, featured: boolean): Promise<SelectProject> => {
  try {
    const [result] = await db
      .update(projectsTable)
      .set({
        featured,
        updatedAt: new Date()
      })
      .where(eq(projectsTable.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error('Error updating featured status:', error);
    throw new Error('Failed to update featured status');
  }
};

// Get projects statistics
export const getProjectsStats = async (): Promise<{
  totalProjects: number;
  publishedProjects: number;
  featuredProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  pausedProjects: number;
  totalBeneficiaries: number;
  totalBudget: number;
  categoriesStats: { category: string; count: number }[];
}> => {
  try {
    const [
      [{ totalProjects }],
      [{ publishedProjects }],
      [{ featuredProjects }],
      [{ completedProjects }],
      [{ ongoingProjects }],
      [{ pausedProjects }],
      [{ totalBeneficiaries }],
      [{ totalBudget }],
      categoriesStats
    ] = await Promise.all([
      // Total projects
      db
        .select({ totalProjects: count() })
        .from(projectsTable),

      // Published projects
      db
        .select({ publishedProjects: count() })
        .from(projectsTable)
        .where(sql`${projectsTable.publishedAt} IS NOT NULL`),

      // Featured projects
      db
        .select({ featuredProjects: count() })
        .from(projectsTable)
        .where(eq(projectsTable.featured, true)),

      // Completed projects
      db
        .select({ completedProjects: count() })
        .from(projectsTable)
        .where(eq(projectsTable.status, 'completed')),

      // Ongoing projects
      db
        .select({ ongoingProjects: count() })
        .from(projectsTable)
        .where(eq(projectsTable.status, 'ongoing')),

      // Paused projects
      db
        .select({ pausedProjects: count() })
        .from(projectsTable)
        .where(
          or(
            eq(projectsTable.status, 'paused'),
            eq(projectsTable.status, 'archived')
          )
        ),

      // Total beneficiaries
      db
        .select({ totalBeneficiaries: sql<number>`COALESCE(SUM(${projectsTable.beneficiaries}), 0)` })
        .from(projectsTable)
        .where(sql`${projectsTable.publishedAt} IS NOT NULL`),

      // Total budget (estimated from budget strings)
      db
        .select({ totalBudget: sql<number>`COALESCE(COUNT(*), 0)` })
        .from(projectsTable)
        .where(sql`${projectsTable.publishedAt} IS NOT NULL AND ${projectsTable.totalBudget} IS NOT NULL`),

      // Categories stats
      db
        .select({
          category: projectsTable.category,
          count: count()
        })
        .from(projectsTable)
        .where(sql`${projectsTable.publishedAt} IS NOT NULL`)
        .groupBy(projectsTable.category)
    ]);

    return {
      totalProjects,
      publishedProjects,
      featuredProjects,
      completedProjects,
      ongoingProjects,
      pausedProjects,
      totalBeneficiaries,
      totalBudget,
      categoriesStats
    };
  } catch (error) {
    console.error('Error fetching projects statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

// Get recent projects
export const getRecentProjects = async (limit = 5): Promise<SelectProject[]> => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.createdAt))
      .limit(limit);

    return projects;
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    throw new Error('Failed to fetch recent projects');
  }
};
