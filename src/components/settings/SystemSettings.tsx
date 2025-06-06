import React from 'react';
// import { mockUsers, mockProjects } from '../../data/mockData';

interface SystemSettingsProps {
  mockUsers: any[];
  mockProjects: any[];
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ mockUsers, mockProjects }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">System Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Application Info</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Version</dt>
              <dd className="text-sm font-medium text-gray-900">v2.4.1</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Last Updated</dt>
              <dd className="text-sm font-medium text-gray-900">2025-06-6</dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Usage Statistics</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Total Users</dt>
              <dd className="text-sm font-medium text-gray-900">{mockUsers.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Total Projects</dt>
              <dd className="text-sm font-medium text-gray-900">{mockProjects.length}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;