import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { FormatToolbar } from './FormatToolbar';
import TextStyle from '@tiptap/extension-text-style';

// Create a custom DialogContent component without the close button
const CustomDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>((props, ref) => (
  <DialogContent ref={ref} {...props} className={`${props.className} custom-dialog-content`} />
));
CustomDialogContent.displayName = "CustomDialogContent";

interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  onDelete: () => void;
  initialNote: string;
}

export function NoteDialog({ isOpen, onClose, onSave, onDelete, initialNote }: NoteDialogProps) {
  const [note, setNote] = useState(initialNote);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Highlight,
      Underline,
      TextStyle,
    ],
    content: note,
    onUpdate: ({ editor }) => {
      setNote(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && initialNote !== note) {
      editor.commands.setContent(initialNote);
    }
  }, [initialNote, editor]);

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  const handleFormat = (format: string, value?: string) => {
    if (editor) {
      switch (format) {
        case 'bold':
          editor.chain().focus().toggleBold().run();
          break;
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <CustomDialogContent className="w-[50vw] h-[50vh] flex flex-col bg-white p-0 shadow-none rounded-lg overflow-hidden">
        <div className="flex-grow overflow-hidden rounded-lg relative">
          <FormatToolbar onFormat={handleFormat} />
          <EditorContent 
            editor={editor} 
            className="h-full bg-white text-foreground quill-custom rounded-lg p-4"
          />
        </div>
        <DialogFooter className="mt-4 flex justify-between px-4 pb-4">
          <Button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
          >
            Delete
          </Button>
          <Button 
            onClick={handleSave} 
            className="px-4 py-2 bg-white text-black border border-black hover:bg-gray-200 transition-colors duration-200 rounded-md"
          >
            Save
          </Button>
        </DialogFooter>
      </CustomDialogContent>
    </Dialog>
  );
}
