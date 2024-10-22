import datetime

# Add this class at the beginning of the file
class AGLC4Citation:
    def __init__(self):
        pass

    def format_citation(self, citation_type, **kwargs):
        formatting_functions = {
            'case_reported': format_case_reported,
            'case_unreported_medium_neutral': format_case_unreported_medium_neutral,
            'case_unreported_no_medium_neutral': format_case_unreported_no_medium_neutral,
            'legislation': format_legislation,
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
            'online_looseleaf_author': format_online_looseleaf_author,
            'online_looseleaf_no_author': format_online_looseleaf_no_author,
            'online_newspaper': format_online_newspaper,
            'printed_newspaper': format_printed_newspaper,
            'internet_materials_author': format_internet_materials_author,
            'internet_materials_body': format_internet_materials_body,
        }
        
        if citation_type not in formatting_functions:
            raise ValueError(f"Unsupported citation type: {citation_type}")
        
        # Get the function's parameters
        import inspect
        func_params = inspect.signature(formatting_functions[citation_type]).parameters
        
        # Filter kwargs to only include parameters accepted by the function
        filtered_kwargs = {k: v for k, v in kwargs.items() if k in func_params}
        
        return formatting_functions[citation_type](**filtered_kwargs)

def format_date(date_string):
    if not date_string:
        return ''
    try:
        date_parts = date_string.split('-')
        if len(date_parts) == 2:  # Year and month only
            date_obj = datetime.datetime.strptime(date_string, '%Y-%m')
            return date_obj.strftime('%B %Y')
        elif len(date_parts) == 3:  # Full date
            date_obj = datetime.datetime.strptime(date_string, '%Y-%m-%d')
            return date_obj.strftime('%-d %B %Y')
        else:
            return date_string  # Return original string if format is unexpected
    except ValueError:
        return date_string  # Return original string if parsing fails


def format_case_reported(case_name=None, year=None, volume=None, law_report_series=None, starting_page=None, pinpoint=None, short_title=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if year:
        citation.append(f"({year})")
    if volume:
        citation.append(f"{volume}")
    if law_report_series:
        citation.append(law_report_series)
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_case_unreported_medium_neutral(case_name=None, year=None, court_identifier=None, judgment_number=None, pinpoint=None, short_title=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if year:
        citation.append(f"[{year}]")
    if court_identifier:
        citation.append(court_identifier)
    if judgment_number:
        citation.append(str(judgment_number))
    if pinpoint:
        citation.append(f"[{pinpoint}]")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_case_unreported_no_medium_neutral(case_name=None, court=None, judge=None, date=None, pinpoint=None, short_title=None):
    citation = []
    if case_name:
        citation.append(f"<i>{case_name}</i>")
    if court or judge or date:
        court_info = []
        if court:
            court_info.append(court)
        if judge:
            court_info.append(judge)
        if date:
            court_info.append(format_date(date))
        citation.append(f"({', '.join(court_info)})")
    if pinpoint:
        citation.append(str(pinpoint))
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_legislation(title=None, year=None, jurisdiction=None, pinpoint=None, short_title=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>")
    if year:
        citation.append(str(f"<i>{year}</i>"))
    if jurisdiction:
        citation.append(f"({jurisdiction})")
    if pinpoint:
        citation.append(pinpoint)
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_bill(title=None, year=None, jurisdiction=None, pinpoint=None, short_title=None):
    return format_legislation(title, year, jurisdiction, pinpoint, short_title)

def format_explanatory_memorandum(bill_citation=None, pinpoint=None, short_title=None):
    citation = ["Explanatory Memorandum,"]
    if bill_citation:
        citation.append(bill_citation)
    if pinpoint:
        citation.append(pinpoint)
    if short_title:
        citation.append(f"('{short_title}')")
    return " ".join(citation)

def format_hansard(jurisdiction=None, chamber=None, date=None, pinpoint=None, speaker=None, short_title=None):
    citation = []
    if jurisdiction:
        citation.append(f"{jurisdiction},")
    citation.append("<i>Parliamentary Debates</i>,")
    if chamber:
        citation.append(chamber + ",")
    if date:
        citation.append(format_date(date) + ",")
    if pinpoint:
        citation.append(str(pinpoint))
    if speaker:
        citation.append(f"({speaker})")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_treaty(title=None, parties=None, date_opened=None, treaty_series=None, date_in_force=None, pinpoint=None, short_title=None):
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
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
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

def format_journal_article(authors=None, title=None, year=None, volume=None, issue=None, journal=None, starting_page=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors) + ',')
    if title:
        citation.append(f"'{title}'")
    if year:
        citation.append(f"({year})")
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

def format_book(authors=None, title=None, publisher=None, edition=None, year=None, pinpoint=None):
    citation = []
    if authors:
        citation.append(format_authors(authors))
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
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_book_chapter(authors=None, chapter_title=None, editors=None, book_title=None, publisher=None, edition=None, year=None, starting_page=None, pinpoint=None):
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
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_report(author=None, title=None, document_type=None, series_no=None, document_number=None, date=None, pinpoint=None, short_title=None):
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
    if date:
        document_info.append(format_date(date))
    if document_info:
        citation.append(f"({', '.join(document_info)})")
    if pinpoint:
        citation.append(str(pinpoint))
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_online_dictionary(title=None, retrieval_date=None, entry_title=None, definition_number=None, short_title=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>")
    if retrieval_date:
        citation.append(f"(online at {format_date(retrieval_date)})")
    if entry_title:
        citation.append(f"'{entry_title}'")
    if definition_number:
        citation.append(f"(def {definition_number})")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_hardcopy_dictionary(title=None, edition=None, year=None, entry_title=None, definition_number=None, short_title=None):
    citation = []
    if title:
        citation.append(f"<i>{title}</i>,")
    if edition and year:
        citation.append(f"({edition} ed, {year})")
    if entry_title:
        citation.append(f"'{entry_title}'")
    if definition_number:
        citation.append(f"(def {definition_number})")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_online_legal_encyclopedia(publisher=None, title=None, retrieval_date=None, title_number=None, title_name=None, chapter_number=None, chapter_name=None, paragraph=None, short_title=None):
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
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_hardcopy_legal_encyclopedia(publisher=None, title=None, volume=None, date=None, title_number=None, title_name=None, chapter_number=None, chapter_name=None, paragraph=None, short_title=None):
    citation = []
    if publisher:
        citation.append(publisher + ",")
    if title:
        citation.append(f"<i>{title}</i>,")
    if volume:
        citation.append(f"vol {volume}")
    if date:
        citation.append(f"(at {format_date(date)})")
    if title_number and title_name:
        citation.append(f"{title_number} {title_name},")
    if chapter_number and chapter_name:
        citation.append(f"'{chapter_number} {chapter_name}'")
    if paragraph:
        citation.append(f"[{paragraph}]")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_online_looseleaf_author(author=None, publisher=None, title=None, retrieval_date=None, pinpoint=None):
    citation = []
    if author:
        citation.append(author + ",")
    if publisher:
        citation.append(publisher + ",")
    if title:
        citation.append(f"<i>{title}</i>")
    if retrieval_date:
        citation.append(f"(online at {format_date(retrieval_date)})")
    if pinpoint:
        citation.append(f"[{pinpoint}]")
    return " ".join(citation)

def format_online_looseleaf_no_author(publisher=None, title=None, retrieval_date=None, pinpoint=None, short_title=None):
    citation = []
    if publisher:
        citation.append(publisher + ",")
    if title:
        citation.append(f"<i>{title}</i>,")
    if retrieval_date:
        citation.append(f"(online at {format_date(retrieval_date)})")
    if pinpoint:
        citation.append(f"[{pinpoint}]")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_online_newspaper(author=None, title=None, newspaper=None, date=None, pinpoint=None, url=None, short_title=None):
    citation = []
    if author:
        citation.append(author + ",")
    if title:
        citation.append(f"'{title}',")
    if newspaper:
        citation.append(f"<i>{newspaper}</i>")
    if date:
        citation.append(f"(online, {format_date(date)})")
    if pinpoint:
        citation.append(f"[{pinpoint}]")
    if url:
        citation.append(f"<{url}>")
    if short_title:
        citation.append(f"(<i>'{short_title}')</i>")
    return " ".join(citation)

def format_printed_newspaper(author=None, title=None, newspaper=None, place=None, date=None, starting_page=None, pinpoint=None):
    citation = []
    if author:
        citation.append(author + ",")
    if title:
        citation.append(f"'{title}',")
    if newspaper:
        citation.append(f"<i>{newspaper}</i>")
    if place and date:
        citation.append(f"({place}, {format_date(date)})")
    if starting_page:
        citation.append(str(starting_page) + (',' if pinpoint else ''))
    if pinpoint:
        citation.append(str(pinpoint))
    return " ".join(citation)

def format_internet_materials_author(author=None, document_title=None, web_page_title=None, document_type=None, date=None, pinpoint=None, url=None):
    citation = []
    if author:
        citation.append(author + ",")
    if document_title:
        citation.append(f"'{document_title}',")
    if web_page_title:
        citation.append(f"<i>{web_page_title}</i>")
    if document_type and date:
        citation.append(f"({document_type}, {format_date(date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    if url:
        citation.append(f"<{url}>")
    return " ".join(citation)

def format_internet_materials_body(author=None, document_title=None, web_page_title=None, document_type=None, date=None, pinpoint=None, url=None, short_title=None):
    citation = []
    if author:
        citation.append(f"'{author}',")
    if document_title:
        citation.append(f"'{document_title}',")
    if web_page_title:
        citation.append(f"<i>{web_page_title}</i>")
    if document_type and date:
        citation.append(f"({document_type}, {format_date(date)})")
    if pinpoint:
        citation.append(str(pinpoint))
    if url:
        citation.append(f"<{url}>")
    if short_title:
        citation.append(f"('{short_title}')")
    return " ".join(citation)




