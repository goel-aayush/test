'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Upload, Trash2, Copy, Check, FolderOpen, Loader2 } from 'lucide-react';

interface MediaFile {
  filename: string;
  category: string;
  url: string;
  size: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploadCategory, setUploadCategory] = useState('general');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      setFiles(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch media list', err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', uploadCategory);

      await api.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSelectedFile(null);
      fetchMedia();
    } catch (err: any) {
      alert(err.response?.data?.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (category: string, filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;
    try {
      await api.delete(`/media/${category}/${filename}`);
      fetchMedia();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete file');
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Media Library</h1>
        <p className="text-xs text-slate-400">Upload and manage images, PDFs, and document assets</p>
      </div>

      {/* Upload Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Upload size={18} className="text-sky-400" /> Upload New File
        </h2>

        <form onSubmit={handleUpload} className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="file"
              required
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <select
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="blog">Blog</option>
              <option value="courses">Courses</option>
              <option value="faculty">Faculty</option>
              <option value="gallery">Gallery</option>
              <option value="facilities">Facilities</option>
              <option value="testimonials">Testimonials</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2 disabled:opacity-40"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </div>

      {/* Files Grid Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FolderOpen size={18} className="text-sky-400" /> Uploaded Assets ({files.length})
        </h2>

        {files.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No files uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between space-y-3 group">
                <div className="h-32 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center relative">
                  {file.url.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i) ? (
                    <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-slate-500 uppercase">{file.filename.split('.').pop()}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-white truncate" title={file.filename}>{file.filename}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="uppercase px-1.5 py-0.5 bg-sky-500/20 text-sky-400 font-semibold rounded">{file.category}</span>
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => handleCopy(file.url)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition"
                    title="Copy URL"
                  >
                    {copiedUrl === file.url ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedUrl === file.url ? 'Copied!' : 'Copy URL'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(file.category, file.filename)}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
