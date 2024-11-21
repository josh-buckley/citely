import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Ban, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const problems = [
  'Hours spent manually formatting citations',
  '350+ pages of complex AGLC4 guidelines',
  'Inconsistent citation styles across documents',
  'Impossible to manage large volumes of citations'
];

const solutions = [
  'Instant, automated citation generation',
  'Built-in AGLC4 guidelines and validation',
  'Consistent AGLC4 compliance across all document types',
  'Tagging and categorised filters for easy management'
];

export default function ProblemSolution() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Transform Your Legal Citation Process
          </h2>
          <p className="mt-4 text-l text-gray-600">
            Reduce time spent on citations by up to <b>90%</b>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-red-700/90 mb-4 flex items-center gap-2 justify-center">
              <Ban className="h-6 w-6" />
              Without CiteCounsel
            </h3>
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 justify-center rounded-lg border bg-muted/50 p-3 cursor-pointer"
              >
                <XCircle className="h-5 w-5 text-red-700/90 flex-shrink-0" />
                <span className="text-muted-foreground">{problem}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-green-600/90 mb-4 flex items-center gap-2 justify-center">
              <Sparkles className="h-6 w-6" />
              With CiteCounsel
            </h3>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 justify-center rounded-lg border bg-muted/50 p-3 cursor-pointer"
              >
                <CheckCircle className="h-5 w-5 text-green-500/80 flex-shrink-0" />
                <span className="text-muted-foreground">{solution}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}