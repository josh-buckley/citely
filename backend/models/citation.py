from typing import List, Optional, Dict, Any
from datetime import date, datetime
from supabase.client import Client

from .base import Citation, Tag
from config.supabase import supabase

class CitationService:
    def __init__(self, supabase_client: Client = supabase):
        self.supabase = supabase_client

    async def get_citations(
        self, 
        project_id: Optional[str] = None,
        type: Optional[str] = None,
        order_by: str = "created_at"
    ) -> List[Citation]:
        """
        Retrieve citations with optional filtering by project_id and type
        """
        query = self.supabase.table('citations').select('*, tags(*)')
        
        if project_id:
            query = query.eq('project_id', project_id)
        if type:
            query = query.eq('type', type)
            
        query = query.order(order_by)
        
        response = query.execute()
        return [Citation(**record) for record in response.data]

    async def get_citation(self, citation_id: str) -> Optional[Citation]:
        """
        Retrieve a single citation by ID
        """
        response = self.supabase.table('citations')\
            .select('*, tags(*)')\
            .eq('id', citation_id)\
            .single()\
            .execute()
            
        return Citation(**response.data) if response.data else None

    async def create_citation(self, citation_data: Dict[str, Any]) -> Citation:
        """
        Create a new citation
        """
        # Extract tags before creating citation
        tags = citation_data.pop('tags', [])
        
        # Create citation
        response = self.supabase.table('citations')\
            .insert(citation_data)\
            .execute()
            
        citation = Citation(**response.data[0])
        
        # Add tags if present
        if tags:
            await self._update_citation_tags(citation.id, tags)
            citation.tags = tags
            
        return citation

    async def update_citation(
        self, 
        citation_id: str, 
        citation_data: Dict[str, Any]
    ) -> Citation:
        """
        Update an existing citation
        """
        # Extract tags before updating
        tags = citation_data.pop('tags', None)
        
        # Update citation
        response = self.supabase.table('citations')\
            .update(citation_data)\
            .eq('id', citation_id)\
            .execute()
            
        citation = Citation(**response.data[0])
        
        # Update tags if provided
        if tags is not None:
            await self._update_citation_tags(citation_id, tags)
            citation.tags = tags
            
        return citation

    async def delete_citation(self, citation_id: str) -> None:
        """
        Delete a citation
        """
        # Remove tag associations first
        await self._remove_citation_tags(citation_id)
        
        # Delete the citation
        self.supabase.table('citations')\
            .delete()\
            .eq('id', citation_id)\
            .execute()

    async def _update_citation_tags(
        self, 
        citation_id: str, 
        tags: List[Tag]
    ) -> None:
        """
        Update the tags associated with a citation
        """
        # Remove existing tag associations
        await self._remove_citation_tags(citation_id)
        
        # Add new tag associations
        if tags:
            tag_associations = [
                {'citation_id': citation_id, 'tag_id': tag.id}
                for tag in tags
            ]
            self.supabase.table('citation_tags')\
                .insert(tag_associations)\
                .execute()

    async def _remove_citation_tags(self, citation_id: str) -> None:
        """
        Remove all tag associations for a citation
        """
        self.supabase.table('citation_tags')\
            .delete()\
            .eq('citation_id', citation_id)\
            .execute()

    async def bulk_update_order(
        self, 
        citations: List[Dict[str, Any]]
    ) -> List[Citation]:
        """
        Update the order of multiple citations
        """
        updates = []
        for citation in citations:
            updates.append({
                'id': citation['id'],
                'order': citation['order']
            })
            
        response = self.supabase.table('citations')\
            .upsert(updates)\
            .execute()
            
        return [Citation(**record) for record in response.data]

    async def search_citations(
        self,
        search_term: str,
        project_id: Optional[str] = None,
        type: Optional[str] = None
    ) -> List[Citation]:
        """
        Search citations by title, notes, or other relevant fields
        """
        query = self.supabase.table('citations')\
            .select('*, tags(*)')\
            .or_(
                f'title.ilike.%{search_term}%,'
                f'notes.ilike.%{search_term}%,'
                f'formatted_citation.ilike.%{search_term}%'
            )
            
        if project_id:
            query = query.eq('project_id', project_id)
        if type:
            query = query.eq('type', type)
            
        response = query.execute()
        return [Citation(**record) for record in response.data]

    async def get_citations_by_tag(
        self, 
        tag_id: int,
        project_id: Optional[str] = None
    ) -> List[Citation]:
        """
        Get all citations with a specific tag
        """
        query = self.supabase.table('citations')\
            .select('*, tags(*)')\
            .eq('citation_tags.tag_id', tag_id)
            
        if project_id:
            query = query.eq('project_id', project_id)
            
        response = query.execute()
        return [Citation(**record) for record in response.data]

    async def duplicate_citation(
        self, 
        citation_id: str,
        new_project_id: Optional[str] = None
    ) -> Citation:
        """
        Duplicate a citation, optionally to a different project
        """
        # Get original citation
        original = await self.get_citation(citation_id)
        if not original:
            raise ValueError("Citation not found")
            
        # Prepare new citation data
        citation_data = original.dict(exclude={'id', 'created_at', 'updated_at'})
        if new_project_id:
            citation_data['project_id'] = new_project_id
            
        # Create new citation
        return await self.create_citation(citation_data) 