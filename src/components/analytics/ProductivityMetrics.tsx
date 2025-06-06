import React from 'react';
import Card from '../ui/Card';

const ProductivityMetrics: React.FC = () => {
  const metrics = [
    {
      name: "Avg. Task Completion Time",
      current: "2.8 days",
      previous: "3.2 days",
      change: "+12.5%",
      icon: "📈"
    },
    {
      name: "On-Time Delivery Rate",
      current: "92%",
      previous: "88%",
      change: "+4.5%",
      icon: "📈"
    },
    {
      name: "Resource Utilization",
      current: "78%",
      previous: "72%",
      change: "+8.3%",
      icon: "📈"
    }
  ];

  return (
    <Card title="Productivity Metrics">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Previous
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metrics.map((metric, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {metric.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {metric.current}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {metric.previous}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 flex items-center">
                  <span className="mr-1">{metric.icon}</span> {metric.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProductivityMetrics;