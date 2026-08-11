'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../api';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Career');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('ARPI Editorial Team');
  const [authorPhoto, setAuthorPhoto] = useState('/uploads/blog/author-arpi-team.png');
  const [bodyText, setBodyText] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const paragraphs = bodyText
        .split('\n\n')
        .filter((p) => p.trim())
        .map((text) => ({ type: 'paragraph', text }));

      await api.post('/blog', {
        title,
        category,
        excerpt,
        coverImage,
        featuredImage: coverImage,
        author,
        authorPhoto,
        body: paragraphs.length ? paragraphs : [{ type: 'paragraph', text: bodyText }],
        isPublished,
      });

      router.push('/admin/blogs');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">Create New Blog Post</h1>
          <p className="text-xs text-slate-400">Publish news, career guidance, and academic updates</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              placeholder="e.g. Scope of Medical Lab Technician in 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
            <select
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Career Guidance">Career Guidance</option>
              <option value="Career">Career & Jobs</option>
              <option value="Course Info">Course Info</option>
              <option value="Admission Tips">Admission Tips</option>
              <option value="Student Success Stories">Student Success Stories</option>
              <option value="Pathology">Pathology & Diagnostics</option>
              <option value="Radiology">Radiology & Imaging</option>
              <option value="Academic">Academic News</option>
              <option value="Campus">Campus Life</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Author Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Author Photo URL</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              placeholder="/uploads/blog/author.png"
              value={authorPhoto}
              onChange={(e) => setAuthorPhoto(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Cover Image URL</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              placeholder="/uploads/blog/cover.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Excerpt / Short Summary</label>
          <textarea
            rows={2}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
            placeholder="Brief summary displayed on blog list..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Full Article Body (Separate paragraphs with double newlines)</label>
          <textarea
            rows={8}
            required
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-y"
            placeholder="Write full article body content..."
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-sky-600 focus:ring-0"
            />
            <span>Publish immediately</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Publishing...' : 'Save & Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}
