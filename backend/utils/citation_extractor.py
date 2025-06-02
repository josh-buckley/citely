from typing import Dict, Any, Tuple, Optional
import re

class CitationExtractor:
    def __init__(self):
        self.extractors = {
            'westlaw_case': self._extract_westlaw,
            'lexisnexis_case': self._extract_lexis_case,
            'jade_case': self._extract_jade_case,
            'ssrn_article': self._extract_ssrn_article,
            'scholar_article': self._extract_google_scholar_journal_article,
            'scholar_book': self._extract_scholar_book
        }

    def extract_citation(self, source_type: str, text: str) -> Tuple[str, Dict[str, Any]]:
        """
        Extract citation details from text based on the source type.
        Returns a tuple of (detected_citation_type, extracted_fields)
        """
        if source_type not in self.extractors:
            raise ValueError(f"Unsupported source type: {source_type}")
        
        return self.extractors[source_type](text)

    def _extract_westlaw(self, text: str) -> Tuple[str, Dict[str, Any]]:
        """Extract citation details from Westlaw text"""
        # Initialize with empty values
        extracted = {
            'case_name': '',
            'year': '',
            'volume': '',
            'law_report_series': '',
            'starting_page': '',
            'pinpoint': ''
        }
        
        # Try to identify if it's a medium neutral citation
        if re.search(r'\[\d{4}]\s+[A-Z]+\s+\d+', text):
            citation_type = 'case_unreported_medium_neutral'
            # Extract medium neutral specific fields
            extracted = {
                'case_name': self._extract_case_name(text),
                'year': self._extract_year(text),
                'unique_court_identifier': self._extract_court_id(text),
                'judgment_number': self._extract_judgment_number(text),
                'pinpoint': self._extract_pinpoint(text)
            }
        else:
            citation_type = 'case_reported'
            # Extract reported case fields
            extracted = {
                'case_name': self._extract_case_name(text),
                'year': self._extract_year(text),
                'volume': self._extract_volume(text),
                'law_report_series': self._extract_series(text),
                'starting_page': self._extract_page(text),
                'pinpoint': self._extract_pinpoint(text)
            }
        
        return citation_type, extracted

    def _extract_lexis_case(self, text: str) -> Tuple[str, Dict[str, Any]]:
        """Extract citation details from a LexisNexis case citation"""
        extracted = {
            'case_name': '',
            'year': '',
            'volume': '',
            'law_report_series': '',
            'starting_page': '',
            'unique_court_identifier': '',
            'judgment_number': ''
        }

        try:
            # Split into case name and citations
            parts = text.split(';')
            
            # Extract case name from the first part
            first_part = parts[0].strip()
            
            # Look for the first year pattern as the boundary for case name
            year_match = re.search(r'(?:\[|\()\d{4}(?:\]|\))', first_part)
            if year_match:
                extracted['case_name'] = first_part[:year_match.start()].strip().rstrip(',')
            else:
                # If no year found, look for BC number
                bc_match = re.search(r'BC\d+', first_part)
                if bc_match:
                    extracted['case_name'] = first_part[:bc_match.start()].strip().rstrip(',')
                else:
                    # If neither found, use the whole first part
                    extracted['case_name'] = first_part.strip().rstrip(',')
            
            # Look for reported citation first (has highest priority)
            reported_pattern = r'\((\d{4})\)\s*(\d+)\s*([A-Z]+(?:\s+[A-Z]+)*)\s*(\d+)'
            medium_neutral_pattern = r'\[(\d{4})\]\s*([A-Z]+)\s*(\d+)'
            bc_pattern = r'BC\d+'
            
            found_reported = False
            found_medium_neutral = False
            
            # First pass: Look for reported citations (highest priority)
            for part in parts:
                reported_match = re.search(reported_pattern, part.strip())
                if reported_match:
                    found_reported = True
                    extracted['year'] = f"({reported_match.group(1)})"
                    extracted['volume'] = reported_match.group(2)
                    extracted['law_report_series'] = reported_match.group(3)
                    extracted['starting_page'] = reported_match.group(4)
                    return 'case_reported', extracted
            
            # Second pass: Look for medium neutral citations
            if not found_reported:
                for part in parts:
                    medium_neutral_match = re.search(medium_neutral_pattern, part.strip())
                    if medium_neutral_match:
                        found_medium_neutral = True
                        extracted['year'] = f"[{medium_neutral_match.group(1)}]"
                        extracted['unique_court_identifier'] = medium_neutral_match.group(2)
                        extracted['judgment_number'] = medium_neutral_match.group(3)
                        return 'case_unreported_medium_neutral', extracted
            
            # If no reported or medium neutral citation found, it's unreported
            if not found_reported and not found_medium_neutral:
                for part in parts:
                    bc_match = re.search(bc_pattern, part.strip())
                    if bc_match:
                        return 'case_unreported_no_medium_neutral', extracted
            
            # Default to unreported if no patterns match
            return 'case_unreported_no_medium_neutral', extracted

        except Exception as e:
            print(f"Error extracting LexisNexis case details: {e}")
            return 'case_unreported_no_medium_neutral', extracted

    def _extract_jade_case(self, text: str) -> Tuple[str, Dict[str, Any]]:
        """Extract citation details from a JadeProfessional case citation"""
        extracted = {
            'case_name': '',
            'year': '',
            'volume': '',
            'law_report_series': '',
            'starting_page': '',
            'unique_court_identifier': '',
            'judgment_number': '',
            'jade_identifier': ''
        }

        try:
            # Split into case name and citations
            parts = text.split(';')
            
            # Extract case name from the first part
            first_part = parts[0].strip()
            
            # Look for the first year pattern as the boundary for case name
            year_match = re.search(r'(?:\[|\()\d{4}(?:\]|\))', first_part)
            if year_match:
                extracted['case_name'] = first_part[:year_match.start()].strip().rstrip(',')
                extracted['year'] = year_match.group(0)[1:-1]  # Extract year without brackets
            
            # Look for Jade identifier (e.g., [2023] JADE 123)
            jade_pattern = r'\[(\d{4})\]\s*JADE\s*(\d+)'
            for part in parts:
                jade_match = re.search(jade_pattern, part)
                if jade_match:
                    extracted['year'] = jade_match.group(1)
                    extracted['jade_identifier'] = jade_match.group(2)
                    citation_type = 'case_reported'
                    break
            
            # Look for medium neutral citation if present
            medium_neutral_pattern = r'\[(\d{4})\]\s*([A-Z]+)\s*(\d+)'
            for part in parts:
                mn_match = re.search(medium_neutral_pattern, part)
                if mn_match:
                    extracted['year'] = mn_match.group(1)
                    extracted['unique_court_identifier'] = mn_match.group(2)
                    extracted['judgment_number'] = mn_match.group(3)
                    citation_type = 'case_unreported_medium_neutral'
                    break
            
            return citation_type, extracted
            
        except Exception as e:
            # If extraction fails, return empty fields with reported case type
            return 'case_reported', extracted

    def _extract_ssrn_authors(self, text: str) -> list:
        """Extract authors specifically from SSRN citation format"""
        if not text:
            return []
        
        authors = []
        # Split on 'and' to get individual authors
        author_parts = text.split(' and ')
        
        for part in author_parts:
            # Remove any trailing/leading whitespace, commas, and periods
            author = part.strip().rstrip(',')
            
            # Split on comma to separate last name from rest
            name_parts = author.split(',')
            if len(name_parts) == 2:
                last_name = name_parts[0].strip()
                # Remove periods and extra spaces from first/middle names
                first_parts = [p.strip().rstrip('.') for p in name_parts[1].strip().split()]
                # Reconstruct as "First Middle Last"
                author = ' '.join(first_parts + [last_name])
            
            if author:
                authors.append(author)
        
        return authors

    def _extract_ssrn_article(self, text: str) -> Tuple[str, Dict[str, Any]]:
        """Extract citation details from an SSRN article citation"""
        extracted = {
            'authors': [],
            'title': '',
            'year': '',
            'journal': '',
            'volume': '',
            'issue': '',
            'starting_page': '',
            'ending_page': '',
            'ssrn_id': '',
            'abstract_id': '',
            'doi': '',
            'url': '',
            'posted_date': '',
            'last_revised': ''
        }

        try:
            # First split on the date in parentheses which typically appears after title
            date_split = re.split(r'\((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\)', text)
            
            if len(date_split) >= 2:
                first_part = date_split[0].strip()
                remaining = date_split[1].strip().lstrip('.')
                
                # Split first part on period to get author and title
                parts = first_part.split(', ')
                if len(parts) >= 2:
                    # Last part is the title
                    title_part = parts[-1].strip()
                    # Everything before is authors
                    authors_part = ', '.join(parts[:-1])
                    
                    # Clean up title (remove quotes if present)
                    extracted['title'] = title_part.strip('"\'')
                    # Extract authors using SSRN-specific method
                    extracted['authors'] = self._extract_ssrn_authors(authors_part)
                
                # Process the citation part which contains journal info
                # Look for common patterns in the remaining text
                
                # Pattern 1: Volume Journal Page (Year)
                # e.g., "24 Mich. St. Int'l L. Rev. 449 (2016)"
                p1 = re.search(r'(\d+)\s+([^,]+)\s+(\d+)(?:-(\d+))?\s*\((\d{4})\)', remaining)
                
                # Pattern 2: Journal, vol. X, no Y: Page-Page, Year
                # e.g., "Law & Social Inquiry, vol. 44, no 4: 957-986, 2019"
                p2 = re.search(r'([^,]+),\s*(?:vol\.|volume)\s*(\d+)(?:,\s*(?:no|number)\s*(\d+))?:\s*(\d+)(?:-(\d+))?,\s*(\d{4})', remaining)
                
                # Pattern 3: Journal, Vol. X, Year
                # e.g., "The Hague Journal on the Rule of Law, Vol. 1, 2010"
                p3 = re.search(r'([^,]+),\s*(?:Vol\.|Volume)\s*(\d+),\s*(\d{4})', remaining)
                
                # Pattern 4: Journal, Year
                # e.g., "Hague Journal on The Rule of Law, 2024"
                p4 = re.search(r'([^,]+),\s*(\d{4})', remaining)
                
                if p1:
                    extracted['volume'] = p1.group(1)
                    extracted['journal'] = p1.group(2).strip()
                    extracted['starting_page'] = p1.group(3)
                    extracted['ending_page'] = p1.group(4) if p1.group(4) else ''
                    extracted['year'] = f"({p1.group(5)})"
                elif p2:
                    extracted['journal'] = p2.group(1).strip()
                    extracted['volume'] = p2.group(2)
                    extracted['issue'] = p2.group(3) if p2.group(3) else ''
                    extracted['starting_page'] = p2.group(4)
                    extracted['ending_page'] = p2.group(5) if p2.group(5) else ''
                    extracted['year'] = f"({p2.group(6)})"
                elif p3:
                    extracted['journal'] = p3.group(1).strip()
                    extracted['volume'] = p3.group(2)
                    extracted['year'] = f"({p3.group(3)})"
                elif p4:
                    extracted['journal'] = p4.group(1).strip()
                    extracted['year'] = f"({p4.group(2)})"
                
                # Extract SSRN URL and abstract ID
                url_match = re.search(r'https://ssrn\.com/abstract=(\d+)', remaining)
                if url_match:
                    extracted['url'] = f"https://ssrn.com/abstract={url_match.group(1)}"
                    extracted['abstract_id'] = url_match.group(1)
                
                # Extract DOI if present
                doi_match = re.search(r'http://dx\.doi\.org/(\S+)', remaining)
                if doi_match:
                    extracted['doi'] = doi_match.group(1)

            return 'journal_article', extracted

        except Exception as e:
            print(f"Error extracting SSRN article details: {e}")
            return 'journal_article', extracted

    def _extract_google_scholar_journal_article(self, text: str) -> Tuple[str, Dict[str, Any]]:
        """Extract citation details from a Google Scholar journal article citation"""
        extracted = {
            'authors': [],
            'title': '',
            'journal': '',
            'volume': '',
            'issue': '',
            'year': '',
            'starting_page': '',
            'ending_page': ''
        }

        try:
            # Split into authors and rest
            parts = text.split('"')
            if len(parts) >= 2:
                # Extract authors from the first part
                authors_part = parts[0].strip().rstrip('.')
                extracted['authors'] = self._extract_authors(authors_part)
                
                # Extract title from between quotes
                extracted['title'] = parts[1].strip()
                
                # Process the remaining part
                remaining = parts[2].strip().lstrip('.')
                
                # First look for volume and everything after to identify journal boundary
                volume_pattern = r'(\d+)(?:,\s*(?:no\.|issue)\s*(?:supplement\s*)?(\d+))?\s*\((\d{4})\):\s*(\d+)(?:-(\d+))?'
                volume_match = re.search(volume_pattern, remaining)
                
                if volume_match:
                    # Journal is everything before the volume match
                    journal_text = remaining[:volume_match.start()].strip()
                    extracted['journal'] = journal_text.strip().rstrip(',').rstrip('.')
                    
                    # Extract volume, issue, year, and pages from the match
                    extracted['volume'] = volume_match.group(1)
                    extracted['issue'] = volume_match.group(2) if volume_match.group(2) else ''
                    extracted['year'] = f"({volume_match.group(3)})"
                    extracted['starting_page'] = volume_match.group(4)
                    extracted['ending_page'] = volume_match.group(5) if volume_match.group(5) else ''

            return 'journal_article', extracted

        except Exception as e:
            print(f"Error extracting Google Scholar journal article details: {e}")
            return 'journal_article', extracted

    def _extract_scholar_book(self, text: str) -> Tuple[str, Dict[str, Any]]:
        """Extract citation details from Google Scholar book"""
        extracted = {
            'authors': [],
            'title': '',
            'volume': '',
            'publisher': '',
            'year': ''
        }

        try:
            # First find the title by looking for the period after authors
            # that's not part of an initial
            title_match = re.search(r'(?<!Mr)(?<!Dr)(?<![A-Z])\.\s+([^.]+)\.', text)
            
            if title_match:
                # Everything before this point contains authors
                author_part = text[:title_match.start()].strip()
                extracted['authors'] = self._extract_authors(author_part)
                
                # Extract title
                extracted['title'] = title_match.group(1).strip()
                
                # Process everything after the title
                remaining = text[title_match.end():].strip().lstrip('.')
                
                # Extract volume if present
                vol_match = re.search(r'Vol\.\s*(\d+)', remaining, re.IGNORECASE)
                if vol_match:
                    extracted['volume'] = vol_match.group(1)
                    # Remove volume info from remaining text
                    remaining = remaining[:vol_match.start()].strip() + ' ' + remaining[vol_match.end():].strip()
                    remaining = re.sub(r'\s+', ' ', remaining).strip().lstrip('.')
                
                # Extract year (should be at the end)
                year_match = re.search(r',?\s*(\d{4})\s*\.?$', remaining)
                if year_match:
                    extracted['year'] = year_match.group(1)
                    # Publisher is everything before the year
                    publisher = remaining[:year_match.start()].strip()
                    extracted['publisher'] = publisher.strip('.,').strip()

            return 'book', extracted

        except Exception as e:
            print(f"Error extracting book details: {e}")
            return 'book', extracted

    # Helper methods for extraction
    def _extract_authors(self, text: str) -> list:
        """Extract authors from Chicago style citation"""
        if not text:
            return []
        
        authors = []
        # Remove any trailing period from the entire text first
        text = text.rstrip('.')
        
        # Split on ' and ' first to separate the last author
        and_parts = text.split(' and ')
        
        # Handle the parts before the last 'and'
        if len(and_parts) > 1:
            # Process all authors before the 'and'
            first_part = and_parts[0].strip()
            
            # For the first part, we need to handle the special case of
            # "Lastname, Firstname, Author2, Author3" format
            first_authors = []
            if ',' in first_part:
                parts = first_part.split(',')
                # First two parts are "Lastname, Firstname" of first author
                if len(parts) >= 2:
                    lastname = parts[0].strip()
                    firstname = parts[1].strip()
                    # Create the first author's full name
                    first_author = f"{firstname} {lastname}"
                    first_author = first_author.replace('.', '')
                    first_authors.append(first_author)
                    
                    # Any remaining parts are additional authors
                    for author in parts[2:]:
                        author = author.strip()
                        if author:  # Skip empty strings
                            # These authors are already in "Firstname Lastname" format
                            author = author.replace('.', '')
                            first_authors.append(author)
            else:
                # If no comma, treat as single name
                first_authors.append(first_part.replace('.', ''))
            
            authors.extend(first_authors)
            
            # Process the last author (after 'and')
            if ',' in and_parts[-1]:
                # Last author is in "Lastname, Firstname" format
                parts = [p.strip() for p in and_parts[-1].split(',', 1)]
                if len(parts) == 2:
                    lastname, firstname = parts
                    # Handle middle names/initials
                    names = [n.strip() for n in firstname.split()]
                    # Remove any periods from names/initials
                    names = [n.replace('.', '') for n in names]
                    authors.append(f"{' '.join(names)} {lastname}")
            else:
                # Last author is already in "Firstname Lastname" format
                # Remove any periods from names/initials
                last_author = and_parts[-1].replace('.', '')
                authors.append(last_author)
        else:
            # Single author
            if ',' in text:
                # Author is in "Lastname, Firstname" format
                parts = [p.strip() for p in text.split(',', 1)]
                if len(parts) == 2:
                    lastname, firstname = parts
                    # Handle middle names/initials
                    names = [n.strip() for n in firstname.split()]
                    # Remove any periods from names/initials
                    names = [n.replace('.', '') for n in names]
                    authors.append(f"{' '.join(names)} {lastname}")
            else:
                # Author is already in "Firstname Lastname" format
                # Remove any periods from names/initials
                text = text.replace('.', '')
                authors.append(text)
        
        return authors

    def _extract_case_name(self, text: str) -> str:
        # Basic pattern for case names (can be improved)
        pattern = r'^([^(\n]+)'
        match = re.search(pattern, text)
        return match.group(1).strip().rstrip(',') if match else ''

    def _extract_year(self, text: str) -> str:
        # Look for year in brackets or parentheses
        pattern = r'[\[(](\d{4})[\])]'
        match = re.search(pattern, text)
        return match.group(0) if match else ''

    def _extract_volume(self, text: str) -> str:
        # Look for volume number before law report series
        pattern = r'(\d+)\s*[A-Z]+'
        match = re.search(pattern, text)
        return match.group(1) if match else ''

    def _extract_series(self, text: str) -> str:
        # Look for common law report series abbreviations
        pattern = r'\d+\s*([A-Z]+(?:\s+[A-Z]+)*)'
        match = re.search(pattern, text)
        return match.group(1).strip() if match else ''

    def _extract_page(self, text: str) -> str:
        # Look for page number after law report series
        pattern = r'[A-Z]+\s*(\d+)'
        match = re.search(pattern, text)
        return match.group(1) if match else ''

    def _extract_pinpoint(self, text: str) -> str:
        # Look for pinpoint reference after main citation
        pattern = r',\s*(\d+)'
        match = re.search(pattern, text)
        return match.group(1) if match else ''

    def _extract_court_id(self, text: str) -> str:
        # Extract court identifier from medium neutral citation
        pattern = r'\[\d{4}]\s*([A-Z]+)'
        match = re.search(pattern, text)
        return match.group(1) if match else ''

    def _extract_judgment_number(self, text: str) -> str:
        # Extract judgment number from medium neutral citation
        pattern = r'\[\d{4}]\s*[A-Z]+\s*(\d+)'
        match = re.search(pattern, text)
        return match.group(1) if match else ''

    def _extract_title(self, text: str) -> str:
        # Look for title in quotes or after authors
        pattern = r'[\'"]([^\'"]+)[\'"]|(?:,\s*|\.\s*)([^,\.]+)'
        match = re.search(pattern, text)
        return (match.group(1) or match.group(2)).strip() if match else ''

    def _extract_journal(self, text: str) -> str:
        # Look for journal title (usually in italics or quotes)
        pattern = r'\'([^\']+)\'|\((\d{4})\)\s*([^,]+)'
        match = re.search(pattern, text)
        return match.group(1) or match.group(3) if match else ''

    def _extract_publisher(self, text: str) -> str:
        # Look for publisher name
        pattern = r'\(([^,]+)'
        match = re.search(pattern, text)
        return match.group(1).strip() if match else ''

    def _extract_edition(self, text: str) -> str:
        # Look for edition number
        pattern = r'(\d+(?:st|nd|rd|th)\s*ed)'
        match = re.search(pattern, text)
        return match.group(1) if match else ''
