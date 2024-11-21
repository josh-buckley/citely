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
          <p className="mt-4 text-l text-gray-600">
            Add citations from your most-used legal research tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200"
            >
              <img
                src={integration.logo}
                alt={integration.name}
                className="w-14 h-14 mx-auto mb-2 rounded-lg scale-110"
              />
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {integration.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {integration.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}