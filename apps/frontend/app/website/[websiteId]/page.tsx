"use client";
import { BACKEND_URL } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ArrowLeft,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { WebsiteTick } from '@/types/types';

interface StatusCheck {
  id: string;
  timestamp: string;
  status: 'up' | 'down';
  responseTime: number;
  statusCode?: number;
}

interface WebsiteData {
  id: string;
  url: string;
  userId: string;
  ticks?: WebsiteTick[];
}

export default function WebsiteDetails() {
  const router = useRouter();
  const params = useParams();
  const websiteId = params.websiteId as string;
  
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [statusChecks, setStatusChecks] = useState<StatusCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert WebsiteTick to StatusCheck format
  const convertTicksToStatusChecks = (ticks: WebsiteTick[]): StatusCheck[] => {
    return ticks.map(tick => ({
      id: tick.id,
      timestamp: new Date(tick.createdAt).toISOString().replace('T', ' ').substring(0, 19),
      status: tick.status === 'Up' ? 'up' : 'down',
      responseTime: tick.responseTimeMs,
      statusCode: tick.status === 'Up' ? 200 : 500
    }));
  };

  // Fetch website data from backend
  const fetchWebsiteData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/status/${websiteId}`, {
        headers: {
          'Authorization': token
        }
      });

      console.log('API Response:', response.data); // Debug log

      setWebsite(response.data);
      
      // Convert ticks to status checks if available
      if (response.data.ticks) {
        console.log('Ticks data:', response.data.ticks); // Debug log
        const checks = convertTicksToStatusChecks(response.data.ticks);
        console.log('Converted checks:', checks); // Debug log
        setStatusChecks(checks);
      } else {
        console.log('No ticks data received');
        setStatusChecks([]);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Error fetching website data:', err);
      if (err.response?.status === 401) {
        router.push('/login');
      } else if (err.response?.status === 409) {
        setError('Website not found');
      } else {
        setError('Failed to load website data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (websiteId) {
      fetchWebsiteData();
    }
  }, [websiteId]);

  // Calculate statistics
  const upCount = statusChecks.filter(check => check.status === 'up').length;
  const downCount = statusChecks.filter(check => check.status === 'down').length;
  const successRate = statusChecks.length > 0 ? ((upCount / statusChecks.length) * 100).toFixed(1) : '0.0';
  const avgResponseTime = statusChecks.length > 0 
    ? Math.round(statusChecks.reduce((sum, check) => sum + check.responseTime, 0) / statusChecks.length)
    : 0;

  // Calculate uptime percentage (assuming 99.98% as default if no historical data)
  const uptimePercentage = statusChecks.length > 0 ? successRate : '99.98';

  // Get current status based on latest check
  const currentStatus = statusChecks.length > 0 ? statusChecks[0].status : 'up';
  const latestResponseTime = statusChecks.length > 0 ? statusChecks[0].responseTime : 0;

  // Format last checked time
  const getLastCheckedTime = () => {
    if (statusChecks.length > 0) {
      const lastCheck = new Date(statusChecks[0].timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - lastCheck.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes === 1) return '1 minute ago';
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours === 1) return '1 hour ago';
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    return 'Never';
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchWebsiteData();
    setIsRefreshing(false);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && !isRefreshing) {
        fetchWebsiteData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoading, isRefreshing]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading website details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // No website data
  if (!website) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Website Not Found</h2>
          <p className="text-gray-400 mb-4">The requested website could not be found.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <span className="text-gray-500 text-sm">{website.id}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Website Overview Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {currentStatus === 'up' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {website.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </h1>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span>{website.url}</span>
                  <a 
                    href={website.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>Last checked: {getLastCheckedTime()}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">{uptimePercentage}%</div>
                <div className="text-gray-400 text-sm">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{latestResponseTime}ms</div>
                <div className="text-gray-400 text-sm">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">{upCount}</div>
                <div className="text-gray-400 text-sm">Up (Last {statusChecks.length})</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">{downCount}</div>
                <div className="text-gray-400 text-sm">Down (Last {statusChecks.length})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Status Checks */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Recent Status Checks</h2>
              <p className="text-gray-400">
                {statusChecks.length > 0 
                  ? `Last ${statusChecks.length} monitoring checks with response times`
                  : 'No monitoring data available yet'
                }
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Up</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-400">Down</span>
              </div>
            </div>
          </div>

          {statusChecks.length > 0 ? (
            <>
              {/* Timeline */}
              <div className="mb-8">
                <div className="text-gray-400 text-sm mb-4">Timeline:</div>
                <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                  {statusChecks.map((check, index) => (
                    <div key={check.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${
                          check.status === 'up' 
                            ? 'bg-green-500 border-green-400' 
                            : 'bg-red-500 border-red-400'
                        }`}
                        title={`${check.timestamp} - ${check.status} - ${check.responseTime}ms`}
                      >
                        {check.status === 'up' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics Summary */}
              <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{successRate}%</div>
                  <div className="text-gray-400">Success Rate (Last {statusChecks.length})</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{avgResponseTime}ms</div>
                  <div className="text-gray-400">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{statusChecks.length}</div>
                  <div className="text-gray-400">Total Checks Shown</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Data Available</h3>
              <p className="text-gray-400 mb-4">
                This website hasn't been monitored yet. Check back in a few minutes.
              </p>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
              >
                {isRefreshing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    Checking...
                  </>
                ) : (
                  'Check Now'
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}