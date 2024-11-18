import datetime
from datetime import date  

class AGLC4Citation:
    def __init__(self):
        pass  

    def normalize_date_fields(self, kwargs):
        """Just return kwargs as-is since we're working with strings"""
        return kwargs

    def format_citation(self, citation_type, **kwargs):
        # Normalize date fields
        normalized_kwargs = self.normalize_date_fields(kwargs)
        
        formatting_functions = {
            'case_reported': format_case_reported,
            'case_unreported_medium_neutral': format_case_unreported_medium_neutral,
            'case_unreported_no_medium_neutral': format_case_unreported_no_medium_neutral,
            'act': format_legislation,
            'bill': format_bill,
            'explanatory_memorandum': format_explanatory_memorandum,
            'hansard': format_hansard,
            'treaty': format_treaty,
            'journal_article': format_journal_article,
            'book': format_book,
            'book_chapter': format_book_chapter,
            'report': format_report,
            'online_dictionary': format_online_dictionary,
            'hardcopy_dictionary': format_hardcopy_dictionary,
            'online_legal_encyclopedia': format_online_legal_encyclopedia,
            'hardcopy_legal_encyclopedia': format_hardcopy_legal_encyclopedia,
            'online_looseleaf': format_online_looseleaf,
            'hardcopy_looseleaf': format_hardcopy_looseleaf,
            'online_newspaper': format_online_newspaper,
            'printed_newspaper': format_printed_newspaper,
            'internet_material': format_internet_materials_author,
            'proceeding': format_proceeding,
            'court_order': format_court_order,
            'arbitration': format_arbitration,
            'transcript_of_proceedings': format_transcript_of_proceedings,
            'high_court_transcript': format_high_court_transcript,
            'submission': format_submission,
            'delegated_legislation': format_delegated_legislation,
            'gazette': format_gazette,
            'order_or_ruling': format_order_or_ruling,
            'court_practice_direction': format_court_practice_direction,
            'symposium': format_symposium,
            'book_with_editor': format_book_with_editor,
            'translated_book': format_translated_book,
            'audiobook': format_audiobook,
            'research_paper': format_research_paper,
            'speech': format_speech,
            'press_release': format_press_release,
            'periodical': format_periodical,
            'interview': format_interview,
            'film_television_media': format_film_television_media,
            'social_media_post': format_social_media_post,
            'written_submission': format_written_submission,
            'evidence_to_parliamentary_committee': format_evidence_to_parliamentary_committee,
            'constitutional_convention_debates': format_constitutional_convention_debates,
            'intellectual_property_material': format_intellectual_property_material,
            'constitutive_document': format_constitutive_document,
            'written_correspondence': format_written_correspondence,
            'treaty': format_treaty,
            'delegated_non_government_legislation': format_delegated_non_government_legislation,
        }
        
        if citation_type not in formatting_functions:
            raise ValueError(f"Unsupported citation type: {citation_type}")
        
        # Get the function's parameters
        import inspect
        func_params = inspect.signature(formatting_functions[citation_type]).parameters
        
        # Filter kwargs to only include parameters accepted by the function
        filtered_kwargs = {k: v for k, v in normalized_kwargs.items() if k in func_params}
        
        if citation_type == 'online_legal_encyclopedia':
            # Ensure retrieval_date is a string in 'YYYY-MM-DD' format
            retrieval_date = kwargs.get('retrieval_date')
            if isinstance(retrieval_date, str):
                retrieval_date_parts = retrieval_date.split('-')
                if len(retrieval_date_parts) == 3:
                    year, month, day = retrieval_date_parts
                    retrieval_date = f"{day} {self.get_month_name(int(month))} {year}"
            elif isinstance(retrieval_date, datetime.date):
                retrieval_date = retrieval_date.strftime("%d %B %Y")
            else:
                retrieval_date = ''

            return f"{kwargs.get('publisher')}, {kwargs.get('title')} (online at {retrieval_date}) '{kwargs.get('title_number')} {kwargs.get('title_name')}' [{kwargs.get('chapter_number')} '{kwargs.get('chapter_name')}'] {kwargs.get('paragraph')}"
        
        # Get the formatted citation
        citation = formatting_functions[citation_type](**filtered_kwargs)
        
        # Remove spaces before commas
        citation = citation.replace(' ,', ',')
        
        # Add a period if it doesn't already end with one
        if not citation.endswith('.'):
            citation += '.'
        
        return citation

def format_date(date_string):
    """
    Formats a date string in the format "day month year" (e.g., "1 January 2024")
    Returns the formatted date string or empty string if invalid
    """
    if not date_string or not isinstance(date_string, str):
        return ''
    
    try:
        # Split the date string into components
        parts = date_string.split(' ')
        if len(parts) != 3:
            return date_string  # Return as-is if not in expected format
            
        day, month, year = parts
        
        # Remove leading zeros from day if present
        day = str(int(day))
        
        # Return formatted date
        return f"{day} {month} {year}"
    except:
        return date_string  # Return original string if parsing fails

def format_case_reported(case_name=None, year=None, volume=None, law_report_series=None, starting_page=None, pinpoint=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if year:
        citation.append(f"{year}")
    if volume:
        citation.append(f"{volume}")
    if law_report_series:
        citation.append(law_report_series)
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_case_unreported_medium_neutral(case_name=None, year=None, court_identifier=None, judgment_number=None, pinpoint=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if year:
        citation.append(f"{year}")
    if court_identifier:
        citation.append(court_identifier)
    if judgment_number:
        citation.append(f"{str(judgment_number)},")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_case_unreported_no_medium_neutral(case_name=None, court=None, judge=None, full_date=None, pinpoint=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if court or judge or date:
        court_info = []
        if court:
            court_info.append(court)
        if judge:
            court_info.append(judge)
        if full_date:
            court_info.append(format_date(full_date))
        citation.append(f"({', '.join(court_info)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_legislation(title=None, year=None, jurisdiction=None, pinpoint=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>")
    if year:
        citation.append(f"<i>{year}</i>")
    if jurisdiction:
        citation.append(f"({jurisdiction})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_bill(title=None, year=None, jurisdiction=None, pinpoint=None):
    citation = []
    if title:
        citation.append(title)
    if year:
        citation.append(str(year))
    if jurisdiction:
        citation.append(f"({jurisdiction})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_explanatory_memorandum(explanatory_type=None, bill_citation=None, pinpoint=None):
    citation = []
    if explanatory_type:
        citation.append(explanatory_type)
    if bill_citation:
        citation.append(bill_citation)
    if pinpoint:
        citation.append(pinpoint)
    return " ".join(citation)

def format_hansard(jurisdiction=None, chamber=None, full_date=None, pinpoint=None, name_of_speaker=None):
    citation = []
    if jurisdiction:
        citation.append(f"{jurisdiction},")
    citation.append("<i>Parliamentary Debates</i>,")
    if chamber:
        citation.append(chamber + ",")
    if full_date:
        citation.append(format_date(full_date) + ",")
    if pinpoint:
        citation.append(str(pinpoint))
    if name_of_speaker:
        citation.append(f"({name_of_speaker})")

    return " ".join(citation)

def format_treaty(title=None, parties=None, date_opened=None, treaty_series=None, date_in_force=None, pinpoint=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>,")
    if parties:
        citation.append(parties + ",")
    if date_opened:
        citation.append(f"opened for signature {format_date(date_opened)},")
    if treaty_series:
        citation.append(treaty_series)
    if date_in_force:
        citation.append(f"(entered into force {format_date(date_in_force)})")
    if pinpoint:
        citation.append(pinpoint)

    return " ".join(citation)

def format_authors(authors):
    if not authors:
        return ''
    if isinstance(authors, str):
        return authors
    if len(authors) == 1:
        return authors[0]
    elif len(authors) == 2:
        return f"{authors[0]} and {authors[1]}"
    elif len(authors) == 3:
        return f"{authors[0]}, {authors[1]} and {authors[2]}"
    else:
        return f"{authors[0]} et al"

def format_editors(editors):
    if not editors:
        return ''
    if isinstance(editors, str):
        return f"{editors} (ed)"
    if len(editors) == 1:
        return f"{editors[0]} (ed)"
    elif len(editors) == 2:
        return f"{editors[0]} and {editors[1]} (eds)"
    elif len(editors) == 3:
        return f"{editors[0]}, {editors[1]} and {editors[2]} (eds)"
    else:
        return f"{editors[0]} et al (eds)"

def format_editors_without_suffix(editors):
    if not editors:
        return ''
    if isinstance(editors, str):
        return editors
    if len(editors) == 1:
        return editors[0]
    if len(editors) == 2:
        return f"{editors[0]} and {editors[1]}"
    if len(editors) == 3:
        return f"{editors[0]}, {editors[1]} and {editors[2]}"
    return f"{editors[0]} et al"

def format_journal_article(authors=None, title=None, year=None, volume=None, issue=None, journal=None, starting_page=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors) + ',')
    if title:
        citation.append(f"'{title}'")
    if year:
        citation.append(f"{year}")
    if volume:
        citation.append(volume)
    if issue:
        citation.append(f"({issue})")
    if journal:
        citation.append(f"<i>{journal}</i>")
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_book(authors=None, title=None, publisher=None, edition=None, year=None, volume=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors) + ',')
    if title:
        citation.append(f"<i>'{title}'</i>")
    publication_details = []
    if publisher:
        publication_details.append(publisher)
    if edition:
        publication_details.append(f"{edition} ed")
    if year:
        publication_details.append(str(year))
    if publication_details:
        citation.append(f"({', '.join(publication_details)})")
    if volume:
        citation.append(f"vol {volume}")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_book_chapter(authors=None, chapter_title=None, editors=None, book_title=None, publisher=None, edition=None, year=None, volume=None, starting_page=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors) + ",")
    if chapter_title:
        citation.append(f"'{chapter_title}'")
    if editors:
        formatted_editors = format_editors(editors)
        citation.append(f"in {formatted_editors},")
    if book_title:
        citation.append(f"<i>{book_title}</i>")
    publication_details = []
    if publisher:
        publication_details.append(publisher)
    if edition:
        publication_details.append(f"{edition} ed")
    if year:
        publication_details.append(str(year))
    if publication_details:
        citation.append(f"({', '.join(publication_details)})")
    if volume:
        citation.append(f"vol {volume}")
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_book_with_editor(authors=None, title=None, editors=None, publisher=None, edition=None, year=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors))
    if title:
        citation.append(f"<i>{title}</i>,")
    if editors:
        citation.append(f"ed {format_editors_without_suffix(editors)}")
    publication_details = []
    if publisher:
        publication_details.append(publisher)
    if edition:
        publication_details.append(f"{edition} ed")
    if year:
        publication_details.append(str(year))
    if publication_details:
        citation.append(f"({', '.join(publication_details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_report(author=None, title=None, document_type=None, series_no=None, document_number=None, full_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(author + ",")
    if title:
        citation.append(f"<i>{title}</i>")
    document_info = []
    if document_type:
        document_info.append(document_type)
    if series_no:
        document_info.append(series_no)
    if document_number:
        document_info.append(document_number)
    if full_date:
        document_info.append(format_date(full_date))
    if document_info:
        citation.append(f"({', '.join(document_info)})")
    if pinpoint:
        citation.append(str(pinpoint))

    return " ".join(citation)

def format_online_dictionary(title=None, retrieval_date=None, entry_title=None, definition_number=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>")
    if retrieval_date:
        # Handle both string and date object formats
        if isinstance(retrieval_date, str):
            date_parts = retrieval_date.split('-')
            if len(date_parts) == 3:
                year, month, day = date_parts
                formatted_date = f"{day} {AGLC4Citation().get_month_name(int(month))} {year}"
            else:
                formatted_date = retrieval_date
        elif isinstance(retrieval_date, date):
            formatted_date = retrieval_date.strftime("%d %B %Y")
        else:
            formatted_date = ''
        citation.append(f"(online at {formatted_date})")
    if entry_title:
        citation.append(f"'{entry_title}'")
    if definition_number:
        citation.append(f"(def {definition_number})")

    return " ".join(citation)

def format_hardcopy_dictionary(title=None, edition=None, year=None, entry_title=None, definition_number=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>,")
    if edition and year:
        citation.append(f"({edition} ed, {year})")
    if entry_title:
        citation.append(f"'{entry_title}'")
    if definition_number:
        citation.append(f"(def {definition_number})")

    return " ".join(citation)

def format_online_legal_encyclopedia(publisher=None, title=None, retrieval_date=None, title_number=None, title_name=None, chapter_number=None, chapter_name=None, paragraph=None):
    citation = []
    if publisher:
        citation.append(publisher + ",")
    if title:
        citation.append(f"<i>{title}</i>")
    if retrieval_date:
        citation.append(f"(online at {format_date(retrieval_date)})")
    if title_number and title_name:
        citation.append(f"{title_number} {title_name},")
    if chapter_number and chapter_name:
        citation.append(f"'{chapter_number} {chapter_name}'")
    if paragraph:
        citation.append(f"[{paragraph}]")

    return " ".join(citation)

def format_hardcopy_legal_encyclopedia(publisher=None, title=None, volume=None, full_date=None, title_number=None, title_name=None, chapter_number=None, chapter_name=None, paragraph=None):
    citation = []
    if publisher:
        citation.append(publisher + ",")
    if title:
        citation.append(f"<i>{title}</i>,")
    if volume:
        citation.append(f"vol {volume}")
    if full_date:
        citation.append(f"(at {format_date(full_date)})")
    if title_number and title_name:
        citation.append(f"{title_number} {title_name},")
    if chapter_number and chapter_name:
        citation.append(f"'{chapter_number} {chapter_name}'")
    if paragraph:
        citation.append(f"[{paragraph}]")

    return " ".join(citation)

def format_online_looseleaf(author=None, publisher=None, title=None, retrieval_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if publisher:
        citation.append(f"{publisher},")
    if title:
        citation.append(f"<i>{title}</i>")
    if retrieval_date:
        citation.append(f"(online at {format_date(retrieval_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_hardcopy_looseleaf(author=None, publisher=None, title=None, volume=None, service_number=None, full_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if publisher:
        citation.append(f"{publisher},")
    if title:
        citation.append(f"<i>{title}</i>")
    if volume:
        citation.append(f"vol {volume}")
    
    # Handle service number or date
    if service_number or date:
        service_info = []
        if service_number:
            service_info.append(service_number)
        elif full_date:
            service_info.append(format_date(full_date))
        citation.append(f"(at {', '.join(service_info)})")
    
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_online_newspaper(author=None, title=None, newspaper=None, full_date=None, pinpoint=None, url=None):
    citation = []
    if author:
        citation.append(author + ",")
    if title:
        citation.append(f"'{title}',")
    if newspaper:
        citation.append(f"<i>{newspaper}</i>")
    if full_date:
        citation.append(f"(online, {format_date(full_date)})")
    if pinpoint:
        citation.append(f"[{pinpoint}]")
    if url:
        citation.append(f"<{url}>")

    return " ".join(citation)

def format_printed_newspaper(author=None, title=None, newspaper=None, place=None, full_date=None, starting_page=None, pinpoint=None):
    citation = []
    if author:
        citation.append(author + ",")
    if title:
        citation.append(f"'{title}',")
    if newspaper:
        citation.append(f"<i>{newspaper}</i>")
    if place and date:
        citation.append(f"({place}, {format_date(full_date)})")
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_internet_materials_author(author=None, document_title=None, web_page_title=None, document_type=None, full_date=None, pinpoint=None, url=None):
    citation = []
    if author:
        citation.append(author + ",")
    if document_title:
        citation.append(f"'{document_title}',")
    if web_page_title:
        citation.append(f"<i>{web_page_title}</i>")
    if document_type and date:
        citation.append(f"({document_type}, {format_date(full_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    if url:
        citation.append(f"<{url}>")
    return " ".join(citation)

def format_internet_materials_body(author=None, document_title=None, web_page_title=None, document_type=None, full_date=None, pinpoint=None, url=None):
    citation = []
    if author:
        citation.append(f"'{author}',")
    if document_title:
        citation.append(f"'{document_title}',")
    if web_page_title:
        citation.append(f"<i>{web_page_title}</i>")
    if document_type and date:
        citation.append(f"({document_type}, {format_date(full_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    if url:
        citation.append(f"<{url}>")
    if short_title:
        citation.append(f"('{short_title}')")
    return " ".join(citation)

def format_proceeding(case_name=None, court=None, proceeding_number=None, full_date=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if court or proceeding_number or date:
        court_info = []
        if court:
            court_info.append(f"{court}")
        if proceeding_number:
            court_info.append(f"{proceeding_number}")
        if full_date:
            court_info.append(f"commenced {format_date(full_date)}")
        citation.append(f"({', '.join(court_info)})")
    return " ".join(citation)

def format_court_order(judicial_officers=None, case_name=None, court=None, proceeding_number=None, full_date=None):
    citation = []
    if judicial_officers:
        citation.append(f"Order of {judicial_officers}")
    if case_name:
        citation.append(f"in <i>{case_name}</i>")
    if court or proceeding_number or date:
        court_info = []
        if court:
            court_info.append(court)
        if proceeding_number:
            court_info.append(proceeding_number)
        if full_date:
            court_info.append(format_date(full_date))
        citation.append(f"({', '.join(court_info)})")
    return " ".join(citation)

def format_arbitration(case_name=None, award_description=None, forum=None, case_award_number=None, full_date=None, pinpoint=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if award_description or forum or case_award_number or date:
        arb_info = []
        if award_description:
            arb_info.append(award_description)
        if forum:
            arb_info.append(forum)
        if case_award_number:
            arb_info.append(case_award_number)
        if full_date:
            arb_info.append(format_date(full_date))
        citation.append(f"({', '.join(arb_info)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_transcript_of_proceedings(case_name=None, court=None, proceeding_number=None, judicial_officers=None, full_date=None, pinpoint=None):
    citation = ["Transcript of Proceedings,"]
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if court or proceeding_number or judicial_officers or date:
        info = []
        if court:
            info.append(court)
        if proceeding_number:
            info.append(proceeding_number)
        if judicial_officers:
            info.append(judicial_officers)
        if full_date:
            info.append(format_date(full_date))
        citation.append(f"({', '.join(info)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_high_court_transcript(case_name=None, year=None, number=None, pinpoint=None):
    citation = ["Transcript of Proceedings,"]
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if year:
        citation.append(f"{year}")
    citation.append("HCATrans")
    if number:
        citation.append(str(number))
    if pinpoint:
        citation.append(f", {pinpoint}")
    return " ".join(citation)

def format_submission(party_name=None, title=None, case_name=None, proceeding_number=None, full_date=None, pinpoint=None):
    citation = []
    if party_name:
        citation.append(f"{party_name},")
    if title:
        citation.append(f"'{title}'")
    if case_name:
        citation.append(f"Submission in <i>{case_name}</i>,")
    if proceeding_number:
        citation.append(f"{proceeding_number},")
    if full_date:
        citation.append(format_date(full_date))
    if pinpoint:
        citation.append(f", {pinpoint}")
    return " ".join(citation)

def format_delegated_legislation(title=None, year=None, jurisdiction=None, pinpoint=None):
    return format_legislation(title, year, jurisdiction, pinpoint)

def format_gazette(authors=None, title_of_notice=None, jurisdiction=None, gazette_title=None, gazette_number=None, full_date=None, starting_page=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors))
    if title_of_notice:
        citation.append(f"'{title_of_notice}'")
    if jurisdiction:
        citation.append(f"in {jurisdiction},")
    if gazette_title:
        citation.append(f"<i>{gazette_title}</i>,")
    if gazette_number:
        citation.append(f"No {gazette_number},")
    if full_date:
        citation.append(format_date(full_date))
    if starting_page:
        citation.append(f", {starting_page}")
    if pinpoint:
        citation.append(f", {pinpoint}")
    return " ".join(citation)

def format_order_or_ruling(instrumentality_officer=None, instrument_title=None, document_number=None, full_date=None, pinpoint=None):
    citation = []
    if instrumentality_officer:
        citation.append(f"{instrumentality_officer},")
    if instrument_title:
        citation.append(f"<i>{instrument_title}</i>")
    if document_number or full_date:
        info = []
        if document_number:
            info.append(document_number)
        if full_date:
            info.append(format_date(full_date))
        citation.append(f"({', '.join(info)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_court_practice_direction(court=None, practice_direction=None, number_identifier=None, title=None, citation_report_series=None, full_date=None, pinpoint=None):
    citation = []
    
    # Required elements
    if court:
        citation.append(f"{court},")
    if practice_direction:
        citation.append(f"<i>{practice_direction}</i>")
    if number_identifier:
        citation.append(f"<i>{number_identifier}</i>:")
    if title and citation_report_series:
        citation.append(f"<i>{title}</i>")
    if title and full_date:
        citation.append(f"<i>{title}</i>,") # Comma after title if date is used (rather than report series)
    if citation_report_series:
        citation.append(citation_report_series)
    if full_date:
        citation.append(format_date(full_date))
    if pinpoint:
        citation.append(f", {pinpoint}")
        
    return " ".join(citation)

def format_symposium(title=None, year=None, volume=None, issue=None, journal=None, starting_page=None, pinpoint=None):
    citation = ["Symposium,"]
    if title:
        citation.append(f"'{title}'")
    if year:
        citation.append(f"{year}")
    if volume:
        citation.append(volume)
    if issue:
        citation.append(f"({issue})")
    if journal:
        citation.append(f"<i>{journal}</i>")
    if starting_page:
        citation.append(str(starting_page))
    if pinpoint:
        citation.append(f", {pinpoint}")
    return " ".join(citation)

def format_translated_book(authors=None, translation_title=None, translator=None, publisher=None, edition=None, year=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors))
    if translation_title:
        citation.append(f"<i>{translation_title}</i>,")
    if translator:
        citation.append(f"tr {translator}")
    publication_details = []
    if publisher:
        publication_details.append(publisher)
    if edition:
        publication_details.append(f"{edition} ed")
    if year:
        publication_details.append(str(year))
    if publication_details:
        citation.append(f"({', '.join(publication_details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_audiobook(authors=None, title=None, publisher=None, year=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors))
    if title:
        citation.append(f"<i>{title}</i>")
    publication_details = ["Audiobook"]
    if publisher:
        publication_details.append(publisher)
    if year:
        publication_details.append(str(year))
    citation.append(f"({', '.join(publication_details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_research_paper(author=None, title=None, document_type=None, document_number=None, institution=None, full_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if title:
        citation.append(f"'{title}'")
    details = []
    if document_type and document_number:
        details.append(f"{document_type} No {document_number}")
    if institution:
        details.append(institution)
    if full_date:
        details.append(format_date(full_date))
    if details:
        citation.append(f"({', '.join(details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_speech(author=None, title=None, speech_or_lecture=None, institution_forum=None, full_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if title:
        citation.append(f"'{title}'")
    details = []
    if speech_or_lecture:
        details.append(speech_or_lecture)
    if institution_forum:
        details.append(institution_forum)
    if full_date:
        details.append(format_date(full_date))
    if details:
        citation.append(f"({', '.join(details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_press_release(author=None, title=None, release_type=None, document_number=None, body=None, full_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if title:
        citation.append(f"'{title}'")
    details = []
    if release_type:
        details.append(release_type)
    if document_number:
        details.append(document_number)
    if body:
        details.append(body)
    if full_date:
        details.append(format_date(full_date))
    if details:
        citation.append(f"({', '.join(details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_periodical(author=None, title=None, date_month_season=None, periodical_name=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if title:
        citation.append(f"'{title}'")
    if date_month_season:
        citation.append(f"({date_month_season})")
    if periodical_name:
        citation.append(f"<i>{periodical_name}</i>")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_interview(format=None, interviewee=None, interviewer=None, interview_forum=None, full_date=None):
    citation = []
    if format:
        citation.append(format)
    if interviewee:
        citation.append(f"with {interviewee}")
    details = []
    if interviewer:
        details.append(interviewer)
    if interview_forum:
        details.append(interview_forum)
    if full_date:
        details.append(format_date(full_date))
    if details:
        citation.append(f"({', '.join(details)})")
    return " ".join(citation)

def format_film_television_media(episode_title=None, film_series_title=None, version_details=None, studio_producer=None, year=None, pinpoint=None):
    citation = []
    if episode_title:
        citation.append(f"'{episode_title}',")
    if film_series_title:
        citation.append(f"<i>{film_series_title}</i>")
    details = []
    if version_details:
        details.append(version_details)
    if studio_producer:
        details.append(studio_producer)
    if year:
        details.append(str(year))
    if details:
        citation.append(f"({', '.join(details)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_written_submission(author=None, number=None, body=None, name_of_inquiry=None, full_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(f"{author},")
    if number:
        citation.append(f"Submission No {number}")
    if body:
        citation.append(f"to {body},")
    if name_of_inquiry:
        citation.append(f"<i>{name_of_inquiry}</i>")
    if full_date:
        citation.append(f"({format_date(full_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_evidence_to_parliamentary_committee(committee=None, legislature=None, location=None, full_date=None, pinpoint=None, speaker=None):
    citation = []
    if committee:
        citation.append(f"Evidence to {committee},")
    if legislature:
        citation.append(legislature + ",")
    if location:
        citation.append(location + ",")
    if full_date:
        citation.append(format_date(full_date))
    if pinpoint:
        citation.append(f", {pinpoint}")
    if speaker:
        citation.append(f"({speaker})")
    return " ".join(citation)

def format_constitutional_convention_debates(title=None, location=None, full_date=None, pinpoint=None, speaker=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>,")
    if location:
        citation.append(location + ",")
    if full_date:
        citation.append(format_date(full_date))
    if pinpoint:
        citation.append(f", {pinpoint}")
    if speaker:
        citation.append(f"({speaker})")
    return " ".join(citation)

def format_intellectual_property_material(jurisdiction_code=None, ip_type=None, additional_info=None, 
                                       identification_number=None, filing_date=None, registration_status=None, 
                                       registration_date=None):
    citation = []
    if jurisdiction_code and ip_type and identification_number:
        citation.append(f"<i>{jurisdiction_code} {ip_type}")
        if additional_info:
            citation.append(additional_info)
        citation.append(f"No {identification_number}</i>")
    if filing_date:
        citation.append(f"filed/lodged on {format_date(filing_date)}")
    if registration_status and registration_date:
        citation.append(f"({registration_status} on {format_date(registration_date)})")
    return " ".join(citation)

def format_constitutive_document(document_type=None, company_name=None, full_date=None, pinpoint=None):
    citation = []
    if document_type:
        citation.append(f"<i>{document_type}</i>,")
    if company_name:
        citation.append(company_name)
    if full_date:
        citation.append(f"(at {format_date(full_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_written_correspondence(correspondence_type=None, author=None, recipient=None, full_date=None, pinpoint=None):
    citation = []
    if correspondence_type:
        citation.append(correspondence_type)
    if author and recipient:
        citation.append(f"from {author} to {recipient},")
    if full_date:
        citation.append(format_date(full_date))
    if pinpoint:
        citation.append(f", {pinpoint}")
    return " ".join(citation)

def format_treaty(treaty_title=None, parties_names=None, signature_date=None, treaty_series=None, 
                 entry_force_date=None, pinpoint=None):
    citation = []
    if treaty_title:
        citation.append(f"<i>{treaty_title}</i>")
    if parties_names:
        citation.append(parties_names)
    if signature_date:
        citation.append(f"signed {format_date(signature_date)}")
    if treaty_series:
        citation.append(treaty_series)
    if entry_force_date:
        citation.append(f"(entered into force {format_date(entry_force_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_social_media_post(username=None, title=None, platform=None, full_date=None, time=None, url=None):
    citation = []
    if username:
        citation.append(f"{username},")
    if title:
        citation.append(f"'{title}'")
    
    details = []
    if platform:
        details.append(platform)
    if date and time:
        details.append(f"{format_date(full_date)}, {time}")
    elif full_date:
        details.append(format_date(full_date))
    
    if details:
        citation.append(f"({', '.join(details)})")
    
    if url:
        citation.append(f"<{url}>")
    
    return " ".join(citation)

def format_delegated_non_government_legislation(issuing_body=None, title=None, full_date=None, pinpoint=None):
    """
    Format a delegated non-government entity legislation citation according to AGLC4
    Format: Issuing Body, Title (at Full Date) Pinpoint.
    """
    citation = []
    if issuing_body:
        citation.append(f"{issuing_body},")
    if title:
        citation.append(f"<i>{title}</i>")
    if full_date:
        citation.append(f"(at {format_date(full_date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)
