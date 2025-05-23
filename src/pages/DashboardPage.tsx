import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useTickets } from '../context/TicketContext';
import { 
  CheckSquare, 
  AlertOctagon, 
  Clock, 
  Users, 
  BarChart,
  Briefcase
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import TaskStatusChart from '../components/dashboard/TaskStatusChart';
import TeamPerformance from '../components/dashboard/TeamPerformance';
import DepartmentCard from '../components/dashboard/DepartmentCard';
import TaskCard from '../components/tasks/TaskCard';
import { mockUsers, mockDepartmentPerformance, mockUserPerformance, mockProjectProgress } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { currentUser, isAdmin, isCEO } = useAuth();
  const { tasks, userTasks } = useTasks();
  const { tickets } = useTickets();
  
  const pendingExtensions = tasks.filter(
    task => task.isExtensionRequested && task.extensionStatus === 'Pending'
  ).length;
  
  const overdueTasks = tasks.filter(
    task => new Date(task.dueDate) < new Date() && task.status !== 'Completed'
  ).length;
  
  const recentTasks = userTasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser?.name.split(' ')[0]}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening in your workspace today
        </p>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={isAdmin ? tasks.length : userTasks.length}
          icon={<CheckSquare className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Pending Extensions"
          value={pendingExtensions}
          icon={<Clock className="h-6 w-6" />}
        />
        
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks}
          icon={<AlertOctagon className="h-6 w-6" />}
          change={{ value: 5, isPositive: false }}
        />
        
        <StatCard
          title="Active Projects"
          value="7"
          icon={<Briefcase className="h-6 w-6" />}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TaskStatusChart tasks={isAdmin ? tasks : userTasks} />
        </div>
        
        <div>
          <DepartmentCard department={mockDepartmentPerformance[0]} />
        </div>
      </div>
      
      {/* Team Performance (admin only) */}
      {isAdmin && (
        <div className="mb-8">
          <TeamPerformance users={mockUsers} performance={mockUserPerformance} />
        </div>
      )}
      
      {/* Recent Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentTasks.map(task => (
            <TaskCard key={task.id} task={task} users={mockUsers} />
          ))}
          
          {recentTasks.length === 0 && (
            <div className="col-span-full py-12 text-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">No recent tasks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;