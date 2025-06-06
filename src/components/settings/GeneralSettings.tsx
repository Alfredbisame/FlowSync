import React from 'react';

interface GeneralSettingsProps {
  darkMode: boolean;
  highContrast: boolean;
  setDarkMode: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  darkMode, 
  highContrast, 
  setDarkMode, 
  setHighContrast 
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            defaultValue="Bisame Digital"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Time Zone</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>UTC</option>
            <option selected>West Africa Time (UTC+0)</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Theme Settings</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              id="darkMode"
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
              Enable Dark Mode
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="highContrast"
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="highContrast" className="ml-2 block text-sm text-gray-700">
              High Contrast Mode
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
        <button className="ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;