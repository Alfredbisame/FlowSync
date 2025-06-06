import React from 'react';
import { mockProjects } from '../data/mockData';

const ProjectsPage: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Projects Dashboard</h1>
      
      {/* Project Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Total Projects</h3>
          <p className="text-2xl font-semibold mt-1">{mockProjects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Active Projects</h3>
          <p className="text-2xl font-semibold mt-1">{mockProjects.filter(p => p.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Completed Projects</h3>
          <p className="text-2xl font-semibold mt-1">{mockProjects.filter(p => p.status === 'Completed').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Total Budget</h3>
          <p className="text-2xl font-semibold mt-1">{formatCurrency(mockProjects.reduce((sum, p) => sum + p.budget, 0))}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Total Spent</h3>
          <p className="text-2xl font-semibold mt-1">{formatCurrency(mockProjects.reduce((sum, p) => sum + p.spent, 0))}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Average Progress</h3>
          <p className="text-2xl font-semibold mt-1">{Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">On Time</h3>
          <p className="text-2xl font-semibold mt-1">{mockProjects.filter(p => 
            p.status === 'Completed' || new Date(p.endDate) > new Date()
          ).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium">Overdue</h3>
          <p className="text-2xl font-semibold mt-1">{mockProjects.filter(p => 
            p.status !== 'Completed' && new Date(p.endDate) < new Date()
          ).length}</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProjects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'Planning' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      project.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(project.startDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(project.endDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{project.progress}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(project.budget)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(project.spent)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.teamMembers.length} members</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;