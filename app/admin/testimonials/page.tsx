'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit, Trash2, X, Check, MessageSquareQuote } from 'lucide-react';
import Pagination from '../components/Pagination';
import { getBackendImageUrl } from '@/lib/utils';

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  quote: string;
  image?: string;
  isActive?: boolean;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchItems = async (pageNumber = page, limitNumber = limit) => {
    try {
      const res = await api.get(`/testimonials?page=${pageNumber}&limit=${limitNumber}`);
      setItems(res.data.data || []);
      setPage(res.data.currentPage || pageNumber);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch testimonials', err);
    }
  };

  useEffect(() => {
    fetchItems(1, limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchItems(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchItems(1, newLimit);
  };

  const handleEditClick = (item: Testimonial) => {
    setEditingId(item._id);
    setName(item.name || '');
    setCourse(item.course || '');
    setQuote(item.quote || '');
    setImage(item.image || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setCourse('');
    setQuote('');
    setImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, { name, course, quote, image });
        setEditingId(null);
      } else {
        await api.post('/testimonials', { name, course, quote, image, isActive: true });
      }
      handleCancelEdit();
      fetchItems(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || (editingId ? 'Failed to update' : 'Failed to add'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchItems(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Testimonials</h1>
          <p className="text-xs text-slate-400">Manage student reviews and testimonials</p>
        </div>
      </div>

      {/* Add / Edit Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          {editingId ? <Edit size={18} className="text-sky-400" /> : <Plus size={18} className="text-sky-400" />}
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Student Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Course / Batch</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. DMLT 2023-25"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Student Image URL</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="/uploads/general/student1.png"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Testimonial Quote</label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
              placeholder="Enter student review quote..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"
            >
              {editingId ? <Check size={16} /> : <Plus size={16} />}
              {editingId ? 'Update Testimonial' : 'Save Testimonial'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
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
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Course</th>
                <th className="px-6 py-3.5">Quote</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 text-xs">
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={getBackendImageUrl(item.image)}
                            alt={item.name}
                            className="size-9 rounded-full object-cover border border-slate-700 bg-slate-800 shrink-0"
                          />
                        ) : (
                          <div className="size-9 rounded-full bg-sky-600/30 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/20 shrink-0">
                            {item.name ? item.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-sky-400 font-medium">{item.course}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-xs truncate">{item.quote}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
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
