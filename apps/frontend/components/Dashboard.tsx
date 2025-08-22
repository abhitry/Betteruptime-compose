import React, { useState ,useEffect} from 'react';
import { Globe, CheckCircle, XCircle, TrendingUp, Search, Filter, RefreshCw, Plus } from 'lucide-react';
import {Website, DashboardStats } from '@/types/types';
import { WebsiteTable } from './WebsiteTable';
import { StatsCards } from './StatsCard'; 
import { AddWebsiteModal } from './AddWebsiteModel'; 
import { BACKEND_URL } from '@/lib/utils';
import axios from 'axios';


// Mock data
const mockWebsites: Website[] = [
  
];

export function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'up' | 'down' | 'checking'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats: DashboardStats = {
    totalSites: websites.length,
    sitesUp: websites.filter(w => w.status === 'up').length,
    sitesDown: websites.filter(w => w.status === 'down').length,
  };

  const filteredWebsites = websites.filter(website => {
    const matchesSearch =  website.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || website.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddWebsite = (newWebsite: { url: string }) => {
    const website: Website = {
      id: Date.now().toString(),
      url:newWebsite.url,
      status: 'checking',
      responseTime:0,
      lastChecked:'Checking ...',
    };
    axios.post(`${BACKEND_URL}/website`,{
        url:newWebsite.url
    },{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    setWebsites([...websites, website]);
    setIsAddModalOpen(false);
  };


   
    async function  fetchData()
    {
        const response =await  axios.get(`${BACKEND_URL}/websites`, {
        headers: {
            Authorization: localStorage.getItem("token"),
        }
        })
        setWebsites(response.data.websites.map((w: any) => ({
            id: w.id,
            url: w.url,
            status: w.ticks[0] ? (w.ticks[0].status === "Up" ? "up" : "down") : "checking",
            responseTime: w.ticks[0] ? w.ticks[0].response_time_ms : 0,
            lastChecked: w.ticks[0] ? w.ticks[0].createdAt : new Date().toLocaleString()
        })))
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = async () => {
    //setIsRefreshing(true);
    // Simulate refresh
    await fetchData();
    //setIsRefreshing(false);
    };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white">UpGuard</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-white font-medium px-3 py-2 rounded-md bg-slate-700">Dashboard</a>
                <a href="#" className="text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-slate-700">Status Pages</a>
                <a href="#" className="text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-slate-700">Reports</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">
                <Globe className="w-5 h-5" />
              </button>
              <button className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">
                Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search websites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
                <option value="checking">Checking</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Website
            </button>
          </div>
        </div>

        {/* Websites Table */}
        <WebsiteTable websites={filteredWebsites} />
      </div>

      {/* Add Website Modal */}
      <AddWebsiteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddWebsite}
      />
    </div>
  );
}