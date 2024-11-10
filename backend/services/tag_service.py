from typing import List, Optional
from supabase.client import Client

from models.base import Tag
from config.supabase import supabase

class TagService:
    def __init__(self, supabase_client: Client = supabase):
        self.supabase = supabase_client

    async def get_tags(self) -> List[Tag]:
        """
        Retrieve all tags
        """
        response = self.supabase.table('tags').select('*').execute()
        return [Tag(**record) for record in response.data]

    async def create_tag(self, name: str, color: str) -> Tag:
        """
        Create a new tag
        """
        response = self.supabase.table('tags').insert({
            'name': name,
            'color': color
        }).execute()
        return Tag(**response.data[0])

    async def update_tag(self, tag_id: int, name: str, color: str) -> Tag:
        """
        Update an existing tag
        """
        response = self.supabase.table('tags')\
            .update({'name': name, 'color': color})\
            .eq('id', tag_id)\
            .execute()
        return Tag(**response.data[0])

    async def delete_tag(self, tag_id: int) -> None:
        """
        Delete a tag and remove it from all citations
        """
        self.supabase.table('tags').delete().eq('id', tag_id).execute()

    async def get_tags_by_citation(self, citation_id: str) -> List[Tag]:
        """
        Get all tags for a specific citation
        """
        response = self.supabase.table('tags')\
            .select('*')\
            .eq('citation_tags.citation_id', citation_id)\
            .execute()
        return [Tag(**record) for record in response.data] 