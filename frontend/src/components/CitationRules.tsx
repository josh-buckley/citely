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
import { Card } from './ui/card';

interface CitationRulesProps {
  activeField: string | null;
  citationType?: string;
  formData?: { type: string };
}

export function CitationRules({ activeField, citationType, formData }: CitationRulesProps) {
  if (!activeField) {
    return <div className="h-full"><EmptyState /></div>;
  }

  // Handle legislation rules
  if (citationType === 'act' || 
      citationType === 'bill' || 
      citationType === 'explanatory_memorandum') {
    // For legislation short_title, use individualParts rules
    if (activeField === 'short_title') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><LegislationRules activeField="individualParts" /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><LegislationRules activeField={activeField} /></div>;
  }

  // Handle reported decision rules
  if (citationType === 'case_reported') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
  }

  // Handle unreported (medium neutral) decision rules
  if (citationType === 'case_unreported_medium_neutral') {
    // For case name, year, and pinpoint, use reported decision rules
    if (activeField === 'case_name' || activeField === 'year' || activeField === 'pinpoint') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    // For unique court identifier and judgment number, use unreported decision rules
    return <div key={activeField} className="opacity-0 animate-fade-up"><UnreportedDecisionRules activeField={activeField} /></div>;
  }

  // Handle unreported (no medium neutral) decision rules
  if (citationType === 'case_unreported_no_medium_neutral') {
    // For case name and pinpoint, use reported decision rules
    if (activeField === 'case_name' || activeField === 'pinpoint') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><UnreportedNoMediumNeutralRules activeField={activeField} /></div>;
  }

  // Handle arbitration rules
  if (citationType === 'arbitration') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><ArbitrationRules activeField={activeField} /></div>;
  }

  // Handle high court transcript rules
  if (citationType === 'high_court_transcript') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><HighCourtTranscriptRules activeField={activeField} /></div>;
  }

  // Handle transcript rules
  if (citationType === 'transcript_of_proceedings') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><TranscriptRules activeField={activeField} /></div>;
  }

  // Handle proceeding rules
  if (citationType === 'proceeding') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><ProceedingRules activeField={activeField} /></div>;
  }

  // Handle court order rules
  if (citationType === 'court_order') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><CourtOrderRules activeField={activeField} /></div>;
  }

  // Handle journal article rules
  if (citationType === 'journal_article') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><JournalArticleRules activeField={activeField} /></div>;
  }

  // Handle submission rules
  if (citationType === 'submission') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><SubmissionRules activeField={activeField} /></div>;
  }

  // Handle book rules
  if (citationType === 'book') {
    // For case name, use reported decision rules
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><BookRules activeField={activeField} /></div>;
  }

  // Handle smart extraction rules
  if (citationType === 'westlaw_case' || 
      citationType === 'lexisnexis_case' || 
      citationType === 'scholar_article' || 
      citationType === 'scholar_book') {
    if (!activeField) {
      return <div className="h-full"><EmptyState /></div>;
    }
    return (
      <div key={activeField} className="opacity-0 animate-fade-up h-full">
        <Card className="h-full p-6">
          <h3 className="text-lg font-semibold mb-4">Smart Citation Extraction</h3>
          <p className="text-gray-600 mb-4">
            {citationType === 'westlaw_case' && 'Paste the full text of your case from Westlaw. The citation details will be automatically extracted.'}
            {citationType === 'lexisnexis_case' && 'Paste the full text of your case from LexisNexis. The citation details will be automatically extracted.'}
            {citationType === 'scholar_article' && 'Paste the full text of your article from Google Scholar. The citation details will be automatically extracted.'}
            {citationType === 'scholar_book' && 'Paste the full text of your book citation from Google Scholar. The citation details will be automatically extracted.'}
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Tips</h4>
              <ul className="list-disc list-inside text-blue-700 text-sm space-y-2">
                <li>Include the full text to ensure accurate extraction</li>
                <li>Make sure to copy all citation details from the source</li>
                <li>The system will automatically format the citation correctly</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return <div key={activeField} className="opacity-0 animate-fade-up"><EmptyState /></div>;
}