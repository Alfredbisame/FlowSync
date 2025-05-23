import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Clock,
  AlertCircle
} from 'lucide-react';
import TeamPerformance from '../components/dashboard/TeamPerformance';
import DepartmentCard from '../components/dashboard/DepartmentCard';
import { 
  mockUsers, 
  mockDepartmentPerformance, 
  mockUserPerformance,
  mockProjectProgress
} from '../data/mockData';

const AnalyticsPage: React.FC = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500">
          You don't have permission to access the analytics page.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Comprehensive view of your organization's performance
        </p>
      </div>
      
      {/* Project Progress Chart */}
      <Card title="Project Progress" className="mb-8">
        <div className="h-80">
          {/* This would typically be a chart component */}
          <div className="flex h-full items-end justify-between">
            {mockProjectProgress.map((data, index) => (
              <div key={index} className="flex flex-col items-center w-1/6">
                <div className="flex w-full justify-center space-x-2">
                  <div 
                    className="w-8 bg-blue-500 rounded-t-md" 
                    style={{ height: `${data.completedTasks * 2}px` }}
                  ></div>
                  <div 
                    className="w-8 bg-gray-300 rounded-t-md" 
                    style={{ height: `${data.estimatedTasks * 2}px` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">{data.month}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-sm mr-1"></div>
              <span>Estimated</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Department Performance */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          Department Performance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDepartmentPerformance.map((dept, index) => (
            <DepartmentCard key={index} department={dept} />
          ))}
        </div>
      </div>
      
      {/* Team Performance */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Team Performance
        </h2>
        
        <TeamPerformance users={mockUsers} performance={mockUserPerformance} />
      </div>
      
      {/* Resource Allocation */}
      <Card title="Resource Allocation" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">Engineering</h3>
            <p className="text-2xl font-bold mt-2">68%</p>
            <p className="text-sm text-gray-500 mt-1">Resource utilization</p>
          </div>
          
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">Marketing</h3>
            <p className="text-2xl font-bold mt-2">72%</p>
            <p className="text-sm text-gray-500 mt-1">Resource utilization</p>
          </div>
          
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">Sales</h3>
            <p className="text-2xl font-bold mt-2">85%</p>
            <p className="text-sm text-gray-500 mt-1">Resource utilization</p>
          </div>
          
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">Operations</h3>
            <p className="text-2xl font-bold mt-2">76%</p>
            <p className="text-sm text-gray-500 mt-1">Resource utilization</p>
          </div>
        </div>
      </Card>
      
      {/* Productivity Metrics */}
      <Card title="Productivity Metrics">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Avg. Task Completion Time
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2.8 days</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">3.2 days</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> 12.5%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  On-Time Delivery Rate
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">92%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">88%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> 4.5%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Resource Utilization
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">78%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">72%</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> 8.3%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;