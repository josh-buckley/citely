export type CitationType =
  | 'case_reported'
  | 'case_unreported_medium_neutral'
  | 'case_unreported_no_medium_neutral'
  | 'act'
  | 'bill'
  | 'explanatory_memorandum'
  | 'hansard'
  | 'treaty'
  | 'journal_article'
  | 'book'
  | 'book_chapter'
  | 'report'
  | 'online_dictionary'
  | 'hard_copy_dictionary'
  | 'online_legal_encyclopedia'
  | 'hard_copy_legal_encyclopedia'
  | 'online_looseleaf'
  | 'hard_copy_looseleaf'
  | 'online_newspaper'
  | 'printed_newspaper'
  | 'internet_material'
  | 'proceeding'
  | 'court_order'
  | 'arbitration'
  | 'transcript_of_proceedings'
  | 'high_court_transcript'
  | 'submission'
  | 'delegated_legislation'
  | 'gazette'
  | 'order_or_ruling'
  | 'court_practice_direction'
  | 'symposium'
  | 'book_with_editor'
  | 'translated_book'
  | 'audiobook'
  | 'research_paper'
  | 'speech'
  | 'press_and_media_release'
  | 'periodical'
  | 'interview'
  | 'film_television_media'
  | 'social_media_post'
  | 'written_submission'
  | 'evidence_to_parliamentary_committee'
  | 'constitutional_convention_debates'
  | 'intellectual_property'
  | 'constitutive_document'
  | 'written_correspondence'
  | 'delegated_non_government_legislation'
  | 'custom';

export interface Citation {
  id: string;
  project_id?: string;
  type: CitationType;
  source?: string;
  
  // Common fields
  title?: string;
  year?: number;
  pinpoint?: string;
  url?: string;
  notes?: string;
  tags?: { id: string; name: string; color: string }[];
  order?: number;
  formatted_citation?: string;
  updated_at: Date;
  created_at: Date;
  
  // Case-related fields
  case_name?: string;
  volume?: string;
  law_report_series?: string;
  starting_page?: string;
  unique_court_identifier?: string;
  judgment_number?: string;
  court?: string;
  judge?: string;
  full_date?: string | null;
  proceeding_number?: string;
  judicial_officers?: string;
  
  // Arbitration fields
  award_description?: string;
  forum?: string;
  case_award_number?: string;
  
  // Party information
  party_name?: string;
  
  // Legislative materials
  jurisdiction?: string;
  explanatory_type?: string;
  bill_citation?: string;
  chamber?: string;
  name_of_speaker?: string; // Added - for Hansard
  gazette_title?: string;
  gazette_number?: string;
  title_of_notice?: string; // Added
  document_number?: string; // Added
  
  // Court documents
  instrumentality_officer?: string;
  instrument_title?: string;
  practice_direction?: string;
  number_identifier?: string; // Added
  citation_report_series?: string; // Added
  
  // Secondary sources
  authors: string[];
  editors: string[];
  journal?: string;
  issue?: string;
  publisher?: string;
  edition?: string;
  chapter_title?: string;
  translation_title?: string;
  publication_year?: string;
  dictionary_title?: string;
  edition_number?: string; // Added
  entry_title?: string;
  definition_number?: string;
  title_number?: string;
  title_name?: string;
  chapter_number?: string;
  chapter_name?: string;
  paragraph?: string;
  title_of_encyclopedia?: string;
  volume_number?: string;
  date_of_retrieval?: string | null;
  
  // Media-related fields
  newspaper?: string;
  place_of_publication?: string; // Added
  periodical_name?: string;
  medium?: string; // Added
  director?: string; // Added
  producer?: string; // Added
  production_company?: string; // Added
  timestamp?: string; // Added
  platform?: string;
  post_content?: string; // Added
  release_type?: string; // Added
  
  // Interview fields
  interviewee?: string;
  interviewer?: string;
  program?: string; // Added
  
  // Miscellaneous fields
  submission_number?: string;
  body?: string;
  name_of_inquiry?: string;
  committee?: string;
  legislature?: string;
  location?: string;
  number?: string;
  
  // IP fields
  jurisdiction_code?: string;
  ip_type?: string;
  additional_info?: string;
  identification_number?: string;
  filing_date?: string | null;
  registration_status?: string;
  status_change_date?: string | null;
  
  // Treaty fields
  treaty_title?: string; // Added
  parties_names?: string; // Added
  signature_date?: string | null;
  treaty_series?: string;
  entry_force_date?: string | null;
  
  // Correspondence fields
  correspondence_type?: string;
  recipient?: string;
  
  // Research paper fields
  institution?: string;
  paper_number?: string;
  
  // Speech fields
  speech_or_lecture?: string;
  institution_forum?: string;


  // Some other fields
  episode_title?: string;
  film_series_title?: string;
  version_details?: string;
  studio_producer?: string;
  registration_date?: string;
  company_name?: string;
  date_opened?: string;
  date_in_force?: string;
}

export interface Tag {
  id?: number;
  name: string;
  color: string;
}
