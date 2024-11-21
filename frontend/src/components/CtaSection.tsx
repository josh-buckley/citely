import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function CtaSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Transform Your Legal Citations?
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Join thousands of legal professionals who trust CiteCounsel for accurate AGLC4 citations
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Start Free Trial
            </Button>
            <Button
              variant="ghost"
              className="text-gray-900 hover:bg-gray-800 px-8 py-3 text-lg"
            >
              Schedule Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <p className="mt-6 text-sm text-gray-400">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}