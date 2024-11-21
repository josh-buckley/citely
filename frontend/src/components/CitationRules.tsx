'use client'

import { EmptyState } from "./rules/EmptyState";
import { LegislationRules } from "./rules/LegislationRules";
import { ReportedDecisionRules } from "./rules/ReportedDecisionRules";
import { UnreportedDecisionRules } from "./rules/UnreportedDecisionRules";
import { UnreportedNoMediumNeutralRules } from "./rules/UnreportedNoMediumNeutralRules";
import { ProceedingRules } from "./rules/ProceedingRules";
import { JournalArticleRules } from "./rules/JournalArticleRules";
import { BookRules } from "./rules/BookRules";
import { CourtOrderRules } from "./rules/CourtOrderRules";
import { ArbitrationRules } from "./rules/ArbitrationRules";
import { TranscriptRules } from "./rules/TranscriptRules";
import { HighCourtTranscriptRules } from "./rules/HighCourtTranscriptRules";
import { SubmissionRules } from "./rules/SubmissionRules";

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
  if (citationType === 'act' || 
      citationType === 'bill' || 
      citationType === 'explanatory_memorandum') {
    // For legislation short_title, use individualParts rules
    if (activeField === 'short_title') {
      return <LegislationRules activeField="individualParts" />;
    }
    return <LegislationRules activeField={activeField} />;
  }

  // Handle reported decision rules
  if (citationType === 'case_reported') {
    return <ReportedDecisionRules activeField={activeField} />;
  }

  // Handle unreported (medium neutral) decision rules
  if (citationType === 'case_unreported_medium_neutral') {
    // For case name, year, and pinpoint, use reported decision rules
    if (activeField === 'case_name' || activeField === 'year' || activeField === 'pinpoint') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    // For unique court identifier and judgment number, use unreported decision rules
    return <UnreportedDecisionRules activeField={activeField} />;
  }

  // Handle unreported (no medium neutral) decision rules
  if (citationType === 'case_unreported_no_medium_neutral') {
    // For case name and pinpoint, use reported decision rules
    if (activeField === 'case_name' || activeField === 'pinpoint') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <UnreportedNoMediumNeutralRules activeField={activeField} />;
  }

  // Handle arbitration rules
  if (citationType === 'arbitration') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <ArbitrationRules activeField={activeField} />;
  }

  // Handle high court transcript rules
  if (citationType === 'high_court_transcript') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <HighCourtTranscriptRules activeField={activeField} />;
  }

  // Handle transcript rules
  if (citationType === 'transcript_of_proceedings') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <TranscriptRules activeField={activeField} />;
  }

  // Handle proceeding rules
  if (citationType === 'proceeding') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <ProceedingRules activeField={activeField} />;
  }

  // Handle court order rules
  if (citationType === 'court_order') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <CourtOrderRules activeField={activeField} />;
  }

  // Handle journal article rules
  if (citationType === 'journal_article') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <JournalArticleRules activeField={activeField} />;
  }

  // Handle submission rules
  if (citationType === 'submission') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <SubmissionRules activeField={activeField} />;
  }

  // Handle book rules
  if (citationType === 'book') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <ReportedDecisionRules activeField={activeField} />;
    }
    return <BookRules activeField={activeField} />;
  }

  return <EmptyState />;
}