'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Mail,
  BookOpen,
  Users,
  FileSpreadsheet,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import SignOutButton from './SignOutButton';

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  match: (p: string) => boolean;
}

const NAV: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, match: (p) => p === '/admin' },
  {
    href: '/admin/leads',
    label: 'Leads',
    icon: Mail,
    match: (p) =>
      p === '/admin/leads' || (p.startsWith('/admin/leads/') && !p.startsWith('/admin/leads/sheet')),
  },
  {
    href: '/admin/leads/sheet',
    label: 'Live Sheet',
    icon: FileSpreadsheet,
    match: (p) => p.startsWith('/admin/leads/sheet'),
  },
  { href: '/admin/sops', label: 'SOPs', icon: BookOpen, match: (p) => p.startsWith('/admin/sops') },
  { href: '/admin/team', label: 'Team', icon: Users, match: (p) => p.startsWith('/admin/team') },
];

interface SidebarProps {
  userName: string | null;
  userRole: string | null;
}

export default function Sidebar({ userName, userRole }: SidebarProps) {
  const pathname = usePathname() || '/admin';
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restore state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('giovanni-admin-sidebar');
    if (saved === 'collapsed') setCollapsed(true);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('giovanni-admin-sidebar', next ? 'collapsed' : 'expanded');
  };

  const W = collapsed ? 64 : 240;

  return (
    <aside
      style={{
        width: W,
        flexShrink: 0,
        background: 'var(--admin-surface)',
        borderRight: '1px solid var(--admin-border)',
        padding: collapsed ? '20px 8px' : '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        transition: mounted ? 'width 220ms cubic-bezier(0.4, 0, 0.2, 1), padding 220ms ease' : 'none',
      }}
    >
      {/* Brand block — logo always; wordmark text only when expanded */}
      <Link
        href="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 10,
          padding: '6px 4px 18px',
          borderBottom: '1px solid var(--admin-border)',
          marginBottom: 14,
        }}
      >
        <Image
          src="/images/logo/gvr-final-logo.png"
          alt="Giovanni Village"
          width={collapsed ? 36 : 156}
          height={collapsed ? 36 : 50}
          priority
          style={{
            height: collapsed ? 32 : 36,
            width: 'auto',
            objectFit: 'contain',
            transition: mounted ? 'height 220ms ease' : 'none',
          }}
        />
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: collapsed ? '10px' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 8,
                fontSize: 13.5,
                color: 'var(--admin-text)',
                fontWeight: active ? 600 : 500,
                background: active ? 'var(--admin-alt)' : 'transparent',
              }}
            >
              <Icon
                size={17}
                strokeWidth={active ? 1.9 : 1.6}
                style={{ color: active ? 'var(--admin-text)' : 'var(--admin-text-muted)' }}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer block */}
      <div
        style={{
          padding: collapsed ? '12px 4px' : '14px 12px',
          borderTop: '1px solid var(--admin-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: collapsed ? 'center' : 'stretch',
        }}
      >
        {!collapsed && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 500 }}>{userName ?? 'Signed-in user'}</p>
            <p
              style={{
                fontSize: 11,
                color: 'var(--admin-text-muted)',
                textTransform: 'capitalize',
              }}
            >
              {userRole ?? '—'}
            </p>
          </div>
        )}

        {!collapsed && <SignOutButton />}

        <button
          onClick={toggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            marginTop: collapsed ? 0 : 2,
            width: collapsed ? 32 : 'fit-content',
            height: 28,
            padding: collapsed ? 0 : '0 8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'transparent',
            border: '1px solid var(--admin-border)',
            borderRadius: 6,
            fontSize: 11,
            color: 'var(--admin-text-muted)',
            cursor: 'pointer',
            justifyContent: 'center',
          }}
        >
          {collapsed ? <ChevronsRight size={12} /> : (
            <>
              <ChevronsLeft size={12} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
