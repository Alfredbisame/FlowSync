import React from 'react';
import { mockProjects } from '../data/mockData';
import { ProjectStats } from '../components/projects/ProjectStats';
import { ProjectsTable } from '../components/projects/ProjectsTable';
import { ProjectCard } from '../components/projects/ProjectCard';

// Main ProjectsPage Component
export const ProjectsPage: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Projects Dashboard</h1>
      
      {/* Project Stats */}
      <ProjectStats 
        projects={mockProjects} 
        formatCurrency={formatCurrency} 
      />
      
      {/* Projects Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockProjects.map(project => (
          <ProjectCard 
            key={project.id}
            project={project}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        ))}
      </div>
      
      {/* Projects Table View */}
      <ProjectsTable 
        projects={mockProjects} 
        formatCurrency={formatCurrency} 
        formatDate={formatDate} 
      />
    </div>
  );
};