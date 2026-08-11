'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
import Pagination from '../components/Pagination';

interface FacultyMember {
  _id: string;
  name: string;
  designation: string;
  qualification: string;
  experience?: string;
  type?: string;
  bio?: string;
  image?: string;
}

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [type, setType] = useState('Core');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFaculty = async (pageNumber = page, limitNumber = limit) => {
    try {
      const res = await api.get(`/faculty?page=${pageNumber}&limit=${limitNumber}`);
      setFaculty(res.data.data || []);
      setPage(res.data.currentPage || pageNumber);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch faculty', err);
    }
  };

  useEffect(() => {
    fetchFaculty(1, limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchFaculty(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchFaculty(1, newLimit);
  };

  const handleEditClick = (f: FacultyMember) => {
    setEditingId(f._id);
    setName(f.name || '');
    setDesignation(f.designation || '');
    setQualification(f.qualification || '');
    setExperience(f.experience || '');
    setType(f.type || 'Core');
    setBio(f.bio || '');
    setImage(f.image || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDesignation('');
    setQualification('');
    setExperience('');
    setType('Core');
    setBio('');
    setImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { name, role: designation, designation, qualification, experience, type, bio, image };
      if (editingId) {
        await api.put(`/faculty/${editingId}`, payload);
        setEditingId(null);
      } else {
        await api.post('/faculty', payload);
      }
      handleCancelEdit();
      fetchFaculty(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || (editingId ? 'Failed to update faculty' : 'Failed to add faculty'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      await api.delete(`/faculty/${id}`);
      fetchFaculty(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete faculty');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Faculty Directory</h1>
        <p className="text-xs text-slate-400">Manage institute faculty members and professors</p>
      </div>

      {/* Add / Edit Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          {editingId ? <Edit size={18} className="text-sky-400" /> : <Plus size={18} className="text-sky-400" />}
          {editingId ? 'Edit Faculty Member' : 'Add New Faculty Member'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. Dr. A. K. Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Designation</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. Senior Professor"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Qualification</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. MD (Pathology), MBBS"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Experience</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. 12+ Years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Faculty Type</label>
              <select
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Core">Core Faculty</option>
                <option value="Visiting">Visiting Faculty</option>
                <option value="HOD">HOD / Department Head</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="/uploads/faculty/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Short Bio</label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
              placeholder="Enter brief biography..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-1.5"
            >
              {editingId ? <Check size={16} /> : <Plus size={16} />}
              {editingId ? 'Update Faculty' : 'Save Faculty'}
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
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Designation</th>
                <th className="px-6 py-3.5">Qualification</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {faculty.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-xs">
                    No faculty members found.
                  </td>
                </tr>
              ) : (
                faculty.map((f) => (
                  <tr key={f._id} className="hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 font-semibold text-white">{f.name}</td>
                    <td className="px-6 py-4 text-xs text-slate-300">{f.designation}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{f.qualification}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 uppercase">
                        {f.type || 'Core'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(f)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(f._id)}
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
