import React, { useState } from 'react';
import { X, Globe, AlertCircle } from 'lucide-react';
import { NewWebsite } from '@/types/types';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (website: {url:string}) => void;
}

export function AddWebsiteModal({ isOpen, onClose, onAdd }: AddWebsiteModalProps) {
  const [formData, setFormData] = useState({
    url: ''
  });
  const [errors, setErrors] = useState<Partial<NewWebsite>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<NewWebsite> = {};


    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Ensure URL has protocol
      let url = formData.url.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      onAdd({
        url: url
      });
      
      setFormData({  url: '' });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({ url: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleClose}></div>
        
        <div className="relative transform overflow-hidden rounded-xl bg-slate-800 border border-slate-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="px-6 py-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Add Website</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
    

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL
              </label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.url ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="https://example.com"
              />
              {errors.url && (
                <div className="mt-1 flex items-center gap-1 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.url}
                </div>
              )}
              <p className="mt-1 text-xs text-slate-400">
                Protocol (https://) will be added automatically if not provided
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                Add Website
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}