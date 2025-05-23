import React from 'react';
import { DepartmentPerformance } from '../../types';
import Card from '../ui/Card';

interface DepartmentCardProps {
  department: DepartmentPerformance;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const completion = department.tasksCompleted / (department.tasksCompleted + department.tasksInProgress) * 100;
  
  return (
    <Card>
      <div className="flex flex-col">
        <h3 className="font-medium text-lg text-gray-900 mb-1">{department.department}</h3>
        
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Tasks Completed</p>
            <p className="text-lg font-semibold mt-1">{department.tasksCompleted}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-lg font-semibold mt-1">{department.tasksInProgress}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-500">Completion Rate</p>
            <p className="text-sm font-medium text-gray-900">{Math.round(completion)}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">Average Completion Time</p>
          <p className="text-lg font-semibold mt-1">{department.averageCompletionTime} days</p>
        </div>
      </div>
    </Card>
  );
};

export default DepartmentCard;