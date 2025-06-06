import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  formatCurrency, 
  formatDate 
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-105">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
        <p className="text-sm text-gray-500">Internal</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            project.status === 'Completed' ? 'bg-green-100 text-green-800' :
            project.status === 'Active' ? 'bg-blue-100 text-blue-800' :
            project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
            project.status === 'Planning' ? 'bg-purple-100 text-purple-800' :
            'bg-red-100 text-red-800'
          }`}>
            {project.status}
          </span>
          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            project.priority === 'Critical' ? 'bg-red-100 text-red-800' :
            project.priority === 'High' ? 'bg-orange-100 text-orange-800' :
            project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {project.priority}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Start Date</p>
            <p className="text-sm">{formatDate(project.startDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">End Date</p>
            <p className="text-sm">{formatDate(project.endDate)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="text-sm">{formatCurrency(project.budget)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Spent</p>
            <p className="text-sm">{formatCurrency(project.spent)}</p>
          </div>
        </div>
        
        <div className="flex justify-between text-xs">
          <div>
            <p className="text-gray-500">Team</p>
            <p className="text-sm">{project.teamMembers.length} members</p>
          </div>
          <div>
            <p className="text-gray-500">Tasks</p>
            <p className="text-sm">{project.tasks.total} total</p>
          </div>
        </div>
      </div>
    </div>
  );
};