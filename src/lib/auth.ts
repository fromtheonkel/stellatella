import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface Session {
  gebruikersId: number;
  gebruikersnaam: string;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie.value) as Session;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}
