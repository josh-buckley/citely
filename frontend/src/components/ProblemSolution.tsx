import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const comparisonData = [
  {
    without: 'Hours spent formatting citations by hand',
    with: 'Instant, automated citation generation'
  },
  {
    without: '350+ pages of complex AGLC4 guidelines',
    with: 'Built-in AGLC4 guidelines and validation'
  },
  {
    without: 'Inconsistent citation styles across documents',
    with: 'Consistent AGLC4 compliance for 50+ types'
  },
  {
    without: 'Impossible to manage large volumes of citations',
    with: 'Custom tags and filters for easy management'
  }
];

export default function ProblemSolution() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-foreground">
            Reduce time spent on citations by up to 90%
          </h2>
          <p className="mt-3 text-xl text-muted-foreground">
            Experience the benefits for yourself
          </p>
        </motion.div>

        <div className="relative">
          {/* Headers */}
          <div className="grid grid-cols-2 gap-4 items-center max-w-4xl mx-auto mb-8">
            {/* Manual Header */}
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{
                opacity: 0.8,
                x: -60,
                transition: { duration: 0.5 }
              }}
              className="relative flex justify-center"
            >
              <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-background rounded-lg border shadow-sm">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="relative text-lg font-medium text-foreground">
                  Manual Process
                </span>
              </div>
            </motion.div>

            {/* CiteCounsel Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 0 }}
              whileInView={{ 
                opacity: 1,
                scale: 1,
                x: 20,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }}
              className="relative flex justify-center"
            >
              <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-background rounded-lg border shadow-sm">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="relative text-lg font-medium text-foreground">
                  CiteCounsel
                </span>
              </div>
            </motion.div>
          </div>

          {comparisonData.map((item, index) => (
            <div key={index} className="mb-4 relative">
              <div className="grid grid-cols-2 gap-4 items-center max-w-4xl mx-auto">
                {/* Manual - More dramatic animation */}
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  whileInView={{
                    opacity: 0.8,
                    x: -60,
                    transition: { 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  }}
                  viewport={{ once: true }}
                  className="transform-gpu"
                >
                  <div className="bg-background rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item.without}</span>
                    </div>
                  </div>
                </motion.div>

                {/* CiteCounsel - Enhanced winning animation */}
                <motion.div
                  initial={{ opacity: 0, x: 0, scale: 0.9 }}
                  whileInView={{
                    opacity: 1,
                    x: 20,
                    scale: 1.05,
                    transition: { 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }}
                  whileHover={{
                    scale: 1.08,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                  className="transform-gpu"
                >
                  <div className="bg-background rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-foreground font-medium">{item.with}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}

          {/* Decorative background */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-100/10 via-transparent to-emerald-100/10 rounded-[100px] transform rotate-12" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}