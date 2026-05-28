import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySession } from '@/lib/admin-auth';
import Sidebar from './Sidebar';

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already gates this, but verify again so React Server
  // Components can rely on a real session being present.
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) redirect('/admin/login');

  // Display the phone with a light format: 91-XXXXX-XXXXX style.
  const userName = formatPhone(session.phone);
  const userRole = 'Administrator';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar userName={userName} userRole={userRole} />
      <main style={{ flex: 1, padding: '32px 40px', background: 'var(--admin-bg)' }}>
        {children}
      </main>
    </div>
  );
}

function formatPhone(p: string): string {
  // 10-digit input → "+91 91760 84110"
  if (p.length !== 10) return p;
  return `+91 ${p.slice(0, 5)} ${p.slice(5)}`;
}
