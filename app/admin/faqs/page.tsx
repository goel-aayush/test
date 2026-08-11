'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
import Pagination from '../components/Pagination';

interface Faq {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  section?: string;
  isActive?: boolean;
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [section, setSection] = useState('general');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFaqs = async (pageNumber = page, limitNumber = limit) => {
    try {
      const res = await api.get(`/faqs?page=${pageNumber}&limit=${limitNumber}`);
      setFaqs(res.data.data || []);
      setPage(res.data.currentPage || pageNumber);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch FAQs', err);
    }
  };

  useEffect(() => {
    fetchFaqs(1, limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchFaqs(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchFaqs(1, newLimit);
  };

  const handleEditClick = (faq: Faq) => {
    setEditingId(faq._id);
    setQuestion(faq.question || '');
    setAnswer(faq.answer || '');
    setSection(faq.section || faq.category || 'general');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
    setSection('general');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { question, answer, section, isActive: true };
      if (editingId) {
        await api.put(`/faqs/${editingId}`, payload);
        setEditingId(null);
      } else {
        await api.post('/faqs', payload);
      }
      handleCancelEdit();
      fetchFaqs(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || (editingId ? 'Failed to update FAQ' : 'Failed to add FAQ'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      fetchFaqs(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete FAQ');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-400">Manage institute FAQs and answers</p>
      </div>

      {/* Add / Edit Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          {editingId ? <Edit size={18} className="text-sky-400" /> : <Plus size={18} className="text-sky-400" />}
          {editingId ? 'Edit FAQ' : 'Add New FAQ'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Question</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. What is the eligibility for DMLT course?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Section / Category</label>
              <select
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="general">General</option>
                <option value="admission">Admission</option>
                <option value="courses">Courses</option>
                <option value="placement">Placement</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Answer</label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
              placeholder="Enter detailed answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"
            >
              {editingId ? <Check size={16} /> : <Plus size={16} />}
              {editingId ? 'Update FAQ' : 'Save FAQ'}
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
                <th className="px-6 py-3.5">Question</th>
                <th className="px-6 py-3.5">Answer</th>
                <th className="px-6 py-3.5">Section</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 text-xs">
                    No FAQs found.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq._id} className="hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 font-semibold text-white max-w-xs">{faq.question}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-sm truncate">{faq.answer}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 uppercase">
                        {faq.section || faq.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(faq)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(faq._id)}
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
