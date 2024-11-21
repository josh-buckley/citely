import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate are the AGLC4 citations?',
    answer: 'Our AI-powered system maintains a 99.9% accuracy rate for AGLC4 citations, verified against the latest guidelines and validated by legal experts.'
  },
  {
    question: 'Can I use CiteCounsel for academic legal writing?',
    answer: 'Yes! CiteCounsel is widely used by law students, professors, and researchers across Australia for academic legal writing, ensuring consistent AGLC4 compliance.'
  },
  {
    question: 'Does CiteCounsel support all Australian legal materials?',
    answer: 'CiteCounsel supports all major Australian legal materials including cases, legislation, journals, books, and government documents in accordance with AGLC4 guidelines.'
  },
  {
    question: 'How much time can I save using CiteCounsel?',
    answer: 'Most users report saving 80-90% of their citation time, allowing them to focus more on legal analysis and writing.'
  },
  {
    question: 'Is my data secure with CiteCounsel?',
    answer: 'Yes, CiteCounsel is ISO 27001 certified and compliant with Australian Privacy Principles. Your data is encrypted and stored securely in Australian data centers.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about CiteCounsel
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}