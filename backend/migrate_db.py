from app import app, db
from models import Citation, Project, Tag
from datetime import datetime
import sqlite3
import json

def parse_date(date_string):
    if not date_string:
        return None
    
    try:
        # Try different date formats
        formats = [
            '%Y-%m-%d',
            '%Y-%m-%d %H:%M:%S.%f',
            '%Y-%m-%dT%H:%M:%S.%f'
        ]
        
        for fmt in formats:
            try:
                return datetime.strptime(date_string, fmt)
            except ValueError:
                continue
        
        # If no format matches, try splitting the string
        if ' ' in date_string:
            return datetime.strptime(date_string.split(' ')[0], '%Y-%m-%d')
        
        return None
    except Exception:
        return None

def migrate_database():
    with app.app_context():
        # Connect to old database
        old_conn = sqlite3.connect('citations.db.backup')
        old_cursor = old_conn.cursor()

        # Get all data from old tables
        old_cursor.execute("SELECT * FROM citations")
        old_citations = old_cursor.fetchall()
        old_cursor.execute("SELECT * FROM projects")
        old_projects = old_cursor.fetchall()
        
        # Check if tags table exists
        old_cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='tags'")
        has_tags_table = old_cursor.fetchone() is not None
        
        if has_tags_table:
            old_cursor.execute("SELECT * FROM tags")
            old_tags = old_cursor.fetchall()
            
            # Check if citation_tags table exists
            old_cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='citation_tags'")
            has_citation_tags = old_cursor.fetchone() is not None
            
            if has_citation_tags:
                old_cursor.execute("SELECT * FROM citation_tags")
                old_citation_tags = old_cursor.fetchall()
            else:
                old_citation_tags = []
        else:
            old_tags = []
            old_citation_tags = []

        # Get column names
        old_cursor.execute("PRAGMA table_info(citations)")
        citation_columns = [col[1] for col in old_cursor.fetchall()]

        # Drop and recreate all tables with new schema
        db.drop_all()
        db.create_all()

        # Migrate projects
        for project in old_projects:
            new_project = Project(
                id=project[0],
                title=project[1],
                description=project[2],
                status=project[3],
                deadline=parse_date(project[4]),
                created_at=parse_date(project[5]),
                updated_at=parse_date(project[6])
            )
            db.session.add(new_project)

        # Migrate tags if they exist
        if old_tags:
            for tag in old_tags:
                new_tag = Tag(
                    id=tag[0],
                    name=tag[1],
                    color=tag[2]
                )
                db.session.add(new_tag)

        # Migrate citations
        for citation in old_citations:
            citation_dict = dict(zip(citation_columns, citation))
            
            # Convert date strings to date objects
            date_fields = ['retrieval_date', 'created_at', 'updated_at']
            for field in date_fields:
                if field in citation_dict and citation_dict[field]:
                    try:
                        if 'T' in str(citation_dict[field]):
                            citation_dict[field] = datetime.strptime(citation_dict[field], '%Y-%m-%dT%H:%M:%S.%f')
                        else:
                            citation_dict[field] = datetime.strptime(citation_dict[field], '%Y-%m-%d').date()
                    except (ValueError, TypeError):
                        citation_dict[field] = None

            # Convert JSON strings to objects
            json_fields = ['authors', 'editors']
            for field in json_fields:
                if field in citation_dict and citation_dict[field]:
                    try:
                        if isinstance(citation_dict[field], str):
                            citation_dict[field] = json.loads(citation_dict[field])
                    except (ValueError, TypeError):
                        citation_dict[field] = None

            # Create new citation with existing data
            new_citation = Citation(**{k: v for k, v in citation_dict.items() 
                                    if hasattr(Citation, k) and k != 'tags'})
            db.session.add(new_citation)

        # Migrate citation_tags relationships if they exist
        if old_citation_tags:
            for ct in old_citation_tags:
                citation = Citation.query.get(ct[0])
                tag = Tag.query.get(ct[1])
                if citation and tag:
                    citation.tags.append(tag)

        # Commit all changes
        try:
            db.session.commit()
            print("Migration completed successfully!")
        except Exception as e:
            db.session.rollback()
            print(f"Error during migration: {str(e)}")
            raise

        old_conn.close()

if __name__ == "__main__":
    migrate_database()