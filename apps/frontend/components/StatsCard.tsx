import React from 'react';
import { Globe, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/types/types'; 

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">Total Sites</p>
            <p className="text-3xl font-bold text-white">{stats.totalSites}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">Sites Up</p>
            <p className="text-3xl font-bold text-white">{stats.sitesUp}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">Sites Down</p>
            <p className="text-3xl font-bold text-white">{stats.sitesDown}</p>
          </div>
          <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-colors">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}