'use client'

import React, { useState, useCallback, memo } from 'react'
import { BookOpen, Scroll, Scale, FileText, Gavel, BookMarked, Building2, FileSpreadsheet, FileCheck, Book, Newspaper, Globe, MessageSquare, Film, Mail, FileSearch, BookCopy, Landmark, Library, Network, Presentation, Mic, Radio, BookOpenCheck, FileQuestion, FileSymlink, FileBox, FileClock, FileWarning, Check, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { CitationType } from '../types/citation'

interface CitationTypeSelectorProps {
  value: CitationType;
  onChange: (value: CitationType) => void;
  initiallyOpen?: boolean;
}

export const citationTypes = {
  smartExtraction: [
    { value: "westlaw_case", label: "Case from Westlaw", icon: <img src="/images/integrations/westlaw.png" className="w-5 h-5" alt="Westlaw" />, color: 'bg-orange-50' },
    { value: "westlaw_act", label: "Act from Westlaw", icon: <img src="/images/integrations/westlaw.png" className="w-5 h-5" alt="Westlaw" />, color: 'bg-orange-50' },
    { value: "lexisnexis_case", label: "Case from LexisNexis", icon: <img src="/images/integrations/lexis-nexis.png" className="w-5 h-5" alt="LexisNexis" />, color: 'bg-red-50' },
    { value: "jade_case", label: "Case from Jade Professional", icon: <img src="/images/integrations/jade.png" className="w-5 h-5" alt="JadeProfessional" />, color: 'bg-green-50' },
    { value: "ssrn_article", label: "Journal Article from SSRN", icon: <img src="/images/integrations/ssrn.png" className="w-5 h-5" alt="SSRN" />, color: 'bg-blue-50' },
    { value: "ssrn_paper", label: "Research Paper from SSRN", icon: <img src="/images/integrations/ssrn.png" className="w-5 h-5" alt="SSRN" />, color: 'bg-blue-50' },
    { value: "heinonline_article", label: "Journal Article from HeinOnline", icon: <img src="/images/integrations/hein-online.png" className="w-5 h-5" alt="HeinOnline" />, color: 'bg-blue-50' },
    { value: "scholar_book", label: "Book from Google Scholar", icon: <img src="/images/integrations/google-scholar.png" className="w-5 h-5" alt="Google Scholar" />, color: 'bg-blue-50' },
    { value: "scholar_article", label: "Journal Article from Google Scholar", icon: <img src="/images/integrations/google-scholar.png" className="w-5 h-5" alt="Google Scholar" />, color: 'bg-blue-50' },
  ],
  cases: [
    { value: "case_reported", label: "Reported Case", icon: <BookOpen className="w-5 h-5" />, color: 'bg-blue-50' },
    { value: "case_unreported_medium_neutral", label: "Unreported Case (Medium Neutral)", icon: <Scale className="w-5 h-5" />, color: 'bg-emerald-50' },
    { value: "case_unreported_no_medium_neutral", label: "Unreported Case (No Medium Neutral)", icon: <Scale className="w-5 h-5" />, color: 'bg-purple-50' },
    { value: "proceeding", label: "Proceeding", icon: <Gavel className="w-5 h-5" />, color: 'bg-amber-50' },
    { value: "court_order", label: "Court Order", icon: <FileCheck className="w-5 h-5" />, color: 'bg-rose-50' },
    { value: "arbitration", label: "Arbitration", icon: <Scale className="w-5 h-5" />, color: 'bg-cyan-50' },
    { value: "transcript_of_proceedings", label: "Transcript of Proceedings", icon: <FileText className="w-5 h-5" />, color: 'bg-indigo-50' },
    { value: "high_court_transcript", label: "High Court Transcript", icon: <FileText className="w-5 h-5" />, color: 'bg-fuchsia-50' },
    { value: "submission", label: "Submission", icon: <FileText className="w-5 h-5" />, color: 'bg-teal-50' },
  ],
  legislativeMaterials: [
    { value: "act", label: "Act", icon: <Scroll className="w-5 h-5" />, color: 'bg-orange-50' },
    { value: "delegated_legislation", label: "Delegated Legislation", icon: <FileSymlink className="w-5 h-5" />, color: 'bg-sky-50' },
    { value: "delegated_non_government_legislation", label: "Delegated Non-Government Entity Legislation", icon: <FileSymlink className="w-5 h-5" />, color: 'bg-lime-50' },
    { value: "bill", label: "Bill", icon: <FileBox className="w-5 h-5" />, color: 'bg-violet-50' },
    { value: "explanatory_memorandum", label: "Explanatory Memorandum", icon: <FileQuestion className="w-5 h-5" />, color: 'bg-red-50' },
    { value: "hansard", label: "Hansard", icon: <Building2 className="w-5 h-5" />, color: 'bg-emerald-50' },
    { value: "gazette", label: "Gazette", icon: <FileWarning className="w-5 h-5" />, color: 'bg-blue-50' },
    { value: "order_or_ruling", label: "Order or Ruling", icon: <Gavel className="w-5 h-5" />, color: 'bg-purple-50' },
    { value: "court_practice_direction", label: "Court Practice Direction or Note", icon: <FileCheck className="w-5 h-5" />, color: 'bg-amber-50' },
  ],
  secondarySources: [
    { value: "journal_article", label: "Journal Article", icon: <BookMarked className="w-5 h-5" />, color: 'bg-rose-50' },
    { value: "symposium", label: "Symposium", icon: <Presentation className="w-5 h-5" />, color: 'bg-cyan-50' },
    { value: "book", label: "Book", icon: <Book className="w-5 h-5" />, color: 'bg-indigo-50' },
    { value: "book_chapter", label: "Book Chapter", icon: <BookCopy className="w-5 h-5" />, color: 'bg-fuchsia-50' },
    { value: "book_with_editor", label: "Book with Editor", icon: <BookOpenCheck className="w-5 h-5" />, color: 'bg-teal-50' },
    { value: "translated_book", label: "Translated Book", icon: <Book className="w-5 h-5" />, color: 'bg-orange-50' },
    { value: "audiobook", label: "Audiobook", icon: <Radio className="w-5 h-5" />, color: 'bg-sky-50' },
    { value: "report", label: "Report", icon: <FileSpreadsheet className="w-5 h-5" />, color: 'bg-lime-50' },
    { value: "research_paper", label: "Research Paper", icon: <FileSearch className="w-5 h-5" />, color: 'bg-violet-50' },
    { value: "speech", label: "Speech", icon: <Mic className="w-5 h-5" />, color: 'bg-red-50' },
    { value: "press_and_media_release", label: "Press and Media Release", icon: <Newspaper className="w-5 h-5" />, color: 'bg-emerald-50' },
    { value: "hard_copy_dictionary", label: "Hard Copy Dictionary", icon: <Book className="w-5 h-5" />, color: 'bg-blue-50' },
    { value: "online_dictionary", label: "Online Dictionary", icon: <Globe className="w-5 h-5" />, color: 'bg-purple-50' },
    { value: "hard_copy_legal_encyclopedia", label: "Hard Copy Legal Encyclopedia", icon: <Library className="w-5 h-5" />, color: 'bg-amber-50' },
    { value: "online_legal_encyclopedia", label: "Online Legal Encyclopedia", icon: <Network className="w-5 h-5" />, color: 'bg-rose-50' },
    { value: "hard_copy_looseleaf", label: "Hard Copy Looseleaf Service", icon: <FileText className="w-5 h-5" />, color: 'bg-cyan-50' },
    { value: "online_looseleaf", label: "Online Looseleaf Service", icon: <FileText className="w-5 h-5" />, color: 'bg-indigo-50' },
    { value: "printed_newspaper", label: "Printed Newspaper", icon: <Newspaper className="w-5 h-5" />, color: 'bg-fuchsia-50' },
    { value: "online_newspaper", label: "Online Newspaper", icon: <Globe className="w-5 h-5" />, color: 'bg-teal-50' },
    { value: "periodical", label: "Periodical, Newsletter or Magazine", icon: <Newspaper className="w-5 h-5" />, color: 'bg-orange-50' },
    { value: "interview", label: "Interview", icon: <MessageSquare className="w-5 h-5" />, color: 'bg-sky-50' },
    { value: "film_television_media", label: "Film, Television or Other Media", icon: <Film className="w-5 h-5" />, color: 'bg-lime-50' },
    { value: "internet_material", label: "Internet Material", icon: <Globe className="w-5 h-5" />, color: 'bg-violet-50' },
    { value: "social_media_post", label: "Social Media Post", icon: <MessageSquare className="w-5 h-5" />, color: 'bg-red-50' },
  ],
  miscellaneous: [
    { value: "written_submission", label: "Written Submission", icon: <FileText className="w-5 h-5" />, color: 'bg-emerald-50' },
    { value: "evidence_to_parliamentary_committee", label: "Evidence to Parliamentary Committee", icon: <Building2 className="w-5 h-5" />, color: 'bg-blue-50' },
    { value: "constitutional_convention_debates", label: "Australian Constitutional Convention Debates", icon: <Landmark className="w-5 h-5" />, color: 'bg-purple-50' },
    { value: "intellectual_property", label: "Intellectual Property Material", icon: <FileText className="w-5 h-5" />, color: 'bg-amber-50' },
    { value: "constitutive_document", label: "Constitutive Documents of a Corporation", icon: <FileText className="w-5 h-5" />, color: 'bg-rose-50' },
    { value: "written_correspondence", label: "Written Correspondence", icon: <Mail className="w-5 h-5" />, color: 'bg-cyan-50' },
    { value: "custom", label: "Custom Citation", icon: <FileQuestion className="w-5 h-5" />, color: 'bg-slate-50' },
  ],
  internationalMaterials: [
    { value: "treaty", label: "Treaty", icon: <Scroll className="w-5 h-5" />, color: 'bg-indigo-50' },
  ],
  toBeAdded: [
    { value: "administrative_decision", label: "Administrative Decision", icon: <FileClock className="w-5 h-5" />, color: 'bg-fuchsia-50' },
    { value: "constitution", label: "Constitution", icon: <Scroll className="w-5 h-5" />, color: 'bg-teal-50' },
    { value: "un_materials", label: "UN Materials", icon: <Globe className="w-5 h-5" />, color: 'bg-orange-50' },
  ],
} as const

const MotionButton = motion(Button)

export const CitationTypeSelector = memo(function CitationTypeSelector({ 
  value, 
  onChange,
  initiallyOpen = false
}: CitationTypeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(initiallyOpen || !value)

  const filterTypes = useCallback((types: ReadonlyArray<{ readonly value: string; readonly label: string; readonly icon: JSX.Element; readonly color: string }>) =>
    types.filter(type => type.label.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const handleSelect = useCallback((newValue: CitationType) => {
    onChange(newValue);
    setIsOpen(false);
    setSearchQuery('');
  }, [onChange]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery('');
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const renderSection = (title: string, types: ReadonlyArray<{ readonly value: string; readonly label: string; readonly icon: JSX.Element; readonly color: string }>) => {
    const filteredTypes = filterTypes(types)
    if (filteredTypes.length === 0) return null

    return (
      <div className="space-y-2 pt-6 first:pt-0">
        <h3 className="text-base font-semibold text-primary mb-3">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredTypes.map((type) => (
            <MotionButton
              key={type.value}
              variant="outline"
              onClick={() => handleSelect(type.value as CitationType)}
              className={`justify-start w-full text-left h-auto py-1.5 pl-2 pr-3 ${value === type.value ? 'bg-primary text-primary-foreground' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`${type.color} p-1.5 rounded-lg`}>
                  {type.icon}
                </div>
                <span>{type.label}</span>
              </div>
              <AnimatePresence>
                {value === type.value && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto"
                  >
                    <Check className="h-4 w-4 flex-shrink-0" />
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionButton>
          ))}
        </div>
      </div>
    )
  }

  const allTypes = [
    ...citationTypes.smartExtraction,
    ...citationTypes.cases,
    ...citationTypes.legislativeMaterials,
    ...citationTypes.secondarySources,
    ...citationTypes.miscellaneous,
    ...citationTypes.internationalMaterials,
  ]
  const selectedType = allTypes.find(type => type.value === value)
  const selectedLabel = selectedType?.label || "Select citation type"

  return (
    <div className="space-y-2">
      <Label htmlFor="type">Type</Label>
      <Dialog 
        open={isOpen} 
        onOpenChange={handleOpenChange}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between pl-2"
          >
            <div className="flex items-center gap-1.5">
              {selectedType && (
                <div className={`${selectedType.color} p-1 rounded-md`}>
                  {selectedType.icon}
                </div>
              )}
              <span>{selectedLabel}</span>
            </div>
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] w-full sm:max-w-[700px] p-0 overflow-hidden bg-white [&_.close-button]:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-4"
          >
            <Input
              placeholder="Search citation types..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-4"
            />
            <div className="max-h-[60vh] overflow-y-auto px-2 space-y-6 divide-y divide-gray-200">
              {renderSection("Smart Extraction", citationTypes.smartExtraction)}
              {renderSection("Judicial Materials", citationTypes.cases)}
              {renderSection("Legislative Materials", citationTypes.legislativeMaterials)}
              {renderSection("Secondary Sources", citationTypes.secondarySources)}
              {renderSection("Miscellaneous", citationTypes.miscellaneous)}
              {renderSection("International Materials", citationTypes.internationalMaterials)}
              {renderSection("To be Added", citationTypes.toBeAdded)}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}); 