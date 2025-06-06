import React from 'react';
import { Task } from '../../types';
import Card from '../ui/Card';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface TaskStatusChartProps {
  tasks: Task[];
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
  const COLORS = [
    '#10B981', // Green for completed
    '#3B82F6', // Blue for in progress
    '#F59E0B', // Amber for pending
    '#EF4444', // Red for overdue
    '#6B7280', // Gray for todo
    '#8B5CF6', // Purple for additional statuses
    '#EC4899', // Pink for additional statuses
  ];

  const STATUS_COLORS: Record<string, string> = {
    'Completed': '#10B981',
    'In Progress': '#3B82F6',
    'Pending': '#F59E0B',
    'Todo': '#6B7280',
    'Overdue': '#EF4444',
    'Review': '#8B5CF6',
    'Blocked': '#EC4899',
  };

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalTasks = tasks.length;
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / totalTasks) * 100).toFixed(1),
    color: STATUS_COLORS[name] || COLORS[Object.keys(statusCounts).indexOf(name) % COLORS.length]
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            Tasks: <span className="font-medium text-gray-800">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-medium text-gray-800">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label function
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom legend component
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 font-medium">
              {entry.value} ({statusCounts[entry.value]})
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (statusData.length === 0) {
    return (
      <Card title="Task Status Distribution" className="bg-gradient-to-br from-white to-gray-50">
        <div className="h-80 flex flex-col items-center justify-center text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No tasks available</p>
          <p className="text-sm text-gray-400 mt-1">Tasks will appear here once created</p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Task Status Distribution" 
      subtitle={`Total: ${totalTasks} tasks`}
      className="bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-shadow duration-300"
    >
      <div className="h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {statusData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={<CustomLegend />}
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text showing total */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{totalTasks}</div>
            <div className="text-sm text-gray-500 font-medium">Total Tasks</div>
          </div>
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusData.slice(0, 4).map((status, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-gray-50">
              <div 
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: status.color }}
              />
              <div className="text-xs font-medium text-gray-600 truncate">{status.name}</div>
              <div className="text-sm font-bold text-gray-800">{status.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TaskStatusChart;
