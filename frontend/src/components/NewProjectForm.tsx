'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { createProject, updateProject } from '../api/projectsapi';
import { FlexibleDateInput } from './ui/FlexibleDateInput';
import { Project } from '../types/project';

// Utility function to format date to yyyy-mm-dd
const formatDateToYYYYMMDD = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: () => void;
  projectToEdit?: Project | null;
}

export function NewProjectForm({ isOpen, onClose, onProjectCreated, projectToEdit }: NewProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Not Started' as 'Not Started' | 'In Progress' | 'Complete',
    deadline: '',
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        description: projectToEdit.description || '',
        status: projectToEdit.status as 'Not Started' | 'In Progress' | 'Complete',
        deadline: projectToEdit.deadline ? formatDateToYYYYMMDD(projectToEdit.deadline.toString()) : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Not Started',
        deadline: '',
      });
    }
  }, [projectToEdit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleStatusChange = useCallback((value: 'Not Started' | 'In Progress' | 'Complete') => {
    setFormData(prev => ({ ...prev, status: value }));
  }, []);

  const handleDateChange = useCallback((value: string | null) => {
    setFormData(prev => ({ ...prev, deadline: value || '' }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        deadline: formData.deadline ? new Date(formatDateToYYYYMMDD(formData.deadline)) : new Date('9999-12-31')
      };
      
      if (projectToEdit) {
        await updateProject({ 
          ...projectToEdit, 
          ...projectData,
          deadline: projectData.deadline.toISOString() 
        });
      } else {
        await createProject({
          ...projectData,
          deadline: projectData.deadline.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
      
      onProjectCreated();
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  }, [formData, projectToEdit, onProjectCreated, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{projectToEdit ? 'Edit Project' : 'Create New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} value={formData.status}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <FlexibleDateInput
            label="Deadline"
            value={formData.deadline}
            onChange={handleDateChange}
          />
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button 
              type="submit"
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
            >
              {projectToEdit ? 'Update Project' : 'Create Project'}
            </Button>
            <Button 
              type="button" 
              onClick={onClose}
              variant="outline"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
