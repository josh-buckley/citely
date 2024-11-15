import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Citation, CitationType } from '../types/citation';

interface CitationDialogsProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  editedCitation: Citation | null;
  setEditedCitation: React.Dispatch<React.SetStateAction<Citation | null>>;
  saveEdit: () => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  selectedCitation: Citation | null;
  confirmDelete: () => void;
  handleEditSubmit: (updatedCitation: Citation) => Promise<void>;
}

export const CitationDialogs: React.FC<CitationDialogsProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editedCitation,
  setEditedCitation,
  saveEdit,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedCitation,
  confirmDelete,
  handleEditSubmit
}) => {
  return (
    <>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Citation</DialogTitle>
            <DialogDescription>
              Make changes to your citation here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={editedCitation?.title || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authors" className="text-right">Authors</Label>
              <Input
                id="authors"
                value={Array.isArray(editedCitation?.authors) ? editedCitation?.authors.join(', ') : editedCitation?.authors || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { ...prev, authors: e.target.value.split(',').map(a => a.trim()) } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">Year</Label>
              <Input
                id="year"
                type="number"
                value={editedCitation?.year || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { ...prev, year: parseInt(e.target.value) } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">URL</Label>
              <Input
                id="url"
                value={editedCitation?.url || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { ...prev, url: e.target.value } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea
                id="notes"
                value={editedCitation?.notes || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { ...prev, notes: e.target.value } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input
                id="tags"
                value={editedCitation?.tags?.map(t => t.name).join(', ') || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { 
                  ...prev, 
                  tags: e.target.value.split(',').map(t => ({ id: Math.random().toString(), name: t.trim(), color: '' }))
                } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Input
                id="type"
                value={editedCitation?.type || ''}
                onChange={(e) => setEditedCitation(prev => 
                  prev ? { ...prev, type: e.target.value as CitationType } : null
                )}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editors" className="text-right">Editors</Label>
              <Input
                id="editors"
                value={Array.isArray(editedCitation?.editors) ? editedCitation?.editors.join(', ') : editedCitation?.editors || ''}
                onChange={(e) => setEditedCitation(prev => prev ? { ...prev, editors: e.target.value.split(',').map(ed => ed.trim()) } : null)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={saveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Citation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this citation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
