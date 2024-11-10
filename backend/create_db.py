from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import db, Citation, Project, Tag, citation_tags
from datetime import date, timedelta
import random
import uuid
from app import app

# Database connection
SQLALCHEMY_DATABASE_URL = "sqlite:///./citations.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    with app.app_context():
        db.drop_all()
        db.create_all()

def create_sample_data():
    with app.app_context():
        # Create tags
        tags = [
            Tag(name='Criminal Law', color='#FF5733'),
            Tag(name='Civil Law', color='#33FF57'),
            Tag(name='Constitutional Law', color='#3357FF'),
            Tag(name='Contract Law', color='#FF33F1'),
            Tag(name='Tort Law', color='#33FFF1')
        ]
        db.session.add_all(tags)

        # Create projects
        projects = [
            Project(
                id=str(uuid.uuid4()),
                title='Criminal Law Research',
                description='Research on recent developments in criminal law',
                status='In Progress',
                deadline=date.today() + timedelta(days=30)
            ),
            Project(
                id=str(uuid.uuid4()),
                title='Contract Law Analysis',
                description='Analysis of key contract law cases',
                status='Not Started',
                deadline=date.today() + timedelta(days=60)
            )
        ]
        db.session.add_all(projects)

        # Create sample citations
        sample_citations = [
            Citation(
                id=str(uuid.uuid4()),
                order=1,
                type='case_reported',
                title='Donoghue v Stevenson',
                year=1932,
                case_name='Donoghue v Stevenson',
                court='House of Lords',
                judge='Lord Atkin',
                url='https://www.bailii.org/uk/cases/UKHL/1932/100.html',
                notes='Established the modern concept of negligence in tort law, introducing the "neighbour principle".',
                formatted_citation='Donoghue v Stevenson [1932] AC 562',
                project_id=projects[0].id
            ),
            Citation(
                id=str(uuid.uuid4()),
                order=2,
                type='journal_article',
                title='The Rule of Law and Its Virtue',
                authors=['Joseph Raz'],
                year=1977,
                journal='Law Quarterly Review',
                volume='93',
                starting_page=195,
                url='https://example.com/raz-rule-of-law',
                notes='A seminal article on the concept of the rule of law.',
                formatted_citation='Joseph Raz, \'The Rule of Law and Its Virtue\' (1977) 93 Law Quarterly Review 195',
                project_id=projects[0].id
            ),
        ]

        db.session.add_all(sample_citations)

        # Assign tags to citations
        sample_citations[0].tags.extend([tags[0], tags[2]])  # Criminal Law and Constitutional Law
        sample_citations[1].tags.extend([tags[2], tags[3]])  # Constitutional Law and Contract Law

        try:
            db.session.commit()
            print("Sample data created successfully.")
        except Exception as e:
            db.session.rollback()
            print(f"Error creating sample data: {str(e)}")
            raise

if __name__ == "__main__":
    init_db()
    create_sample_data()
    print("Database setup complete.")
