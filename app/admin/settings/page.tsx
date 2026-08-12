'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Settings, Save, CheckCircle2, AlertCircle, Loader2, MapPin, Phone, Globe, Share2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [unit, setUnit] = useState('');
  const [established, setEstablished] = useState('');
  const [tagline, setTagline] = useState('');

  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [officeHours, setOfficeHours] = useState('');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressPostalCode, setAddressPostalCode] = useState('');

  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        const d = res.data.data;
        if (d) {
          setName(d.name || '');
          setShortName(d.shortName || '');
          setUnit(d.unit || '');
          setEstablished(d.established || '');
          setTagline(d.tagline || '');

          setPhone(d.phone || '');
          setWhatsapp(d.whatsapp || '');
          setEmail(d.email || '');
          setOfficeHours(d.officeHours || '');
          setMapEmbedUrl(d.mapEmbedUrl || '');

          if (d.address) {
            setAddressLine1(d.address.line1 || '');
            setAddressLine2(d.address.line2 || '');
            setAddressCity(d.address.city || '');
            setAddressState(d.address.state || '');
            setAddressPostalCode(d.address.postalCode || '');
          }

          if (d.social) {
            setFacebook(d.social.facebook || '');
            setInstagram(d.social.instagram || '');
            setYoutube(d.social.youtube || '');
          }
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      await api.put('/settings', {
        name,
        shortName,
        unit,
        established,
        tagline,
        phone,
        whatsapp,
        email,
        officeHours,
        mapEmbedUrl,
        address: {
          line1: addressLine1,
          line2: addressLine2,
          city: addressCity,
          state: addressState,
          postalCode: addressPostalCode,
        },
        social: {
          facebook,
          instagram,
          youtube,
        },
      });
      setSuccess('Site settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white">Site Settings</h1>
        <p className="text-xs text-slate-400">Configure global website details, contact info, address and social links</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold animate-in fade-in">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: General Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Settings size={18} className="text-sky-400" /> General Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Institute / Site Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Short Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Affiliated Unit / Trust</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Established Year</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={established}
                onChange={(e) => setEstablished(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone size={18} className="text-sky-400" /> Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Contact Email</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Contact Phone</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">WhatsApp Number (e.g. 919431012345)</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Office Hours</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Section 3: Campus Address */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin size={18} className="text-sky-400" /> Campus Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Address Line 1</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Address Line 2</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">City</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">State</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={addressState}
                onChange={(e) => setAddressState(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Postal Code</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={addressPostalCode}
                onChange={(e) => setAddressPostalCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Channels */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Share2 size={18} className="text-sky-400" /> Social Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Facebook URL</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Instagram URL</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube Channel URL</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Form Submission */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Saving Settings...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
