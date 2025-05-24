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
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Welcome back, {currentUser?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Here's what's happening in your workspace today
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="transform hover:scale-105 transition-all duration-300">
          <StatCard
            title="Total Tasks"
            value={isAdmin ? tasks.length : userTasks.length}
            icon={<CheckSquare className="h-6 w-6" />}
            change={{ value: 12, isPositive: true }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl"
          />
        </div>
        
        <div className="transform hover:scale-105 transition-all duration-300">
          <StatCard
            title="Pending Extensions"
            value={pendingExtensions}
            icon={<Clock className="h-6 w-6" />}
            className="bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl"
          />
        </div>
        
        <div className="transform hover:scale-105 transition-all duration-300">
          <StatCard
            title="Overdue Tasks"
            value={overdueTasks}
            icon={<AlertOctagon className="h-6 w-6" />}
            change={{ value: 5, isPositive: false }}
            className="bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-xl"
          />
        </div>
        
        <div className="transform hover:scale-105 transition-all duration-300">
          <StatCard
            title="Active Projects"
            value="7"
            icon={<Briefcase className="h-6 w-6" />}
            className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        <div className="xl:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <TaskStatusChart tasks={isAdmin ? tasks : userTasks} />
          </div>
        </div>
        
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 h-full">
            <DepartmentCard department={mockDepartmentPerformance[0]} />
          </div>
        </div>
      </div>
      
      {/* Team Performance (admin only) */}
      {isAdmin && (
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-900">Team Performance</h2>
            </div>
            <TeamPerformance users={mockUsers} performance={mockUserPerformance} />
          </div>
        </div>
      )}

      {/* Recent Tasks */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 font-medium">Live Updates</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentTasks.map((task, index) => (
            <div 
              key={task.id} 
              className="transform hover:scale-105 transition-all duration-300 shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TaskCard task={task} users={mockUsers} />
            </div>
          ))}
          
          {recentTasks.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No recent tasks found</p>
                <p className="text-gray-400 text-sm mt-2">Tasks will appear here once you start working</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 group">
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  </div>
);
};

export default DashboardPage;