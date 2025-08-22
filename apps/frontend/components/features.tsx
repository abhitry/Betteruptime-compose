import React from 'react';
import { 
  Clock, 
  Bell, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Smartphone, 
  Users 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: 'Real-Time Monitoring',
      description: 'Monitor your websites 24/7 with checks every 30 seconds from multiple global locations.'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get notified immediately via email, SMS, Slack, or webhooks when issues are detected.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track response times, uptime trends, and performance metrics with detailed reports.'
    },
    {
      icon: Shield,
      title: 'SSL Monitoring',
      description: 'Monitor SSL certificates and get alerts before they expire to prevent security issues.'
    },
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'Lightning-fast detection with average response times under 30 seconds globally.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Monitor from 15+ locations worldwide to ensure consistent performance everywhere.'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Stay connected with our mobile app featuring push notifications and real-time data.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share dashboards, manage team access, and collaborate on incident responses.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for Website Monitoring
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive monitoring tools designed to keep your websites running smoothly 
            and your users happy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-800 group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;