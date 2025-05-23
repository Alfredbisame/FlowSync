import React, { useEffect, useRef } from 'react';
import { Task } from '../../types';
import Card from '../ui/Card';

interface TaskStatusChartProps {
  tasks: Task[];
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Calculate task status counts
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Prepare data for the chart
    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);
    const colors = [
      'rgba(209, 213, 219, 0.8)', // To Do - gray
      'rgba(59, 130, 246, 0.8)',  // In Progress - blue
      'rgba(239, 68, 68, 0.8)',   // Blocked - red
      'rgba(245, 158, 11, 0.8)',  // Under Review - amber
      'rgba(16, 185, 129, 0.8)'   // Completed - green
    ];
    
    // Draw chart
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw pie chart
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    if (total === 0) {
      // Draw empty chart
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(229, 231, 235, 0.8)';
      ctx.fill();
    } else {
      // Draw slices
      data.forEach((value, i) => {
        const sliceAngle = (2 * Math.PI * value) / total;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        startAngle += sliceAngle;
      });
    }
    
    // Draw legend
    const legendY = canvasRef.current.height - 20;
    let legendX = 20;
    
    labels.forEach((label, i) => {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(legendX, legendY, 15, 15);
      
      ctx.font = '12px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(`${label} (${data[i]})`, legendX + 20, legendY + 12);
      
      legendX += ctx.measureText(`${label} (${data[i]})`).width + 40;
    });
    
  }, [tasks]);
  
  return (
    <Card title="Task Status">
      <div className="h-64">
        <canvas ref={canvasRef} width={400} height={250} />
      </div>
    </Card>
  );
};

export default TaskStatusChart;