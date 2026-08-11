'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit, Trash2, X, Check } from 'lucide-react';
import Pagination from '../components/Pagination';
import { getBackendImageUrl } from '@/lib/utils';

interface GalleryItem {
  _id: string;
  title: string;
  category?: string;
  image: string;
  caption?: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus');
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchGallery = async (pageNumber = page, limitNumber = limit) => {
    try {
      const res = await api.get(`/gallery?page=${pageNumber}&limit=${limitNumber}`);
      setItems(res.data.data || []);
      setPage(res.data.currentPage || pageNumber);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch gallery items', err);
    }
  };

  useEffect(() => {
    fetchGallery(1, limit);
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchGallery(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchGallery(1, newLimit);
  };

  const handleEditClick = (g: GalleryItem) => {
    setEditingId(g._id);
    setTitle(g.title || '');
    setCategory(g.category || 'Campus');
    setImage(g.image || '');
    setCaption(g.caption || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Campus');
    setImage('');
    setCaption('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        category,
        image,
        src: image,
        caption,
        alt: title || caption || 'ARPI Gallery Photo',
      };
      if (editingId) {
        await api.put(`/gallery/${editingId}`, payload);
        setEditingId(null);
      } else {
        await api.post('/gallery', payload);
      }
      handleCancelEdit();
      fetchGallery(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || (editingId ? 'Failed to update image' : 'Failed to add image'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery(page, limit);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete gallery item');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Photo Gallery</h1>
        <p className="text-xs text-slate-400">Manage campus photos, lab events, and student activities</p>
      </div>

      {/* Add / Edit Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          {editingId ? <Edit size={18} className="text-sky-400" /> : <Plus size={18} className="text-sky-400" />}
          {editingId ? 'Edit Gallery Photo' : 'Add New Photo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Photo Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. Pathology Lab Practical Session"
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
                <option value="Campus">Campus</option>
                <option value="Labs">Labs</option>
                <option value="Events">Events</option>
                <option value="Students">Students</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL / Path</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                placeholder="e.g. /uploads/general/facility-lab.png"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Caption / Description</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              placeholder="Short description of the photo"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2"
            >
              {editingId ? <Check size={16} /> : <Plus size={16} />}
              {editingId ? 'Update Photo' : 'Save Photo'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid List Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-xs">
              No gallery items found.
            </div>
          ) : (
            items.map((g) => {
              const imageSrc = g.image || (g as any).src;
              return (
                <div key={g._id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group">
                  <div className="h-40 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={getBackendImageUrl(imageSrc)}
                        alt={g.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <span className="text-xs text-slate-600">No Image</span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-white truncate">{g.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 uppercase">
                        {g.category || 'Campus'}
                      </span>
                    </div>
                    {g.caption && <p className="text-xs text-slate-400 truncate">{g.caption}</p>}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleEditClick(g)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(g._id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
