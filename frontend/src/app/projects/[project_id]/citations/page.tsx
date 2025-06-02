'use client';

import React, { useState, useEffect, KeyboardEvent, useRef, useCallback } from 'react'
import { Citation, CitationType, Tag } from '../../../../types/citation'
import { 
  fetchCitations, 
  updateCitation, 
  deleteCitation, 
  addTag, 
  updateTag, 
  deleteTag, 
  fetchProject, 
  removeTagFromCitation, 
  createCitation 
} from '../../../../api/citationsapi'
import { CitationForm } from "../../../../components/CitationForm"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu"
import { Badge } from "../../../../components/ui/badge"
import { ScrollArea } from "../../../../components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { BookOpen, FileText, Gavel, Search, PlusCircle, Edit, Trash2, Copy, X, StickyNote, Check, Book, Globe, MoreHorizontal, Plus, LinkIcon, MoreVertical, ChevronDown, ChevronUp, Pencil, ChevronRight, Files, Library, Layers, Link2 } from 'lucide-react'
import { toast } from "../../../../components/ui/toast"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { GripVertical } from 'lucide-react'
import { CitationDialogs } from '../../../../components/CitationDialogs';
import { cn } from "../../../../lib/utils"; // Make sure this import exists
import { Project } from '../../../../types/project';
import { useParams } from 'next/navigation';
import { DeleteConfirmationDialog } from '../../../../components/DeleteConfirmationDialog';
import NumberFlow from '@number-flow/react';
import { citationTypes } from '../../../../components/CitationTypeSelector'; // Move the citationTypes object to a shared location
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader } from "../../../../components/ui/loader"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../../../../components/ui/popover"
import { PlusIcon, ArrowRightIcon } from 'lucide-react'

interface DragHandleProps {
  dragHandleProps: any;
}

const DragHandle: React.FC<DragHandleProps> = ({ dragHandleProps }) => (
  <div {...dragHandleProps} className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600">
    <GripVertical className="h-4 w-4" />
  </div>
);

const pastelColors = [
  "#16697A", // 1
  "#489FB5", // 2
  "#82C0CC", // 3
  "#619b8a", // 4
  "#a1c181", // 5
  "#d4e09b", // 6
  "#f2cc8f", // 7
  "#fcca46", // 8
  "#FFA62B", // 9
  "#ffa5ab", // 10
  "#dd2d4a", // 11
  "#dd1c1a", // 12
];



// Add this function at the top of your file, outside of the CitationManager component
const getFriendlyTypeName = (type: string): string => {
  const typeMap: Record<string, string> = Object.values(citationTypes).flat().reduce((acc, type) => ({
    ...acc,
    [type.value]: type.label
  }), {});

  return typeMap[type] || type;
};

// Add this function at the top of your file, outside of the CitationManager component
const renderFormattedCitation = (citation: string) => {
  const parts = citation.split(/(<i>.*?<\/i>)/);
  return parts.map((part, index) => {
    if (part.startsWith('<i>') && part.endsWith('</i>')) {
      return <i key={index}>{part.slice(3, -4)}</i>;
    }
    return part;
  });
};

// Add these type mappings at the top level
const categoryTypeMappings = {
  cases: [
    'case_reported',
    'case_unreported_medium_neutral',
    'case_unreported_no_medium_neutral',
    'proceeding',
    'court_order',
    'arbitration',
    'transcript_of_proceedings',
    'high_court_transcript',
    'submission'
  ],
  legislative: [
    'act',
    'delegated_legislation',
    'delegated_non_government_legislation',
    'bill',
    'explanatory_memorandum',
    'hansard',
    'gazette',
    'order_or_ruling',
    'court_practice_direction'
  ],
  secondary: [
    'journal_article',
    'symposium',
    'book',
    'book_chapter',
    'book_with_editor',
    'translated_book',
    'audiobook',
    'report',
    'research_paper',
    'speech',
    'press_and_media_release',
    'hard_copy_dictionary',
    'online_dictionary',
    'hard_copy_legal_encyclopedia',
    'online_legal_encyclopedia',
    'hard_copy_looseleaf',
    'online_looseleaf',
    'printed_newspaper',
    'online_newspaper',
    'periodical',
    'interview',
    'film_television_media',
    'internet_material',
    'social_media_post'
  ],
  international: [
    'treaty'
  ],
  miscellaneous: [
    'written_submission',
    'evidence_to_parliamentary_committee',
    'constitutional_convention_debates',
    'intellectual_property',
    'constitutive_document',
    'written_correspondence'
  ]
} as const;

// Add this utility function at the top of the file
const fetchWithRetry = async (fn: () => Promise<any>, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export default React.memo(function CitationManager() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const project_id = params.project_id as string;

  // Move all useState declarations here, before any conditional returns
  const [citations, setCitations] = useState<Citation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [filteredCitations, setFilteredCitations] = useState<Citation[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<CitationType[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ id: string; name: string; color: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [tagColors, setTagColors] = useState<Record<string, string>>({});

  // Filter categories for citation types
  const filterCategories = {
    main: [
      { value: 'case_reported', label: 'Judicial Materials', icon: <Gavel className="mr-2 h-4 w-4" /> },
      { value: 'act', label: 'Legislative Materials', icon: <FileText className="mr-2 h-4 w-4" /> },
      { value: 'journal_article', label: 'Secondary Sources', icon: <BookOpen className="mr-2 h-4 w-4" /> },
      { value: 'treaty', label: 'International Sources', icon: <Globe className="mr-2 h-4 w-4" /> },
      { value: 'miscellaneous', label: 'Miscellaneous', icon: <MoreHorizontal className="mr-2 h-4 w-4" /> },
    ],
  };

  // Add this function to handle category clicks
  const handleCategoryClick = (category: keyof typeof categoryTypeMappings) => {
    const typesInCategory = [...categoryTypeMappings[category]] as CitationType[];
    setSelectedTypes(prevTypes => {
      const allTypesInCategorySelected = typesInCategory.every(type => 
        prevTypes.includes(type)
      );

      // If all types in category are selected, remove them all
      if (allTypesInCategorySelected) {
        return prevTypes.filter(type => !typesInCategory.includes(type));
      }
      
      // Otherwise, add all types from the category
      const newTypes = new Set([...prevTypes]);
      typesInCategory.forEach(type => newTypes.add(type));
      return Array.from(newTypes);
    });
  };

  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedCitation, setEditedCitation] = useState<Citation | null>(null)
  const [authors, setAuthors] = useState<string[]>([]);
  const [editingCitation, setEditingCitation] = useState<Citation | null>(null);
  const [isAddingCitation, setIsAddingCitation] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Citation>({
    id: '',
    project_id: project_id,
    type: '' as CitationType,
    source: '',

    // Common fields
    title: '',
    year: 2024,
    pinpoint: '',
    url: '',
    notes: '',
    tags: [],
    updated_at: new Date(),
    created_at: new Date(),
    
    // Case-related fields
    case_name: '',
    volume: '',
    law_report_series: '',
    starting_page: '',
    unique_court_identifier: '',
    judgment_number: '',
    court: '',
    judge: '',
    full_date: '',
    proceeding_number: '',
    judicial_officers: '',
    
    // Arbitration fields
    award_description: '',
    forum: '',
    case_award_number: '',
    
    // Party information
    party_name: '',
    
    // Legislative materials
    jurisdiction: '',
    explanatory_type: '',
    bill_citation: '',
    chamber: '',
    name_of_speaker: '',
    gazette_title: '',
    gazette_number: '',
    title_of_notice: '',
    document_number: '',
    
    // Court documents
    instrumentality_officer: '',
    instrument_title: '',
    practice_direction: '',
    number_identifier: '',
    citation_report_series: '',
    
    // Secondary sources
    authors: [],
    editors: [],
    journal: '',
    issue: '',
    publisher: '',
    edition: '',
    chapter_title: '',
    translation_title: '',
    publication_year: '',
    dictionary_title: '',
    edition_number: '',
    entry_title: '',
    definition_number: '',
    title_number: '',
    title_name: '',
    chapter_number: '',
    chapter_name: '',
    paragraph: '',
    title_of_encyclopedia: '',
    volume_number: '',
    date_of_retrieval: '',
    
    // Media-related fields
    newspaper: '',
    place_of_publication: '',
    periodical_name: '',
    medium: '',
    director: '',
    producer: '',
    production_company: '',
    timestamp: '',
    platform: '',
    post_content: '',
    release_type: '',
    
    // Interview fields
    interviewee: '',
    interviewer: '',
    program: '',
    
    // Miscellaneous fields
    submission_number: '',
    body: '',
    name_of_inquiry: '',
    committee: '',
    legislature: '',
    location: '',
    number: '',
    
    // IP fields
    jurisdiction_code: '',
    ip_type: '',
    additional_info: '',
    identification_number: '',
    filing_date: '',
    registration_status: '',
    status_change_date: '',
    
    // Treaty fields
    treaty_title: '',
    parties_names: '',
    signature_date: '',
    treaty_series: '',
    entry_force_date: '',
    
    // Correspondence fields
    correspondence_type: '',
    recipient: '',
    
    // Research paper fields
    institution: '',
    paper_number: '',
    
    // Speech fields
    speech_or_lecture: '',
    institution_forum: '',
    
    // Additional fields
    episode_title: '',
    film_series_title: '',
    version_details: '',
    studio_producer: '',
    registration_date: '',
    company_name: '',
    date_opened: '',
    date_in_force: ''
  });
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [tags, setTags] = useState<{ id: string; name: string; color: string }[]>([]);
  const [openTagId, setOpenTagId] = useState<string | null>(null);
  const [newTags, setNewTags] = useState<{ [key: string]: string }>({});
  const [isEditingCitation, setIsEditingCitation] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [showOtherTypes, setShowOtherTypes] = useState(false);
  const otherTypesRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [citationToDelete, setCitationToDelete] = useState<Citation | null>(null);

  // Add this new state to track the currently editing tag
  const [editingTagId, setEditingTagId] = useState<{ citationId: string, tagId: string } | null>(null);

  const [sourceDialogOpen, setSourceDialogOpen] = useState(false);
  const [selectedCitationForSource, setSelectedCitationForSource] = useState<Citation | null>(null);
  const [sourceInput, setSourceInput] = useState<string>('');

  const [sourcePopoverOpen, setSourcePopoverOpen] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            console.log('No active session found');
            toast.error('Please log in to continue');
        } else {
            console.log('Active session found');
        }
    };
    
    checkAuth();
}, []);

  const handleAddCitation = async (citation: Partial<Citation>) => {
    try {
      if (!session) {
        toast.error("Please sign in to add citations");
        router.push('/auth/signin');
        return;
      }

      const newCitation = {
        ...citation,
        type: citation.type!,
        project_id: project_id,
        updated_at: new Date(),
        created_at: new Date(),
        tags: citation.tags || [],
        formatted_citation: citation.formatted_citation || ''
      };

      delete (newCitation as any).project_id;

      console.log('Sending citation:', newCitation);
      const savedCitation = await createCitation(project_id, newCitation);
      console.log('Citation created successfully:', savedCitation);
      
      setCitations(prev => [...prev, savedCitation]);
      setIsAddingCitation(false);
      toast.success("Citation added successfully");
    } catch (error) {
      console.error('Citation creation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add citation');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (project_id) {
          const [citationsData, projectData] = await Promise.all([
            fetchWithRetry(() => fetchCitations(project_id)),
            fetchWithRetry(() => fetchProject(project_id))
          ]);

          setCitations(citationsData);
          setProject(projectData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load project data. Retrying...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [project_id]);

  useEffect(() => {
    // Create a map using tag name as key to ensure uniqueness
    const tagMap = new Map();
    
    citations.forEach(citation => {
      citation.tags?.forEach(tag => {
        // Only add the tag if we haven't seen this name before
        if (!tagMap.has(tag.name.toLowerCase())) {
          tagMap.set(tag.name.toLowerCase(), {
            id: tag.id,
            name: tag.name,
            color: tag.color
          });
        }
      });
    });
    
    // Convert map values back to array
    const uniqueTags = Array.from(tagMap.values());
    setAllTags(uniqueTags);
  }, [citations]);

  useEffect(() => {
    if (project_id) {
      fetchProject(project_id)
        .then(fetchedProject => {
          setProject(fetchedProject);
        })
        .catch(error => {
          console.error('Error fetching project:', error);
          setError('Failed to fetch project details');
        });
    }
  }, [project_id]);

  const getAllTags = (): { id: string; name: string; color: string }[] => {
    const tagsSet = new Set<string>()
    citations.forEach(citation => {
      if (citation.tags) {
        citation.tags.forEach(tag => tagsSet.add(tag.name))
      }
    })
    return Array.from(tagsSet).map(tagName => ({
      id: String(Math.random()),
      name: tagName,
      color: getRandomColor()
    }))
  }

  const handleTypeFilter = (type: CitationType) => {
    setSelectedTypes(prevTypes => {
      const typeExists = prevTypes.includes(type);
      if (typeExists) {
        return prevTypes.filter(t => t !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  const handleTagFilter = (tag: { id: string; name: string; color: string }) => {
    setSelectedTags(prevTags => 
      prevTags.some(t => t.id === tag.id)
        ? prevTags.filter(t => t.id !== tag.id)
        : [...prevTags, tag]
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Update the handleTagColorChange function
  const handleTagColorChange = async (tagId: string, newColor: string) => {
    try {
      // Update UI immediately
      setCitations(prevCitations => 
        prevCitations.map(citation => ({
          ...citation,
          tags: citation.tags?.map(tag => 
            String(tag.id) === String(tagId)
              ? { ...tag, color: newColor }
              : tag
          )
        }))
      );
      
      setAllTags(prevTags => 
        prevTags.map(tag => 
          String(tag.id) === String(tagId)
            ? { ...tag, color: newColor }
            : tag
        )
      );
      
      // Close the color picker
      setEditingTagId(null);

      // Update backend
      const numericTagId = parseInt(tagId);
      if (isNaN(numericTagId)) {
        throw new Error('Invalid tag ID');
      }
      
      const existingTag = allTags.find(tag => String(tag.id) === String(tagId));
      if (!existingTag) {
        throw new Error('Tag not found');
      }
      
      await updateTag(numericTagId, {
        name: existingTag.name,
        color: newColor
      });
      
      toast.success("Tag color updated successfully");
    } catch (error) {
      console.error('Error updating tag color:', error);
      toast.error("Failed to update tag color");
      // Optionally revert the UI changes here if the backend update fails
    }
  };


  const openEditDialog = (citation: Citation) => {
    setEditingCitation(citation);
    setIsEditingCitation(true);
  }

  const handleEditSubmit = async (updatedCitation: Citation) => {
    try {
      const updatedCitationData = await updateCitation(updatedCitation);
      setCitations(citations.map(c => c.id === updatedCitationData.id ? updatedCitationData : c));
      setIsEditingCitation(false);
      setEditingCitation(null);
      toast("Citation updated successfully");
    } catch (error) {
      console.error('Error updating citation:', error);
      setError('Failed to update citation. Please try again.');
      toast("Error updating citation");
    }
  }

  const openDeleteDialog = (citation: Citation) => {
    setCitationToDelete(citation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (citationToDelete) {
      try {
        await deleteCitation(citationToDelete.id);
        setCitations(citations.filter(c => c.id !== citationToDelete.id));
        setIsDeleteDialogOpen(false);
        setCitationToDelete(null);
        toast("Citation deleted successfully");
      } catch (error) {
        console.error('Error deleting citation:', error);
        toast("Error deleting citation");
      }
    }
  };

  const handleCopyClick = (citationId: string) => {
    const citation = citations.find(c => c.id === citationId);
    if (citation) {
      const htmlContent = citation.formatted_citation || '';
      
      // Create a Blob with HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const richTextData = new ClipboardItem({
        'text/html': blob
      });

      navigator.clipboard.write([richTextData]).then(() => {
        toast("Citation copied to clipboard");
        setCopiedStates(prev => ({ ...prev, [citationId]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [citationId]: false }));
        }, 2000);
      }, (err) => {
        console.error('Could not copy text: ', err);
        toast("Error copying citation");
      });
    }
  };

  useEffect(() => {
    const filteredCitations = citations.filter(citation => 
      (selectedTypes.length === 0 || selectedTypes.includes(citation.type)) &&
      (selectedTags.length === 0 || selectedTags.every(selectedTag => 
        citation.tags?.some(citationTag => String(citationTag.id) === String(selectedTag.id))
      )) &&
      (searchTerm === '' || citation.formatted_citation?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCitations(filteredCitations);
  }, [citations, selectedTypes, selectedTags, searchTerm]);

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const addAuthor = () => {
    setAuthors([...authors, '']);
  };

  const removeAuthor = (index: number) => {
    const newAuthors = authors.filter((_, i) => i !== index);
    setAuthors(newAuthors);
  };

  const handleEdit = (citation: Citation) => {
    setEditingCitation({
      ...citation,
      authors: Array.isArray(citation.authors) ? citation.authors : citation.authors ? [citation.authors] : [],
      editors: Array.isArray(citation.editors) ? citation.editors : citation.editors ? [citation.editors] : [],
    });
  };

  const handleSave = async () => {
    if (!editingCitation) return;

    try {
      const savedCitation = await updateCitation(editingCitation);
      setCitations(citations.map(c => c.id === savedCitation.id ? savedCitation : c));
      setEditingCitation(null);
      toast("Citation updated successfully");
    } catch (error) {
      console.error('Error updating citation:', error);
      setError('Failed to update citation. Please try again.');
      toast("Error updating citation");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingCitation) return;

    const { name, value } = e.target;
    setEditingCitation(prev => {
      if (!prev) return prev;
      if (name === 'authors') {
        return { ...prev, [name]: value.split(',').map(author => author.trim()) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCitation: Citation = {
      ...formData,
      project_id: project_id ?? '',
      updated_at: new Date(),
      created_at: new Date(),
      authors: formData.authors || [],
      editors: formData.editors || [],
      tags: formData.tags || [],
    };
  };


  const updateTagColor = (tagId: string, newColor: string) => {
    setTags(tags.map(tag => 
      tag.id === tagId ? { ...tag, color: newColor } : tag
    ));
    setTagColors(prevColors => ({
      ...prevColors,
      [tagId]: newColor
    }));
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const handleTagNameChange = (tag: { id: string; name: string; color: string }, newName: string) => {
    setCitations(prevCitations => 
      prevCitations.map(citation => ({
        ...citation,
        tags: citation.tags?.map(t => 
          t.id === tag.id ? { ...t, name: newName } : t
        )
      }))
    );
  };

  // Update the handleTagDelete function
  const handleTagDelete = async (citationId: string, tagId: string) => {
    try {
      // Find the citation and tag
      const citation = citations.find(c => c.id === citationId);
      if (!citation) return;

      // Update UI immediately
      setCitations(prevCitations => 
        prevCitations.map(c => {
          if (c.id === citationId) {
            return {
              ...c,
              tags: (c.tags || []).filter(t => t.id !== tagId)
            };
          }
          return c;
        })
      );
      
      // Close the tag editor
      setEditingTagId(null);

      // Then handle the backend deletion
      await removeTagFromCitation(citationId, tagId);
      
      toast.success("Tag removed successfully");
    } catch (error) {
      // Revert the UI change if the backend call fails
      setCitations(prevCitations => 
        prevCitations.map(c => {
          if (c.id === citationId) {
            return {
              ...c,
              tags: (c.tags || []).filter(t => t.id !== tagId)
            };
          }
          return c;
        })
      );
      console.error('Error removing tag:', error);
      toast.error("Failed to remove tag");
    }
  };

  const getRandomPastelColor = () => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };

  const handleAddTag = async (citationId: string, tagName: string) => {
    try {
      // Validate tag name
      const trimmedTagName = tagName.trim();
      if (!trimmedTagName) {
        return; // Silently return if tag name is empty or just whitespace
      }

      if (!session) {
        toast.error("Please sign in to add tags");
        router.push('/auth/signin');
        return;
      }

      const existingTag = allTags.find(t => t.name.toLowerCase() === trimmedTagName.toLowerCase());
      let newTag;

      if (existingTag) {
        newTag = await addTag(citationId, { name: existingTag.name, color: existingTag.color });
      } else {
        const tagColor = getRandomPastelColor();
        newTag = await addTag(citationId, { name: trimmedTagName, color: tagColor });
      }

      if (newTag) {
        const updatedTag = { id: (newTag.id ?? '').toString(), name: newTag.name, color: newTag.color };
        setCitations(prevCitations => prevCitations.map(c => {
          if (c.id === citationId) {
            const existingTagIndex = c.tags?.findIndex(t => t.id === updatedTag.id);
            if (existingTagIndex === -1) {
              return {
                ...c,
                tags: [...(c.tags || []), updatedTag]
              };
            }
          }
          return c;
        }));
      }
      setNewTags(prev => ({ ...prev, [citationId]: '' }));
    } catch (error) {
      console.error('Error adding tag:', error);
      toast.error("Failed to add tag. Please try again.");
    }
  };
  
  // Modified onDragEnd function
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    setIsDragging(false);

    if (!destination) return;

    // Don't do anything if dropped in same location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      // Create new array of filtered citations
      const newFilteredCitations = Array.from(filteredCitations);
      const [removed] = newFilteredCitations.splice(source.index, 1);
      newFilteredCitations.splice(destination.index, 0, removed);

      // Update filtered citations immediately for smooth UI
      setFilteredCitations(newFilteredCitations);

      // Update the main citations array
      const sourceId = filteredCitations[source.index].id;
      const destinationId = filteredCitations[destination.index].id;

      setCitations(prevCitations => {
        const newCitations = [...prevCitations];
        const sourceIndex = newCitations.findIndex(c => c.id === sourceId);
        const destinationIndex = newCitations.findIndex(c => c.id === destinationId);

        const [removed] = newCitations.splice(sourceIndex, 1);
        newCitations.splice(destinationIndex, 0, removed);

        return newCitations;
      });

      toast.success("Citations reordered successfully");
    } catch (error) {
      console.error('Error reordering citations:', error);
      toast.error("Failed to reorder citations");
      
      // Revert to original order
      setFilteredCitations(filteredCitations);
    }
  };

  // Add onDragStart handler
  const onDragStart = () => {
    setIsDragging(true);
  };

  const toggleOtherTypes = () => {
    setShowOtherTypes(!showOtherTypes);
    if (!showOtherTypes && otherTypesRef.current) {
      setTimeout(() => {
        otherTypesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Small delay to allow animation to start
    }
  };

  const getCitationCounts = () => {
    const counts = {
      total: filteredCitations.length,
      cases: 0,
      legislative: 0,
      secondary: 0,
      international: 0,
      miscellaneous: 0,
    };

    citations.forEach((citation) => {
      // Cases
      if ([
        'case_reported',
        'case_unreported_medium_neutral',
        'case_unreported_no_medium_neutral',
        'proceeding',
        'court_order',
        'arbitration',
        'transcript_of_proceedings',
        'high_court_transcript',
        'submission'
      ].includes(citation.type)) {
        counts.cases++;
      }
      // Legislative Materials
      else if ([
        'act',
        'delegated_legislation',
        'delegated_non_government_legislation',
        'bill',
        'explanatory_memorandum',
        'hansard',
        'gazette',
        'order_or_ruling',
        'court_practice_direction'
      ].includes(citation.type)) {
        counts.legislative++;
      }
      // Secondary Sources
      else if ([
        'journal_article',
        'symposium',
        'book',
        'book_chapter',
        'book_with_editor',
        'translated_book',
        'audiobook',
        'report',
        'research_paper',
        'speech',
        'press_and_media_release',
        'hard_copy_dictionary',
        'online_dictionary',
        'hard_copy_legal_encyclopedia',
        'online_legal_encyclopedia',
        'hard_copy_looseleaf',
        'online_looseleaf',
        'printed_newspaper',
        'online_newspaper',
        'periodical',
        'interview',
        'film_television_media',
        'internet_material',
        'social_media_post'
      ].includes(citation.type)) {
        counts.secondary++;
      }
      // International Sources
      else if ([
        'treaty'
      ].includes(citation.type)) {
        counts.international++;
      }
      // Miscellaneous
      else if ([
        'written_submission',
        'evidence_to_parliamentary_committee',
        'constitutional_convention_debates',
        'intellectual_property',
        'constitutive_document',
        'written_correspondence'
      ].includes(citation.type)) {
        counts.miscellaneous++;
      }
    });

    return counts;
  };

  const citationCounts = getCitationCounts();

  // Update the return statement to handle loading and error states
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size={32} className="text-primary" />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Add this helper function
  const getCategoryName = (types: CitationType[]): string | null => {
    for (const [category, categoryTypes] of Object.entries(categoryTypeMappings)) {
      if (types.length === categoryTypes.length && 
          categoryTypes.every(type => types.includes(type as CitationType))) {
        switch(category) {
          case 'cases': return 'All Judicial Materials';
          case 'legislative': return 'All Legislative Materials';
          case 'secondary': return 'All Secondary Sources';
          case 'international': return 'All International Sources';
          case 'miscellaneous': return 'All Miscellaneous';
        }
      }
    }
    return null;
  }

  function adjustColorBrightness(color: string, amount: number): string {
    const rgb = hexToRgb(color);
    if (!rgb) return color;
    
    const newRgb = {
      r: Math.max(0, Math.min(255, Math.round(rgb.r + amount))),
      g: Math.max(0, Math.min(255, Math.round(rgb.g + amount))),
      b: Math.max(0, Math.min(255, Math.round(rgb.b + amount))),
    };
    return rgbToHex(newRgb);
  }

  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHex(rgb: { r: number; g: number; b: number }): string {
    return '#' + [rgb.r, rgb.g, rgb.b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  }

  // Add this helper function to ensure URL has a protocol
  const ensureUrlProtocol = (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  // Add this helper function to clean URLs for display
  const getDisplayUrl = (url: string): string => {
    return url.replace(/^https?:\/\/(www\.)?/, '');
  };

  const handleSourceSubmit = async (citation: Citation) => {
    // Update UI immediately
    const optimisticCitation = {
      ...citation,
      source: sourceInput ? ensureUrlProtocol(sourceInput) : undefined
    };
    setCitations(citations.map(c => 
      c.id === optimisticCitation.id ? optimisticCitation : c
    ));
    setSourceInput('');
    setSourcePopoverOpen(null);
    
    try {
      // Update backend
      const updatedCitation = await updateCitation(optimisticCitation);
      
      // Update with backend response (in case of any differences)
      setCitations(citations.map(c => 
        c.id === updatedCitation.id ? updatedCitation : c
      ));
    } catch (error) {
      console.error('Error updating citation source:', error);
      // Revert on error
      setCitations(citations.map(c => 
        c.id === citation.id ? citation : c
      ));
      toast("Error updating source");
    }
  };

  const handleDeleteSource = async (citation: Citation) => {
    // Update UI immediately
    const optimisticCitation = { ...citation, source: undefined };
    setCitations(citations.map(c => 
      c.id === optimisticCitation.id ? optimisticCitation : c
    ));
    setSourcePopoverOpen(null);
    
    try {
      // Update backend
      const updatedCitation = await updateCitation(optimisticCitation);
      
      // Update with backend response (in case of any differences)
      setCitations(citations.map(c => 
        c.id === updatedCitation.id ? updatedCitation : c
      ));
      
      toast("Source removed");
    } catch (error) {
      console.error('Error removing source:', error);
      // Revert on error
      setCitations(citations.map(c => 
        c.id === citation.id ? citation : c
      ));
      toast("Error removing source");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 w-full pl-[-16px] pr-[64px] sm:pl-[-8px] sm:pr-[72px] lg:pl-0 lg:pr-[80px]">
        <div className="h-full w-full grid gap-0 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <aside className="hidden md:flex flex-col w-full lg:w-[250px] border-r border-gray-200 pr-0 pl-5">
            <div className="py-4">
              <div className="space-y-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-0 text-lg font-semibold tracking-tight">
                    Citation Types
                  </h2>
                  <div className="space-y-1">
                    {/* Main Categories */}
                    {filterCategories.main.map(category => (
                      <DropdownMenu key={category.value}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start px-0 transition-transform hover:scale-102"
                          >
                            <div className="flex items-center">
                              {category.icon}
                              {category.label}
                            </div>
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          className="w-56 max-h-[300px] overflow-y-auto"
                          side="right" 
                          align="start"
                        >
                          {Object.entries(citationTypes).map(([key, types]) => {
                            if (
                              (category.label === 'Judicial Materials' && key === 'cases') ||
                              (category.label === 'Legislative Materials' && key === 'legislativeMaterials') ||
                              (category.label === 'Secondary Sources' && key === 'secondarySources') ||
                              (category.label === 'International Sources' && key === 'internationalMaterials') ||
                              (category.label === 'Miscellaneous' && key === 'miscellaneous')
                            ) {
                              return types.map(type => (
                                <DropdownMenuItem
                                  key={type.value}
                                  className={cn(
                                    "transition-transform hover:scale-102",
                                    selectedTypes.includes(type.value as CitationType) && "bg-accent"
                                  )}
                                  onClick={() => handleTypeFilter(type.value as CitationType)}
                                >
                                  {type.label}
                                  {selectedTypes.includes(type.value as CitationType) && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                              ));
                            }
                            return null;
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ))}
                  </div>
                </div>
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-0 text-lg font-semibold tracking-tight">
                    Tags
                  </h2>
                  <div className="space-y-1">
                    {allTags.map(tag => (
                      <Button
                        key={tag.id}
                        variant={selectedTags.some(t => t.id === String(tag.id)) ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleTagFilter({ ...tag, id: String(tag.id) })}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mr-2" 
                          style={{ backgroundColor: tag.color }}
                        ></div>
                        {tag.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight mt-5">
                  {project ? project.title : 'Project'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {project ? project.description : 'Loading project description...'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Citations
                  </CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-left">
                    <NumberFlow
                      value={citationCounts.total}
                      continuous={true}
                      transformTiming={{ duration: 300, easing: 'ease-out' }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => {
                  const typesInCategory = [...categoryTypeMappings.cases] as CitationType[];
                  setSelectedTypes(prevTypes => {
                    const allTypesInCategorySelected = typesInCategory.every(type =>
                      prevTypes.includes(type)
                    );
                    toast(allTypesInCategorySelected ? "Removed filter" : "Added filter");
                    if (allTypesInCategorySelected) {
                      return prevTypes.filter(type => !typesInCategory.includes(type));
                    }
                    const newTypes = new Set([...prevTypes]);
                    typesInCategory.forEach(type => newTypes.add(type));
                    return Array.from(newTypes);
                  });
                }}
              >
                <Card className={cn(
                  "w-full transition-colors transition-transform duration-200 hover:scale-105",
                  categoryTypeMappings.cases.every(type =>
                    selectedTypes.includes(type)
                  ) && "bg-primary/5"
                )}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Judicial
                    </CardTitle>
                    <Gavel className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-left">
                      <NumberFlow
                        value={citationCounts.cases}
                        continuous={true}
                        transformTiming={{ duration: 300, easing: 'ease-out' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => handleCategoryClick('legislative')}
              >
                <Card className={cn(
                  "w-full transition-colors transition-transform duration-200 hover:scale-105",
                  categoryTypeMappings.legislative.every(type =>
                    selectedTypes.includes(type)
                  ) && "bg-primary/5"
                )}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Legislative
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-left">
                      <NumberFlow
                        value={citationCounts.legislative}
                        continuous={true}
                        transformTiming={{ duration: 300, easing: 'ease-out' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => handleCategoryClick('secondary')}
              >
                <Card className={cn(
                  "w-full transition-colors transition-transform duration-200 hover:scale-105",
                  categoryTypeMappings.secondary.every(type =>
                    selectedTypes.includes(type)
                  ) && "bg-primary/5"
                )}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Secondary
                    </CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-left">
                      <NumberFlow
                        value={citationCounts.secondary}
                        continuous={true}
                        transformTiming={{ duration: 300, easing: 'ease-out' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => handleCategoryClick('international')}
              >
                <Card className={cn(
                  "w-full transition-colors transition-transform duration-200 hover:scale-105",
                  categoryTypeMappings.international.every(type =>
                    selectedTypes.includes(type)
                  ) && "bg-primary/5"
                )}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      International
                    </CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-left">
                      <NumberFlow
                        value={citationCounts.international}
                        continuous={true}
                        transformTiming={{ duration: 300, easing: 'ease-out' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => handleCategoryClick('miscellaneous')}
              >
                <Card className={cn(
                  "w-full transition-colors transition-transform duration-200 hover:scale-105",
                  categoryTypeMappings.miscellaneous.every(type =>
                    selectedTypes.includes(type)
                  ) && "bg-primary/5"
                )}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Miscellaneous
                    </CardTitle>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-left">
                      <NumberFlow
                        value={citationCounts.miscellaneous}
                        continuous={true}
                        transformTiming={{ duration: 300, easing: 'ease-out' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Button>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search citations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsAddingCitation(true)}
                className="ml-2 transition-transform duration-200 hover:scale-105"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Citation
              </Button>
            </div>

            <div className="space-y-4">
              {(selectedTypes.length > 0 || selectedTags.length > 0 || searchTerm) && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  <p className="text-sm text-muted-foreground flex-shrink-0">
                    Active filters:
                  </p>
                  {(() => {
                    const categoryName = getCategoryName(selectedTypes);
                    if (categoryName) {
                      return (
                        <Badge variant="secondary" className="flex items-center space-x-0.5 flex-shrink-0">
                          <span>{categoryName}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => setSelectedTypes([])}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      );
                    }
                    return selectedTypes.map(type => (
                      <Badge key={type} variant="secondary" className="flex items-center space-x-0.5 flex-shrink-0">
                        <span>{getFriendlyTypeName(type)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => handleTypeFilter(type)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ));
                  })()}
                  {selectedTags.map(tag => (
                    <Badge key={tag.id} variant="secondary" className={`flex items-center space-x-0 ${tagColors[tag.id] ?? ''}`}>
                      <span>{tag.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => handleTagFilter(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {searchTerm && (
                    <Badge variant="secondary" className="flex items-center space-x-0">
                      <span>Search: {searchTerm}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => setSearchTerm('')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              )}
              <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <div className="relative overflow-hidden">
                  <Table className="border-collapse border-spacing-0">
                    <TableHeader>
                      <TableRow className="border-b hover:bg-transparent">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead className="w-[50%] text-sm">Formatted Citation</TableHead>
                        <TableHead className="w-[20%] text-sm">Type</TableHead>
                        <TableHead className="w-[20%] text-sm">Tags</TableHead>
                        <TableHead className="w-[20%] text-sm">Source</TableHead>
                        <TableHead className="text-sm"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <Droppable 
                      droppableId="citations-table"
                      isDropDisabled={false}
                      isCombineEnabled={false}
                      ignoreContainerClipping={true}
                    >
                      {(provided, snapshot) => (
                        <TableBody
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "relative",
                            snapshot.isDraggingOver && "bg-muted/50"
                          )}
                        >
                          {filteredCitations.map((citation, index) => (
                            <Draggable
                              key={citation.id}
                              draggableId={String(citation.id)}
                              index={index}
                              isDragDisabled={false}
                            >
                              {(provided, snapshot) => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={cn(
                                    "border-b transition-colors",
                                    snapshot.isDragging ? "bg-accent !border-primary" : "hover:bg-muted/50",
                                    isDragging && "cursor-grabbing"
                                  )}
                                >
                                  <TableCell className="w-[30px] pl-4 py-2">
                                    <div 
                                      {...provided.dragHandleProps}
                                      className={cn(
                                        "cursor-grab active:cursor-grabbing",
                                        snapshot.isDragging && "cursor-grabbing"
                                      )}
                                    >
                                      <GripVertical className="h-4 w-4" />
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-[50%] py-2">
                                    <div className="flex items-center justify-between">
                                      <span className="mr-2">{renderFormattedCitation(citation.formatted_citation ?? '')}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleCopyClick(citation.id)}
                                        className="transition-transform hover:scale-105"
                                        aria-label="Copy citation"
                                      >
                                        {copiedStates[citation.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-[20%] py-2 font-medium">
                                    {getFriendlyTypeName(citation.type)}
                                  </TableCell>
                                  <TableCell className="w-[20%] py-2">
                                    <div className="flex flex-wrap gap-1 items-center">
                                      {citation.tags && citation.tags.map((tag) => (
                                        <div key={tag.id} className="relative inline-block">
                                          <Badge
                                            variant="secondary"
                                            className="cursor-pointer"
                                            style={{
                                              backgroundColor: tag.color,
                                              color: adjustColorBrightness(tag.color, -100)
                                            }}
                                            onClick={() => setEditingTagId({ citationId: citation.id, tagId: tag.id })}
                                          >
                                            {tag.name}
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleTagDelete(citation.id, tag.id);
                                              }}
                                              className="ml-1 hover:text-red-500"
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </Badge>
                                          {editingTagId?.citationId === citation.id && editingTagId?.tagId === tag.id && (
                                            <div className="absolute z-10 mt-2 w-48 p-2 bg-white rounded-md shadow-lg">
                                              <div className="flex flex-wrap gap-1 mb-2">
                                                {pastelColors.map((pastelColor) => (
                                                  <button
                                                    key={pastelColor}
                                                    className="w-6 h-6 rounded-full transition-transform hover:scale-105"
                                                    style={{ 
                                                      backgroundColor: pastelColor,
                                                      border: `2px solid ${adjustColorBrightness(pastelColor, -30)}`
                                                    }}
                                                    onClick={() => {
                                                      handleTagColorChange(tag.id, pastelColor);
                                                      setEditingTagId(null);
                                                    }}
                                                  />
                                                ))}
                                              </div>
                                              <div className="flex justify-end">
                                                <Button 
                                                  onClick={() => setEditingTagId(null)} 
                                                  size="sm"
                                                  variant="outline"
                                                  className="border border-input hover:bg-accent hover:text-accent-foreground px-2 py-0 h-6 text-xs"
                                                >
                                                  Close
                                                </Button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                      <div className="relative">
                                        <Input
                                          type="text"
                                          placeholder="Add Tag"
                                          value={newTags[citation.id] || ''}
                                          onChange={(e) => setNewTags(prev => ({ ...prev, [citation.id]: e.target.value }))}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter' && newTags[citation.id]?.trim()) {
                                              handleAddTag(citation.id, newTags[citation.id]);
                                              setNewTags(prev => ({ ...prev, [citation.id]: '' }));
                                            }
                                          }}
                                          className="h-6 w-24 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                        />
                                        <PlusCircle className="w-4 h-4 absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-[20%] py-2 relative">
                                    {citation.source ? (
                                      <Popover open={sourcePopoverOpen === citation.id} onOpenChange={(open) => setSourcePopoverOpen(open ? citation.id : null)}>
                                        <PopoverTrigger asChild>
                                          <button
                                            className="p-1 rounded-sm transition-colors absolute right-[51px] top-1/2 transform -translate-y-1/2"
                                          >
                                            <LinkIcon className="h-4 w-4 text-black hover:scale-105" />
                                          </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-white p-3 w-[275px]" align="end">
                                          <div className="flex items-center justify-between w-full">
                                            <a
                                              href={ensureUrlProtocol(citation.source!)}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              onClick={(e) => e.stopPropagation()}
                                              className="text-sm hover:text-gray-700 transition-colors hover:underline"
                                              title={citation.source}
                                            >
                                              {citation.source && getDisplayUrl(citation.source).length > 30 
                                                ? `${getDisplayUrl(citation.source).slice(0, 30)}...`
                                                : getDisplayUrl(citation.source)}
                                            </a>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteSource(citation);
                                              }}
                                              className="p-1 rounded-sm"
                                            >
                                              <Trash2 className="h-4 w-4 text-red-500 hover:scale-105" />
                                            </button>
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    ) : (
                                      <Popover open={sourcePopoverOpen === citation.id} onOpenChange={(open) => setSourcePopoverOpen(open ? citation.id : null)}>
                                        <PopoverTrigger asChild>
                                          <button
                                            className="p-1 rounded-sm transition-colors absolute right-[51px] top-1/2 transform -translate-y-1/2"
                                          >
                                            <PlusIcon className="h-4 w-4 text-black hover:scale-105" />
                                          </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-white p-3 w-[300px]" align="end">
                                          <div className="flex items-center justify-between w-full gap-2">
                                            <input
                                              type="text"
                                              placeholder="Enter URL"
                                              value={sourceInput}
                                              onChange={(e) => {
                                                e.stopPropagation();
                                                setSourceInput(e.target.value);
                                              }}
                                              onClick={(e) => e.stopPropagation()}
                                              className="flex-1 text-sm p-1 border rounded"
                                            />
                                            <button
                                              onClick={async (e) => {
                                                e.stopPropagation();
                                                await handleSourceSubmit(citation);
                                              }}
                                              className="p-1 rounded-sm hover:scale-105 transition-colors"
                                            >
                                              <ArrowRightIcon className="h-4 w-4 text-gray-500 hover:text-black" />
                                            </button>
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right py-2">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">Open menu</span>
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => openEditDialog(citation)}>
                                          Edit Citation
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          onClick={() => openDeleteDialog(citation)}
                                          className={cn("text-red-600 focus:text-red-600 focus:bg-red-50")}
                                        >
                                          Delete Citation
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </TableBody>
                      )}
                    </Droppable>
                  </Table>
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </main>
      
      {isAddingCitation && (
        <CitationForm
          onSubmit={(citation: Partial<Citation>) => {
            handleAddCitation(citation as Omit<Citation, "id" | "updated_at" | "created_at" | "formatted_citation">);
          }}
          onCancel={() => setIsAddingCitation(false)}
          tags={allTags}
        />
      )}

      {isEditingCitation && editingCitation && (
        <CitationForm
          initialValues={editingCitation}
          onSubmit={async (updatedCitation) => {
            if (!editingCitation) return;
            
            await handleEditSubmit({
              ...editingCitation,  // Start with existing citation
              ...updatedCitation,  // Override with updates
              id: editingCitation.id,
              updated_at: new Date(),
              created_at: editingCitation.created_at ?? new Date(),  // Provide default if undefined
              formatted_citation: editingCitation.formatted_citation ?? '',  // Provide default if undefined
              type: updatedCitation.type ?? editingCitation.type  // Ensure type is always defined
            } as Citation);  // Assert as Citation since we've ensured all required fields
          }}
          onCancel={() => {
            setIsEditingCitation(false);
            setEditingCitation(null);
          }}
          tags={allTags}
        />
      )}

      <CitationDialogs
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedCitation={selectedCitation}
        confirmDelete={confirmDelete}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        editedCitation={editingCitation}
        setEditedCitation={setEditingCitation}
        saveEdit={() => {}}
        handleEditSubmit={() => editedCitation ? handleEditSubmit(editedCitation) : Promise.resolve()}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Citation"
      />
    </div>
  );
});