import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechCorp',
      avatar: 'https://images.pexels.com/photos/3772618/pexels-photo-3772618.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      content: 'UptimeGuard has been instrumental in maintaining our 99.9% uptime. The alerts are fast and the dashboard is incredibly intuitive.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'DevOps Engineer at StartupXYZ',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      content: 'The global monitoring network gives us confidence that our services are performing well worldwide. Excellent tool!',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Product Manager at WebSolutions',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      content: 'The performance analytics have helped us identify and fix bottlenecks before they impact our users. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands of Companies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="h-8 w-8 text-blue-200 dark:text-blue-400 absolute -top-2 -left-2" />
                <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                  `{testimonial.content}`
                </p>
              </div>

              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Websites Monitored</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">99.99%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime Achieved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{"< 10s"}</div>
              <div className="text-gray-600 dark:text-gray-400">Alert Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;