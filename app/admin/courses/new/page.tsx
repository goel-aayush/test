'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../api';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateCoursePage() {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [duration, setDuration] = useState('2 Years');
  const [eligibility, setEligibility] = useState('10+2 (Science) or equivalent');
  const [fee, setFee] = useState('Contact for fee details');
  const [seats, setSeats] = useState('60 seats / batch');
  const [tagline, setTagline] = useState('');
  const [overview, setOverview] = useState('');
  const [subjectsText, setSubjectsText] = useState('');
  const [careerText, setCareerText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subjects = subjectsText.split('\n').filter((s) => s.trim());
      const careerOpportunities = careerText.split('\n').filter((c) => c.trim());

      await api.post('/courses', {
        name,
        shortName,
        duration,
        eligibility,
        fee,
        seats,
        tagline,
        overview,
        subjects,
        careerOpportunities,
        isActive,
      });

      router.push('/admin/courses');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/courses"
          className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">Add New Course</h1>
          <p className="text-xs text-slate-400">Create new paramedical diploma or degree program</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Course Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              placeholder="e.g. Diploma in Medical Lab Technician (DMLT)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Short Name / Code</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              placeholder="e.g. DMLT"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Duration</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Eligibility</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Seats Available</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Short Tagline</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
            placeholder="e.g. Master pathology, diagnostics and clinical lab technology."
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Course Overview & Description</label>
          <textarea
            rows={4}
            required
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
            placeholder="Detailed course description..."
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Subjects Covered (One per line)</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-y"
              placeholder="Clinical Pathology&#10;Haematology&#10;Biochemistry"
              value={subjectsText}
              onChange={(e) => setSubjectsText(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Career Opportunities (One per line)</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-y"
              placeholder="Lab Technician in Hospitals&#10;Diagnostic Centre Manager&#10;Blood Bank Officer"
              value={careerText}
              onChange={(e) => setCareerText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-sky-600 focus:ring-0"
            />
            <span>Active on website</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
