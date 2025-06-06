import React from 'react';
import TeamPerformance from '../dashboard/TeamPerformance';

interface TeamPerformanceSectionProps {
  users: Array<{
    id: string;
    name: string;
    department: string;
    role: string;
    tasks: number;
    completed: number;
    overdue: number;
    email: string;
    isActive: boolean;
    createdAt: string;
  }>;
  performanceData: Array<{
    userId: string;
    efficiency: number;
    avgCompletionTime: string;
    activeProjects: number;
  }>;
}

const TeamPerformanceSection: React.FC<TeamPerformanceSectionProps> = ({ users, performanceData }) => {
  return (
    <div className='mb-8'>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">👥</span>
        Team Performance
      </h2>
      
      <TeamPerformance users={users} performance={performanceData} />
    </div>
  );
};

export default TeamPerformanceSection;