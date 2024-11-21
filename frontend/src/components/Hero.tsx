import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                  <span className="block">Automate Your</span>
                  <motion.span
                    className="block text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Legal Citations
                  </motion.span>
                  <motion.span
                    className="block mt-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    with{' '}
                    <span className="relative inline-block overflow-hidden align-baseline">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                        CiteCounsel
                      </span>
                      <div className="shine-effect absolute inset-0 pointer-events-none" />
                    </span>
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.p
                className="mt-3 text-sm text-gray-500 sm:mt-5 sm:text-base sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Transform your legal  workflow with <b>automatic AGLC4 citation</b> generation. Save time, ensure accuracy, and focus on what matters most.
              </motion.p>

              
              <motion.div
                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="rounded-md shadow">
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 md:py-4 md:text-lg md:px-10"
                  >
                    Let's get started!
                  </Button>
                </div>
              </motion.div>
            </div>
          </main>
          <motion.div
            className="lg:absolute lg:inset-y-[-10%] lg:right-0 lg:w-2/5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <img
              className="h-48 w-full object-cover sm:h-64 md:h-80 lg:w-full lg:h-[500px]"
              src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="Law library"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}