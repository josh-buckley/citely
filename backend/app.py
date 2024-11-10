from flask import Flask, jsonify, request
from flask_cors import CORS
from extensions import db
from models import Citation, Tag, Project
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
        citation_dict = {item['id']: item['order'] for item in data}
        
        citations = Citation.query.filter(Citation.id.in_(citation_dict.keys())).all()
        for citation in citations:
            citation.order = citation_dict[citation.id]
        
        db.session.commit()
        return jsonify({"message": "Citations reordered successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error reordering citations: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to reorder citations"}), 500

@app.route('/api/citations', methods=['GET'])
def get_citations():
    try:
        project_id = request.args.get('projectId')
        
        # Filter citations by project_id if provided
        if project_id:
            citations = Citation.query.filter_by(project_id=project_id).order_by(Citation.order).all()
        else:
            citations = Citation.query.order_by(Citation.order).all()

        app.logger.info(f"Retrieved {len(citations)} citations from database")
        
        if not citations:
            app.logger.warning("No citations found in the database.")
            return jsonify([]), 200
        
        citation_list = [citation.to_dict() for citation in citations]
        
        # Ensure authors and editors are lists
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

        max_order = db.session.query(db.func.max(Citation.order)).scalar() or 0
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
            editors=data.get('editors'),  # Add this line
            journal=data.get('journal'),
            volume=data.get('volume'),
            issue=data.get('issue'),
            starting_page=data.get('starting_page'),
            publisher=data.get('publisher'),
            edition=data.get('edition'),
            document_type=data.get('document_type'),
            series_no=data.get('series_no'),
            document_number=data.get('document_number'),
            web_page_title=data.get('web_page_title'),
            retrieval_date=data.get('retrieval_date'),
            newspaper=data.get('newspaper'),
            place=data.get('place'),
            pinpoint=data.get('pinpoint'),
            short_title=data.get('short_title'),
            order=max_order + 1,
            project_id=data['projectId'],
            law_report_series=data.get('law_report_series'),
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
            if hasattr(citation, key):
                if key == 'tags':
                    # Handle tags separately
                    citation.tags = []
                    for tag_data in value:
                        tag = Tag.query.filter_by(name=tag_data['name']).first()
                        if not tag:
                            tag = Tag(name=tag_data['name'], color=tag_data['color'])
                        citation.tags.append(tag)
                elif key == 'notes':
                    # Set notes to None if it's an empty string or null
                    citation.notes = value if value else None
                else:
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
        app.logger.error(f"Error updating citation: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({"error": f"Failed to update citation: {str(e)}"}), 500

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

@app.route('/api/citations/<string:citation_id>/tags', methods=['POST'])
def add_tag_to_citation(citation_id):
    try:
        data = request.json
        tag_name = data.get('name')
        tag_color = data.get('color')

        if not tag_name or not tag_color:
            return jsonify({"error": "Tag name and color are required"}), 400

        citation = Citation.query.get(citation_id)
        if not citation:
            return jsonify({"error": "Citation not found"}), 404

        # Check if a tag with this name already exists
        existing_tag = Tag.query.filter_by(name=tag_name).first()
        if existing_tag:
            # If the tag exists, use it
            tag = existing_tag
            # Update the color if it's different
            if tag.color != tag_color:
                tag.color = tag_color
        else:
            # If the tag doesn't exist, create a new one
            tag = Tag(name=tag_name, color=tag_color)
            db.session.add(tag)

        # Add the tag to the citation if it's not already there
        if tag not in citation.tags:
            citation.tags.append(tag)

        db.session.commit()

        return jsonify(tag.to_dict()), 201
    except Exception as e:
        app.logger.error(f"Error adding tag to citation: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to add tag to citation"}), 500

@app.route('/api/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        data = request.json
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({"error": "Tag not found"}), 404

        tag.name = data.get('name', tag.name)
        tag.color = data.get('color', tag.color)

        # Update all citations that use this tag
        citations = Citation.query.filter(Citation.tags.any(id=tag_id)).all()
        for citation in citations:
            for citation_tag in citation.tags:
                if citation_tag.id == tag_id:
                    citation_tag.name = tag.name
                    citation_tag.color = tag.color

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

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = Project.query.all()
        app.logger.info(f"Fetched {len(projects)} projects")
        project_list = [project.to_dict() for project in projects]
        app.logger.info(f"Project list: {project_list}")
        return jsonify(project_list), 200
    except Exception as e:
        app.logger.error(f"Error fetching projects: {str(e)}")
        return jsonify({"error": "Failed to fetch projects"}), 500

@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        data = request.json
        app.logger.info(f"Received project data: {data}")

        # Validate required fields
        if 'title' not in data:
            return jsonify({"error": "Title is required"}), 400
        if 'status' not in data:
            return jsonify({"error": "Status is required"}), 400

        # Convert deadline to date object if provided
        deadline = None
        if 'deadline' in data and data['deadline']:
            try:
                deadline = datetime.fromisoformat(data['deadline'].split('T')[0]).date()
            except ValueError:
                return jsonify({"error": "Invalid date format for deadline. Use YYYY-MM-DD."}), 400

        new_project = Project(
            title=data['title'],
            description=data.get('description', ''),
            status=data['status'],
            deadline=deadline
        )
        db.session.add(new_project)
        db.session.commit()

        app.logger.info(f"Created new project: {new_project.to_dict()}")
        return jsonify(new_project.to_dict()), 201
    except Exception as e:
        app.logger.error(f"Error creating project: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({"error": f"Failed to create project: {str(e)}"}), 500

@app.route('/api/projects/<string:project_id>', methods=['PUT'])
def update_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        data = request.json
        project.title = data.get('title', project.title)
        project.description = data.get('description', project.description)
        project.status = data.get('status', project.status)
        if 'deadline' in data:
            if data['deadline']:
                project.deadline = datetime.fromisoformat(data['deadline'].split('T')[0]).date()
            else:
                project.deadline = None
        
        db.session.commit()
        return jsonify(project.to_dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating project: {str(e)}")
        db.session.rollback()
        return jsonify({"error": f"Failed to update project: {str(e)}"}), 500

@app.route('/api/projects/<string:project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        db.session.delete(project)
        db.session.commit()
        return jsonify({"message": "Project deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting project: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete project"}), 500

@app.route('/api/projects/<string:project_id>/citations', methods=['POST'])
def add_citation_to_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        citation_data = request.json
        citation = Citation.query.get(citation_data['id'])
        if not citation:
            return jsonify({"error": "Citation not found"}), 404
        
        project.citations.append(citation)
        db.session.commit()
        return jsonify(project.to_dict()), 200
    except Exception as e:
        app.logger.error(f"Error adding citation to project: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to add citation to project"}), 500

@app.route('/api/projects/<string:project_id>/citations/<string:citation_id>', methods=['DELETE'])
def remove_citation_from_project(project_id, citation_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        citation = Citation.query.get(citation_id)
        if not citation:
            return jsonify({"error": "Citation not found"}), 404
        
        project.citations.remove(citation)
        db.session.commit()
        return jsonify(project.to_dict()), 200
    except Exception as e:
        app.logger.error(f"Error removing citation from project: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to remove citation from project"}), 500

@app.route('/api/projects/citation-tags', methods=['GET'])
def get_project_citation_tags():
    try:
        projects = Project.query.all()
        project_citation_tags = {}
        for project in projects:
            project_citation_tags[project.id] = [
                {"name": tag.name, "color": tag.color}
                for citation in project.citations
                for tag in citation.tags
            ]
        return jsonify(project_citation_tags), 200
    except Exception as e:
        app.logger.error(f"Error fetching project citation tags: {str(e)}")
        return jsonify({"error": "Failed to fetch project citation tags"}), 500

@app.route('/api/projects/<string:project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        return jsonify(project.to_dict()), 200
    except Exception as e:
        app.logger.error(f"Error fetching project: {str(e)}")
        return jsonify({"error": "Failed to fetch project"}), 500

def init_db():
    with app.app_context():
        db.create_all()
        app.logger.info("Database tables created.")

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
