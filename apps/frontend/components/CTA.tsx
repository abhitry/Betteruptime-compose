import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Never Miss Another Outage?
        </h2>
        <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed">
          Join thousands of companies who trust UptimeGuard to keep their websites running smoothly. 
          Start your free trial today and experience peace of mind.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
            <span>Start Your Free 14-Day Trial</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 transition-all duration-200">
            Schedule a Demo
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100 dark:text-blue-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;