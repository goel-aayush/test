'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit, Trash2, X, Check, Upload, FileText, ExternalLink, Loader2 } from 'lucide-react';
import Pagination from '../components/Pagination';
import { getBackendImageUrl } from '@/lib/utils';

interface Notice {
  _id: string;
  title: string;
  date?: string;
  pdfUrl?: string;
  link?: string;
  tag?: string;
  isActive?: boolean;
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tag, setTag] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchNotices = async (pageNumber = page, limitNumber = limit) => {
    try {
      const res = await api.get(`/notices?page=${pageNumber}&limit=${limitNumber}`);
      setNotices(res.data.data || []);
      setPage(res.data.currentPage || pageNumber);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    }
  };

  useEffect(() => {
    fetchNotices(1, limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchNotices(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchNotices(1, newLimit);
  };

  const handleEditClick = (n: Notice) => {
    setEditingId(n._id);
    setTitle(n.title || '');
    setDate(n.date ? new Date(n.date).toISOString().split('T')[0] : '');
    setPdfUrl(n.pdfUrl || n.link || '');
    setSelectedFile(null);
    setTag(n.tag || 'General');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDate('');
    setPdfUrl('');
    setSelectedFile(null);
    setTag('General');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      if (!isPdf) {
        alert('Only PDF files (.pdf) are allowed for notices!');
        e.target.value = '';
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      let finalPdfUrl = pdfUrl;

      // Upload selected file ONLY when saving the notice form!
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('category', 'notices');

        const res = await api.post('/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.data?.data?.url) {
          finalPdfUrl = res.data.data.url;
        }
      }

      const payload = {
        title,
        date: date || new Date().toISOString(),
        pdfUrl: finalPdfUrl,
        link: finalPdfUrl,
        tag,
        isActive: true,
      };

      if (editingId) {
        await api.put(`/notices/${editingId}`, payload);
        setEditingId(null);
      } else {
        await api.post('/notices', payload);
      }

      handleCancelEdit();
      fetchNotices(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || (editingId ? 'Failed to update notice' : 'Failed to add notice'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      fetchNotices(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete notice');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Notices & Announcements</h1>
        <p className="text-xs text-slate-400">Manage institute notices, exam circulars, and PDF announcements</p>
      </div>

      {/* Add / Edit Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          {editingId ? <Edit size={18} className="text-sky-400" /> : <Plus size={18} className="text-sky-400" />}
          {editingId ? 'Edit Notice' : 'Add New Notice'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Notice Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. DMLT Semester Examination Schedule 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tag / Category</label>
              <select
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="General">General</option>
                <option value="Exam">Exam</option>
                <option value="Admission">Admission</option>
                <option value="Event">Event</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Notice Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                PDF File or Notice URL
                {selectedFile && (
                  <span className="ml-2 text-emerald-400 font-medium">
                    (Selected: {selectedFile.name})
                  </span>
                )}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                  placeholder="https://... or select PDF file"
                  value={selectedFile ? `[Selected File] ${selectedFile.name}` : pdfUrl}
                  onChange={(e) => {
                    setPdfUrl(e.target.value);
                    if (selectedFile) setSelectedFile(null);
                  }}
                />
                {selectedFile ? (
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold text-xs rounded-xl transition flex items-center gap-1 shrink-0"
                    title="Remove selected file"
                  >
                    <X size={16} /> Clear File
                  </button>
                ) : (
                  <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shrink-0">
                    <Upload size={16} />
                    <span>Choose PDF</span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={handleFileSelect}
                      disabled={isSubmitting}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : editingId ? (
                <Check size={16} />
              ) : (
                <Plus size={16} />
              )}
              {isSubmitting ? 'Saving Notice...' : editingId ? 'Update Notice' : 'Save Notice'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Tag</th>
                <th className="px-6 py-3.5">Attachment</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-xs">
                    No notices found.
                  </td>
                </tr>
              ) : (
                notices.map((n) => {
                  const docLink = n.pdfUrl || n.link;
                  return (
                    <tr key={n._id} className="hover:bg-slate-800/50 transition">
                      <td className="px-6 py-4 font-semibold text-white max-w-md">{n.title}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {n.date ? new Date(n.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase">
                          {n.tag || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {docLink ? (
                          <a
                            href={getBackendImageUrl(docLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition"
                          >
                            <FileText size={14} /> PDF Notice <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-600">No Attachment</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditClick(n)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(n._id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
