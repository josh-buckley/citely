import React from 'react';
import { Button } from "./ui/button";
import { Bold, Italic, Underline, Link, Type, Paintbrush, Highlighter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FormatToolbarProps {
  onFormat: (format: string, value?: string) => void;
}

export function FormatToolbar({ onFormat }: FormatToolbarProps) {
  const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '30', '36', '48', '60', '72'];
  const colors = ['black', 'red', 'blue', 'green', 'yellow'];

  return (
    <div className="bg-white border rounded-md shadow-lg p-2 flex space-x-2">
      <Button variant="ghost" size="sm" onClick={() => onFormat('bold')}><Bold size={16} /></Button>
      <Button variant="ghost" size="sm" onClick={() => onFormat('italic')}><Italic size={16} /></Button>
      <Button variant="ghost" size="sm" onClick={() => onFormat('underline')}><Underline size={16} /></Button>
      <Button variant="ghost" size="sm" onClick={() => onFormat('link')}><Link size={16} /></Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm"><Type size={16} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {fontSizes.map((size) => (
            <DropdownMenuItem key={size} onSelect={() => onFormat('size', size)}>
              {size}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm"><Paintbrush size={16} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {colors.map((color) => (
            <DropdownMenuItem key={color} onSelect={() => onFormat('color', color)}>
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
              {color}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm"><Highlighter size={16} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {colors.map((color) => (
            <DropdownMenuItem key={color} onSelect={() => onFormat('background', color)}>
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
              {color}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
