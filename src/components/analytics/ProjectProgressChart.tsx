import React from 'react';
import Card from '../ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer} from 'recharts';

interface ProjectProgressProps {
  data: Array<{
    month: string;
    completedTasks: number;
    estimatedTasks: number;
  }>;
}

const ProjectProgressChart: React.FC<ProjectProgressProps> = ({ data }) => {
  // Transform data to include additional metrics
  const chartData = data.map(item => ({
    ...item,
    completionRate: item.estimatedTasks > 0 ? 
      Math.round((item.completedTasks / item.estimatedTasks) * 100) : 0,
    remainingTasks: Math.max(0, item.estimatedTasks - item.completedTasks)
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-blue-600">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm mr-2"></span>
              Completed: <span className="font-medium">{data.completedTasks}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="inline-block w-3 h-3 bg-gray-400 rounded-sm mr-2"></span>
              Estimated: <span className="font-medium">{data.estimatedTasks}</span>
            </p>
            <p className="text-sm text-green-600">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-sm mr-2"></span>
              Completion Rate: <span className="font-medium">{data.completionRate}%</span>
            </p>
            {data.remainingTasks > 0 && (
              <p className="text-sm text-orange-600">
                <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm mr-2"></span>
                Remaining: <span className="font-medium">{data.remainingTasks}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.value === 'completedTasks' ? 'Completed Tasks' : 'Estimated Tasks'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Calculate summary statistics
  const totalCompleted = chartData.reduce((sum, item) => sum + item.completedTasks, 0);
  const totalEstimated = chartData.reduce((sum, item) => sum + item.estimatedTasks, 0);
  const overallCompletionRate = totalEstimated > 0 ? 
    Math.round((totalCompleted / totalEstimated) * 100) : 0;

  if (!data || data.length === 0) {
    return (
      <Card title="Project Progress" className="mb-8 bg-gradient-to-br from-white to-gray-50">
        <div className="h-64 flex flex-col items-center justify-center text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No project data available</p>
          <p className="text-sm text-gray-400 mt-1">Progress data will appear here once available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Project Progress Overview" 
      subtitle={`Overall completion rate: ${overallCompletionRate}%`}
      className="mb-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-shadow duration-300"
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-2 bg-gray-50 rounded-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalCompleted}</div>
          <div className="text-sm text-gray-600 font-medium">Total Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{totalEstimated}</div>
          <div className="text-sm text-gray-600 font-medium">Total Estimated</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${overallCompletionRate >= 80 ? 'text-green-600' : overallCompletionRate >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {overallCompletionRate}%
          </div>
          <div className="text-sm text-gray-600 font-medium">Completion Rate</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              label={{ 
                value: 'Number of Tasks', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#6B7280', fontSize: '12px' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            
            <Bar 
              dataKey="completedTasks" 
              name="completedTasks"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
            <Bar 
              dataKey="estimatedTasks" 
              name="estimatedTasks"
              fill="#D1D5DB"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Performance Indicators */}
      <div className="mt-4 pt-2 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Monthly Performance</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {chartData.map((item, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="text-xs font-medium text-gray-600 mb-1">{item.month}</div>
              <div className={`text-sm font-bold ${
                item.completionRate >= 80 ? 'text-green-600' : 
                item.completionRate >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {item.completionRate}%
              </div>
              <div className="text-xs text-gray-500">
                {item.completedTasks}/{item.estimatedTasks}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectProgressChart;
