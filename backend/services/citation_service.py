from typing import List, Optional, Dict, Any
from datetime import datetime
from supabase.client import Client
import os
from dotenv import load_dotenv

from models.base import Citation, Tag
from config.supabase import supabase

load_dotenv()  # Load environment variables

class CitationService:
    def __init__(self, supabase_client: Client = supabase):
        self.supabase = supabase_client
        self._access_token = None
        self.anon_key = os.getenv('SUPABASE_ANON_KEY')  # Get from environment variable

    def set_access_token(self, token: str):
        """Set the access token for Supabase requests"""
        self._access_token = token
        # Instead of using set_session, we'll use the token directly in requests

    def get_citations(
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

    def get_citation(self, citation_id: str) -> Optional[Citation]:
        """
        Retrieve a single citation by ID
        """
        response = self.supabase.table('citations')\
            .select('*, tags(*)')\
            .eq('id', citation_id)\
            .single()\
            .execute()
            
        return Citation(**response.data) if response.data else None

    def create_citation(self, citation_data: Dict[str, Any]) -> Citation:
        """Create a new citation"""
        try:
            print(f"Received citation data: {citation_data}")
            # Extract tags but keep a copy for later
            tags = citation_data.pop('tags', []) if 'tags' in citation_data else []
            
            if self._access_token:
                self.supabase.postgrest.auth(self._access_token)
                
            # Create citation
            response = self.supabase.table('citations')\
                .insert(citation_data)\
                .execute()
                
            print(f"Supabase response: {response}")
            
            if not response.data:
                raise ValueError("No data returned from Supabase")
                
            citation_id = response.data[0]['id']
            
            # Handle tags if present
            if tags:
                tag_associations = []
                for tag in tags:
                    # Handle both Tag objects and dict representations
                    tag_id = tag.get('id') if isinstance(tag, dict) else tag.id
                    if tag_id:
                        tag_associations.append({
                            'citation_id': citation_id,
                            'tag_id': tag_id
                        })
                
                if tag_associations:
                    self.supabase.table('citation_tags')\
                        .insert(tag_associations)\
                        .execute()
            
            # Fetch the complete citation with tags
            return self.get_citation(citation_id)
            
        except Exception as e:
            print(f"Error creating citation: {str(e)}")
            print(f"Citation data: {citation_data}")
            raise

    def update_citation(
        self, 
        citation_id: str, 
        citation_data: Dict[str, Any]
    ) -> Citation:
        """
        Update an existing citation
        """
        try:
            print(f"Updating citation {citation_id} with data: {citation_data}")
            
            # Ensure we have auth token set
            if self._access_token:
                self.supabase.postgrest.auth(self._access_token)
            
            # Extract tags before updating
            tags = citation_data.pop('tags', None)
                
            # Add updated_at timestamp
            citation_data['updated_at'] = datetime.utcnow().isoformat()
            
            # Update citation
            response = self.supabase.table('citations')\
                .update(citation_data)\
                .eq('id', citation_id)\
                .execute()
                
            if not response.data:
                raise ValueError("No data returned from update operation")
                
            # Update tags if provided
            if tags is not None:
                self._remove_citation_tags(citation_id)
                self._update_citation_tags(citation_id, tags)
                
            # Fetch the updated citation with tags
            updated_response = self.supabase.table('citations')\
                .select('*, tags(*)')\
                .eq('id', citation_id)\
                .single()\
                .execute()
                
            if not updated_response.data:
                raise ValueError("Failed to fetch updated citation")
                
            return Citation(**updated_response.data)
            
        except Exception as e:
            print(f"Error in update_citation: {str(e)}")
            print(f"Citation data: {citation_data}")
            raise

    def delete_citation(self, citation_id: str) -> None:
        """
        Delete a citation
        """
        try:
            # Set auth token for this request if available
            if self._access_token:
                self.supabase.postgrest.auth(self._access_token)
            
            # Remove tag associations first
            self._remove_citation_tags(citation_id)
            
            # Delete the citation
            response = self.supabase.table('citations')\
                .delete()\
                .eq('id', citation_id)\
                .execute()
            
            if not response:
                raise ValueError("No response from delete operation")
            
        except Exception as e:
            print(f"Error in delete_citation: {str(e)}")
            raise

    def _update_citation_tags(
        self, 
        citation_id: str, 
        tags: List[Any]  # Changed type hint to Any to handle both Tag objects and dicts
    ) -> None:
        """
        Update the tags associated with a citation
        """
        # Remove existing tag associations
        self._remove_citation_tags(citation_id)
        
        # Add new tag associations
        if tags:
            tag_associations = []
            for tag in tags:
                # Handle both Tag objects and dict representations
                tag_id = tag.get('id') if isinstance(tag, dict) else tag.id
                if tag_id:
                    tag_associations.append({
                        'citation_id': citation_id,
                        'tag_id': tag_id
                    })
            
            if tag_associations:
                self.supabase.table('citation_tags')\
                    .insert(tag_associations)\
                    .execute()

    def _remove_citation_tags(self, citation_id: str) -> None:
        """
        Remove all tag associations for a citation
        """
        self.supabase.table('citation_tags')\
            .delete()\
            .eq('citation_id', citation_id)\
            .execute()

    def bulk_update_order(self, citations: List[Dict[str, Any]]) -> List[Citation]:
        """
        Update the order of multiple citations
        """
        try:
            # Set auth token for this request
            if self._access_token:
                self.supabase.postgrest.auth(self._access_token)
                
            # Prepare updates with minimal data
            updates = []
            for citation in citations:
                # Get the existing citation to preserve all fields
                existing = self.supabase.table('citations')\
                    .select('*')\
                    .eq('id', citation['id'])\
                    .single()\
                    .execute()
                    
                if not existing.data:
                    raise ValueError(f"Citation {citation['id']} not found")
                    
                # Merge existing data with new order
                updated_citation = {
                    **existing.data,  # Preserve all existing fields
                    'order': citation['order'],
                    'updated_at': datetime.utcnow().isoformat()
                }
                updates.append(updated_citation)
                    
            # Use upsert to handle the updates
            response = self.supabase.table('citations')\
                .upsert(
                    updates,
                    returning='representation'
                )\
                .execute()
                    
            if not response.data:
                raise ValueError("No data returned from update operation")
                    
            return [Citation(**record) for record in response.data]
                
        except Exception as e:
            print(f"Error in bulk_update_order: {str(e)}")
            raise Exception(f"Failed to update citation order: {str(e)}")

    def search_citations(
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

    def get_citations_by_tag(
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

    def duplicate_citation(
        self, 
        citation_id: str,
        new_project_id: Optional[str] = None
    ) -> Citation:
        """
        Duplicate a citation, optionally to a different project
        """
        # Get original citation
        original = self.get_citation(citation_id)
        if not original:
            raise ValueError("Citation not found")
            
        # Prepare new citation data
        citation_data = original.dict(exclude={'id', 'created_at', 'updated_at'})
        if new_project_id:
            citation_data['project_id'] = new_project_id
            
        # Create new citation
        return self.create_citation(citation_data) 

    def add_tag_to_citation(self, citation_id: str, tag_id: int) -> None:
        """Add a tag to a citation"""
        self.supabase.table('citation_tags').insert({
            'citation_id': citation_id,
            'tag_id': tag_id
        }).execute()