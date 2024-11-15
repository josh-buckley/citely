import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Pencil, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Project } from '../../types/project';
import { DeleteConfirmationDialog } from '../DeleteConfirmationDialog';

interface ProjectCardProps {
  project: Project;
  view: 'grid' | 'list';
  onEdit: (project: Project) => void;
  onDelete: (project_id: string) => void;
  tags: { name: string; color: string; }[];
}

const iconButtonClass = "absolute top-2 z-10 transition-transform hover:scale-110";

export function ProjectCard({ project, view, onEdit, onDelete, tags }: ProjectCardProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const cardClass = view === 'grid' ? 'w-full' : 'flex flex-row items-center';
  const contentClass = view === 'grid' ? '' : 'flex-grow';

  const handleCardClick = () => {
    router.push(`/projects/${project.id}/citations`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(project);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(project.id);
    setIsDeleteDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-yellow-500';
      case 'In Progress':
        return 'bg-green-500';
      case 'Complete':
        return 'bg-gold-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDeadline = (deadline: string | Date | null | undefined) => {
    if (!deadline) return 'No deadline';
    const date = deadline instanceof Date ? deadline : new Date(deadline);
    return `Due on ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`;
  };

  // Add this function to filter unique tags
  const getUniqueTags = (tags: { name: string; color: string; }[]) => {
    const uniqueTags = new Map();
    tags.forEach(tag => {
      if (!uniqueTags.has(tag.name)) {
        uniqueTags.set(tag.name, tag);
      }
    });
    return Array.from(uniqueTags.values());
  };

  return (
    <>
      <Card className={`${cardClass} cursor-pointer relative`} onClick={handleCardClick}>
        <Button
          variant="ghost"
          size="sm"
          className={`${iconButtonClass} right-2`}
          onClick={handleEditClick}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`${iconButtonClass} right-10`}
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className="text-gray-500">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className={`${contentClass} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
                <span>{project.status}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{formatDeadline(project.deadline)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.length > 0 ? (
              getUniqueTags(tags).map((tag) => (
                <Badge
                  key={tag.name}
                  variant="outline"
                  style={{
                    backgroundColor: tag.color,
                    color: 'black',
                    border: 'none',
                  }}
                >
                  {tag.name}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="bg-gray-200 text-gray-600">
                No tags
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Project"
      />
    </>
  );
}
