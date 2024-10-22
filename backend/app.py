from flask import Flask, jsonify, request
from flask_cors import CORS
from extensions import db
from models import Citation, Tag
from dotenv import load_dotenv
from formatcitation import AGLC4Citation
import os
from datetime import datetime, date

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure the SQLAlchemy part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///citations.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the app with the extension
db.init_app(app)

# Initialize the AGLC4Citation formatter
aglc_formatter = AGLC4Citation()

@app.route('/api/citations', methods=['GET', 'POST'])
def handle_citations():
    if request.method == 'GET':
        return get_citations()
    elif request.method == 'POST':
        return add_citation()

@app.route('/api/citations/reorder', methods=['POST'])
def reorder_citations():
    try:
        data = request.json
        for item in data:
            citation = Citation.query.get(item['id'])
            if citation:
                citation.order = item['order']
        db.session.commit()
        return jsonify({"message": "Citations reordered successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error reordering citations: {str(e)}")
        return jsonify({"error": "Failed to reorder citations"}), 500

@app.route('/api/citations', methods=['GET'])
def get_citations():
    try:
        with app.app_context():
            citations = Citation.query.order_by(Citation.order).all()
            app.logger.info(f"Retrieved {len(citations)} citations from database")
            
            if not citations:
                app.logger.warning("No citations found in the database.")
                return jsonify([]), 200
            
            citation_list = [citation.to_dict() for citation in citations]
            
            for citation in citation_list:
                if 'authors' in citation and not isinstance(citation['authors'], list):
                    citation['authors'] = [citation['authors']] if citation['authors'] else []
                if 'editors' in citation and not isinstance(citation['editors'], list):
                    citation['editors'] = [citation['editors']] if citation['editors'] else []
            
            app.logger.info(f"Successfully processed {len(citation_list)} citations.")
            app.logger.debug(f"Returning citations: {citation_list}")
            return jsonify(citation_list), 200
    except Exception as e:
        app.logger.error(f"Error fetching citations: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to fetch citations", "details": str(e)}), 500

@app.route('/api/citations', methods=['POST'])
def add_citation():
    try:
        data = request.json
        app.logger.info(f"Received citation data: {data}")
        
        # Convert retrieval_date from string to date object if it exists and is not empty
        if 'retrieval_date' in data and data['retrieval_date']:
            try:
                data['retrieval_date'] = datetime.strptime(data['retrieval_date'], '%Y-%m-%d').date()
            except ValueError:
                app.logger.error(f"Invalid date format for retrieval_date: {data['retrieval_date']}")
                return jsonify({"error": "Invalid date format for retrieval_date. Use YYYY-MM-DD."}), 400
        else:
            # Remove retrieval_date if it's empty or not present
            data.pop('retrieval_date', None)

        # Create a new Citation object
        new_citation = Citation(
            type=data['type'],
            title=data.get('title'),
            year=int(data['year']) if data.get('year') else None,
            url=data.get('url'),
            notes=data.get('notes'),
            case_name=data.get('case_name'),
            court=data.get('court'),
            judge=data.get('judge'),
            jurisdiction=data.get('jurisdiction'),
            authors=data.get('authors'),
            journal=data.get('journal'),
            volume=data.get('volume'),
            issue=data.get('issue'),
            starting_page=data.get('starting_page'),
            publisher=data.get('publisher'),
            edition=data.get('edition'),
            editors=data.get('editors'),
            document_type=data.get('document_type'),
            series_no=data.get('series_no'),
            document_number=data.get('document_number'),
            web_page_title=data.get('web_page_title'),
            retrieval_date=data.get('retrieval_date'),
            newspaper=data.get('newspaper'),
            place=data.get('place'),
            pinpoint=data.get('pinpoint'),
            short_title=data.get('short_title'),
            order=data.get('order')
        )

        # Format the citation using AGLC4Citation
        try:
            citation_type = data['type'].lower()
            formatted_citation = aglc_formatter.format_citation(citation_type, **data)
            new_citation.formatted_citation = formatted_citation
        except ValueError as ve:
            app.logger.error(f"ValueError in format_citation: {str(ve)}")
            return jsonify({"error": str(ve)}), 400
        except Exception as e:
            app.logger.error(f"Unexpected error in format_citation: {str(e)}")
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

        # Add the new citation to the database
        db.session.add(new_citation)
        db.session.commit()

        app.logger.info(f"Successfully added new citation: {new_citation.to_dict()}")
        return jsonify(new_citation.to_dict()), 201
    except Exception as e:
        app.logger.error(f"Error adding citation: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to add citation: {str(e)}"}), 500

@app.route('/api/citations/<string:citation_id>', methods=['PUT'])
def update_citation(citation_id):
    try:
        data = request.json
        citation = Citation.query.get(citation_id)
        if not citation:
            return jsonify({"error": "Citation not found"}), 404

        # Update citation fields
        for key, value in data.items():
            setattr(citation, key, value)

        # Format the updated citation
        try:
            citation_type = data['type'].lower()
            formatted_citation = aglc_formatter.format_citation(citation_type, **data)
            citation.formatted_citation = formatted_citation
        except ValueError as ve:
            app.logger.error(f"ValueError in format_citation: {str(ve)}")
            return jsonify({"error": str(ve)}), 400
        except Exception as e:
            app.logger.error(f"Unexpected error in format_citation: {str(e)}")
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

        db.session.commit()
        return jsonify(citation.to_dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating citation: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to update citation"}), 500

@app.route('/api/citations/<string:citation_id>', methods=['DELETE'])
def delete_citation(citation_id):
    try:
        citation = Citation.query.get(citation_id)
        if not citation:
            return jsonify({"error": "Citation not found"}), 404

        db.session.delete(citation)
        db.session.commit()
        return jsonify({"message": "Citation deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting citation: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete citation"}), 500

@app.route('/api/citations/<int:citation_id>/tags', methods=['POST'])
def add_tag(citation_id):
    try:
        data = request.json
        citation = Citation.query.get(citation_id)
        if not citation:
            return jsonify({"error": "Citation not found"}), 404

        new_tag = Tag(name=data['name'], color=data['color'], citation_id=citation_id)
        db.session.add(new_tag)
        db.session.commit()

        return jsonify({"id": new_tag.id, "name": new_tag.name, "color": new_tag.color}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        data = request.json
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({"error": "Tag not found"}), 404

        tag.name = data.get('name', tag.name)
        tag.color = data.get('color', tag.color)
        db.session.commit()

        return jsonify({"id": tag.id, "name": tag.name, "color": tag.color}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({"error": "Tag not found"}), 404

        db.session.delete(tag)
        db.session.commit()

        return jsonify({"message": "Tag deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def init_db():
    with app.app_context():
        db.create_all()
        app.logger.info("Database tables created.")

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
