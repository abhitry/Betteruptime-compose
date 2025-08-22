"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Activity, Check } from 'lucide-react';
import { useRouter } from "next/navigation"; 
import { BACKEND_URL } from '@/lib/utils';
import axios from 'axios';
interface SignUpProps {
  onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try{
        const response=await axios.post(`${BACKEND_URL}/user/signup`,{
            username:username,
            password:password
        })
        setIsLoading(false);
        router.push("/signin");
    }
    catch(e)
    {
        setIsLoading(false);
    }   
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains number', met: /\d/.test(password) },
    { text: 'Passwords match', met: password === confirmPassword && password.length > 0 }
  ];

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
         
          

          <h2 className="text-4xl font-bold mb-6">Join UpGuard today</h2>
          
          <p className="text-white/80 text-lg mb-12 leading-relaxed">
            Start monitoring your infrastructure with confidence. Get instant alerts, 
            beautiful status pages, and comprehensive uptime monitoring.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Quick Setup</h3>
                <p className="text-white/70">Get started with monitoring in under 5 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Free Trial</h3>
                <p className="text-white/70">14-day free trial with no credit card required</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Enterprise Ready</h3>
                <p className="text-white/70">Scales with your business from startup to enterprise</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white/60 text-sm">
          Trusted by 10,000+ companies worldwide
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center p-12">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-gray-400">Start monitoring your infrastructure today</p>
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
                placeholder="Choose a username"
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
                  placeholder="Create a password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {password && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-300">Password requirements:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check 
                        className={`w-4 h-4 mr-2 ${req.met ? 'text-green-400' : 'text-gray-600'}`} 
                      />
                      <span className={req.met ? 'text-green-400' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !passwordRequirements.every(req => req.met)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
              onClick={()=>{
                  router.push("/signin" )
                }}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;