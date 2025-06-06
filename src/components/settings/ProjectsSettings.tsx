import React from 'react';

interface ProjectsSettingsProps {
  projectTags: string[];
  handleAddTag: (e: React.FormEvent, newTag: string) => void;
}

const ProjectsSettings: React.FC<ProjectsSettingsProps> = ({ projectTags, handleAddTag }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Project Tags */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Project Tags</h3>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {projectTags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {tag}
                  <button className="ml-2 text-indigo-600 hover:text-indigo-900">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <form onSubmit={(e) => handleAddTag(e, '')} className="flex">
            <input
              type="text"
              placeholder="New tag"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleAddTag(e, e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSettings;