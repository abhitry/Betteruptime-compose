 "use client"
import React from 'react';
import { Monitor, Menu, X, Moon, Sun } from 'lucide-react';
import {useDarkMode} from '@/hooks/useDarkMode';
import { useRouter } from "next/navigation"; // ✅ app router hook

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const router=useRouter();

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Monitor className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">UptimeGuard</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={()=>{
                  router.push("/signin" )
                }}className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Sign In</button>
            <button onClick={()=>{
              router.push("/signup")
            }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-gray-900 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-900 dark:text-white" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">About</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Contact</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-2 text-left text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button onClick={()=>{
                  router.push("/signin" )
                }} className="text-left text-gray-600 dark:text-gray-300 hover:text-blue-600">Sign In</button>
                <button onClick={()=>{
                  router.push("/signup" )
                }}className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-left">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;