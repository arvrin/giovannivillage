import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase/server';
import Sidebar from './Sidebar';

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userName: string | null = null;
  let userRole: string | null = null;
  try {
    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/admin/login');
    const { data: profile } = await supabase
      .from('users')
      .select('name, role')
      .eq('id', user.id)
      .single();
    userName = profile?.name ?? user.email ?? null;
    userRole = profile?.role ?? null;
  } catch {
    // env not configured — render anyway with placeholders
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar userName={userName} userRole={userRole} />
      <main style={{ flex: 1, padding: '32px 40px', background: 'var(--admin-bg)' }}>
        {children}
      </main>
    </div>
  );
}
