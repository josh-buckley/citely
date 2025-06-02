import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const integrations = [
  {
    name: 'Westlaw',
    description: 'Import Case Law from Westlaw Australia',
    logo: '/images/integrations/westlaw.png'
  },
  {
    name: 'LexisNexis',
    description: 'Import Case Law from Lexis Advance Australia',
    logo: '/images/integrations/lexis-nexis.png'
  },
  {
    name: 'HeinOnline',
    description: 'Import journals articles and books from HeinOnline',
    logo: '/images/integrations/hein-online.png'
  },
  {
    name: 'Google Scholar',
    description: 'Import academic papers from Google Scholar',
    logo: '/images/integrations/google-scholar.png'
  }
];

export default function Integrations() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Seamless Ingestion
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Add citations from your most-used legal research tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-b from-white to-gray-50/50 p-6 rounded-xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 mb-4">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {integration.description}
                </p>
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}