import { eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectUser, usersTable } from '../schema';

export async function getUserByEmailAndPassword(email: string, password: string): Promise<SelectUser | undefined> {
  const result = await db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  const user = result[0];

  // Simple password check (in production, use proper password hashing)
  if (user && user.password === password) {
    return user;
  }

  return undefined;
}

export async function getUserById(id: number): Promise<SelectUser | undefined> {
  const result = await db.select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  return result[0];
}

export async function getUserByEmail(email: string): Promise<SelectUser | undefined> {
  const result = await db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return result[0];
}
