'use client';
import { useRouter } from 'next/navigation';

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { EmptyState } from "../../components/EmptyState";
import { Plus, Search } from 'lucide-react';
import { Badge } from "../../components/ui/badge";
import { fetchProjects, createProject, updateProject, deleteProject, fetchProjectCitationTags } from '../../api/projectsapi';
import { Project } from '../../types/project';
import { NewProjectForm } from '../../components/NewProjectForm';
import { Tag } from '../../types/citation';
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { Loader } from "../../components/ui/loader";

// Update the ProjectTags type definition
type ProjectTags = Record<string, Tag[]>;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isNewProjectFormOpen, setIsNewProjectFormOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const queryClient = useQueryClient();

  const { data: projects, isLoading, error } = useQuery<Project[]>('projects', 
    async () => {
      const result = await fetchProjects();
      if (!result) return [];
      return result;
    },
    {
      staleTime: 300000,
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error('Query error:', error);
      }
    }
  );

  const { data: projectCitationTags } = useQuery<Record<string, { name: string; color: string }[]>>(
    'projectCitationTags',
    async () => {
      const result = await fetchProjectCitationTags();
      return result;
    },
    {
      staleTime: 300000, // 5 minutes
      cacheTime: 300000,
      retry: 1,
      onError: (error) => {
        console.error('Query error:', error);
      },
      // Only fetch tags if we have projects
      enabled: !!projects?.length
    }
  );

  useEffect(() => {
    console.log('projectCitationTags:', projectCitationTags);
  }, [projectCitationTags]);

  const handleCreateProject = useCallback(() => {
    setIsNewProjectFormOpen(true);
  }, []);

  const handleEditProject = useCallback(async (project: Project) => {
    try {
      setProjectToEdit(project);
      setIsNewProjectFormOpen(true);
    } catch (error) {
      console.error('Error preparing project edit:', error);
      // Optionally show an error message to the user
      alert('Error preparing to edit project. Please try again.');
    }
  }, []);

  const handleProjectSaved = useCallback(async () => {
    try {
      await queryClient.invalidateQueries(['projects']);
      setProjectToEdit(null);
      setIsNewProjectFormOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  }, [queryClient]);

  const handleCloseForm = useCallback(() => {
    setIsNewProjectFormOpen(false);
    setProjectToEdit(null);
  }, []);

  const handleDeleteProject = async (project_id: string) => {
    try {
      await deleteProject(project_id);
      queryClient.invalidateQueries('projects');
    } catch (err) {
      console.error('Failed to delete project', err);
      // Optionally, show an error message to the user
      // For example, using a toast notification library or an alert
      alert('Failed to delete project. Please try again.');
    }
  };

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    const citationTagsForProject = projectCitationTags?.[project.id]?.map(tag => tag.name) || [];
    const allTagsForProject = [ ...citationTagsForProject];
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => allTagsForProject.includes(tag));
    return matchesSearch && matchesStatus && matchesTags;
  });

  if (error) {
    return <div>Error loading projects</div>;
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size={32} className="text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button 
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={handleCreateProject}
        >
          <Card className="w-full transition-colors transition-transform duration-200 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
              <CardTitle className="text-sm font-medium">
                New Project
              </CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="transform transition-transform hover:scale-[1.02]">
              <ProjectCard 
                key={project.id} 
                project={project} 
                onEdit={() => handleEditProject(project)}
                onDelete={handleDeleteProject}
                tags={projectCitationTags?.[project.id] || []}
                view="grid"
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onCreateProject={handleCreateProject} />
      )}

      <NewProjectForm
        isOpen={isNewProjectFormOpen}
        onClose={handleCloseForm}
        onProjectCreated={handleProjectSaved}
        projectToEdit={projectToEdit}
      />
    </div>
  );
}
