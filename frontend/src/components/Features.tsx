import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Clock, Shield, Database, Cloud, Sparkles, Lock } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Citations',
    description: 'Generate AGLC4 compliant citations in seconds with our advanced automation engine.'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Comprehensive Coverage',
    description: 'Support for 50+ citation types spanning cases, legislation, secondary sources and more.'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Time Saving',
    description: 'Reduce citation time by up to 90% and focus on what matters - your legal analysis.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Accuracy Guaranteed',
    description: 'AI-powered verification ensures your citations are always accurate and up-to-date.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Everything you need for perfect AGLC4 citations
          </h2>
          <p className="mt-4 text-Ll text-gray-600">
            Powerful features for law students, academics and legal professionals
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="absolute -top-3 -left-3 bg-gray-900 rounded-lg p-3 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}