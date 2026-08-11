'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from './api';
import {
  FileText,
  GraduationCap,
  Bell,
  MessageSquareQuote,
  Users,
  Image as ImageIcon,
  FolderOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    courses: 0,
    blogs: 0,
    notices: 0,
    testimonials: 0,
    faculty: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [c, b, n, t, f, g] = await Promise.all([
          api.get('/courses').catch(() => ({ data: { total: 0, data: [] } })),
          api.get('/blog').catch(() => ({ data: { total: 0, data: [] } })),
          api.get('/notices').catch(() => ({ data: { total: 0, data: [] } })),
          api.get('/testimonials').catch(() => ({ data: { total: 0, data: [] } })),
          api.get('/faculty').catch(() => ({ data: { total: 0, data: [] } })),
          api.get('/gallery').catch(() => ({ data: { total: 0, data: [] } })),
        ]);

        setStats({
          courses: c.data.total ?? c.data.data?.length ?? 0,
          blogs: b.data.total ?? b.data.data?.length ?? 0,
          notices: n.data.total ?? n.data.data?.length ?? 0,
          testimonials: t.data.total ?? t.data.data?.length ?? 0,
          faculty: f.data.total ?? f.data.data?.length ?? 0,
          gallery: g.data.total ?? g.data.data?.length ?? 0,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Courses', count: stats.courses, icon: GraduationCap, href: '/admin/courses', color: 'from-blue-600 to-sky-500' },
    { title: 'Blog Posts', count: stats.blogs, icon: FileText, href: '/admin/blogs', color: 'from-emerald-600 to-teal-500' },
    { title: 'Notices', count: stats.notices, icon: Bell, href: '/admin/notices', color: 'from-amber-600 to-orange-500' },
    { title: 'Testimonials', count: stats.testimonials, icon: MessageSquareQuote, href: '/admin/testimonials', color: 'from-purple-600 to-indigo-500' },
    { title: 'Faculty', count: stats.faculty, icon: Users, href: '/admin/faculty', color: 'from-rose-600 to-pink-500' },
    { title: 'Gallery Items', count: stats.gallery, icon: ImageIcon, href: '/admin/gallery', color: 'from-cyan-600 to-blue-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Overview</h1>
        <p className="text-sm text-slate-400">Welcome to the ARPI Content Management Dashboard</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:shadow-xl transition group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-lg`}>
                  <Icon size={24} />
                </div>
                <span className="text-3xl font-black text-white">{loading ? '...' : card.count}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">{card.title}</span>
                <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-sky-400" /> Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blogs/new"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2"
          >
            <FileText size={16} /> Create New Blog
          </Link>
          <Link
            href="/admin/courses/new"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <GraduationCap size={16} /> Add New Course
          </Link>
          <Link
            href="/admin/media"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <FolderOpen size={16} /> Media Library
          </Link>
        </div>
      </div>
    </div>
  );
}
