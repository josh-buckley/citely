from extensions import db
from sqlalchemy import Column, Integer, String, Float, Text, JSON, Date


class Citation(db.Model):
    __tablename__ = 'citations'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=True)
    type = db.Column(db.String(50), nullable=True)
    formatted_citation = db.Column(db.Text, nullable=True)
    
    # Common fields
    title = db.Column(db.String(255), nullable=True)
    year = db.Column(db.Integer, nullable=True)
    url = db.Column(db.String(255), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    
    # Case fields
    case_name = db.Column(db.String(255), nullable=True)
    court = db.Column(db.String(100), nullable=True)
    judge = db.Column(db.String(100), nullable=True)
    
    # Legislation fields
    jurisdiction = db.Column(db.String(50), nullable=True)
    
    # Journal article fields
    authors = db.Column(db.JSON, nullable=True)
    journal = db.Column(db.String(255), nullable=True)
    volume = db.Column(db.String(50), nullable=True)
    issue = db.Column(db.String(50), nullable=True)
    starting_page = db.Column(db.Integer, nullable=True)
    
    # Book fields
    publisher = db.Column(db.String(255), nullable=True)
    edition = db.Column(db.String(50), nullable=True)
    editors = db.Column(db.JSON, nullable=True)  # This allows storing an array of editors
    
    # Report fields
    document_type = db.Column(db.String(100), nullable=True)
    series_no = db.Column(db.String(50), nullable=True)
    document_number = db.Column(db.String(50), nullable=True)
    
    # Internet materials fields
    web_page_title = db.Column(db.String(255), nullable=True)
    retrieval_date = db.Column(db.Date, nullable=True)
    
    # Newspaper fields
    newspaper = db.Column(db.String(255), nullable=True)
    place = db.Column(db.String(100), nullable=True)
    
    # Additional fields
    pinpoint = db.Column(db.String(50), nullable=True)
    short_title = db.Column(db.String(100), nullable=True)

    tags = db.relationship('Tag', back_populates='citation', lazy=True, cascade="all, delete-orphan")


    def to_dict(self):
        citation_dict = {
            'id': self.id,
            'order': self.order,
            'type': self.type,
            'formatted_citation': self.formatted_citation,
            'title': self.title,
            'year': self.year,
            'url': self.url,
            'notes': self.notes,
            'short_title': self.short_title,
            'pinpoint': self.pinpoint,
            'case_name': self.case_name,
            'court': self.court,
            'judge': self.judge,
            'jurisdiction': self.jurisdiction,
            'authors': self.authors,
            'journal': self.journal,
            'volume': self.volume,
            'issue': self.issue,
            'starting_page': self.starting_page,
            'publisher': self.publisher,
            'edition': self.edition,
            'editors': self.editors,
            'document_type': self.document_type,
            'series_no': self.series_no,
            'document_number': self.document_number,
            'web_page_title': self.web_page_title,
            'retrieval_date': self.retrieval_date.isoformat() if self.retrieval_date else None,
            'newspaper': self.newspaper,
            'place': self.place,
            'tags': [{'id': tag.id, 'name': tag.name, 'color': tag.color} for tag in self.tags],
        }
        
        # Remove None values
        return {k: v for k, v in citation_dict.items() if v is not None}

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    color = db.Column(db.String, nullable=True)
    citation_id = db.Column(db.Integer, db.ForeignKey('citations.id'))

    citation = db.relationship("Citation", back_populates="tags")
