import React from 'react';

interface DepartmentsSettingsProps {
  departments: string[];
  newDepartment: string;
  setNewDepartment: (value: string) => void;
  handleAddDepartment: (e: React.FormEvent) => void;
  handleRemoveDepartment: (dept: string) => void;
}

const DepartmentsSettings: React.FC<DepartmentsSettingsProps> = ({ 
  departments, 
  newDepartment, 
  setNewDepartment, 
  handleAddDepartment, 
  handleRemoveDepartment 
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Department Management</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Existing Departments</h3>
        <div className="flex flex-wrap gap-2">
          {departments.map(dept => (
            <div key={dept} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {dept}
              <button 
                onClick={() => handleRemoveDepartment(dept)}
                className="ml-2 text-blue-600 hover:text-blue-900"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleAddDepartment} className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Add New Department</h3>
        <div className="flex">
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Enter department name"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentsSettings;