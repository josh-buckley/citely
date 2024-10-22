from app import app
from extensions import db
from models import Citation
from datetime import date

with app.app_context():
    db.create_all()
    
    # Add some sample data
    sample_citations = [
        Citation(
            order=1,
            type='case_reported',
            title='Donoghue v Stevenson',
            case_name='Donoghue v Stevenson',
            year=1932,
            court='House of Lords',
            url='https://www.bailii.org/uk/cases/UKHL/1932/100.html',
            notes='Established the modern concept of negligence in tort law, introducing the "neighbour principle". The case involved a decomposed snail in a bottle of ginger beer.',
            formatted_citation='Donoghue v Stevenson (1932) AC 562',
            judge='Lord Atkin'
        ),
        Citation(
            order=2,
            type='journal_article',
            title='The Rule of Law and Its Virtue',
            authors='Joseph Raz',
            year=1977,
            journal='Law Quarterly Review',
            volume='93',
            starting_page=195,
            url='https://example.com/raz-rule-of-law',
            notes='A seminal article on the concept of the rule of law.',
            formatted_citation='Joseph Raz, \'The Rule of Law and Its Virtue\' (1977) 93 Law Quarterly Review 195'
        ),
        Citation(
            order=3,
            type='legislation',
            title='Human Rights Act',
            year=1998,
            jurisdiction='UK',
            url='https://www.legislation.gov.uk/ukpga/1998/42/contents',
            notes='An Act to give further effect to rights and freedoms guaranteed under the European Convention on Human Rights.',
            formatted_citation='Human Rights Act 1998 (UK)'
        ),
        Citation(
            order=4,
            type='book',
            title='The Concept of Law',
            authors='H.L.A. Hart',
            year=1961,
            publisher='Oxford University Press',
            edition='1st',
            url='https://example.com/concept-of-law',
            notes='A seminal work in legal philosophy.',
            formatted_citation='H.L.A. Hart, The Concept of Law (Oxford University Press, 1st ed, 1961)'
        ),
        Citation(
            order=5,
            type='internet_materials_author',
            title='The Rule of Law',
            authors='Tom Bingham',
            year=2010,
            web_page_title='Centre for Public Law',
            url='https://www.cpl.law.cam.ac.uk/sir-david-williams-lectures2006-rule-law',
            retrieval_date=date(2023, 5, 1),
            notes='A lecture on the rule of law by Lord Bingham.',
            formatted_citation='Tom Bingham, \'The Rule of Law\' (Centre for Public Law, 2010) <https://www.cpl.law.cam.ac.uk/sir-david-williams-lectures2006-rule-law>'
        )
    ]
    
    db.session.add_all(sample_citations)
    db.session.commit()

print("Database created and sample data added.")
