import { Project } from '../../types';

interface ProjectStatsProps {
  projects: Project[];
  formatCurrency: (amount: number) => string;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ projects, formatCurrency }) => {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const averageProgress = Math.round(
    projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
  );
  const onTimeProjects = projects.filter(p => 
    p.status === 'Completed' || new Date(p.endDate) > new Date()
  ).length;
  const overdueProjects = projects.filter(p => 
    p.status !== 'Completed' && new Date(p.endDate) < new Date()
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Total Projects</h3>
        <p className="text-2xl font-semibold mt-1">{totalProjects}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Active Projects</h3>
        <p className="text-2xl font-semibold mt-1">{activeProjects}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Completed Projects</h3>
        <p className="text-2xl font-semibold mt-1">{completedProjects}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Total Budget</h3>
        <p className="text-2xl font-semibold mt-1">{formatCurrency(totalBudget)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Total Spent</h3>
        <p className="text-2xl font-semibold mt-1">{formatCurrency(totalSpent)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Average Progress</h3>
        <p className="text-2xl font-semibold mt-1">{averageProgress}%</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">On Time</h3>
        <p className="text-2xl font-semibold mt-1">{onTimeProjects}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-600 text-sm font-medium">Overdue</h3>
        <p className="text-2xl font-semibold mt-1">{overdueProjects}</p>
      </div>
    </div>
  );
};