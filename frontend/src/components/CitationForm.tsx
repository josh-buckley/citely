import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog"
import { X, Plus } from 'lucide-react'
import { Citation, CitationType, Tag } from '../types/citation'
import { FlexibleDateInput } from './ui/FlexibleDateInput'
import { toast } from "./ui/toast"
import { CitationRules } from './CitationRules'
import { CitationTypeSelector, citationTypes } from './CitationTypeSelector'
import { CitationPreview } from './CitationPreview'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { generatePreviewText } from './CitationPreview'
import { extractCitation } from '../api/citationsapi'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

// Add custom styles for the Draft.js editor
const editorStyles = {
  editor: {
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'rgb(55 65 81)',
    outline: 'none'
  }
};

interface CitationFormProps {
  onSubmit: (citation: Omit<Citation, 'id' | 'project_id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialValues?: Partial<Citation>;
  tags?: Tag[];
}

// This can stay outside
const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return '';
  return dateString;
};

export const CitationForm: React.FC<CitationFormProps> = ({ onSubmit, onCancel, initialValues = {}, tags = [] }) => {
  const [formData, setFormData] = useState(() => ({
    type: (initialValues.type || 'case_reported') as CitationType,
    authors: Array.isArray(initialValues.authors) ? initialValues.authors : [],
    editors: Array.isArray(initialValues.editors) ? initialValues.editors : [],
    tags: initialValues.tags || [],
    project_id: initialValues.project_id,
    ...initialValues
  }));

  // State for tracking active and last active fields
  const [activeField, setActiveField] = useState<string | null>(null);
  const [lastActiveField, setLastActiveField] = useState<string | null>(null);

  // Separate state for selected tags
  const [selectedTags, setSelectedTags] = useState(() =>
    initialValues?.tags?.map(tag => ({ ...tag, id: Number(tag.id) })) || []
  );

  // Move validateForm before handleButtonSubmit
  const validateForm = useCallback((): boolean => {
    if (!formData.type) {
      toast("Error: Please select a citation type");
      return false;
    }
    return true;
  }, [formData.type]);

  // Handle form submission
  const handleButtonSubmit = useCallback(() => {
    if (validateForm()) {
      // Debug log to check date fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key.toLowerCase().includes('date')) {
          console.log(`Submitting ${key}:`, value);
        }
      });

      const submissionData = {
        ...formData,
        created_at: formData.created_at || new Date(),
        updated_at: formData.updated_at || new Date(),
      } as Omit<Citation, 'id' | 'project_id' | 'createdAt' | 'updatedAt'>;
      onSubmit(submissionData);
    }
  }, [formData, onSubmit, validateForm]);

  const handleTypeChange = useCallback((newType: CitationType) => {
    setFormData(prev => {
      // Create a clean slate for the new type while preserving essential fields
      const baseFields = {
        type: newType,
        project_id: prev.project_id,
        tags: prev.tags || [],
      };

      // Reset all other fields to undefined/empty
      const resetFields = Object.keys(prev).reduce((acc, key) => {
        if (!['type', 'project_id', 'tags'].includes(key)) {
          acc[key] = undefined;
        }
        return acc;
      }, {} as Record<string, any>);

      return {
        ...resetFields,
        ...baseFields,
        authors: [],
        editors: [],
      };
    });
  }, []); // No dependencies needed since we're using prev state

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...(Array.isArray(formData.authors) ? formData.authors : [])];
    newAuthors[index] = value;
    setFormData(prev => ({ ...prev, authors: newAuthors }));
  }

  const addAuthor = () => {
    setFormData(prev => ({ ...prev, authors: [...(Array.isArray(prev.authors) ? prev.authors : []), ''] }));
  }

  const removeAuthor = (index: number) => {
    const newAuthors = (Array.isArray(formData.authors) ? formData.authors : []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, authors: newAuthors }));
  }

  const handleEditorChange = (index: number, value: string) => {
    const newEditors = [...(Array.isArray(formData.editors) ? formData.editors : [])];
    newEditors[index] = value;
    setFormData(prev => ({ ...prev, editors: newEditors }));
  }

  const addEditor = () => {
    setFormData(prev => ({ ...prev, editors: [...(Array.isArray(prev.editors) ? prev.editors : []), ''] }));
  }

  const removeEditor = (index: number) => {
    const newEditors = (Array.isArray(formData.editors) ? formData.editors : []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, editors: newEditors }));
  }

  // Move handleChange up here, before renderInput
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleChange called:', e.target.name, e.target.value);
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update the handleDateChange function
  const handleDateChange = useCallback((fieldName: string, value: string | null) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []); // Remove formData dependency since we're using prev state

  const handleRawTextChange = useCallback(async (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    // Only process if there's actual content
    if (!value.trim()) return;

    try {
      const sourceType = formData.type;
      const response = await extractCitation(sourceType, value);
      
      // Update the form type and fields with the extracted data
      setFormData(prev => ({
        ...prev,
        type: response.citation_type as CitationType,
        ...response.fields
      }));

      toast({
        title: "Citation Extracted",
        description: "The citation details have been automatically filled in.",
        type: "success"
      });
    } catch (error) {
      console.error('Error extracting citation:', error);
      toast({
        title: "Extraction Failed",
        description: error instanceof Error ? error.message : "Failed to extract citation details",
        type: "error"
      });
    }
  }, [formData.type]);

  const renderTypeSpecificFields = () => {
    console.log('renderTypeSpecificFields called with type:', formData.type);

    const fields = (() => {
      switch (formData.type) {
        case 'custom':
          return (
            <div key="custom-fields" className="space-y-4">
              <div className="space-y-2">
                <Label>Citation Text</Label>
                <div className="border border-gray-300 rounded-md p-2 min-h-[150px] bg-white focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-0">
                  <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Enter your citation text..."
                    style={editorStyles.editor}
                  />
                </div>
              </div>
            </div>
          );

        // Judicial Decisions
        case 'case_reported':
          return (
            <div key="case-reported-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('year', 'Year')}
              {renderInput('volume', 'Volume')}
              {renderInput('law_report_series', 'Law Report Series')}
              {renderInput('starting_page', 'Starting Page')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'case_unreported_medium_neutral':
          return (
            <div key="case-unreported-mn-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('year', 'Year')}
              {renderInput('unique_court_identifier', 'Unique Court Identifier')}
              {renderInput('judgment_number', 'Judgment Number')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'case_unreported_no_medium_neutral':
          return (
            <div key="case-unreported-no-mn-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('court', 'Court')}
              {renderInput('judge', 'Judge(s)')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'proceeding':
          return (
            <div key="proceeding-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('court', 'Court')}
              {renderInput('proceeding_number', 'Proceeding Number')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
            </div>
          );

        case 'court_order':
          return (
            <div key="court-order-fields" className="space-y-4">
              {renderInput('judicial_officers', 'Judicial Officer(s)')}
              {renderInput('case_name', 'Case Name')}
              {renderInput('court', 'Court')}
              {renderInput('proceeding_number', 'Proceeding Number')}
            </div>
          );

        case 'arbitration':
          return (
            <div key="arbitration-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('award_description', 'Award Description')}
              {renderInput('forum', 'Forum')}
              {renderInput('case_award_number', 'Case/Award No #')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'transcript_of_proceedings':
          return (
            <div key="transcript-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('court', 'Court')}
              {renderInput('proceeding_number', 'Proceeding Number')}
              {renderInput('judicial_officers', 'Judicial Officer(s)')}
              <div className="space-y-2">
                <Label>Full Date of Proceedings</Label>
                <FlexibleDateInput
                  label="Full Date of Proceedings"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'high_court_transcript':
          return (
            <div key="hc-transcript-fields" className="space-y-4">
              {renderInput('case_name', 'Case Name')}
              {renderInput('year', 'Year')}
              {renderInput('number', 'Number')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'submission':
          return (
            <div key="submission-fields" className="space-y-4">
              {renderInput('party_name', 'Party Name')}
              {renderInput('title', 'Title of Submission')}
              {renderInput('case_name', 'Case Name')}
              {renderInput('proceeding_number', 'Proceeding Number')}
              <div className="space-y-2">
                <Label>Full Date of Submission</Label>
                <FlexibleDateInput
                  label="Full Date of Submission"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        // Legislative Materials
        case 'act':
          return (
            <div key="legislation-fields" className="space-y-4">
              {renderInput('title', 'Title')}
              {renderInput('year', 'Year')}
              {renderInput('jurisdiction', 'Jurisdiction')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'delegated_legislation':
          return (
            <div key="delegated-legislation-fields" className="space-y-4">
              {renderInput('title', 'Title')}
              {renderInput('year', 'Year')}
              {renderInput('jurisdiction', 'Jurisdiction')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'bill':
          return (
            <div key="bill-fields" className="space-y-4">
              {renderInput('title', 'Title')}
              {renderInput('year', 'Year')}
              {renderInput('jurisdiction', 'Jurisdiction')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'explanatory_memorandum':
          return (
            <div key="explanatory-memorandum-fields" className="space-y-4">
              {renderInput('explanatory_type', 'Explanatory Type')}
              {renderInput('bill_citation', 'Bill Citation')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'hansard':
          return (
            <div key="hansard-fields" className="space-y-4">
              {renderInput('jurisdiction', 'Jurisdiction')}
              {renderInput('chamber', 'Chamber')}
              <div className="space-y-2">
                <Label>Full Date of Debate</Label>
                <FlexibleDateInput
                  label="Full Date of Debate"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
              {renderInput('name_of_speaker', 'Name of Speaker')}
            </div>
          );

        case 'gazette':
          return (
            <div key="gazette-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s) (if applicable)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title_of_notice', 'Title of Notice (if applicable)')}
              {renderInput('jurisdiction', 'Jurisdiction')}
              {renderInput('gazette_title', 'Gazette Title')}
              {renderInput('gazette_number', 'Gazette Number')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('starting_page', 'Starting Page')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'order_or_ruling':
          return (
            <div key="order-ruling-fields" className="space-y-4">
              {renderInput('instrumentality_officer', 'Instrumentality/Officer')}
              {renderInput('instrument_title', 'Instrument Title')}
              {renderInput('document_number', 'Document Number')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'court_practice_direction':
          const [citationType, setCitationType] = useState(
            formData.citation_report_series ? 'report_series' : 
            formData.full_date ? 'full_date' : 'report_series'
          );

          return (
            <div key="practice-direction-fields" className="space-y-4">
              {renderInput('court', 'Court')}
              {renderInput('practice_direction', 'Practice Direction/Note')}
              {renderInput('number_identifier', 'Number/Identifier')}
              {renderInput('title', 'Title of Practice Direction/Note')}
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={citationType === 'report_series' ? 'outline' : 'default'}
                  onClick={() => {
                    setCitationType('report_series');
                    handleDateChange('full_date', null);
                  }}
                >
                  Report Series
                </Button>
                <Button
                  type="button"
                  variant={citationType === 'full_date' ? 'outline' : 'default'}
                  onClick={() => {
                    setCitationType('full_date');
                    setFormData(prev => ({
                      ...prev,
                      citation_report_series: ''
                    }));
                  }}
                >
                  Full Date
                </Button>
              </div>

              {citationType === 'report_series' ? (
                <Input
                  type="text"
                  name="citation_report_series"
                  value={formData.citation_report_series || ''}
                  onChange={handleChange}
                  className="flex-1"
                />
              ) : (
                <FlexibleDateInput
                  label=""
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              )}
              
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        // Secondary Sources
        case 'journal_article':
          return (
            <div key="journal-article-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('year', 'Year')}
              {renderInput('volume', 'Volume')}
              {renderInput('issue', 'Issue')}
              {renderInput('journal', 'Journal')}
              {renderInput('starting_page', 'Starting Page')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'symposium':
          return (
            <div key="symposium-fields" className="space-y-4">
              {renderInput('title', 'Title')}
              {renderInput('year', 'Year')}
              {renderInput('volume', 'Volume')}
              {renderInput('issue', 'Issue')}
              {renderInput('journal', 'Journal')}
              {renderInput('starting_page', 'Starting Page')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'book':
          return (
            <div key="book-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('publisher', 'Publisher')}
              {renderInput('edition', 'Edition')}
              {renderInput('year', 'Year')}
              {renderInput('volume', 'Volume (Optional)')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'book_chapter':
          return (
            <div key="book-chapter-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('chapter_title', 'Chapter Title')}
              <div key="editors-section" className="space-y-4">
                <Label>Editor(s)</Label>
                {Array.isArray(formData.editors) && formData.editors.map((editor, index) => (
                  <div key={`editor-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={editor}
                      onChange={(e) => handleEditorChange(index, e.target.value)}
                      placeholder={`Editor ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeEditor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEditor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
              Add Editor
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('publisher', 'Publisher')}
              {renderInput('edition', 'Edition')}
              {renderInput('year', 'Year')}
              {renderInput('volume', 'Volume (Optional)')}
              {renderInput('starting_page', 'Starting Page')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'book_with_editor':
          return (
            <div key="book-editor-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              <div key="editors-section" className="space-y-4">
                <Label>Editor(s)</Label>
                {Array.isArray(formData.editors) && formData.editors.map((editor, index) => (
                  <div key={`editor-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={editor}
                      onChange={(e) => handleEditorChange(index, e.target.value)}
                      placeholder={`Editor ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeEditor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEditor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Editor
                </Button>
              </div>
              {renderInput('publisher', 'Publisher')}
              {renderInput('edition', 'Edition')}
              {renderInput('year', 'Year')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'translated_book':
          return (
            <div key="translated-book-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('translation_title', 'Translation Title')}
              {renderInput('translator', 'Translator')}
              {renderInput('publisher', 'Publisher')}
              {renderInput('edition', 'Edition')}
              {renderInput('year', 'Year')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'audiobook':
          return (
            <div key="audiobook-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('publisher', 'Publisher')}
              {renderInput('publication_year', 'Publication Year')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'report':
          return (
            <div key="report-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('document_type_series', 'Document Type/Series')}
              {renderInput('document_number', 'Document Number')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'research_paper':
          return (
            <div key="research-paper-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('document_type_series', 'Document Type/Series')}
              {renderInput('document_number', 'Document Number')}
              {renderInput('institution_forum', 'Institution/Forum')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'speech':
          return (
            <div key="speech-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('speech_or_lecture', 'Speech or Lecture')}
              {renderInput('institution_forum', 'Institution/Forum')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'press_and_media_release':
          return (
            <div key="press-release-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('release_type', 'Release Type')}
              {renderInput('document_number', 'Document Number')}
              {renderInput('body', 'Body')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'hard_copy_dictionary':
          return (
            <div key="hard-copy-dictionary-fields" className="space-y-4">
              {renderInput('dictionary_title', 'Dictionary Title')}
              {renderInput('edition_number', 'Edition Number')}
              {renderInput('publication_year', 'Publication Year')}
              {renderInput('entry_title', 'Entry Title')}
              {renderInput('definition_number', 'Definition Number')}
            </div>
          );

        case 'online_dictionary':
          return (
            <div key="online-dictionary-fields" className="space-y-4">
              {renderInput('dictionary_title', 'Dictionary Title')}
              <div className="space-y-2">
                <Label>Date of Retrieval</Label>
                <FlexibleDateInput
                  label="Date of Retrieval"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('entry_title', 'Entry Title')}
              {renderInput('definition_number', 'Definition Number')}
            </div>
          );

        case 'hard_copy_legal_encyclopedia':
          return (
            <div key="hard-copy-encyclopedia-fields" className="space-y-4">
              {renderInput('publisher', 'Publisher')}
              {renderInput('title_of_encyclopedia', 'Title of Encyclopedia')}
              {renderInput('volume_number', 'Volume Number')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('title_number', 'Title Number')}
              {renderInput('name_of_title', 'Name of Title')}
              {renderInput('chapter_number', 'Chapter Number')}
              {renderInput('name_of_chapter', 'Name of Chapter')}
              {renderInput('paragraph', 'Paragraph')}
            </div>
          );

        case 'online_legal_encyclopedia':
          return (
            <div key="online-encyclopedia-fields" className="space-y-4">
              {renderInput('publisher', 'Publisher')}
              {renderInput('title_of_encyclopedia', 'Title of Encyclopedia')}
              <div className="space-y-2">
                <Label>Date of Retrieval</Label>
                <FlexibleDateInput
                  label="Date of Retrieval"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('title_number', 'Title Number')}
              {renderInput('name_of_title', 'Name of Title')}
              {renderInput('chapter_number', 'Chapter Number')}
              {renderInput('name_of_chapter', 'Name of Chapter')}
              {renderInput('paragraph', 'Paragraph')}
            </div>
          );

        case 'printed_newspaper':
          return (
            <div key="printed-newspaper-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('newspaper', 'Newspaper')}
              {renderInput('place_of_publication', 'Place of Publication')}
            </div>
          );

        case 'online_newspaper':
          return (
            <div key="online-newspaper-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('newspaper', 'Newspaper')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('url', 'URL')}
            </div>
          );

        case 'periodical':
          return (
            <div key="periodical-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Article Title')}
              {renderInput('periodical_name', 'Periodical Name')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('starting_page', 'Starting Page', 'number')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'interview':
          return (
            <div key="interview-fields" className="space-y-4">
              {renderInput('interviewee', 'Interviewee')}
              {renderInput('interviewer', 'Interviewer')}
              {renderInput('program', 'Program/Publication')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('medium', 'Medium')}
              {renderInput('url', 'URL')}
            </div>
          );

        case 'film_television_media':
          return (
            <div key="media-fields" className="space-y-4">
              {renderInput('episode_title', 'Episode Title')}
              {renderInput('film_series_title', 'Film Series Title')}
              {renderInput('version_details', 'Version Details')}
              {renderInput('studio_producer', 'Studio Producer')}
              {renderInput('year', 'Year')}
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'internet_material':
          return (
            <div key="internet-material-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('title', 'Title')}
              {renderInput('website_name', 'Website Name')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('url', 'URL')}
              <div className="space-y-2">
                <Label>Retrieval Date</Label>
                <FlexibleDateInput
                  label="Retrieval Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
            </div>
          );

        case 'social_media_post':
          return (
            <div key="social-media-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('platform', 'Platform')}
              {renderInput('post_content', 'Post Content')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('url', 'URL')}
            </div>
          );

        // Miscellaneous
        case 'written_submission':
          return (
            <div key="written-submission-fields" className="space-y-4">
              <div key="authors-section" className="space-y-4">
                <Label>Author(s)</Label>
                {Array.isArray(formData.authors) && formData.authors.map((author, index) => (
                  <div key={`author-${index}`} className="flex gap-2 mb-2">
                    <Input
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
              {renderInput('number', 'Number')}
              {renderInput('body', 'Body')}
              {renderInput('name_of_inquiry', 'Name of Inquiry')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'evidence_to_parliamentary_committee':
          return (
            <div key="parliamentary-committee-fields" className="space-y-4">
              {renderInput('committee', 'Committee')}
              {renderInput('legislature', 'Legislature')}
              {renderInput('location', 'Location')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
              {renderInput('name_of_speaker', 'Name of Speaker')}
            </div>
          );

        case 'constitutional_convention_debates':
          return (
            <div key="convention-debates-fields" className="space-y-4">
              {renderInput('title', 'Title')}
              {renderInput('location', 'Location')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
              {renderInput('name_of_speaker', 'Name of Speaker')}
            </div>
          );

        case 'intellectual_property':
          return (
            <div key="intellectual-property-fields" className="space-y-4">
              {renderInput('jurisdiction_code', 'Jurisdiction Code')}
              {renderInput('ip_type', 'Intellectual Property Type')}
              {renderInput('additional_info', 'Additional Information')}
              {renderInput('identification_number', 'Identification Number')}
              <div className="space-y-2">
                <Label>Filing Date</Label>
                <FlexibleDateInput
                  label="Filing Date"
                  value={formData.filing_date ?? ''}
                  onChange={(value) => handleDateChange('filing_date', value)}
                />
              </div>
              {renderInput('registration_status', 'Latest Registration Status Change')}
              <div className="space-y-2">
                <Label>Status Change Date</Label>
                <FlexibleDateInput
                  label="Status Change Date"
                  value={formData.status_change_date ?? ''}
                  onChange={(value) => handleDateChange('status_change_date', value)}
                />
              </div>
            </div>
          );

        case 'treaty':
          return (
            <div key="treaty-fields" className="space-y-4">
              {renderInput('treaty_title', 'Treaty Title')}
              {renderInput('parties_names', 'Parties\' Names')}
              <div className="space-y-2">
                <Label>Date Opened for Signature or Signed</Label>
                <FlexibleDateInput
                  label="Date Opened for Signature or Signed"
                  value={formData.signature_date ?? ''}
                  onChange={(value) => handleDateChange('signature_date', value)}
                />
              </div>
              {renderInput('treaty_series', 'Treaty Series')}
              <div className="space-y-2">
                <Label>Date of Entry into Force</Label>
                <FlexibleDateInput
                  label="Date of Entry into Force"
                  value={formData.entry_force_date ?? ''}
                  onChange={(value) => handleDateChange('entry_force_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'delegated_non_government_legislation':
          return (
            <div key="delegated-non-government-fields" className="space-y-4">
              {renderInput('issuing_body', 'Issuing Body')}
              {renderInput('title', 'Title')}
              <div className="space-y-2">
                <Label>Full Date</Label>
                <FlexibleDateInput
                  label="Full Date"
                  value={formData.full_date ?? ''}
                  onChange={(value) => handleDateChange('full_date', value)}
                />
              </div>
              {renderInput('pinpoint', 'Pinpoint')}
            </div>
          );

        case 'westlaw_case':
          return (
            <div key="westlaw-case-fields" className="space-y-4">
              {renderTextArea('raw_text', 'Paste Citation from Westlaw', 10)}
            </div>
          );

        case 'lexisnexis_case':
          return (
            <div key="lexisnexis-case-fields" className="space-y-4">
              {renderTextArea('raw_text', 'Paste Citation from LexisNexis', 10)}
            </div>
          );

        case 'ssrn_article':
          return (
            <div key="ssrn-article-fields" className="space-y-4">
              {renderTextArea('raw_text', 'Paste Citation from SSRN', 10)}
            </div>
          );

        case 'scholar_article':
          return (
            <div key="scholar-article-fields" className="space-y-4">
              {renderTextArea('raw_text', 'Paste Citation from Google Scholar', 10)}
            </div>
          );

        case 'scholar_book':
          return (
            <div key="scholar-book-fields" className="space-y-4">
              {renderTextArea('raw_text', 'Paste Citation from Google Scholar', 10)}
            </div>
          );

        case 'jade_case':
          return (
            <div key="jade-case-fields" className="space-y-4">
              {renderTextArea('raw_text', 'Paste Citation from Jade Professional', 10)}
            </div>
          );

        default:
          return null;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={formData.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {fields}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Add this helper function
  const isEditing = useCallback(() => {
    return Object.keys(initialValues).length > 0;
  }, [initialValues]);

  // Add at the top of the component
  useEffect(() => {
    console.log('formData changed:', formData);
  }, [formData]);

  // Add state to control the CitationTypeSelector dialog
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(!initialValues.type);

  const [editorState, setEditorState] = useState(() => {
    if (initialValues?.formatted_citation) {
      try {
        const contentState = convertFromRaw(JSON.parse(initialValues.formatted_citation));
        return EditorState.createWithContent(contentState);
      } catch {
        // If the formatted_citation is not in Draft.js format, create empty editor
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (initialValues) {
      formData.append('id', initialValues.id.toString());
    }
    formData.append('type', formData.type);
    formData.append('project_id', formData.project_id.toString());
    if (Array.isArray(formData.authors)) {
      formData.append('authors', JSON.stringify(formData.authors));
    }
    if (Array.isArray(formData.editors)) {
      formData.append('editors', JSON.stringify(formData.editors));
    }
    if (Array.isArray(formData.tags)) {
      formData.append('tags', JSON.stringify(formData.tags));
    }
    if (formData.type === 'custom') {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      formData.append('formatted_citation', JSON.stringify(rawContent));
    } else {
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'type' && key !== 'project_id' && key !== 'authors' && key !== 'editors' && key !== 'tags') {
          formData.append(key, value.toString());
        }
      });
    }
    onSubmit(formData);
  };

  // Memoize renderInput
  const renderInput = useCallback((fieldName: string, label: string, type: string = 'text') => {
    const addBrackets = (type: 'round' | 'square') => {
      const currentValue = formData[fieldName as keyof typeof formData] as string || '';
      // Remove any existing brackets first
      const cleanValue = currentValue.replace(/[\[\]\(\)]/g, '').trim();
      const newValue = type === 'round' ? `(${cleanValue})` : `[${cleanValue}]`;
      handleChange({ target: { name: fieldName, value: newValue } } as React.ChangeEvent<HTMLInputElement>);
    };

    // Add this helper function
    const getInputValue = (value: any): string => {
      if (value === null || value === undefined) {
        return '';
      }
      return value?.toString() || '';
    };

    return (
      <div key={fieldName} className="space-y-2">
        <Label 
          htmlFor={fieldName}
        >
          {label}
        </Label>
        <div className="flex gap-2">
          {fieldName === 'type' && (
            <div className="flex items-center gap-2 px-3 border rounded-md bg-gray-50">
              {Object.values(citationTypes).flat().find(type => type.value === formData.type)?.icon}
            </div>
          )}
          <Input
            type={type}
            id={fieldName}
            name={fieldName}
            value={fieldName === 'type' ? Object.values(citationTypes).flat().find(type => type.value === formData.type)?.label || '' : getInputValue(formData[fieldName as keyof typeof formData])}
            onChange={handleChange}
            onFocus={() => {
              setActiveField(fieldName);
              setLastActiveField(fieldName);
            }}
            className="flex-1"
            readOnly={fieldName === 'type'}
          />
          {fieldName.includes('year') && (formData.type !== 'act' && formData.type !== 'delegated_legislation' && formData.type !== 'bill' && formData.type !== 'book' && formData.type !== 'book_chapter' && formData.type !== 'book_with_editor' && formData.type !== 'translated_book' && formData.type !== 'audiobook' && formData.type !== 'high_court_transcript') && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => addBrackets('round')}
                className="px-3 whitespace-nowrap"
                title="Add round brackets"
              >
                ( ... )
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => addBrackets('square')}
                className="px-3 whitespace-nowrap"
                title="Add square brackets"
              >
                [ ... ]
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }, [formData, handleChange, setActiveField, setLastActiveField]);

  const renderTextArea = useCallback((fieldName: string, label: string, rows: number = 10) => {
    return (
      <div key={fieldName} className="space-y-2">
        <Label htmlFor={fieldName}>{label}</Label>
        <Textarea
          id={fieldName}
          name={fieldName}
          value={formData[fieldName as keyof typeof formData] as string || ''}
          onChange={(e) => handleRawTextChange(fieldName, e.target.value)}
          onFocus={() => {
            setActiveField(fieldName);
            setLastActiveField(fieldName);
          }}
          rows={rows}
          className="min-h-[200px]"
        />
      </div>
    );
  }, [formData, setActiveField, setLastActiveField, handleRawTextChange]);

  return (
    <Dialog open onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[90vw] lg:max-w-[1170px] h-[90vh] bg-white flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEditing() ? 'Edit Citation' : 'Add Citation'}
          </DialogTitle>
          <DialogDescription>
            Fill in the citation details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          <div className="space-y-4 overflow-y-auto px-4 pb-4">
            <CitationTypeSelector
              value={formData.type}
              onChange={handleTypeChange}
              initiallyOpen={!initialValues.type}
            />
            {formData.type && renderTypeSpecificFields()}
          </div>
          <div className="overflow-y-auto border-l pl-4">
            <CitationRules activeField={lastActiveField} citationType={formData.type} />
          </div>
        </div>

        <DialogFooter className="flex flex-col px-4 pt-4 pb-0 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="flex-grow">
              <p className="text-sm bg-white p-3 rounded-md border shadow-sm" dangerouslySetInnerHTML={{ __html: generatePreviewText(formData.type, formData)
                .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
                .replace(/•/g, '<span class="text-blue-800 mx-1">•</span>') }} />
            </div>
            <div className="flex gap-2 shrink-0 ml-4 my-1">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-black text-white hover:bg-gray-800 px-4 rounded-md flex items-center"
              >
                {isEditing() ? 'Update' : 'Add'} Citation
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 rounded-md flex items-center"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
