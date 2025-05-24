import React, { ReactNode } from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  change,
  className = ''
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-sm text-white ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;