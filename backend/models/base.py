from datetime import date, datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, validator
from uuid import uuid4

class TimestampedModel(BaseModel):
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class Tag(BaseModel):
    id: Optional[int] = None
    name: str
    color: str

    class Config:
        from_attributes = True

    def dict(self, *args, **kwargs):
        d = super().dict(*args, **kwargs)
        if d.get('id'):
            d['id'] = int(d['id'])
        return d

class Project(TimestampedModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    title: str
    description: Optional[str] = None
    status: str
    deadline: Optional[date] = None
    citations: Optional[List['Citation']] = []

class Citation(TimestampedModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    project_id: str
    type: str
    formatted_citation: Optional[str] = None
    order: Optional[int] = None
    
    # Common fields
    title: Optional[str] = None
    year: Optional[str] = None
    url: Optional[str] = None
    notes: Optional[str] = None
    
    # Date fields (all as strings now)
    retrieval_date: Optional[str] = None
    date_of_proceedings: Optional[str] = None
    date_of_submission: Optional[str] = None
    date_of_debate: Optional[str] = None
    filing_date: Optional[str] = None
    registration_date: Optional[str] = None
    date_opened: Optional[str] = None
    date_in_force: Optional[str] = None
    full_date: Optional[str] = None
    status_change_date: Optional[str] = None
    signature_date: Optional[str] = None
    entry_force_date: Optional[str] = None
    
    # Case fields
    case_name: Optional[str] = None
    court: Optional[str] = None
    judge: Optional[str] = None
    law_report_series: Optional[str] = None
    unique_court_identifier: Optional[str] = None
    judgment_number: Optional[str] = None
    
    # Legislation fields
    jurisdiction: Optional[str] = None
    explanatory_type: Optional[str] = None
    bill_citation: Optional[str] = None
    title_of_notice: Optional[str] = None
    
    # Journal article fields
    authors: List[str] = []
    journal: Optional[str] = None
    volume: Optional[str] = None
    issue: Optional[str] = None
    starting_page: Optional[str] = None
    
    # Book fields
    publisher: Optional[str] = None
    editors: List[str] = []
    edition: Optional[str] = None
    
    # Report fields
    document_type: Optional[str] = None
    series_no: Optional[str] = None
    document_number: Optional[str] = None
    
    # Court documents
    number_identifier: Optional[str] = None
    citation_report_series: Optional[str] = None
    
    # Secondary sources
    translation_title: Optional[str] = None
    publication_year: Optional[str] = None
    dictionary_title: Optional[str] = None
    edition_number: Optional[str] = None
    entry_title: Optional[str] = None
    definition_number: Optional[str] = None
    title_number: Optional[str] = None
    title_name: Optional[str] = None
    chapter_number: Optional[str] = None
    chapter_name: Optional[str] = None
    paragraph: Optional[str] = None
    title_of_encyclopedia: Optional[str] = None
    volume_number: Optional[str] = None
    
    # Internet materials fields
    web_page_title: Optional[str] = None
    
    # Media-related fields
    newspaper: Optional[str] = None
    place: Optional[str] = None
    place_of_publication: Optional[str] = None
    medium: Optional[str] = None
    director: Optional[str] = None
    producer: Optional[str] = None
    production_company: Optional[str] = None
    timestamp: Optional[str] = None
    platform: Optional[str] = None
    post_content: Optional[str] = None
    
    # Additional fields
    pinpoint: Optional[str] = None
    short_title: Optional[str] = None
    
    # Interview fields
    interviewee: Optional[str] = None
    interviewer: Optional[str] = None
    program: Optional[str] = None
    
    # Judicial decisions fields
    proceeding_number: Optional[str] = None
    judicial_officers: Optional[str] = None
    award_description: Optional[str] = None
    forum: Optional[str] = None
    case_award_number: Optional[str] = None
    party_name: Optional[str] = None
    submission_title: Optional[str] = None
    date_of_proceedings: Optional[date] = None
    date_of_submission: Optional[date] = None
    
    # Legislative materials fields
    gazette_title: Optional[str] = None
    gazette_number: Optional[str] = None
    instrumentality_officer: Optional[str] = None
    instrument_title: Optional[str] = None
    practice_direction: Optional[str] = None
    identifier: Optional[str] = None
    chamber: Optional[str] = None
    date_of_debate: Optional[date] = None
    name_of_speaker: Optional[str] = None
    issuing_body: Optional[str] = None
    
    # Miscellaneous materials fields
    committee: Optional[str] = None
    legislature: Optional[str] = None
    location: Optional[str] = None
    jurisdiction_code: Optional[str] = None
    ip_type: Optional[str] = None
    additional_info: Optional[str] = None
    identification_number: Optional[str] = None
    filing_date: Optional[date] = None
    registration_status: Optional[str] = None
    registration_date: Optional[date] = None
    company_name: Optional[str] = None
    correspondence_type: Optional[str] = None
    recipient: Optional[str] = None
    submission_number: Optional[str] = None
    name_of_inquiry: Optional[str] = None
    number: Optional[str] = None
    status_change_date: Optional[date] = None
    
    # International materials fields
    parties_names: Optional[str] = None
    treaty_series: Optional[str] = None
    treaty_title: Optional[str] = None
    signature_date: Optional[date] = None
    entry_force_date: Optional[date] = None
    date_opened: Optional[date] = None
    date_in_force: Optional[date] = None
    
    # Research paper fields
    paper_number: Optional[str] = None
    
    # Speech fields
    speech_or_lecture: Optional[str] = None
    institution_forum: Optional[str] = None
    
    # Relationships
    tags: List[Tag] = Field(default_factory=list)

    @validator('*', pre=True)
    def empty_str_to_none(cls, v):
        if v == '':
            return None
        return v

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

    def dict(self, *args, **kwargs):
        d = super().dict(*args, **kwargs)
        # Remove date conversion since we're storing as strings
        return d

# Update forward references
Citation.update_forward_refs()
Project.update_forward_refs() 