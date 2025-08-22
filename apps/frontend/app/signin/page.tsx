"use client";
import { useRouter } from "next/navigation"; 
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Activity } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from "@/lib/utils";

interface SignInProps {
  onSwitchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try{
        const response=await axios.post(`${BACKEND_URL}/user/signin`,{
            username:username,
            password:password
        })
        localStorage.setItem("token", response.data.jwt)
        setIsLoading(false);
        router.push("/dashboard");
    }
    catch(e)
    {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex">
      {/* Left side - Marketing content */}
      <div className="w-1/2 p-12 text-white flex flex-col">
        <div className="mb-8">
          <button className="flex items-center text-white/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <Activity className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">UpGuard</h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col  max-w-lg">
          {/* Decorative icons */}
          <div className="flex space-x-6 mb-3">
            
          </div>

          <h2 className="text-4xl font-bold mb-6">Welcome back to UpGuard</h2>
          
          <p className="text-white/80 text-lg mb-12 leading-relaxed">
            Monitor your infrastructure with confidence. Get instant alerts, 
            beautiful status pages, and comprehensive uptime monitoring.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Instant Monitoring</h3>
                <p className="text-white/70">Set up monitoring for your websites in under 2 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Real-time Alerts</h3>
                <p className="text-white/70">Get notified the moment something goes wrong</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Beautiful Reports</h3>
                <p className="text-white/70">Share status pages and uptime reports with your team</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white/60 text-sm">
          Trusted by 10,000+ companies worldwide
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center p-12">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Sign in to your account</h2>
            <p className="text-gray-400">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Dont have an account?{' '}
              <button
                onClick={()=>{
                  router.push("/signup" )
                }}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;