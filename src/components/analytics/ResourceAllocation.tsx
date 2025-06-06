import React from 'react';
import Card from '../ui/Card';

const ResourceAllocation: React.FC = () => {
  const departments = [
    { name: 'Engineering', utilization: 68, icon: '👤', color: 'bg-blue-100 text-blue-600' },
    { name: 'Marketing', utilization: 72, icon: '👤', color: 'bg-orange-100 text-orange-600' },
    { name: 'Sales', utilization: 85, icon: '👤', color: 'bg-green-100 text-green-600' },
    { name: 'Operations', utilization: 76, icon: '👤', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <Card title="Resource Allocation" className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <div key={index} className="text-center p-4">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${dept.color} mb-4`}>
              <span className="text-xl">{dept.icon}</span>
            </div>
            <h3 className="text-lg font-semibold">{dept.name}</h3>
            <p className="text-2xl font-bold mt-2">{dept.utilization}%</p>
            <p className="text-sm text-gray-500 mt-1">Resource utilization</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ResourceAllocation;