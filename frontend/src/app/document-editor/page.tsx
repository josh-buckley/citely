'use client';
import { useRouter } from 'next/navigation';

import React from 'react';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';

// Register Toolbar with Editor
DocumentEditorContainerComponent.Inject(Toolbar);

const DocumentEditor: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <DocumentEditorContainerComponent 
        id="documentEditor"
        style={{ height: 'calc(100vh - 8rem)', minHeight: '600px' }}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        enableToolbar={true}
      />
    </div>
  );
};

export default DocumentEditor;