from extensions import db
from sqlalchemy import Column, Integer, String, Float, Text, JSON, Date, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import date, datetime
import uuid


# Define the association table for the many-to-many relationship
citation_tags = Table('citation_tags', db.Model.metadata,
    Column('citation_id', String(36), ForeignKey('citations.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id'), primary_key=True)
)

class Citation(db.Model):
    __tablename__ = 'citations'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey('projects.id'), nullable=False)
    type = Column(String(100), nullable=False)
    formatted_citation = Column(Text)
    order = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Common fields
    title = Column(String(255))
    year = Column(Integer)
    url = Column(String(255))
    notes = Column(Text)
    
    # Case fields
    case_name = Column(String(255))
    court = Column(String(255))
    judge = Column(String(255))
    law_report_series = Column(String(255))
    
    # Legislation fields
    jurisdiction = Column(String(255))
    
    # Journal article fields
    authors = Column(JSON)
    journal = Column(String(255))
    volume = Column(String(50))
    issue = Column(String(50))
    starting_page = Column(String(50))
    
    # Book fields
    publisher = Column(String(255))
    editors = Column(JSON)
    edition = Column(String(50))
    
    # Report fields
    document_type = Column(String(100))
    series_no = Column(String(50))
    document_number = Column(String(50))
    
    # Internet materials fields
    web_page_title = Column(String(255))
    retrieval_date = Column(Date)
    
    # Newspaper fields
    newspaper = Column(String(255))
    place = Column(String(255))
    
    # Additional fields
    pinpoint = Column(String(50))
    short_title = Column(String(255))
    
    # New fields for judicial decisions
    proceeding_number = Column(String(255))
    judicial_officers = Column(String(255))
    award_description = Column(String(255))
    forum = Column(String(255))
    case_award_number = Column(String(255))
    party_name = Column(String(255))
    submission_title = Column(String(255))
    date_of_proceedings = Column(Date)
    date_of_submission = Column(Date)
    
    # New fields for legislative materials
    gazette_title = Column(String(255))
    gazette_number = Column(String(100))
    instrumentality_officer = Column(String(255))
    instrument_title = Column(String(255))
    practice_direction = Column(String(255))
    identifier = Column(String(100))
    chamber = Column(String(100))
    date_of_debate = Column(Date)
    name_of_speaker = Column(String(255))
    
    # New fields for secondary sources
    chapter_title = Column(String(255))
    book_title = Column(String(255))
    translator = Column(String(255))
    speech_type = Column(String(100))
    institution = Column(String(255))
    release_type = Column(String(100))
    body = Column(String(255))
    date_month_season = Column(String(100))
    periodical_name = Column(String(255))
    format = Column(String(100))
    interviewee = Column(String(255))
    interviewer = Column(String(255))
    interview_forum = Column(String(255))
    episode_title = Column(String(255))
    film_series_title = Column(String(255))
    version_details = Column(String(255))
    studio_producer = Column(String(255))
    
    # New fields for miscellaneous materials
    committee = Column(String(255))
    legislature = Column(String(255))
    location = Column(String(255))
    jurisdiction_code = Column(String(50))
    ip_type = Column(String(100))
    additional_info = Column(Text)
    identification_number = Column(String(100))
    filing_date = Column(Date)
    registration_status = Column(String(100))
    registration_date = Column(Date)
    company_name = Column(String(255))
    correspondence_type = Column(String(100))
    recipient = Column(String(255))
    
    # New fields for international materials
    parties_names = Column(String(255))
    treaty_series = Column(String(255))
    date_opened = Column(Date)
    date_in_force = Column(Date)

    project = relationship("Project", back_populates="citations")
    tags = relationship('Tag', secondary=citation_tags, back_populates='citations')

    def to_dict(self):
        base_dict = {
            'id': self.id,
            'order': self.order,
            'type': self.type,
            'formatted_citation': self.formatted_citation,
            'project_id': self.project_id,
            'title': self.title,
            'year': self.year,
            'url': self.url,
            'notes': self.notes,
            'case_name': self.case_name,
            'court': self.court,
            'judge': self.judge,
            'jurisdiction': self.jurisdiction,
            'authors': self.authors,
            'editors': self.editors,
            'journal': self.journal,
            'volume': self.volume,
            'issue': self.issue,
            'starting_page': self.starting_page,
            'publisher': self.publisher,
            'edition': self.edition,
            'document_type': self.document_type,
            'series_no': self.series_no,
            'document_number': self.document_number,
            'web_page_title': self.web_page_title,
            'retrieval_date': self.retrieval_date.isoformat() if self.retrieval_date else None,
            'newspaper': self.newspaper,
            'place': self.place,
            'pinpoint': self.pinpoint,
            'short_title': self.short_title,
            'tags': [tag.to_dict() for tag in self.tags],  # Include tags,
            'law_report_series': self.law_report_series,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
        
        # Handle date fields
        date_fields = ['created_at', 'updated_at', 'retrieval_date', 'filing_date',
                      'registration_date', 'date_opened', 'date_in_force',
                      'date_of_proceedings', 'date_of_submission', 'date_of_debate']
        
        for field in date_fields:
            value = getattr(self, field)
            base_dict[field] = value.isoformat() if value else None
            
        # Add tags
        base_dict['tags'] = [tag.to_dict() for tag in self.tags]
        
        return base_dict


class Tag(db.Model):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    color = Column(String(7), nullable=False)
    citations = relationship('Citation', secondary=citation_tags, back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color
        }


class Project(db.Model):
    __tablename__ = 'projects'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(100), nullable=False)
    description = Column(Text)
    status = Column(String(20), nullable=False)
    deadline = Column(Date)  # Change this to Date type
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    citations = relationship('Citation', back_populates='project')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'deadline': self.deadline.isoformat() if self.deadline else None,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'citations': [citation.to_dict() for citation in self.citations]
        }
