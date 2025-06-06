import React from 'react';
import DepartmentCard from '../dashboard/DepartmentCard';

interface DepartmentPerformanceData {
  department: string;
  tasksCompleted: number;
  tasksInProgress: number;
  averageCompletionTime: number; // in days
  ticketsRaised: number;
}

interface DepartmentPerformanceProps {
  departments: DepartmentPerformanceData[];
}

const DepartmentPerformance: React.FC<DepartmentPerformanceProps> = ({ departments }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📊</span>
        Department Performance
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <DepartmentCard 
            key={index} 
            department={{
              department: dept.department,
              tasksCompleted: dept.tasksCompleted,
              tasksInProgress: dept.tasksInProgress,
              averageCompletionTime: dept.averageCompletionTime,
              ticketsRaised: dept.ticketsRaised
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentPerformance;
