from typing import List, Optional
from supabase.client import Client

from models.base import Tag
from config.supabase import supabase

class TagService:
    def __init__(self, supabase_client: Client = supabase):
        self.supabase = supabase_client

    def get_tags(self) -> List[Tag]:
        """
        Retrieve all tags
        """
        response = self.supabase.table('tags').select('*').execute()
        return [Tag(**record) for record in response.data]

    def create_tag(self, name: str, color: str) -> Tag:
        """
        Create a new tag
        """
        response = self.supabase.table('tags').insert({
            'name': name,
            'color': color
        }).execute()
        return Tag(**response.data[0])

    def update_tag(self, tag_id: int, update_data: dict) -> Tag:
        """
        Update a tag's properties. Changes will reflect across all citations using this tag.
        
        Args:
            tag_id (int): The ID of the tag to update
            update_data (dict): Dictionary containing the update data. Can include 'name' and/or 'color'
            
        Returns:
            Tag: The updated tag object
        """
        try:
            print(f"Starting tag update for tag_id: {tag_id}")
            print(f"Update data: {update_data}")
            
            # Only include fields that are provided in the update
            update_fields = {}
            if 'name' in update_data:
                update_fields['name'] = update_data['name']
            if 'color' in update_data:
                update_fields['color'] = update_data['color']
            
            if not update_fields:
                raise ValueError("No valid update fields provided")
            
            # Update the tag in the tags table - this will affect all citations using this tag
            response = self.supabase.table('tags')\
                .update(update_fields)\
                .eq('id', tag_id)\
                .execute()
                
            print(f"Supabase response: {response}")
            
            if not response.data:
                raise Exception("No data returned from update")
            
            updated_tag = Tag(**response.data[0])
            print(f"Successfully updated tag: {updated_tag}")
            return updated_tag
            
        except Exception as e:
            print(f"Error in update_tag: {str(e)}")
            raise

    def delete_tag(self, tag_id: int) -> None:
        """
        Delete a tag and remove it from all citations
        """
        self.supabase.table('tags').delete().eq('id', tag_id).execute()

    def get_tags_by_citation(self, citation_id: str) -> List[Tag]:
        """
        Get all tags for a specific citation
        """
        response = self.supabase.table('tags')\
            .select('tags.*')\
            .join('citation_tags', 'tags.id=citation_tags.tag_id')\
            .eq('citation_tags.citation_id', citation_id)\
            .execute()
        return [Tag(**record) for record in response.data]

    def create_tag_for_citation(self, citation_id: str, name: str, color: str) -> Tag:
        """
        Create a new tag or get existing tag and associate it with a citation
        """
        try:
            # Normalize the name
            normalized_name = name.strip().lower()
            print(f"Checking for existing tag: '{normalized_name}'")
            
            # First try to find an existing tag
            existing_tag = self.get_tag_by_name(normalized_name)
            
            if existing_tag:
                print(f"Found existing tag: {existing_tag}")
                tag = existing_tag
            else:
                print(f"Creating new tag with name: '{name}'")
                # Create new tag
                response = self.supabase.table('tags')\
                    .insert({'name': name, 'color': color})\
                    .execute()
                tag = Tag(**response.data[0])
                print(f"Created new tag: {tag}")
            
            # Create the association in citation_tags
            print(f"Creating association between citation {citation_id} and tag {tag.id}")
            self.supabase.table('citation_tags')\
                .insert({
                    'citation_id': citation_id,
                    'tag_id': tag.id
                })\
                .execute()
            
            return tag
        except Exception as e:
            print(f"Error in create_tag_for_citation: {str(e)}")
            raise

    def remove_tag_from_citation(self, citation_id: str, tag_id: int) -> None:
        """
        Remove tag association from a citation and delete tag if it's the last instance
        """
        try:
            print(f"Removing tag {tag_id} from citation {citation_id}")
            
            # First, check how many citations use this tag
            count_response = self.supabase.table('citation_tags')\
                .select('*', count='exact')\
                .eq('tag_id', tag_id)\
                .execute()
                
            total_uses = len(count_response.data)
            
            # Remove the association
            self.supabase.table('citation_tags')\
                .delete()\
                .eq('citation_id', citation_id)\
                .eq('tag_id', tag_id)\
                .execute()
                
            # If this was the last use of the tag, delete the tag itself
            if total_uses <= 1:
                print(f"Deleting tag {tag_id} as it's no longer used")
                self.supabase.table('tags')\
                    .delete()\
                    .eq('id', tag_id)\
                    .execute()
                
        except Exception as e:
            print(f"Error in remove_tag_from_citation: {str(e)}")
            raise

    def get_tag(self, tag_id: int) -> Optional[Tag]:
        """
        Get a single tag by ID
        """
        try:
            response = self.supabase.table('tags')\
                .select('*')\
                .eq('id', tag_id)\
                .execute()
                
            if response.data:
                return Tag(**response.data[0])
            return None
        except Exception as e:
            print(f"Error getting tag: {str(e)}")
            raise

    def get_tag_by_name(self, name: str) -> Optional[Tag]:
        """
        Get a tag by its name (exact match, case insensitive)
        """
        try:
            # Normalize the name: trim whitespace and convert to lowercase
            normalized_name = name.strip().lower()
            print(f"Looking for tag with normalized name: '{normalized_name}'")
            
            response = self.supabase.table('tags')\
                .select('*')\
                .filter('name', 'ilike', normalized_name)\
                .execute()
            
            print(f"Found tags: {response.data}")
            
            if response.data:
                return Tag(**response.data[0])
            return None
        except Exception as e:
            print(f"Error getting tag by name: {str(e)}")
            raise