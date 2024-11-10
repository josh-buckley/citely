from typing import List, Optional, Dict, Any
from datetime import datetime
from supabase.client import Client

from models.base import Project
from config.supabase import supabase

class ProjectService:
    def __init__(self, supabase_client: Client = supabase):
        self.supabase = supabase_client

    async def get_projects(self) -> List[Project]:
        """
        Retrieve all projects with their citations
        """
        response = self.supabase.table('projects')\
            .select('*, citations(*)')\
            .execute()
        return [Project(**record) for record in response.data]

    async def get_project(self, project_id: str) -> Optional[Project]:
        """
        Retrieve a single project by ID with its citations
        """
        response = self.supabase.table('projects')\
            .select('*, citations(*)')\
            .eq('id', project_id)\
            .single()\
            .execute()
        return Project(**response.data) if response.data else None

    async def create_project(self, project_data: Dict[str, Any]) -> Project:
        """
        Create a new project
        """
        response = self.supabase.table('projects').insert({
            'title': project_data['title'],
            'description': project_data.get('description'),
            'status': project_data['status'],
            'deadline': project_data.get('deadline')
        }).execute()
        return Project(**response.data[0])

    async def update_project(
        self, 
        project_id: str, 
        project_data: Dict[str, Any]
    ) -> Project:
        """
        Update an existing project
        """
        response = self.supabase.table('projects')\
            .update(project_data)\
            .eq('id', project_id)\
            .execute()
        return Project(**response.data[0])

    async def delete_project(self, project_id: str) -> None:
        """
        Delete a project and all its citations
        """
        self.supabase.table('projects')\
            .delete()\
            .eq('id', project_id)\
            .execute() 