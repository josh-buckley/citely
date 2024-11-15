import React from 'react';

interface EmptyStateProps {
  onCreateProject: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateProject }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">No projects found</h2>
      <p className="text-gray-600 mb-4">Create a new project to get started</p>
      <button
        onClick={onCreateProject}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create New Project
      </button>
    </div>
  );
};

// If there's no default export, add this line:
// export default EmptyState;
