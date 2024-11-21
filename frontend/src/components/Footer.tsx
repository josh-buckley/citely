import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenCheck, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  product: ['Features', 'Pricing', 'Integrations', 'Case Studies', 'API'],
  company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  resources: ['Documentation', 'Guides', 'Support', 'API Status', 'Community'],
  legal: ['Privacy', 'Terms', 'Security', 'Compliance', 'Accessibility']
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <BookOpenCheck className="h-8 w-8 text-white" />
              <span className="font-bold text-xl text-white">CiteCounsel</span>
            </motion.div>
            <p className="mt-4 text-sm">
              Transforming legal citation with AI-powered AGLC4 automation.
              Trusted by leading law firms and universities across Australia.
            </p>
            <div className="mt-6 flex space-x-4">
              {[Twitter, Linkedin, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#fff' }}
                  className="text-gray-400 hover:text-white transition"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {title}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 2 }}
                  >
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © 2024 CiteCounsel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}