import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Task, User } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TaskModal from './TaskModal';

interface TaskCardProps {
  task: Task;
  users: User[];
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
      <Card className="h-full transition-all duration-200 hover:shadow-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
            <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>
          
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{task.loggedHours} / {task.estimatedHours}h</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <Avatar 
                  src={assignee?.avatar} 
                  name={assignee?.name || ''} 
                  size="xs" 
                  className="border border-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                {task.isExtensionRequested && (
                  <div className="text-yellow-500">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
                
                {task.comments.length > 0 && (
                  <div className="flex items-center text-gray-500 text-xs">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {task.comments.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      
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