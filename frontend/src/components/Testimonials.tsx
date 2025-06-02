import React from 'react';
import { Star, UserCircle2, CheckCircle, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Student, University of Queensland',
    quote: 'CiteCounsel genuinely pays for itself 10x with the amount of time it saves me on assignments. I could never go back to doing citations manually - I\'ve recommended it to everyone I know who studies law.',
    avatar: '/avatars/sarah.png'
  },
  {
    name: 'Michael S.',
    role: 'Counsel, Big 6 Australian Law Firm',
    quote: 'CiteCounsel has significantly streamlined my drafting process. Incredibly cheap for what it offers. Any lawyer worth their salt should be using this tool.',
    avatar: '/avatars/michael.png'
  },
  {
    name: 'James W.',
    role: 'Law Student, University of Sydney',
    quote: "CiteCounsel completely changes the way I approach law assignments. You don't realise how many easy grades you miss out on due to incorrect citations until you start using something like this.",
    avatar: '/avatars/james.png'
  },
  {
    name: 'Elizabeth T.',
    role: 'Professor of Law, Monash University',
    quote: 'I\'ve tried all of the other citation tools out there. CiteCounsel is the only option which has all of the citation types needed for legal work in Australia. Worth it\s weight in gold!',
    avatar: '/avatars/elizabeth.png'
  }
];


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Trusted Across the Legal Community
          </h2>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-lg font-medium text-gray-700">
              <b>97.9%</b> 5-star ratings from verified users
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 mb-10"
        >
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <motion.div 
                className="flex items-center space-x-1 text-gray-900"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      show: { opacity: 1, scale: 1 }
                    }}
                  >
                    <Star className="h-5 w-5 fill-[#FFD700] text-[#FFD700]" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="mt-4 text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-4 flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name} avatar`}
                  className="h-12 w-12 rounded-full object-cover -mt-2"
                />
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}