'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Pagination from '../components/Pagination';

interface Course {
  _id: string;
  name: string;
  slug: string;
  shortName?: string;
  duration?: string;
  eligibility?: string;
  fee?: string;
  isActive?: boolean;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCourses = async (pageNumber = page, limitNumber = limit) => {
    try {
      const res = await api.get(`/courses?page=${pageNumber}&limit=${limitNumber}`);
      setCourses(res.data.data || []);
      setPage(res.data.currentPage || pageNumber);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    }
  };

  useEffect(() => {
    fetchCourses(1, limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchCourses(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchCourses(1, newLimit);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${slug}`);
      fetchCourses(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Courses Management</h1>
          <p className="text-xs text-slate-400">Manage paramedical diploma & degree programs</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2"
        >
          <Plus size={16} /> Add New Course
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Course Name</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Fees</th>
                <th className="px-6 py-3.5">Eligibility</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-xs">
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 font-semibold text-white max-w-xs">{course.name}</td>
                    <td className="px-6 py-4 text-xs text-sky-400 font-medium">{course.duration}</td>
                    <td className="px-6 py-4 text-xs text-emerald-400 font-medium">{course.fee || 'Contact for fee details'}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-xs truncate">{course.eligibility}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/courses/${course.slug}`}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(course.slug)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pages={pages}
          total={total}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </div>
  );
}
