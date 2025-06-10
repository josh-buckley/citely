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
import { DelegatedLegislationRules } from "./rules/DelegatedLegislationRules";
import { OrderOrRulingRules } from "./rules/OrderOrRulingRules";
import { DelegatedNonGovernmentLegislationRules } from "./rules/DelegatedNonGovernmentLegislationRules";
import { GazetteRules } from "./rules/GazetteRules";
import { HansardRules } from "./rules/HansardRules";
import { ExplanatoryMemorandumRules } from "./rules/ExplanatoryMemorandumRules";
import { SymposiumRules } from "./rules/SymposiumRules";
import { BookChapterRules } from "./rules/BookChapterRules";
import { BookWithEditorRules } from "./rules/BookWithEditorRules";
import { TranslatedBookRules } from './rules/TranslatedBookRules';
import { AudiobookRules } from './rules/AudiobookRules';
import { ReportRules } from './rules/ReportRules';
import { ResearchPaperRules } from './rules/ResearchPaperRules';
import { SpeechRules } from './rules/SpeechRules';
import { PressAndMediaReleaseRules } from './rules/PressAndMediaReleaseRules';
import { HardCopyDictionaryRules } from './rules/HardCopyDictionaryRules';
import { OnlineDictionaryRules } from './rules/OnlineDictionaryRules';
import { HardCopyLegalEncyclopediaRules } from './rules/HardCopyLegalEncyclopediaRules';
import { OnlineLegalEncyclopediaRules } from './rules/OnlineLegalEncyclopediaRules';

interface CitationRulesProps {
  activeField: string | null;
  citationType?: string;
  formData?: { type: string };
}

export function CitationRules({ activeField, citationType, formData }: CitationRulesProps) {
  if (!activeField) {
    return <div className="h-full"><EmptyState /></div>;
  }

  // Handle gazette rules
  if (citationType === 'gazette') {
    const fieldMap: Record<string, string> = {
      authors: 'authors',
      author: 'authors',
      title_of_notice: 'titleOfNotice',
      titleOfNotice: 'titleOfNotice',
      jurisdiction: 'jurisdiction',
      gazette_title: 'gazetteTitle',
      gazetteTitle: 'gazetteTitle',
      gazette_number: 'gazetteNumber',
      gazetteNumber: 'gazetteNumber',
      starting_page: 'startingPage',
      startingPage: 'startingPage',
      pinpoint: 'pinpoint',
      citationExamples: 'citationExamples',
    };
    const mappedField = fieldMap[activeField] || activeField;
    return <div key={activeField} className="opacity-0 animate-fade-up"><GazetteRules activeField={mappedField} /></div>;
  }

  // Handle delegated legislation rules
  if (citationType === 'delegated_legislation') {
    if (activeField === 'short_title') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><DelegatedLegislationRules activeField="individualParts" /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><DelegatedLegislationRules activeField={activeField} /></div>;
  }

  // Handle delegated non-government legislation rules
  if (citationType === 'delegated_non_government_legislation') {
    const fieldMap: Record<string, string> = {
      issuing_body: 'issuingBody',
      issuingBody: 'issuingBody',
      title: 'title',
      pinpoint: 'pinpoint',
      citationExamples: 'citationExamples',
    };
    const mappedField = fieldMap[activeField] || activeField;
    return <div key={activeField} className="opacity-0 animate-fade-up"><DelegatedNonGovernmentLegislationRules activeField={mappedField} /></div>;
  }

  // Handle explanatory memorandum rules
  if (citationType === 'explanatory_memorandum') {
    const fieldMap: Record<string, string> = {
      explanatory_type: 'explanatoryType',
      explanatoryType: 'explanatoryType',
      bill_citation: 'billCitation',
      billCitation: 'billCitation',
      pinpoint: 'pinpoint',
      citationExamples: 'citationExamples',
    };
    const mappedField = fieldMap[activeField] || activeField;
    return <div key={activeField} className="opacity-0 animate-fade-up"><ExplanatoryMemorandumRules activeField={mappedField} /></div>;
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

  // Handle symposium rules
  if (citationType === 'symposium') {
    if (activeField === 'case_name') {
      return <div key={activeField} className="opacity-0 animate-fade-up"><ReportedDecisionRules activeField={activeField} /></div>;
    }
    return <div key={activeField} className="opacity-0 animate-fade-up"><SymposiumRules activeField={activeField} /></div>;
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

  // Handle book chapter rules
  if (citationType === 'book_chapter') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><BookChapterRules activeField={activeField} /></div>;
  }

  // Handle book with editor rules
  if (citationType === 'book_with_editor') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><BookWithEditorRules activeField={activeField} /></div>;
  }

  // Handle translated book rules
  if (citationType === 'translated_book') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><TranslatedBookRules activeField={activeField} /></div>;
  }

  // Handle audiobook rules
  if (citationType === 'audiobook') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><AudiobookRules activeField={activeField} /></div>;
  }

  // Handle report rules
  if (citationType === 'report') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><ReportRules activeField={activeField} /></div>;
  }

  // Handle research paper rules
  if (citationType === 'research_paper') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><ResearchPaperRules activeField={activeField} /></div>;
  }

  // Handle speech rules
  if (citationType === 'speech') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><SpeechRules activeField={activeField} /></div>;
  }

  // Handle press and media release rules
  if (citationType === 'press_and_media_release') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><PressAndMediaReleaseRules activeField={activeField} /></div>;
  }

  // Handle hard copy dictionary rules
  if (citationType === 'hard_copy_dictionary') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><HardCopyDictionaryRules activeField={activeField} /></div>;
  }

  // Handle online dictionary rules
  if (citationType === 'online_dictionary') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><OnlineDictionaryRules activeField={activeField} /></div>;
  }

  // Handle hard copy legal encyclopedia rules
  if (citationType === 'hard_copy_legal_encyclopedia') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><HardCopyLegalEncyclopediaRules activeField={activeField} /></div>;
  }

  // Handle online legal encyclopedia rules
  if (citationType === 'online_legal_encyclopedia') {
    return <div key={activeField} className="opacity-0 animate-fade-up"><OnlineLegalEncyclopediaRules activeField={activeField} /></div>;
  }

  // Handle order or ruling rules
  if (citationType === 'order_or_ruling') {
    // Map form field names to rules fields if needed
    const fieldMap: Record<string, string> = {
      instrumentality: 'instrumentalityOfficer',
      officer: 'instrumentalityOfficer',
      instrumentalityOfficer: 'instrumentalityOfficer',
      instrumentality_officer: 'instrumentalityOfficer',
      instrument_title: 'instrumentTitle',
      instrumentTitle: 'instrumentTitle',
      document_number: 'documentNumber',
      documentNumber: 'documentNumber',
      pinpoint: 'pinpoint',
      citationExamples: 'citationExamples',
    };
    const mappedField = fieldMap[activeField] || activeField;
    return <div key={activeField} className="opacity-0 animate-fade-up"><OrderOrRulingRules activeField={mappedField} /></div>;
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

  // Handle hansard rules
  if (citationType === 'hansard') {
    const fieldMap: Record<string, string> = {
      jurisdiction: 'jurisdiction',
      chamber: 'chamber',
      pinpoint: 'pinpoint',
      name_of_speaker: 'nameOfSpeaker',
      nameOfSpeaker: 'nameOfSpeaker',
      citationExamples: 'citationExamples',
    };
    const mappedField = fieldMap[activeField] || activeField;
    return <div key={activeField} className="opacity-0 animate-fade-up"><HansardRules activeField={mappedField} /></div>;
  }

  return <div key={activeField} className="opacity-0 animate-fade-up"><EmptyState /></div>;
}