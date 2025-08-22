import React from 'react';
import { Monitor, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="h-8 w-8 text-blue-400 dark:text-blue-300" />
              <span className="text-xl font-bold">UptimeGuard</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 mb-6 leading-relaxed">
              Monitor your websites 24/7 with our reliable uptime monitoring service. 
              Get instant alerts and detailed analytics.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-6 w-6 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
              <Github className="h-6 w-6 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
              <Mail className="h-6 w-6 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Status Page</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 dark:text-gray-300 text-sm">
            © 2025 UptimeGuard. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;