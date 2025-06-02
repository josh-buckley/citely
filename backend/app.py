from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from services import CitationService, ProjectService, TagService
from models.base import Citation, Project, Tag
from utils.formatcitation import AGLC4Citation
from utils.citation_extractor import CitationExtractor
from dotenv import load_dotenv
import os
from datetime import datetime
from functools import wraps
import jwt
from supabase import create_client

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"],
        "supports_credentials": True
    }
})

# Initialize services
citation_service = CitationService()
project_service = ProjectService()
tag_service = TagService()
citation_extractor = CitationExtractor()

# Initialize AGLC4 formatter
aglc_formatter = AGLC4Citation()

# Initialize Supabase client
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_ANON_KEY"))

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Invalid authorization header"}), 401
            
        try:
            token = auth_header.split(' ')[1]
            # Set the token in the citation service
            citation_service.set_access_token(token)
            return f(*args, **kwargs)
        except Exception as e:
            app.logger.error(f"Authentication error: {str(e)}")
            return jsonify({"error": "Invalid token"}), 401
            
    return decorated

# Citation routes
@app.route('/api/citations', methods=['GET'])
def get_citations():
    try:
        project_id = request.args.get('project_id')
        citation_type = request.args.get('type')
        citations = citation_service.get_citations(
            project_id=project_id,
            type=citation_type
        )
        return jsonify([citation.dict() for citation in citations]), 200
    except Exception as e:
        app.logger.error(f"Error fetching citations: {str(e)}")
        return jsonify({"error": "Failed to fetch citations"}), 500

@app.route('/api/citations', methods=['POST'])
@require_auth
def create_citation():
    try:
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        
        print("Received request data:", request.json)
        print("Auth token present:", bool(token))
        
        citation_service.set_access_token(token)
        data = request.json
        
        if 'project_id' not in data:
            print("Missing project_id in data")
            return jsonify({"error": "project_id is required"}), 400

        try:
            citation_type = data['type'].lower()
            formatted_citation = aglc_formatter.format_citation(citation_type, **data)
            data['formatted_citation'] = formatted_citation
        except KeyError as e:
            print(f"Missing required field: {str(e)}")
            return jsonify({"error": f"Missing required field: {str(e)}"}), 400
        except Exception as e:
            print(f"Citation formatting error: {str(e)}")
            return jsonify({"error": f"Error formatting citation: {str(e)}"}), 400

        citation = citation_service.create_citation(data)
        return jsonify(citation.dict()), 201
    except Exception as e:
        print(f"Detailed error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/citations/<string:citation_id>', methods=['PUT'])
@require_auth
def update_citation(citation_id):
    try:
        data = request.json
        
        # Format citation using AGLC4 if necessary fields changed
        format_fields = ['type', 'title', 'year', 'authors', 'journal']
        if any(field in data for field in format_fields):
            citation = citation_service.get_citation(citation_id)
            citation_data = {**citation.dict(), **data}
            try:
                citation_type = citation_data['type'].lower()
                formatted_citation = aglc_formatter.format_citation(citation_type, **citation_data)
                data['formatted_citation'] = formatted_citation
            except Exception as e:
                app.logger.error(f"Error formatting citation: {str(e)}")
                return jsonify({"error": f"Error formatting citation: {str(e)}"}), 400

        # Get auth token from decorator
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        citation_service.set_access_token(token)

        updated_citation = citation_service.update_citation(citation_id, data)
        return jsonify(updated_citation.dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating citation: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/citations/<string:citation_id>', methods=['DELETE'])
@require_auth
def delete_citation(citation_id):
    try:
        # Get and set the auth token
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        citation_service.set_access_token(token)
        
        # Attempt deletion
        citation_service.delete_citation(citation_id)
        
        # Log the deletion attempt
        app.logger.info(f"Citation {citation_id} deleted successfully")
        return jsonify({"message": "Citation deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting citation: {str(e)}")
        return jsonify({"error": f"Failed to delete citation: {str(e)}"}), 500

@app.route('/api/citations/reorder', methods=['PUT'])
@require_auth
def reorder_citations():
    try:
        # Get the auth token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Invalid authorization header"}), 401
            
        token = auth_header.split(' ')[1]
        
        # Set the token in the citation service
        citation_service.set_access_token(token)
        
        # Log the request data for debugging
        print("Reorder request data:", request.json)
        
        citations_data = request.json
        if not citations_data:
            return jsonify({"error": "No citation data provided"}), 400
            
        updated_citations = citation_service.bulk_update_order(citations_data)
        return jsonify([citation.dict() for citation in updated_citations]), 200
    except Exception as e:
        app.logger.error(f"Error reordering citations: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/citations/search', methods=['GET'])
def search_citations():
    try:
        search_term = request.args.get('q')
        project_id = request.args.get('project_id')
        citation_type = request.args.get('type')
        
        if not search_term:
            return jsonify({"error": "Search term is required"}), 400
            
        citations = citation_service.search_citations(
            search_term=search_term,
            project_id=project_id,
            type=citation_type
        )
        return jsonify([citation.dict() for citation in citations]), 200
    except Exception as e:
        app.logger.error(f"Error searching citations: {str(e)}")
        return jsonify({"error": "Failed to search citations"}), 500

@app.route('/api/citations/extract', methods=['POST'])
@require_auth
def extract_citation():
    """
    Extract citation details from pasted text
    """
    try:
        data = request.json
        if not data or 'source_type' not in data or 'text' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        source_type = data['source_type']
        text = data['text']

        # Extract citation details
        try:
            citation_type, extracted_fields = citation_extractor.extract_citation(source_type, text)
            return jsonify({
                "citation_type": citation_type,
                "fields": extracted_fields
            })
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            app.logger.error(f"Citation extraction error: {str(e)}")
            return jsonify({"error": "Failed to extract citation details"}), 500

    except Exception as e:
        app.logger.error(f"Error in extract_citation: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# Project routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = project_service.get_projects()
        return jsonify([project.dict() for project in projects]), 200
    except Exception as e:
        app.logger.error(f"Error fetching projects: {str(e)}")
        return jsonify({"error": "Failed to fetch projects"}), 500

@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        project = project_service.create_project(request.json)
        return jsonify(project.dict()), 201
    except Exception as e:
        app.logger.error(f"Error creating project: {str(e)}")
        return jsonify({"error": "Failed to create project"}), 500

@app.route('/api/projects/<string:project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = project_service.get_project(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        return jsonify(project.dict()), 200
    except Exception as e:
        app.logger.error(f"Error fetching project: {str(e)}")
        return jsonify({"error": "Failed to fetch project"}), 500

@app.route('/api/projects/<string:project_id>', methods=['PUT'])
def update_project(project_id):
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No update data provided'}), 400

        project = project_service.update_project(project_id, data)
        return jsonify(project.dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating project: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/projects/<string:project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        project_service.delete_project(project_id)
        return jsonify({"message": "Project deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting project: {str(e)}")
        return jsonify({"error": "Failed to delete project"}), 500

# Tag routes
@app.route('/api/tags', methods=['GET'])
def get_tags():
    try:
        tags = tag_service.get_tags()
        return jsonify([tag.dict() for tag in tags]), 200
    except Exception as e:
        app.logger.error(f"Error fetching tags: {str(e)}")
        return jsonify({"error": "Failed to fetch tags"}), 500

@app.route('/api/tags', methods=['POST'])
def create_tag():
    try:
        data = request.json
        tag = tag_service.create_tag(
            name=data['name'],
            color=data['color']
        )
        return jsonify(tag.dict()), 201
    except Exception as e:
        app.logger.error(f"Error creating tag: {str(e)}")
        return jsonify({"error": "Failed to create tag"}), 500

@app.route('/api/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No update data provided'}), 400

        # Pass the entire data dictionary to update_tag
        tag = tag_service.update_tag(
            tag_id=tag_id,
            update_data=data  # <-- Fix: Pass the entire data dictionary
        )
        return jsonify(tag.dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating tag: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    try:
        tag_service.delete_tag(tag_id)
        return jsonify({"message": "Tag deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting tag: {str(e)}")
        return jsonify({"error": "Failed to delete tag"}), 500

@app.route('/api/citations/<string:citation_id>/tags', methods=['GET'])
def get_citation_tags(citation_id):
    try:
        tags = tag_service.get_tags_by_citation(citation_id)
        return jsonify([tag.dict() for tag in tags]), 200
    except Exception as e:
        app.logger.error(f"Error fetching citation tags: {str(e)}")
        return jsonify({"error": "Failed to fetch citation tags"}), 500

# Add this new route for project-specific citations
@app.route('/api/projects/<string:project_id>/citations', methods=['GET'])
def get_project_citations(project_id):
    try:
        citations = citation_service.get_citations(project_id=project_id)
        return jsonify([citation.dict() for citation in citations]), 200
    except Exception as e:
        app.logger.error(f"Error fetching citations for project {project_id}: {str(e)}")
        return jsonify({"error": "Failed to fetch project citations"}), 500

@app.route('/api/citations/<string:citation_id>/tags', methods=['POST'])
@require_auth
def add_citation_tag(citation_id):
    try:
        data = request.json
        print(f"Received request to add tag: {data}")
        
        tag = tag_service.create_tag_for_citation(
            citation_id=citation_id,
            name=data['name'],
            color=data['color']
        )
        
        print(f"Successfully added tag: {tag.dict()}")
        return jsonify(tag.dict()), 201
    except Exception as e:
        print(f"Error adding tag: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Add error handler
@app.errorhandler(Exception)
def handle_error(error):
    print(f"Unhandled error: {str(error)}")
    return jsonify({"error": str(error)}), 500

@app.route('/api/citations/<string:citation_id>/tags/<int:tag_id>', methods=['DELETE', 'OPTIONS'])
def remove_tag_from_citation(citation_id, tag_id):
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'DELETE,OPTIONS')
        return response
        
    # Only require auth for the actual DELETE request
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Invalid authorization header"}), 401

    try:
        token = auth_header.split(' ')[1]
        tag_service.remove_tag_from_citation(citation_id, tag_id)
        return jsonify({'success': True}), 200
    except Exception as e:
        app.logger.error(f"Error removing tag: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
