'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../api';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [duration, setDuration] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [fee, setFee] = useState('');
  const [seats, setSeats] = useState('');
  const [tagline, setTagline] = useState('');
  const [overview, setOverview] = useState('');
  const [subjectsText, setSubjectsText] = useState('');
  const [careerText, setCareerText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${slug}`);
        const c = res.data.data;
        if (c) {
          setName(c.name || '');
          setShortName(c.shortName || '');
          setDuration(c.duration || '');
          setEligibility(c.eligibility || '');
          setFee(c.fee || '');
          setSeats(c.seats || '');
          setTagline(c.tagline || '');
          setOverview(c.overview || '');
          setIsActive(c.isActive ?? true);

          if (Array.isArray(c.subjects)) setSubjectsText(c.subjects.join('\n'));
          if (Array.isArray(c.careerOpportunities)) setCareerText(c.careerOpportunities.join('\n'));
        }
      } catch (err) {
        console.error('Failed to fetch course', err);
      } finally {
        setFetching(false);
      }
    };
    fetchCourse();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subjects = subjectsText.split('\n').filter((s) => s.trim());
      const careerOpportunities = careerText.split('\n').filter((c) => c.trim());

      await api.put(`/courses/${slug}`, {
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
      alert(err.response?.data?.message || 'Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-2">
        <Loader2 size={20} className="animate-spin" /> Loading course data...
      </div>
    );
  }

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
          <h1 className="text-2xl font-black text-white">Edit Course</h1>
          <p className="text-xs text-slate-400">Update course details, eligibility, subjects, and fees</p>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Short Name / Code</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
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
              value={subjectsText}
              onChange={(e) => setSubjectsText(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Career Opportunities (One per line)</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-y"
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
            {loading ? 'Updating...' : 'Update Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
