import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare, AlertCircle, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Task, User as UserType } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TaskModal from './TaskModal';

interface TaskCardProps {
  task: Task;
  users: UserType[];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const assignee = users.find(user => user.id === task.assigneeId);
  const assigner = users.find(user => user.id === task.assignerId);
  
  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'To Do': return 'default';
      case 'In Progress': return 'primary';
      case 'Blocked': return 'danger';
      case 'Under Review': return 'warning';
      case 'Completed': return 'success';
      default: return 'default';
    }
  };
  
  const getPriorityVariant = (priority: Task['priority']) => {
    switch (priority) {
      case 'Low': return 'info';
      case 'Medium': return 'warning';
      case 'High': return 'secondary';
      case 'Urgent': return 'danger';
      default: return 'default';
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <>
      <Card 
        className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100 rounded-xl overflow-hidden group"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Gradient header based on priority */}
        <div className={`h-2 bg-gradient-to-r ${getPriorityVariant(task.priority) === 'danger' ? 'from-red-500 to-orange-500' : 
                          getPriorityVariant(task.priority) === 'secondary' ? 'from-purple-500 to-indigo-500' :
                          getPriorityVariant(task.priority) === 'warning' ? 'from-yellow-500 to-amber-500' :
                          'from-blue-500 to-cyan-400'} transform group-hover:scale-x-105 transition-transform origin-left`}></div>
        
        <div className="p-5 h-full flex flex-col">
          {/* Status and Priority Badges */}
          <div className="flex justify-between items-start mb-4">
            <Badge 
              variant={getStatusVariant(task.status)} 
              className="px-2.5 py-0.5 text-xs font-medium"
            >
              {task.status}
            </Badge>
            <Badge 
              variant={getPriorityVariant(task.priority)} 
              className="px-2.5 py-0.5 text-xs font-medium"
            >
              {task.priority}
            </Badge>
          </div>
          
          {/* Task Title */}
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-lg">
            {task.title}
          </h3>
          
          {/* Task Description */}
          <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow">
            {task.description || <span className="text-gray-400 italic">No description provided</span>}
          </p>
          
          {/* Task Details */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <span>{task.loggedHours} / {task.estimatedHours}h</span>
              </div>
            </div>
            
            {/* Assignee and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {assignee ? (
                  <Avatar 
                    src={assignee?.avatar} 
                    name={assignee?.name || ''} 
                    size="sm" 
                    className="border-2 border-white shadow-sm hover:shadow-md transition-shadow"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-white">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {task.isExtensionRequested && (
                  <div className="text-yellow-500 animate-pulse" title="Extension requested">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
                
                {task.comments.length > 0 && (
                  <div className="flex items-center text-gray-600 text-sm group-hover:text-blue-500 transition-colors" title={`${task.comments.length} comment${task.comments.length !== 1 ? 's' : ''}`}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{task.comments.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Modal with enhanced styling */}
      {isModalOpen && (
        <TaskModal
          task={task}
          users={users}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;