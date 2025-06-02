import axios from 'axios';
import { Citation, Tag } from '../types/citation';
import { Project } from '../types/project';
import { supabase } from '../lib/supabase';

const API_URL = 'http://127.0.0.1:5000/api';

// Add authentication header to all requests
axios.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export const fetchCitations = async (project_id?: string): Promise<Citation[]> => {
  try {
    console.log('Fetching citations for project:', project_id);
    let url = project_id 
      ? `${API_URL}/citations?project_id=${project_id}`
      : `${API_URL}/citations`;
    
    const response = await fetch(url);
    console.log('Response received:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Citations data:', data);
    return data.map((citation: any) => ({
      ...citation,
      project_id: citation.project_id,
      authors: Array.isArray(citation.authors) ? citation.authors : citation.authors ? [citation.authors] : [],
      editors: Array.isArray(citation.editors) ? citation.editors : citation.editors ? [citation.editors] : [],
      tags: citation.tags || []
    }));
  } catch (error) {
    console.error('Error fetching citations:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch citations: ${error.message}`);
    } else {
      throw new Error('Failed to fetch citations: Unknown error');
    }
  }
};

export const reorderCitations = async (citations: Citation[]): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.put(
      `${API_URL}/citations/reorder`,
      citations,
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data) {
      throw new Error('Failed to reorder citations');
    }
  } catch (error) {
    console.error('Error reordering citations:', error);
    throw error;
  }
};

export const updateCitation = async (citation: Citation): Promise<Citation> => {
  try {
    const response = await axios.put(`${API_URL}/citations/${citation.id}`, {
      ...citation,
      project_id: citation.project_id,
      source: citation.source ?? null,  
      editors: Array.isArray(citation.editors) ? citation.editors : citation.editors ? [citation.editors] : [],
      tags: citation.tags?.map(tag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color
      })) || [],
      notes: citation.notes || null
    });
    return response.data;
  } catch (error) {
    console.error('Error updating citation:', error);
    throw error;
  }
};

export const deleteCitation = async (citationId: string): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.delete(
      `${API_URL}/citations/${citationId}`,
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data) {
      throw new Error('Failed to delete citation');
    }
  } catch (error) {
    console.error('Error deleting citation:', error);
    throw error;
  }
};

export const addTag = async (citationId: string, tag: { name: string; color: string }) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('No authentication token found');
  }

  // First, check if a tag with this name already exists
  const response = await axios.post(
    `${API_URL}/citations/${citationId}/tags`,
    tag,
    {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

export const removeTag = async (citationId: string, tagId: number) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('No authentication token found');
  }

  await axios.delete(
    `${API_URL}/citations/${citationId}/tags/${tagId}`,
    {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const updateTag = async (tagId: number, updates: Partial<Tag>): Promise<Tag> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token found');
    }

    console.log('Updating tag:', { tagId, updates });

    const response = await axios.put<Tag>(
      `${API_URL}/tags/${tagId}`,
      updates,
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Tag update response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Tag update error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
    }
    throw error;
  }
};

export const deleteTag = async (tagId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tags/${tagId}`);
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};

export const createCitation = async (project_id: string, citation: Partial<Citation>): Promise<Citation> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      `${API_URL}/citations`, 
      { ...citation, project_id: project_id },
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data) {
      throw new Error('No data returned from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating citation:', error);
    throw error;
  }
};

export const fetchProject = async (project_id: string): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/${project_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const removeTagFromCitation = async (citationId: string, tagId: string): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token found');
    }

    console.log('Starting tag removal:', { citationId, tagId });
    console.log('API URL:', `${API_URL}/citations/${citationId}/tags/${tagId}`);
    console.log('Auth token:', session.access_token.substring(0, 10) + '...');

    const response = await axios({
      method: 'DELETE',
      url: `${API_URL}/citations/${citationId}/tags/${tagId}`,
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // 5 second timeout
    });

    console.log('Tag removal response:', response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
    } else {
      console.error('Non-Axios error:', error);
    }
    throw error;
  }
};

export interface ExtractionResponse {
  citation_type: string;
  fields: Record<string, any>;
}

export const extractCitation = async (sourceType: string, text: string): Promise<ExtractionResponse> => {
  try {
    const response = await axios.post(`${API_URL}/citations/extract`, {
      source_type: sourceType,
      text
    });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error extracting citation:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to extract citation: ${error.message}`);
    } else {
      throw new Error('Failed to extract citation: Unknown error');
    }
  }
};
