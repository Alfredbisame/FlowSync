import React from 'react';
import { User, UserPerformance } from '../../types';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';

interface TeamPerformanceProps {
  users: User[];
  performance: UserPerformance[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ users, performance }) => {
  // Combine user data with performance data
  const teamData = performance.map(perf => {
    const user = users.find(u => u.id === perf.userId);
    return {
      ...perf,
      user
    };
  });
  
  return (
    <Card title="Team Performance">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Member
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasks
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg. Completion
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                On-Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamData.map((member) => (
              <tr key={member.userId}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar 
                        src={member.user?.avatar} 
                        name={member.user?.name || ''} 
                        size="sm" 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.user?.name}</div>
                      <div className="text-sm text-gray-500">{member.user?.position}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.tasksCompleted} completed</div>
                  <div className="text-sm text-gray-500">{member.tasksInProgress} in progress</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.averageCompletionTime} days</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{(member.onTimeDelivery * 100).toFixed(0)}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${member.onTimeDelivery * 100}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TeamPerformance;