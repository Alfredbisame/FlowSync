import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TaskCard from '../components/tasks/TaskCard';
import { mockUsers } from '../data/mockData';
import { TaskStatus, TaskPriority } from '../types';

const TasksPage: React.FC = () => {
  const { tasks, userTasks, addTask } = useTasks();
  const { currentUser, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setpriorityFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const visibleTasks = isAdmin ? tasks : userTasks;
  
  const filteredTasks = visibleTasks.filter(task => {
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const taskStatusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Blocked', label: 'Blocked' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Completed', label: 'Completed' }
  ];
  
  const taskPriorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        
        {isAdmin && (
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          >
            Create Task
          </Button>
        )}
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            icon={<Filter className="h-4 w-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            <Select
              label="Status"
              options={taskStatusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            
            <Select
              label="Priority"
              options={taskPriorityOptions}
              value={priorityFilter}
              onChange={(e) => setpriorityFilter(e.target.value)}
            />
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} users={mockUsers} />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tasks found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;