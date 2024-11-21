import React from 'react';

interface CitationPreviewProps {
  type: string;
  formData: any;
}

// Function to get field placeholder based on citation type
const getFieldPlaceholder = (fieldName: string): string => {
  const placeholders: { [key: string]: string } = {
    // Case-related fields
    case_name: 'Case Name',
    year: 'Year',
    volume: 'Volume',
    law_report_series: 'Law Report Series',
    starting_page: 'Starting Page',
    pinpoint: 'Pinpoint',
    unique_court_identifier: 'Court Identifier',
    judgment_number: 'Judgment Number',
    court: 'Court',
    judge: 'Judge(s)',
    full_date: 'Full Date',
    numner: 'Number',
    
    // Common fields
    title: 'Title',
    jurisdiction: 'Jurisdiction',
    authors: 'Authors',
    editors: 'Editors',
    publisher: 'Publisher',
    edition: 'Edition',
    
    // Journal and article fields
    journal: 'Journal',
    issue: 'Issue',
    chapter_title: 'Chapter Title',
    book_title: 'Book Title',
    
    // Dictionary and encyclopedia fields
    entry_title: 'Entry Title',
    definition_number: 'Definition Number',
    retrieval_date: 'Retrieval Date',
    title_number: 'Title Number',
    title_name: 'Title Name',
    chapter_number: 'Chapter Number',
    chapter_name: 'Chapter Name',
    paragraph: 'Paragraph',
    
    // Newspaper fields
    newspaper: 'Newspaper',
    place: 'Place',
    url: 'URL',
    
    // Legal document fields
    judicial_officers: 'Judicial Officer(s)',
    proceeding_number: 'Proceeding Number',
    award_description: 'Award Description',
    forum: 'Forum',
    case_award_number: 'Case/Award Number',
    party_name: 'Party Name',
    
    // Report and paper fields
    document_type: 'Document Type',
    series_no: 'Series Number',
    document_number: 'Document Number',
    institution: 'Institution',
    
    // Government document fields
    chamber: 'Chamber',
    name_of_speaker: 'Name of Speaker',
    practice_direction: 'Practice Direction',
    number_identifier: 'Number/Identifier',
    citation_report_series: 'Citation Report Series',
    
    // Treaty fields
    parties: 'Parties',
    date_opened: 'Date Opened',
    treaty_series: 'Treaty Series',
    date_in_force: 'Date in Force',
    
    // Media fields
    episode_title: 'Episode Title',
    film_series_title: 'Film/Series Title',
    version_details: 'Version Details',
    studio_producer: 'Studio/Producer',
    
    // Social media fields
    username: 'Username',
    platform: 'Platform',
    time: 'Time',
    
    // Committee and debate fields
    committee: 'Committee',
    legislature: 'Legislature',
    location: 'Location',
    speaker: 'Speaker',
    
    // IP fields
    jurisdiction_code: 'Jurisdiction Code',
    ip_type: 'IP Type',
    additional_info: 'Additional Info',
    identification_number: 'Identification Number',
    filing_date: 'Filing Date',
    registration_status: 'Registration Status',
    registration_date: 'Registration Date',
    
    // Other fields
    document_title: 'Document Title',
    web_page_title: 'Web Page Title',
    correspondence_type: 'Correspondence Type',
    recipient: 'Recipient',
    release_type: 'Release Type',
    body: 'Body',
    date_month_season: 'Date/Month/Season',
    periodical_name: 'Periodical Name',
    format: 'Format',
    interviewee: 'Interviewee',
    interviewer: 'Interviewer',
    interview_forum: 'Interview Forum',
    speech_or_lecture: 'Speech/Lecture',
    institution_forum: 'Institution/Forum',
    name_of_inquiry: 'Name of Inquiry',
    company_name: 'Company Name',
    issuing_body: 'Issuing Body',
    translation_title: 'Translation Title',
    translator: 'Translator',
    gazette_title: 'Gazette Title',
    gazette_number: 'Gazette Number',
    title_of_notice: 'Title of Notice',
    instrumentality_officer: 'Instrumentality Officer',
    instrument_title: 'Instrument Title',
    bill_citation: 'Bill Citation',
    short_title: 'Short Title',
    explanatory_type: 'Explanatory Type'
  };
  return placeholders[fieldName] || fieldName;
};

// Function to format authors according to AGLC4
const formatAuthors = (authors: string | string[]): string => {
  if (!authors) {
    return '';
  }
  if (typeof authors === 'string') {
    return authors;
  }
  if (authors.length === 1) {
    return authors[0];
  }
  if (authors.length === 2) {
    return `${authors[0]} and ${authors[1]}`;
  }
  if (authors.length === 3) {
    return `${authors[0]}, ${authors[1]} and ${authors[2]}`;
  }
  return `${authors[0]} et al`;
};

// Function to format editors according to AGLC4
const formatEditors = (editors: string | string[]): string => {
  if (!editors) {
    return '';
  }
  if (typeof editors === 'string') {
    return `${editors} (ed)`;
  }
  if (editors.length === 1) {
    return `${editors[0]} (ed)`;
  } else if (editors.length === 2) {
    return `${editors[0]} and ${editors[1]} (eds)`;
  } else if (editors.length === 3) {
    return `${editors[0]}, ${editors[1]} and ${editors[2]} (eds)`;
  } else {
    return `${editors[0]} et al (eds)`;
  }
};

// Function to format editors without suffix according to AGLC4
const formatEditorsWithoutSuffix = (editors: string | string[]): string => {
  if (!editors) {
    return '';
  }
  if (typeof editors === 'string') {
    return editors;
  }
  if (editors.length === 1) {
    return editors[0];
  } else if (editors.length === 2) {
    return `${editors[0]} and ${editors[1]}`;
  } else if (editors.length === 3) {
    return `${editors[0]}, ${editors[1]} and ${editors[2]}`;
  } else {
    return `${editors[0]} et al`;
  }
};

// Function to generate preview text
export const generatePreviewText = (type: string, formData: any): string => {
  const getValue = (field: string): string => {
    const value = formData[field];
    if (!value || value === '') {
      return `<span class="bg-gray-100 text-gray-600 rounded px-1">${getFieldPlaceholder(field)}</span>`;
    }
    if (field === 'authors' && Array.isArray(value)) {
      return value.length > 0 ? `<span class="bg-gray-100 text-gray-600 rounded px-1">${formatAuthors(value)}</span>` : `<span class="bg-gray-100 text-gray-600 rounded px-1">${getFieldPlaceholder(field)}</span>`;
    }
    if (field === 'editors' && Array.isArray(value)) {
      return value.length > 0 ? `<span class="bg-gray-100 text-gray-600 rounded px-1">${value.join(', ')}</span>` : `<span class="bg-gray-100 text-gray-600 rounded px-1">${getFieldPlaceholder(field)}</span>`;
    }
    // Apply consistent styling to all values
    return `<span class="bg-gray-100 text-gray-600 rounded px-1">${value}</span>`;
  };

  const wrapInBrackets = (value: string): string => {
    return `<span class="text-gray-600">[${value}]</span>`;
  };

  const wrapInParens = (value: string): string => {
    return `<span class="text-gray-600">(${value})</span>`;
  };

  const wrapInItalics = (value: string): string => {
    // Extract the inner text from the value if it's already wrapped in a span
    const match = value.match(/<span class="[^"]*">(.*?)<\/span>/);
    const innerText = match ? match[1] : value;
    return `<span class="bg-gray-100 text-gray-600 rounded px-1"><i>${innerText}</i></span>`;
  };

  const joinWithDots = (elements: string[]) => {
    return elements
      .map(el => el.trim())
      .filter(el => el && el !== 'undefined')
      .join(' • ');
  };

  switch (type) {
    case 'case_reported': {
      const elements: string[] = [
        wrapInItalics(getValue('case_name')),
        getValue('year'),
        getValue('volume'),
        getValue('law_report_series'),
        getValue('starting_page')
      ];
      
      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        if (elements[elements.length - 1] !== getFieldPlaceholder('starting_page')) {
          elements[elements.length - 1] += ',';
        }
        elements.push(pinpoint);
      }
      
      return elements.join(' ');
    }
    
    case 'case_unreported_medium_neutral': {
      const elements: string[] = [
        wrapInItalics(getValue('case_name')),
        getValue('year'),
        getValue('unique_court_identifier'),
        getValue('judgment_number') + ','
      ];
      
      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }
      
      return elements.join(' ');
    }
    
    case 'case_unreported_no_medium_neutral': {
      const elements: string[] = [
        wrapInItalics(getValue('case_name'))
      ];

      const courtInfo = [
        getValue('court'),
        getValue('judge'),
        getValue('full_date')
      ].filter(value => value !== getFieldPlaceholder('court') && 
               value !== getFieldPlaceholder('judge') && 
               value !== getFieldPlaceholder('full_date'));

      if (courtInfo.length > 0) {
        elements.push(wrapInParens(courtInfo.join(', ')));
      }
      
      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }
      
      return elements.join(' ');
    }
    
    case 'act': {
      const elements: string[] = [];

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(wrapInItalics(title));
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        elements.push(wrapInItalics(year));
      }

      const jurisdiction = getValue('jurisdiction');
      if (jurisdiction !== getFieldPlaceholder('jurisdiction')) {
        elements.push(wrapInParens(jurisdiction));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'delegated_legislation': {
      const elements: string[] = [];

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(wrapInItalics(title));
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        elements.push(wrapInItalics(year));
      }

      const jurisdiction = getValue('jurisdiction');
      if (jurisdiction !== getFieldPlaceholder('jurisdiction')) {
        elements.push(wrapInParens(jurisdiction));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'delegated_non_government_legislation': {
      const elements: string[] = [];

      const issuingBody = getValue('issuing_body');
      if (issuingBody !== getFieldPlaceholder('issuing_body')) {
        elements.push(`${issuingBody},`);
      }

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(wrapInItalics(title));
      }

      const fullDate = getValue('full_date');
      if (fullDate !== getFieldPlaceholder('full_date')) {
        elements.push(`(at ${fullDate})`);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'bill': {
      const elements: string[] = [];

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(title);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        elements.push(year);
      }

      const jurisdiction = getValue('jurisdiction');
      if (jurisdiction !== getFieldPlaceholder('jurisdiction')) {
        elements.push(wrapInParens(jurisdiction));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }

    case 'explanatory_memorandum': {
      const elements: string[] = [];

      const explanatory_type = getValue('explanatory_type');
      if (explanatory_type !== getFieldPlaceholder('explanatory_type')) {
        elements.push(explanatory_type + ',');
      }

      const billCitation = getValue('bill_citation');
      if (billCitation !== getFieldPlaceholder('bill_citation')) {
        elements.push(billCitation);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'journal_article': {
      const elements: string[] = [];

      const authors = getValue('authors');
      if (authors !== getFieldPlaceholder('authors')) {
        elements.push(`${authors},`);
      }

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(`'${title}'`);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        elements.push(year);
      }

      const volume = getValue('volume');
      const issue = getValue('issue');
      if (volume !== getFieldPlaceholder('volume')) {
        elements.push(volume + (issue !== getFieldPlaceholder('issue') ? `(${issue})` : ''));
      } else if (issue !== getFieldPlaceholder('issue')) {
        elements.push(`(${issue})`);
      }

      const journal = getValue('journal');
      if (journal !== getFieldPlaceholder('journal')) {
        elements.push(wrapInItalics(journal));
      }

      const startingPage = getValue('starting_page');
      if (startingPage !== getFieldPlaceholder('starting_page')) {
        elements.push(startingPage + (getValue('pinpoint') !== getFieldPlaceholder('pinpoint') ? ',' : ''));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'book': {
      const elements: string[] = [];

      const authors = getValue('authors');
      if (authors !== getFieldPlaceholder('authors')) {
        elements.push(`${authors},`);
      }

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(wrapInItalics(`'${title}'`));
      }

      const publicationDetails: string[] = [];

      const publisher = getValue('publisher');
      if (publisher !== getFieldPlaceholder('publisher')) {
        publicationDetails.push(publisher);
      }

      const edition = getValue('edition');
      if (edition !== getFieldPlaceholder('edition')) {
        publicationDetails.push(`${edition} ed`);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        publicationDetails.push(year);
      }

      if (publicationDetails.length > 0) {
        elements.push(wrapInParens(publicationDetails.join(', ')));
      }

      const volume = getValue('volume');
      if (volume !== getFieldPlaceholder('volume')) {
        elements.push(`vol ${volume}`);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'book_with_editor': {
      const elements: string[] = [];

      const authors = getValue('authors');
      if (authors !== getFieldPlaceholder('authors')) {
        elements.push(`${authors},`);
      }

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(wrapInItalics(title));
      }

      const editors = formData.editors;
      if (editors && Array.isArray(editors) && editors.length > 0) {
        elements.push(`ed <span class="bg-gray-100 text-gray-600 rounded px-1">${formatEditorsWithoutSuffix(editors)}</span>`);
      } else if (editors && typeof editors === 'string' && editors !== '') {
        elements.push(`ed <span class="bg-gray-100 text-gray-600 rounded px-1">${editors}</span>`);
      } else {
        elements.push(`ed <span class="bg-gray-100 text-gray-600 rounded px-1">${getFieldPlaceholder('editors')}</span>`);
      }

      const publicationDetails: string[] = [];

      const publisher = getValue('publisher');
      if (publisher !== getFieldPlaceholder('publisher')) {
        publicationDetails.push(publisher);
      }

      const edition = getValue('edition');
      if (edition !== getFieldPlaceholder('edition')) {
        publicationDetails.push(`${edition} ed`);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        publicationDetails.push(year);
      }

      if (publicationDetails.length > 0) {
        elements.push(wrapInParens(publicationDetails.join(', ')));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'book_chapter': {
      const elements: string[] = [];

      const authors = getValue('authors');
      if (authors !== getFieldPlaceholder('authors')) {
        elements.push(`${authors},`);
      }

      const chapterTitle = getValue('chapter_title');
      if (chapterTitle !== getFieldPlaceholder('chapter_title')) {
        elements.push(`'${chapterTitle}'`);
      }

      const editors = getValue('editors');
      if (editors !== getFieldPlaceholder('editors')) {
        elements.push(`in ${formatEditors(editors)},`);
      }

      const bookTitle = getValue('book_title');
      if (bookTitle !== getFieldPlaceholder('book_title')) {
        elements.push(wrapInItalics(bookTitle));
      }

      const publicationDetails: string[] = [];

      const publisher = getValue('publisher');
      if (publisher !== getFieldPlaceholder('publisher')) {
        publicationDetails.push(publisher);
      }

      const edition = getValue('edition');
      if (edition !== getFieldPlaceholder('edition')) {
        publicationDetails.push(`${edition} ed`);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        publicationDetails.push(year);
      }

      if (publicationDetails.length > 0) {
        elements.push(wrapInParens(publicationDetails.join(', ')));
      }

      const volume = getValue('volume');
      if (volume !== getFieldPlaceholder('volume')) {
        elements.push(`vol ${volume}`);
      }

      const startingPage = getValue('starting_page');
      if (startingPage !== getFieldPlaceholder('starting_page')) {
        elements.push(startingPage + (getValue('pinpoint') !== getFieldPlaceholder('pinpoint') ? ',' : ''));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'report': {
      const elements: string[] = [
        getValue('author'),
        getValue('title'),
        getValue('document_type')
      ];
      
      if (getValue('series_no')) {
        elements.push(`No ${getValue('series_no')}`);
      }
      
      elements.push(
        getValue('document_number'),
        getValue('full_date')
      );
      
      const pinpoint = getValue('pinpoint');
      if (pinpoint && pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }
      return joinWithDots(elements.filter(el => el !== ''));
    }
    
    case 'online_dictionary': {
      const elements: string[] = [
        getValue('title'),
        'online at',
        getValue('retrieval_date'),
        `'${getValue('entry_title')}'`
      ];
      
      if (getValue('definition_number')) {
        elements.push(`def ${getValue('definition_number')}`);
      }
      
      return joinWithDots(elements.filter(el => el !== ''));
    }

    case 'online_legal_encyclopedia': {
      const elements: string[] = [
        getValue('publisher'),
        getValue('title'),
        'online at',
        getValue('retrieval_date'),
        `'${getValue('title_number')} ${getValue('title_name')}'`,
        getValue('chapter_number'),
        `'${getValue('chapter_name')}'`,
        getValue('paragraph')
      ];
      return joinWithDots(elements.filter(el => el !== ''));
    }
    
    case 'online_newspaper': {
      const elements: string[] = [
        getValue('author'),
        `'${getValue('title')}'`,
        getValue('newspaper'),
        'online at',
        getValue('full_date')
      ];
      
      const pinpoint = getValue('pinpoint');
      if (pinpoint && pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }
      return joinWithDots(elements);
    }
    
    case 'printed_newspaper': {
      const elements: string[] = [
        getValue('author'),
        `'${getValue('title')}'`,
        getValue('newspaper'),
        getValue('place'),
        getValue('full_date')
      ];
      
      const startingPage = getValue('starting_page');
      if (startingPage && startingPage !== getFieldPlaceholder('starting_page')) {
        elements.push(startingPage);
      }
      
      const pinpoint = getValue('pinpoint');
      if (pinpoint && pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }
      return joinWithDots(elements);
    }
    
    case 'proceeding': {
      const elements: string[] = [
        wrapInItalics(getValue('case_name'))
      ];

      const court = getValue('court');
      const proceedingNumber = getValue('proceeding_number');
      const fullDate = getValue('full_date');

      if (
        court !== getFieldPlaceholder('court') ||
        proceedingNumber !== getFieldPlaceholder('proceeding_number') ||
        fullDate !== getFieldPlaceholder('full_date')
      ) {
        const courtInfo = [];
        if (court !== getFieldPlaceholder('court')) {
          courtInfo.push(court);
        }
        if (proceedingNumber !== getFieldPlaceholder('proceeding_number')) {
          courtInfo.push(proceedingNumber);
        }
        if (fullDate !== getFieldPlaceholder('full_date')) {
          courtInfo.push(`commenced ${fullDate}`);
        }
        if (courtInfo.length > 0) {
          elements.push(wrapInParens(courtInfo.join(', ')));
        }
      }
      
      return elements.join(' ');
    }
    
    case 'court_order': {
      const elements: string[] = [];

      const judicialOfficers = getValue('judicial_officers');
      if (judicialOfficers !== getFieldPlaceholder('judicial_officers')) {
        elements.push(`Order of ${judicialOfficers}`);
      }

      const caseName = getValue('case_name');
      if (caseName !== getFieldPlaceholder('case_name')) {
        elements.push(`in ${wrapInItalics(caseName)}`);
      }

      const court = getValue('court');
      const proceedingNumber = getValue('proceeding_number');
      const fullDate = getValue('full_date');

      if (
        court !== getFieldPlaceholder('court') ||
        proceedingNumber !== getFieldPlaceholder('proceeding_number') ||
        fullDate !== getFieldPlaceholder('full_date')
      ) {
        const courtInfo = [];
        if (court !== getFieldPlaceholder('court')) {
          courtInfo.push(court);
        }
        if (proceedingNumber !== getFieldPlaceholder('proceeding_number')) {
          courtInfo.push(proceedingNumber);
        }
        if (fullDate !== getFieldPlaceholder('full_date')) {
          courtInfo.push(fullDate);
        }
        if (courtInfo.length > 0) {
          elements.push(wrapInParens(courtInfo.join(', ')));
        }
      }

      return elements.join(' ');
    }
    
    case 'arbitration': {
      const elements: string[] = [];

      const caseName = getValue('case_name');
      if (caseName !== getFieldPlaceholder('case_name')) {
        elements.push(wrapInItalics(caseName));
      }

      const awardDescription = getValue('award_description');
      const forum = getValue('forum');
      const caseAwardNumber = getValue('case_award_number');
      const fullDate = getValue('full_date');

      if (
        awardDescription !== getFieldPlaceholder('award_description') ||
        forum !== getFieldPlaceholder('forum') ||
        caseAwardNumber !== getFieldPlaceholder('case_award_number') ||
        fullDate !== getFieldPlaceholder('full_date')
      ) {
        const arbInfo = [];
        if (awardDescription !== getFieldPlaceholder('award_description')) {
          arbInfo.push(awardDescription);
        }
        if (forum !== getFieldPlaceholder('forum')) {
          arbInfo.push(forum);
        }
        if (caseAwardNumber !== getFieldPlaceholder('case_award_number')) {
          arbInfo.push(caseAwardNumber);
        }
        if (fullDate !== getFieldPlaceholder('full_date')) {
          arbInfo.push(fullDate);
        }
        if (arbInfo.length > 0) {
          elements.push(wrapInParens(arbInfo.join(', ')));
        }
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'transcript_of_proceedings': {
      const elements: string[] = ['Transcript of Proceedings,'];

      const caseName = getValue('case_name');
      if (caseName !== getFieldPlaceholder('case_name')) {
        elements.push(wrapInItalics(caseName));
      }

      const court = getValue('court');
      const proceedingNumber = getValue('proceeding_number');
      const judicialOfficers = getValue('judicial_officers');
      const fullDate = getValue('full_date');

      if (
        court !== getFieldPlaceholder('court') ||
        proceedingNumber !== getFieldPlaceholder('proceeding_number') ||
        judicialOfficers !== getFieldPlaceholder('judicial_officers') ||
        fullDate !== getFieldPlaceholder('full_date')
      ) {
        const info = [];
        if (court !== getFieldPlaceholder('court')) {
          info.push(court);
        }
        if (proceedingNumber !== getFieldPlaceholder('proceeding_number')) {
          info.push(proceedingNumber);
        }
        if (judicialOfficers !== getFieldPlaceholder('judicial_officers')) {
          info.push(judicialOfficers);
        }
        if (fullDate !== getFieldPlaceholder('full_date')) {
          info.push(fullDate);
        }
        if (info.length > 0) {
          elements.push(wrapInParens(info.join(', ')));
        }
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'high_court_transcript': {
      const elements: string[] = ['Transcript of Proceedings,'];

      if (getValue('case_name') !== getFieldPlaceholder('case_name')) {
        elements.push(wrapInItalics(getValue('case_name')));
      }

      if (getValue('year') !== getFieldPlaceholder('year')) {
        elements.push('[' + getValue('year') + ']');
      }

      elements.push('HCATrans');

      if (getValue('number') !== getFieldPlaceholder('number')) {
        elements.push(getValue('number'));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(`, ${pinpoint}`);
      }

      return elements.join(' ');
    }
    
    case 'submission': {
      const elements: string[] = [];

      const partyName = getValue('party_name');
      if (partyName !== getFieldPlaceholder('party_name')) {
        elements.push(`${partyName},`);
      }

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(`'${title}',`);
      }

      const caseName = getValue('case_name');
      if (caseName !== getFieldPlaceholder('case_name')) {
        elements.push(`Submission in ${wrapInItalics(caseName)},`);
      }

      const proceedingNumber = getValue('proceeding_number');
      if (proceedingNumber !== getFieldPlaceholder('proceeding_number')) {
        elements.push(`${proceedingNumber},`);
      }

      const fullDate = getValue('full_date');
      if (fullDate !== getFieldPlaceholder('full_date')) {
        elements.push(fullDate);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(`, ${pinpoint}`);
      }

      return elements.join(' ');
    }
    
    case 'hansard': {
      const elements: string[] = [];

      const jurisdiction = getValue('jurisdiction');
      if (jurisdiction !== getFieldPlaceholder('jurisdiction')) {
        elements.push(`${jurisdiction}, <i>Parliamentary Debates</i>,`);
      }

      const chamber = getValue('chamber');
      if (chamber !== getFieldPlaceholder('chamber')) {
        elements.push(`${chamber},`);
      }

      const fullDate = getValue('full_date');
      if (fullDate !== getFieldPlaceholder('full_date')) {
        elements.push(`${fullDate},`);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      const nameOfSpeaker = getValue('name_of_speaker');
      if (nameOfSpeaker !== getFieldPlaceholder('name_of_speaker')) {
        elements.push(wrapInParens(nameOfSpeaker));
      }

      return elements.join(' ');
    }
    
    case 'gazette': {
      const elements: string[] = [];

      const authors = getValue('authors');
      if (authors !== getFieldPlaceholder('authors')) {
        elements.push(authors);
      }

      const titleOfNotice = getValue('title_of_notice');
      if (titleOfNotice !== getFieldPlaceholder('title_of_notice')) {
        elements.push(`'${titleOfNotice}'`);
      }

      const jurisdiction = getValue('jurisdiction');
      if (jurisdiction !== getFieldPlaceholder('jurisdiction')) {
        elements.push(`in ${jurisdiction},`);
      }

      const gazetteTitle = getValue('gazette_title');
      if (gazetteTitle !== getFieldPlaceholder('gazette_title')) {
        elements.push(wrapInItalics(gazetteTitle) + ',');
      }

      const gazetteNumber = getValue('gazette_number');
      if (gazetteNumber !== getFieldPlaceholder('gazette_number')) {
        elements.push(`No ${gazetteNumber},`);
      }

      const fullDate = getValue('full_date');
      if (fullDate !== getFieldPlaceholder('full_date')) {
        elements.push(fullDate);
      }

      const startingPage = getValue('starting_page');
      if (startingPage !== getFieldPlaceholder('starting_page')) {
        elements.push(`, ${startingPage}`);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(`, ${pinpoint}`);
      }

      return elements.join(' ');
    }
    
    case 'order_or_ruling': {
      const elements: string[] = [];

      const instrumentalityOfficer = getValue('instrumentality_officer');
      if (instrumentalityOfficer !== getFieldPlaceholder('instrumentality_officer')) {
        elements.push(`${instrumentalityOfficer},`);
      }

      const instrumentTitle = getValue('instrument_title');
      if (instrumentTitle !== getFieldPlaceholder('instrument_title')) {
        elements.push(wrapInItalics(instrumentTitle));
      }

      const info: string[] = [];
      const documentNumber = getValue('document_number');
      if (documentNumber !== getFieldPlaceholder('document_number')) {
        info.push(documentNumber);
      }

      const fullDate = getValue('full_date');
      if (fullDate !== getFieldPlaceholder('full_date')) {
        info.push(fullDate);
      }

      if (info.length > 0) {
        elements.push(wrapInParens(info.join(', ')));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    case 'symposium': {
      const elements: string[] = ['Symposium,'];

      const title = getValue('title');
      if (title !== getFieldPlaceholder('title')) {
        elements.push(`'${title}'`);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        elements.push(year);
      }

      const volume = getValue('volume');
      const issue = getValue('issue');
      if (volume !== getFieldPlaceholder('volume')) {
        elements.push(volume + (issue !== getFieldPlaceholder('issue') ? `(${issue})` : ''));
      } else if (issue !== getFieldPlaceholder('issue')) {
        elements.push(`(${issue})`);
      }

      const journal = getValue('journal');
      if (journal !== getFieldPlaceholder('journal')) {
        elements.push(wrapInItalics(journal));
      }

      const startingPage = getValue('starting_page');
      if (startingPage !== getFieldPlaceholder('starting_page')) {
        elements.push(startingPage);
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(`, ${pinpoint}`);
      }

      return elements.join(' ');
    }
    
    case 'translated_book': {
      const elements: string[] = [];

      const authors = getValue('authors');
      if (authors !== getFieldPlaceholder('authors')) {
        elements.push(`${authors},`);
      }

      const translationTitle = getValue('translation_title');
      if (translationTitle !== getFieldPlaceholder('translation_title')) {
        elements.push(wrapInItalics(translationTitle) + ',');
      }

      const translator = getValue('translator');
      if (translator !== getFieldPlaceholder('translator')) {
        elements.push(`tr ${translator}`);
      }

      const publicationDetails: string[] = [];
      const publisher = getValue('publisher');
      if (publisher !== getFieldPlaceholder('publisher')) {
        publicationDetails.push(publisher);
      }

      const edition = getValue('edition');
      if (edition !== getFieldPlaceholder('edition')) {
        publicationDetails.push(`${edition} ed`);
      }

      const year = getValue('year');
      if (year !== getFieldPlaceholder('year')) {
        publicationDetails.push(year);
      }

      if (publicationDetails.length > 0) {
        elements.push(wrapInParens(publicationDetails.join(', ')));
      }

      const pinpoint = getValue('pinpoint');
      if (pinpoint !== getFieldPlaceholder('pinpoint')) {
        elements.push(pinpoint);
      }

      return elements.join(' ');
    }
    
    default:
      return 'Select a citation type to see preview';
  }
};

export const CitationPreview: React.FC<CitationPreviewProps> = ({ type, formData }) => {
  const formattedText = generatePreviewText(type, formData)
    .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>') // Convert <i> to <em> for proper HTML
    .replace(/•/g, '<span class="text-blue-800 mx-1">•</span>')
    .replace(/\[(.*?)\]/g, '<span class="text-gray-700">$1</span>'); // Apply consistent text color to user input
  
  return (
    <div className="px-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Citation Preview</div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-700 bg-white p-3 rounded-md border shadow-sm flex-grow" dangerouslySetInnerHTML={{ __html: formattedText }} />
      </div>
    </div>
  );
};
