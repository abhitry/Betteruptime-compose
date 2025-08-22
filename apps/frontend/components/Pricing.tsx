import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 9,
      description: 'Perfect for small websites and personal projects',
      features: [
        'Monitor up to 5 websites',
        '5-minute check intervals',
        'Email notifications',
        'Basic uptime reports',
        'SSL monitoring',
        'Mobile app access'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 29,
      description: 'Ideal for growing businesses and multiple sites',
      features: [
        'Monitor up to 25 websites',
        '1-minute check intervals',
        'Email, SMS & Slack alerts',
        'Advanced analytics',
        'SSL monitoring',
        'API access',
        'Team collaboration',
        'Custom status pages'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited websites',
        '30-second check intervals',
        'All notification methods',
        'Custom integrations',
        'Priority support',
        'Advanced reporting',
        'White-label options',
        'SLA guarantees',
        'Dedicated account manager'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your monitoring needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-blue-600 shadow-xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg bg-white dark:bg-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We offer enterprise plans with dedicated support.
          </p>
          <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 underline">
            Contact Sales Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;