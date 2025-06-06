import React from 'react';
import { useAuth } from '../context/AuthContext';
// import Card from '../components/ui/Card';
import { AlertCircle } from 'lucide-react';
import ProjectProgressChart from '../components/analytics/ProjectProgressChart';
import DepartmentPerformance from '../components/analytics/DepartmentPerformance';
import TeamPerformanceSection from '../components/analytics/TeamPerformanceSection';
import ResourceAllocation from '../components/analytics/ResourceAllocation';
import ProductivityMetrics from '../components/analytics/ProductivityMetrics';
import { mockProjectProgress } from '../data/mockData';
import { mockDepartmentPerformance, mockUsers, mockUserPerformance } from '../data/mockData';

const AnalyticsPage: React.FC = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
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
      
      <ProjectProgressChart data={mockProjectProgress} />
      <DepartmentPerformance departments={mockDepartmentPerformance} />
      <TeamPerformanceSection users={mockUsers} performanceData={mockUserPerformance} />
      <ResourceAllocation />
      <ProductivityMetrics />
    </div>
  );
};

export default AnalyticsPage;