from datetime import date, datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
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
    year: Optional[int] = None
    url: Optional[str] = None
    notes: Optional[str] = None
    
    # Case fields
    case_name: Optional[str] = None
    court: Optional[str] = None
    judge: Optional[str] = None
    law_report_series: Optional[str] = None
    
    # Legislation fields
    jurisdiction: Optional[str] = None
    
    # Journal article fields
    authors: Optional[List[Dict[str, Any]]] = None
    journal: Optional[str] = None
    volume: Optional[str] = None
    issue: Optional[str] = None
    starting_page: Optional[str] = None
    
    # Book fields
    publisher: Optional[str] = None
    editors: Optional[List[Dict[str, Any]]] = None
    edition: Optional[str] = None
    
    # Report fields
    document_type: Optional[str] = None
    series_no: Optional[str] = None
    document_number: Optional[str] = None
    
    # Internet materials fields
    web_page_title: Optional[str] = None
    retrieval_date: Optional[date] = None
    
    # Newspaper fields
    newspaper: Optional[str] = None
    place: Optional[str] = None
    
    # Additional fields
    pinpoint: Optional[str] = None
    short_title: Optional[str] = None
    
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
    
    # Secondary sources fields
    chapter_title: Optional[str] = None
    book_title: Optional[str] = None
    translator: Optional[str] = None
    speech_type: Optional[str] = None
    institution: Optional[str] = None
    release_type: Optional[str] = None
    body: Optional[str] = None
    date_month_season: Optional[str] = None
    periodical_name: Optional[str] = None
    format: Optional[str] = None
    interviewee: Optional[str] = None
    interviewer: Optional[str] = None
    interview_forum: Optional[str] = None
    episode_title: Optional[str] = None
    film_series_title: Optional[str] = None
    version_details: Optional[str] = None
    studio_producer: Optional[str] = None
    
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
    
    # International materials fields
    parties_names: Optional[str] = None
    treaty_series: Optional[str] = None
    date_opened: Optional[date] = None
    date_in_force: Optional[date] = None
    
    # Relationships
    tags: List[Tag] = Field(default_factory=list)
    project: Optional[Project] = None

    class Config:
        from_attributes = True

    def dict(self, *args, **kwargs):
        # Custom dict method to handle date serialization
        d = super().dict(*args, **kwargs)
        # Convert all date fields to ISO format
        date_fields = [
            'retrieval_date', 'date_of_proceedings', 'date_of_submission',
            'date_of_debate', 'filing_date', 'registration_date',
            'date_opened', 'date_in_force', 'created_at', 'updated_at'
        ]
        for field in date_fields:
            if d.get(field):
                if isinstance(d[field], (date, datetime)):
                    d[field] = d[field].isoformat()
        return d

# Update forward references
Citation.update_forward_refs()
Project.update_forward_refs() 