'use client'

import React, { useState, useCallback, memo } from 'react'
import { Book, Check, Search } from 'lucide-react'
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
  cases: [
    { value: "case_reported", label: "Reported Case" },
    { value: "case_unreported_medium_neutral", label: "Unreported Case (Medium Neutral)" },
    { value: "case_unreported_no_medium_neutral", label: "Unreported Case (No Medium Neutral)" },
    { value: "proceeding", label: "Proceeding" },
    { value: "court_order", label: "Court Order" },
    { value: "arbitration", label: "Arbitration" },
    { value: "transcript_of_proceedings", label: "Transcript of Proceedings" },
    { value: "high_court_transcript", label: "High Court Transcript" },
    { value: "submission", label: "Submission" },
  ],
  legislativeMaterials: [
    { value: "legislation", label: "Legislation" },
    { value: "delegated_legislation", label: "Delegated Legislation" },
    { value: "delegated_non_government_legislation", label: "Delegated Non-Government Entity Legislation" },
    { value: "bill", label: "Bill" },
    { value: "explanatory_memorandum", label: "Explanatory Memorandum" },
    { value: "hansard", label: "Hansard" },
    { value: "gazette", label: "Gazette" },
    { value: "order_or_ruling", label: "Order or Ruling" },
    { value: "court_practice_direction", label: "Court Practice Direction or Note" },
  ],
  secondarySources: [
    { value: "journal_article", label: "Journal Article" },
    { value: "symposium", label: "Symposium" },
    { value: "book", label: "Book" },
    { value: "book_chapter", label: "Book Chapter" },
    { value: "book_with_editor", label: "Book with Editor" },
    { value: "translated_book", label: "Translated Book" },
    { value: "audiobook", label: "Audiobook" },
    { value: "report", label: "Report" },
    { value: "research_paper", label: "Research Paper" },
    { value: "speech", label: "Speech" },
    { value: "press_and_media_release", label: "Press and Media Release" },
    { value: "hard_copy_dictionary", label: "Hard Copy Dictionary" },
    { value: "online_dictionary", label: "Online Dictionary" },
    { value: "hard_copy_legal_encyclopedia", label: "Hard Copy Legal Encyclopedia" },
    { value: "online_legal_encyclopedia", label: "Online Legal Encyclopedia" },
    { value: "hard_copy_looseleaf", label: "Hard Copy Looseleaf Service" },
    { value: "online_looseleaf", label: "Online Looseleaf Service" },
    { value: "printed_newspaper", label: "Printed Newspaper" },
    { value: "online_newspaper", label: "Online Newspaper" },
    { value: "periodical", label: "Periodical, Newsletter or Magazine" },
    { value: "interview", label: "Interview" },
    { value: "film_television_media", label: "Film, Television or Other Media" },
    { value: "internet_material", label: "Internet Material" },
    { value: "social_media_post", label: "Social Media Post" },
  ],
  miscellaneous: [
    { value: "written_submission", label: "Written Submission" },
    { value: "evidence_to_parliamentary_committee", label: "Evidence to Parliamentary Committee" },
    { value: "constitutional_convention_debates", label: "Australian Constitutional Convention Debates" },
    { value: "intellectual_property", label: "Intellectual Property Material" },
    { value: "constitutive_document", label: "Constitutive Documents of a Corporation" },
    { value: "written_correspondence", label: "Written Correspondence" },
  ],
  internationalMaterials: [
    { value: "treaty", label: "Treaty" },
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

  const filterTypes = useCallback((types: ReadonlyArray<{ readonly value: string; readonly label: string }>) =>
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

  const renderSection = (title: string, types: ReadonlyArray<{ readonly value: string; readonly label: string }>) => {
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
              className={`justify-start w-full text-left h-auto py-2 px-4 ${value === type.value ? 'bg-primary text-primary-foreground' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="mr-2">{type.label}</span>
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
    ...citationTypes.cases,
    ...citationTypes.legislativeMaterials,
    ...citationTypes.secondarySources,
    ...citationTypes.miscellaneous,
    ...citationTypes.internationalMaterials,
  ]
  const selectedLabel = allTypes.find(type => type.value === value)?.label || "Select citation type"

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
            className="w-full justify-between"
          >
            {selectedLabel}
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
              {renderSection("Cases", citationTypes.cases)}
              {renderSection("Legislative Materials", citationTypes.legislativeMaterials)}
              {renderSection("Secondary Sources", citationTypes.secondarySources)}
              {renderSection("Miscellaneous", citationTypes.miscellaneous)}
              {renderSection("International Materials", citationTypes.internationalMaterials)}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}); 