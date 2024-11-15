import axios from 'axios';
import { Project } from '../types/project';
import { Citation } from '../types/citation';
import { Tag } from '../types/citation';
import { supabase } from '@/lib/supabase';

const API_URL = 'http://127.0.0.1:5000/api';

const supabaseClient = supabase

// Add authentication header to all requests
axios.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      console.log('No active session or user ID');
      return [];
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const createProject = async (
  project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'citations'>
): Promise<Project> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ ...project, user_id: (await supabaseClient.auth.getUser()).data.user?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (project: Project): Promise<Project> => {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session?.user?.id) {
      throw new Error('No active session');
    }

    // First verify the project belongs to the user
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('id', project.id)
      .eq('user_id', session.user.id)
      .single();

    if (!existingProject) {
      throw new Error('Project not found or access denied');
    }

    // Then perform the update
    const { data, error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.description,
        status: project.status,
        deadline: project.deadline,
        updated_at: new Date().toISOString()
      })
      .eq('id', project.id)
      .eq('user_id', session.user.id) // ensure user owns the project
      .select('*')
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from update');
    
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (project_id: string): Promise<void> => {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session?.user?.id) {
      throw new Error('No active session');
    }

    // First verify the project belongs to the user
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('id', project_id)
      .eq('user_id', session.user.id)
      .single();

    if (!existingProject) {
      throw new Error('Project not found or access denied');
    }

    // Then perform the delete
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', project_id)
      .eq('user_id', session.user.id); // ensure user owns the project

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const fetchProject = async (project_id: string): Promise<Project> => {
  try {
    const response = await axios.get(`${API_URL}/projects/${project_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const fetchProjectCitationTags = async () => {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session?.user?.id) {
      console.log('No active session or user ID');
      return {};
    }

    // Get projects with their citations' tags through the junction table
    const { data: projectsWithTags, error } = await supabase
      .from('projects')
      .select(`
        id,
        citations!inner (
          id,
          citation_tags!inner (
            tag:tags!inner (
              id,
              name,
              color
            )
          )
        )
      `)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Supabase error:', error);
      return {};
    }

    // Transform the data to aggregate unique tags per project
    const transformed = (projectsWithTags || []).reduce((acc: Record<string, Tag[]>, project: any) => {
      acc[project.id] = [];
      
      project.citations?.forEach((citation: any) => {
        citation.citation_tags?.forEach((ct: any) => {
          const tag = ct.tag;
          // Only add tag if it's not already in the array
          const tagExists = acc[project.id].some(
            existingTag => existingTag.id === tag.id
          );
          if (!tagExists && tag.id) {
            acc[project.id].push(tag);
          }
        });
      });

      return acc;
    }, {});

    return transformed;
  } catch (error) {
    console.error('Error in fetchProjectCitationTags:', error);
    return {};
  }
};
