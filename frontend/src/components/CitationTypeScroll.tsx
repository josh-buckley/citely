import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Scroll, Scale, FileText, Gavel, BookMarked, Building2, FileSpreadsheet, FileCheck, Book, Newspaper, Globe, MessageSquare, Film, Mail, FileSearch, BookCopy, Landmark, Library, Network, Presentation, Mic, Radio, BookOpenCheck, FileQuestion, FileSymlink, FileBox, FileClock, FileWarning } from 'lucide-react';

const citationTypes = [
  // Cases
  {
    icon: <BookOpen className="w-8 h-8" />,
    name: 'Reported Case',
    color: 'bg-blue-50'
  },
  {
    icon: <Scale className="w-8 h-8" />,
    name: 'Unreported Case (Medium Neutral)',
    color: 'bg-emerald-50'
  },
  {
    icon: <Scale className="w-8 h-8" />,
    name: 'Unreported Case (No Medium Neutral)',
    color: 'bg-purple-50'
  },
  {
    icon: <Gavel className="w-8 h-8" />,
    name: 'Proceeding',
    color: 'bg-amber-50'
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    name: 'Court Order',
    color: 'bg-rose-50'
  },
  {
    icon: <Scale className="w-8 h-8" />,
    name: 'Arbitration',
    color: 'bg-cyan-50'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    name: 'Transcript of Proceedings',
    color: 'bg-indigo-50'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    name: 'High Court Transcript',
    color: 'bg-fuchsia-50'
  },
  {
    icon: <FileText className="w-8 h-8" />,
    name: 'Submission',
    color: 'bg-teal-50'
  },
  // Legislative Materials
  {
    icon: <Scroll className="w-8 h-8" />,
    name: 'Act',
    color: 'bg-orange-50'
  },
  {
    icon: <FileSymlink className="w-8 h-8" />,
    name: 'Delegated Legislation',
    color: 'bg-sky-50'
  },
  {
    icon: <FileSymlink className="w-8 h-8" />,
    name: 'Delegated Non-Government Entity Legislation',
    color: 'bg-lime-50'
  },
  {
    icon: <FileBox className="w-8 h-8" />,
    name: 'Bill',
    color: 'bg-violet-50'
  },
  {
    icon: <FileQuestion className="w-8 h-8" />,
    name: 'Explanatory Memorandum',
    color: 'bg-red-50'
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    name: 'Hansard',
    color: 'bg-emerald-50'
  },
  {
    icon: <FileWarning className="w-8 h-8" />,
    name: 'Gazette',
    color: 'bg-blue-50'
  },
  {
    icon: <Gavel className="w-8 h-8" />,
    name: 'Order or Ruling',
    color: 'bg-purple-50'
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    name: 'Court Practice Direction or Note',
    color: 'bg-amber-50'
  },
  // Secondary Sources
  {
    icon: <BookMarked className="w-8 h-8" />,
    name: 'Journal Article',
    color: 'bg-rose-50'
  },
  {
    icon: <Presentation className="w-8 h-8" />,
    name: 'Symposium',
    color: 'bg-cyan-50'
  },
  {
    icon: <Book className="w-8 h-8" />,
    name: 'Book',
    color: 'bg-indigo-50'
  },
  {
    icon: <BookOpenCheck className="w-8 h-8" />,
    name: 'Book Chapter',
    color: 'bg-fuchsia-50'
  },
  {
    icon: <BookCopy className="w-8 h-8" />,
    name: 'Book with Editor',
    color: 'bg-teal-50'
  },
  {
    icon: <BookCopy className="w-8 h-8" />,
    name: 'Translated Book',
    color: 'bg-orange-50'
  },
  {
    icon: <Radio className="w-8 h-8" />,
    name: 'Audiobook',
    color: 'bg-sky-50'
  },
  {
    icon: <FileSpreadsheet className="w-8 h-8" />,
    name: 'Report',
    color: 'bg-lime-50'
  },
  {
    icon: <FileSpreadsheet className="w-8 h-8" />,
    name: 'Research Paper',
    color: 'bg-violet-50'
  },
  {
    icon: <Mic className="w-8 h-8" />,
    name: 'Speech',
    color: 'bg-red-50'
  },
  {
    icon: <Newspaper className="w-8 h-8" />,
    name: 'Press and Media Release',
    color: 'bg-emerald-50'
  },
  {
    icon: <Library className="w-8 h-8" />,
    name: 'Hard Copy Dictionary',
    color: 'bg-blue-50'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    name: 'Online Dictionary',
    color: 'bg-purple-50'
  },
  {
    icon: <Library className="w-8 h-8" />,
    name: 'Hard Copy Legal Encyclopedia',
    color: 'bg-amber-50'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    name: 'Online Legal Encyclopedia',
    color: 'bg-rose-50'
  },
  {
    icon: <FileClock className="w-8 h-8" />,
    name: 'Hard Copy Looseleaf Service',
    color: 'bg-cyan-50'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    name: 'Online Looseleaf Service',
    color: 'bg-indigo-50'
  },
  {
    icon: <Newspaper className="w-8 h-8" />,
    name: 'Printed Newspaper',
    color: 'bg-fuchsia-50'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    name: 'Online Newspaper',
    color: 'bg-teal-50'
  },
  {
    icon: <Newspaper className="w-8 h-8" />,
    name: 'Periodical, Newsletter or Magazine',
    color: 'bg-orange-50'
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    name: 'Interview',
    color: 'bg-sky-50'
  },
  {
    icon: <Film className="w-8 h-8" />,
    name: 'Film, Television or Other Media',
    color: 'bg-lime-50'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    name: 'Internet Material',
    color: 'bg-violet-50'
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    name: 'Social Media Post',
    color: 'bg-red-50'
  },
  // Miscellaneous
  {
    icon: <FileText className="w-8 h-8" />,
    name: 'Written Submission',
    color: 'bg-emerald-50'
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    name: 'Evidence to Parliamentary Committee',
    color: 'bg-blue-50'
  },
  {
    icon: <Landmark className="w-8 h-8" />,
    name: 'Australian Constitutional Convention Debates',
    color: 'bg-purple-50'
  },
  {
    icon: <FileSearch className="w-8 h-8" />,
    name: 'Intellectual Property Material',
    color: 'bg-amber-50'
  },
  {
    icon: <FileBox className="w-8 h-8" />,
    name: 'Constitutive Documents of a Corporation',
    color: 'bg-rose-50'
  },
  {
    icon: <Mail className="w-8 h-8" />,
    name: 'Written Correspondence',
    color: 'bg-cyan-50'
  },
  // International Materials
  {
    icon: <Landmark className="w-8 h-8" />,
    name: 'Treaty',
    color: 'bg-indigo-50'
  },
  // To Be Added
  {
    icon: <FileWarning className="w-8 h-8" />,
    name: 'Administrative Decision',
    color: 'bg-fuchsia-50'
  },
  {
    icon: <Scroll className="w-8 h-8" />,
    name: 'Constitution',
    color: 'bg-teal-50'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    name: 'UN Materials',
    color: 'bg-orange-50'
  }
];

export default function CitationTypeScroll() {
  const itemHeight = 60; // height of each item including margin
  const totalHeight = citationTypes.length * itemHeight;
  const scrollDuration = citationTypes.length * 1.6; // 1.6 seconds per item (20% faster than 2 seconds)

  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
              50+ citation
              <br />
              types supported.
            </h2>
            <p className="mt-4 text-l text-gray-600">
              CiteCounsel generates AGLC4 compliant citations in seconds with our advanced automation engine covering <b>Judicial</b>, <b>Legislative</b>, <b>Secondary</b> and <b>International</b> materials.
            </p>
          </motion.div>

          <div className="relative h-[400px] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 relative px-2"
            >
              <motion.div
                animate={{ 
                  y: [-itemHeight, -totalHeight],
                }}
                transition={{
                  duration: scrollDuration,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }}
                className="space-y-3 w-[95%] mx-auto"
              >
                {[...citationTypes, ...citationTypes, ...citationTypes].map((type, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    style={{ height: `${itemHeight}px` }}
                  >
                    <div className={`p-2 rounded-lg ${type.color}`}>
                      {type.icon}
                    </div>
                    <span className="text-lg text-gray-900">{type.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
