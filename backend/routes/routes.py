from flask import jsonify, request, make_response
from functools import wraps
import jwt
from config.supabase import supabase
from services.tag_service import TagService
from services.citation_service import CitationService
from services.project_service import ProjectService
from services.tag_service import TagService

# Initialize tag service
tag_service = TagService()


def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        print("Checking authorization header...")
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            print("No authorization header found")
            return jsonify({'message': 'No authorization header'}), 401
            
        try:
            print("Authorization header found:", auth_header[:20] + "...")
            token = auth_header.split(' ')[1]
            # Verify the JWT token with Supabase
            print("Verifying token with Supabase...")
            user = supabase.auth.get_user(token)
            print("User verified:", user.id)
            request.user_id = user.id
            return f(*args, **kwargs)
        except Exception as e:
            print("Auth error:", str(e))
            return jsonify({'message': f'Invalid token: {str(e)}'}), 401
            
    return decorated

@app.route('/api/projects', methods=['POST'])
@require_auth
def create_project():
    try:
        project_data = request.json
        project_data['user_id'] = request.user_id  # Add user_id from the authenticated request
        
        project_service = ProjectService()
        project = project_service.create_project(project_data)
        
        return jsonify(project.dict())
    except Exception as e:
        app.logger.error(f"Error creating project: {str(e)}")
        return jsonify({'error': str(e)}), 500 

@app.route('/api/citations', methods=['POST'])
@require_auth
def create_citation():
    try:
        print("Creating citation...")
        citation_data = request.json
        print("Citation data:", citation_data)
        
        # Add user_id to citation data
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        user = supabase.auth.get_user(token)
        citation_data['user_id'] = user.id
        
        citation_service = CitationService()
        citation_service.set_access_token(token)
        
        citation = citation_service.create_citation(citation_data)
        print("Citation created successfully")
        return jsonify(citation.dict())
    except Exception as e:
        print("Error creating citation:", str(e))
        return jsonify({'error': str(e)}), 500 

@app.route('/api/citations/<string:citation_id>/tags', methods=['POST'])
@require_auth
def add_tag_to_citation(citation_id):
    try:
        print("Adding tag to citation...")
        tag_data = request.json
        print(f"Received request to add tag: {tag_data}")
        
        # Check if tag exists
        existing_tags = tag_service.get_tags()
        print(f"Checking for existing tag: '{tag_data['name'].lower()}'")
        print(f"Looking for tag with normalized name: '{tag_data['name'].lower()}'")
        matching_tags = [tag for tag in existing_tags if tag.name.lower() == tag_data['name'].lower()]
        print(f"Found tags: {[{'id': t.id, 'name': t.name, 'color': t.color, 'created_at': t.created_at, 'updated_at': t.updated_at} for t in matching_tags]}")
        
        if matching_tags:
            tag = matching_tags[0]
            print(f"Found existing tag: id={tag.id} name='{tag.name}' color='{tag.color}'")
        else:
            # Create new tag if it doesn't exist
            tag = tag_service.create_tag(
                name=tag_data['name'],
                color=tag_data['color']
            )
            print(f"Created new tag: id={tag.id} name='{tag.name}' color='{tag.color}'")
        
        # Create citation-tag association
        citation_service = CitationService()
        citation = citation_service.get_citation(citation_id)
        if not citation:
            return jsonify({'error': 'Citation not found'}), 404
        
        print(f"Creating association between citation {citation_id} and tag {tag.id}")
        try:
            # Check if the association already exists
            existing_associations = citation_service.get_citation_tag_associations(citation_id)
            if tag.id in [assoc['tag_id'] for assoc in existing_associations]:
                print(f"Association between citation {citation_id} and tag {tag.id} already exists")
                return jsonify(tag.dict())
                
            # Create the association
            citation_service.create_tag_for_citation(citation_id, tag.id)
            print(f"Successfully created association between citation {citation_id} and tag {tag.id}")
            return jsonify(tag.dict())
            
        except Exception as e:
            print(f"Error in create_tag_for_citation: {str(e)}")
            raise
            
    except Exception as e:
        print("Error adding tag:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/api/citations/<string:citation_id>/tags/<string:tag_id>', methods=['DELETE', 'OPTIONS'])
@require_auth
def remove_tag_from_citation(citation_id, tag_id):
    print(f"Received request to remove tag {tag_id} from citation {citation_id}")
    print(f"Request method: {request.method}")
    print(f"Request headers: {dict(request.headers)}")
    
    if request.method == 'OPTIONS':
        print("Handling OPTIONS request")
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'DELETE,OPTIONS')
        return response
        
    try:
        print(f"Converting tag_id {tag_id} to integer")
        tag_id_int = int(tag_id)
        print(f"Calling tag_service.remove_tag_from_citation with {citation_id}, {tag_id_int}")
        tag_service.remove_tag_from_citation(citation_id, tag_id_int)
        print("Tag removed successfully")
        
        response = jsonify({'success': True})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
        
    except Exception as e:
        print(f"Error in remove_tag_from_citation: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/tags/<int:tag_id>', methods=['PUT', 'OPTIONS'])
@require_auth
def update_tag(tag_id):
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'PUT,OPTIONS')
        return response

    try:
        print(f"Received update request for tag {tag_id}")
        print(f"Request data: {request.json}")
        
        tag_data = request.json
        if not tag_data:
            return jsonify({'error': 'No update data provided'}), 400

        # Get existing tag first
        existing_tag = tag_service.get_tag(tag_id)
        if not existing_tag:
            return jsonify({'error': 'Tag not found'}), 404

        # Merge existing data with updates
        update_data = {
            'name': tag_data.get('name', existing_tag.name),
            'color': tag_data.get('color', existing_tag.color)
        }

        updated_tag = tag_service.update_tag(tag_id, update_data)
        return jsonify(updated_tag.dict()), 200
        
    except Exception as e:
        print(f"Error updating tag: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/citations/reorder', methods=['PUT', 'OPTIONS'])
@require_auth
def reorder_citations():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'PUT,OPTIONS')
        return response

    try:
        print("Reordering citations...")
        citations_data = request.json
        
        # Get auth token and set it in the citation service
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        
        citation_service = CitationService()
        citation_service.set_access_token(token)
        
        updated_citations = citation_service.bulk_update_order(citations_data)
        return jsonify([citation.dict() for citation in updated_citations]), 200
        
    except Exception as e:
        print(f"Error reordering citations: {str(e)}")
        return jsonify({'error': str(e)}), 500