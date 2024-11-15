'use client'

import { EmptyState } from "./rules/EmptyState";
import { LegislationRules } from "./rules/LegislationRules";
import { ReportedDecisionRules } from "./rules/ReportedDecisionRules";
import { JournalArticleRules } from "./rules/JournalArticleRules";
import { BookRules } from "./rules/BookRules";

interface CitationRulesProps {
  activeField: string | null;
  citationType?: string;
  formData?: { type: string };
}

export function CitationRules({ activeField, citationType, formData }: CitationRulesProps) {
  if (!activeField) {
    return <EmptyState />;
  }

  // Handle legislation rules
  if (citationType === 'legislation' || 
      citationType === 'bill' || 
      citationType === 'explanatory_memorandum') {
    // For legislation short_title, use individualParts rules
    if (activeField === 'short_title') {
      return <LegislationRules activeField="individualParts" />;
    }
    return <LegislationRules activeField={activeField} />;
  }

  // Handle reported decision rules
  if (citationType === 'case_reported' || 
      citationType === 'case_unreported_medium_neutral' || 
      citationType === 'case_unreported_no_medium_neutral') {
    return <ReportedDecisionRules activeField={activeField} />;
  }

  // Handle journal article rules
  if (citationType === 'journal_article') {
    return <JournalArticleRules activeField={activeField} />;
  }

  // Handle book rules
  if (citationType === 'book') {
    return <BookRules activeField={activeField} />;
  }

  return <EmptyState />;
}