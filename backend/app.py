from flask import Flask, jsonify, request
from flask_cors import CORS
from services import CitationService, ProjectService, TagService
from models.base import Citation, Project, Tag
from utils.formatcitation import AGLC4Citation
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize services
citation_service = CitationService()
project_service = ProjectService()
tag_service = TagService()

# Initialize AGLC4 formatter
aglc_formatter = AGLC4Citation()

# Citation routes
@app.route('/api/citations', methods=['GET'])
async def get_citations():
    try:
        project_id = request.args.get('projectId')
        citation_type = request.args.get('type')
        citations = await citation_service.get_citations(
            project_id=project_id,
            type=citation_type
        )
        return jsonify([citation.dict() for citation in citations]), 200
    except Exception as e:
        app.logger.error(f"Error fetching citations: {str(e)}")
        return jsonify({"error": "Failed to fetch citations"}), 500

@app.route('/api/citations', methods=['POST'])
async def create_citation():
    try:
        data = request.json
        
        # Format citation using AGLC4
        try:
            citation_type = data['type'].lower()
            formatted_citation = aglc_formatter.format_citation(citation_type, **data)
            data['formatted_citation'] = formatted_citation
        except Exception as e:
            app.logger.error(f"Error formatting citation: {str(e)}")
            return jsonify({"error": f"Error formatting citation: {str(e)}"}), 400

        citation = await citation_service.create_citation(data)
        return jsonify(citation.dict()), 201
    except Exception as e:
        app.logger.error(f"Error creating citation: {str(e)}")
        return jsonify({"error": "Failed to create citation"}), 500

@app.route('/api/citations/<string:citation_id>', methods=['PUT'])
async def update_citation(citation_id):
    try:
        data = request.json
        
        # Format citation using AGLC4 if necessary fields changed
        format_fields = ['type', 'title', 'year', 'authors', 'journal']
        if any(field in data for field in format_fields):
            citation = await citation_service.get_citation(citation_id)
            citation_data = {**citation.dict(), **data}
            try:
                citation_type = citation_data['type'].lower()
                formatted_citation = aglc_formatter.format_citation(citation_type, **citation_data)
                data['formatted_citation'] = formatted_citation
            except Exception as e:
                app.logger.error(f"Error formatting citation: {str(e)}")
                return jsonify({"error": f"Error formatting citation: {str(e)}"}), 400

        updated_citation = await citation_service.update_citation(citation_id, data)
        return jsonify(updated_citation.dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating citation: {str(e)}")
        return jsonify({"error": "Failed to update citation"}), 500

@app.route('/api/citations/<string:citation_id>', methods=['DELETE'])
async def delete_citation(citation_id):
    try:
        await citation_service.delete_citation(citation_id)
        return jsonify({"message": "Citation deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting citation: {str(e)}")
        return jsonify({"error": "Failed to delete citation"}), 500

@app.route('/api/citations/reorder', methods=['PUT'])
async def reorder_citations():
    try:
        citations_data = request.json
        updated_citations = await citation_service.bulk_update_order(citations_data)
        return jsonify([citation.dict() for citation in updated_citations]), 200
    except Exception as e:
        app.logger.error(f"Error reordering citations: {str(e)}")
        return jsonify({"error": "Failed to reorder citations"}), 500

@app.route('/api/citations/search', methods=['GET'])
async def search_citations():
    try:
        search_term = request.args.get('q')
        project_id = request.args.get('projectId')
        citation_type = request.args.get('type')
        
        if not search_term:
            return jsonify({"error": "Search term is required"}), 400
            
        citations = await citation_service.search_citations(
            search_term=search_term,
            project_id=project_id,
            type=citation_type
        )
        return jsonify([citation.dict() for citation in citations]), 200
    except Exception as e:
        app.logger.error(f"Error searching citations: {str(e)}")
        return jsonify({"error": "Failed to search citations"}), 500

# Project routes
@app.route('/api/projects', methods=['GET'])
async def get_projects():
    try:
        projects = await project_service.get_projects()
        return jsonify([project.dict() for project in projects]), 200
    except Exception as e:
        app.logger.error(f"Error fetching projects: {str(e)}")
        return jsonify({"error": "Failed to fetch projects"}), 500

@app.route('/api/projects', methods=['POST'])
async def create_project():
    try:
        project = await project_service.create_project(request.json)
        return jsonify(project.dict()), 201
    except Exception as e:
        app.logger.error(f"Error creating project: {str(e)}")
        return jsonify({"error": "Failed to create project"}), 500

@app.route('/api/projects/<string:project_id>', methods=['GET'])
async def get_project(project_id):
    try:
        project = await project_service.get_project(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404
        return jsonify(project.dict()), 200
    except Exception as e:
        app.logger.error(f"Error fetching project: {str(e)}")
        return jsonify({"error": "Failed to fetch project"}), 500

@app.route('/api/projects/<string:project_id>', methods=['PUT'])
async def update_project(project_id):
    try:
        project = await project_service.update_project(project_id, request.json)
        return jsonify(project.dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating project: {str(e)}")
        return jsonify({"error": "Failed to update project"}), 500

@app.route('/api/projects/<string:project_id>', methods=['DELETE'])
async def delete_project(project_id):
    try:
        await project_service.delete_project(project_id)
        return jsonify({"message": "Project deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting project: {str(e)}")
        return jsonify({"error": "Failed to delete project"}), 500

# Tag routes
@app.route('/api/tags', methods=['GET'])
async def get_tags():
    try:
        tags = await tag_service.get_tags()
        return jsonify([tag.dict() for tag in tags]), 200
    except Exception as e:
        app.logger.error(f"Error fetching tags: {str(e)}")
        return jsonify({"error": "Failed to fetch tags"}), 500

@app.route('/api/tags', methods=['POST'])
async def create_tag():
    try:
        data = request.json
        tag = await tag_service.create_tag(
            name=data['name'],
            color=data['color']
        )
        return jsonify(tag.dict()), 201
    except Exception as e:
        app.logger.error(f"Error creating tag: {str(e)}")
        return jsonify({"error": "Failed to create tag"}), 500

@app.route('/api/tags/<int:tag_id>', methods=['PUT'])
async def update_tag(tag_id):
    try:
        data = request.json
        tag = await tag_service.update_tag(
            tag_id=tag_id,
            name=data['name'],
            color=data['color']
        )
        return jsonify(tag.dict()), 200
    except Exception as e:
        app.logger.error(f"Error updating tag: {str(e)}")
        return jsonify({"error": "Failed to update tag"}), 500

@app.route('/api/tags/<int:tag_id>', methods=['DELETE'])
async def delete_tag(tag_id):
    try:
        await tag_service.delete_tag(tag_id)
        return jsonify({"message": "Tag deleted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error deleting tag: {str(e)}")
        return jsonify({"error": "Failed to delete tag"}), 500

@app.route('/api/citations/<string:citation_id>/tags', methods=['GET'])
async def get_citation_tags(citation_id):
    try:
        tags = await tag_service.get_tags_by_citation(citation_id)
        return jsonify([tag.dict() for tag in tags]), 200
    except Exception as e:
        app.logger.error(f"Error fetching citation tags: {str(e)}")
        return jsonify({"error": "Failed to fetch citation tags"}), 500

if __name__ == '__main__':
    app.run(debug=True)
