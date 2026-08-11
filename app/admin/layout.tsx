'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from './AuthContext';
import ChangePasswordModal from './components/ChangePasswordModal';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Bell,
  MessageSquareQuote,
  Users,
  Image as ImageIcon,
  HelpCircle,
  Building2,
  Settings,
  FolderOpen,
  LogOut,
  ChevronDown,
  KeyRound,
} from 'lucide-react';

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Protect admin routes except /admin/login
  useEffect(() => {
    if (mounted && pathname !== '/admin/login') {
      const token = localStorage.getItem('arpi_token');
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [mounted, pathname, router]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Login page has its own layout without sidebar/topbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    router.push('/admin/login');
  };

  const navItems = [
    { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { title: 'Blog Posts', path: '/admin/blogs', icon: FileText },
    { title: 'Courses', path: '/admin/courses', icon: GraduationCap },
    { title: 'Notices', path: '/admin/notices', icon: Bell },
    { title: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { title: 'Faculty', path: '/admin/faculty', icon: Users },
    { title: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { title: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { title: 'Facilities', path: '/admin/facilities', icon: Building2 },
    { title: 'Site Settings', path: '/admin/settings', icon: Settings },
    { title: 'Media Library', path: '/admin/media', icon: FolderOpen },
  ];

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed top-0 bottom-0 left-0 z-40 overflow-y-auto">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30">
            <GraduationCap size={22} />
          </div>
          <span className="text-lg font-black text-white tracking-tight">
            ARPI <span className="text-sky-400 font-bold">CMS</span>
          </span>
        </div>

        <nav className="p-4 flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/25'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-950/60 hover:border-sky-500/50 transition ${
                dropdownOpen ? 'border-sky-500 shadow-md shadow-sky-500/10' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 text-white font-bold text-sm flex items-center justify-center shadow">
                {userInitial}
              </div>
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="text-xs font-bold text-white">{user?.name || 'Admin'}</span>
                <span className="text-[10px] text-slate-400">Administrator</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-lg mb-1">
                  <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
                    {userInitial}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <strong className="text-sm font-bold text-white truncate">
                      {user?.name || 'Admin User'}
                    </strong>
                    <span className="text-xs text-slate-400 truncate">
                      {user?.email || 'admin@arpi.ac.in'}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-800 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setIsPasswordModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-left"
                >
                  <KeyRound size={16} />
                  <span>Change Password</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push('/admin/settings');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition text-left"
                >
                  <Settings size={16} />
                  <span>Site Settings</span>
                </button>

                <div className="h-px bg-slate-800 my-1" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 flex-1">{children}</main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
