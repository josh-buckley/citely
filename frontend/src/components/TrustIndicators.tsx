import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Star, Award } from 'lucide-react';

const metrics = [
  {
    icon: <Users className="h-6 w-6" />,
    stat: '+800%',
    label: 'Growth in Past 6 Months'
  },
  {
    icon: <Star className="h-6 w-6" />,
    stat: '97.9%',
    label: 'Customer Satisfaction'
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    stat: '100K+',
    label: 'Citations Generated'
  },
  {
    icon: <Award className="h-6 w-6" />,
    stat: '100%',
    label: 'AGLC4 Compliant'
  }
];


export default function TrustIndicators() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="flex justify-center text-gray-900 mb-2">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{metric.stat}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}