from typing import List, Optional, Dict, Any
from datetime import datetime
from supabase.client import Client

from models.base import Project
from config.supabase import supabase

class ProjectService:
    def __init__(self, supabase_client: Client = supabase):
        self.supabase = supabase_client

    def get_projects(self) -> List[Project]:
        """
        Retrieve all projects with their citations
        """
        response = self.supabase.table('projects')\
            .select('*, citations(*)')\
            .execute()
        return [Project(**record) for record in response.data]

    def get_project(self, project_id: str) -> Optional[Project]:
        """
        Retrieve a single project by ID with its citations
        """
        response = self.supabase.table('projects')\
            .select('*, citations(*)')\
            .eq('id', project_id)\
            .single()\
            .execute()
        return Project(**response.data) if response.data else None

    def create_project(self, project_data: Dict[str, Any]) -> Project:
        """
        Create a new project
        """
        try:
            # Add user_id to the project data
            project_data_with_user = {
                'title': project_data['title'],
                'description': project_data.get('description'),
                'status': project_data['status'],
                'deadline': project_data.get('deadline'),
                'user_id': project_data.get('user_id')  # Make sure this is passed from the frontend
            }
            
            response = self.supabase.table('projects').insert(project_data_with_user).execute()
            
            if response.error:
                raise Exception(f"Supabase error: {response.error}")
                
            return Project(**response.data[0])
        except Exception as e:
            print(f"Error creating project: {str(e)}")
            raise

    def update_project(
        self, 
        project_id: str, 
        project_data: Dict[str, Any]
    ) -> Project:
        """
        Update an existing project
        """
        try:
            # Ensure we only update allowed fields
            update_data = {
                'title': project_data.get('title'),
                'description': project_data.get('description'),
                'status': project_data.get('status'),
                'deadline': project_data.get('deadline'),
                'updated_at': datetime.utcnow().isoformat()
            }
            
            # Remove None values
            update_data = {k: v for k, v in update_data.items() if v is not None}
            
            # First update the project
            update_response = self.supabase.table('projects')\
                .update(update_data)\
                .eq('id', project_id)\
                .execute()
                
            if not update_response.data:
                raise Exception("Update failed - no data returned")
                
            # Then fetch the updated project
            get_response = self.supabase.table('projects')\
                .select('*')\
                .eq('id', project_id)\
                .single()\
                .execute()
                
            if not get_response.data:
                raise Exception("Failed to fetch updated project")
                
            return Project(**get_response.data)
        except Exception as e:
            print(f"Error updating project: {str(e)}")
            raise

    def delete_project(self, project_id: str) -> None:
        """
        Delete a project and all its citations
        """
        self.supabase.table('projects')\
            .delete()\
            .eq('id', project_id)\
            .execute() 