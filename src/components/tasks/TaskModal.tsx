import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Tag, 
  Link2, 
  MessageSquare,
  AlertCircle,
  User as UserIcon
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Task, User, Comment } from '../../types';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

interface TaskModalProps {
  task: Task;
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, users, isOpen, onClose }) => {
  const { updateTaskStatus, updateTaskProgress, requestExtension, respondToExtension, addTaskComment } = useTasks();
  const { currentUser, isAdmin } = useAuth();
  
  const [status, setStatus] = useState<Task['status']>(task.status);
  const [loggedHours, setLoggedHours] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [extensionReason, setExtensionReason] = useState<string>('');
  const [newDueDate, setNewDueDate] = useState<string>('');
  
  const assignee = users.find(user => user.id === task.assigneeId);
  const assigner = users.find(user => user.id === task.assignerId);
  
  const isAssignee = currentUser?.id === task.assigneeId;
  const canUpdateStatus = isAssignee || isAdmin;
  const canRequestExtension = isAssignee && !task.isExtensionRequested;
  const canApproveExtension = isAdmin && task.isExtensionRequested && task.extensionStatus === 'Pending';
  
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
  
  const handleStatusChange = () => {
    updateTaskStatus(task.id, status);
  };
  
  const handleLogHours = () => {
    if (loggedHours > 0) {
      updateTaskProgress(task.id, loggedHours);
      setLoggedHours(0);
    }
  };
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      addTaskComment(task.id, newComment);
      setNewComment('');
    }
  };
  
  const handleRequestExtension = () => {
    if (extensionReason && newDueDate) {
      requestExtension(task.id, extensionReason, newDueDate);
      setExtensionReason('');
      setNewDueDate('');
    }
  };
  
  const handleRespondToExtension = (approved: boolean) => {
    respondToExtension(task.id, approved);
  };
  
  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={task.title}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Task Details */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
              <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
              {task.labels.map((label, index) => (
                <Badge key={index} variant="default">
                  <Tag className="h-3 w-3 mr-1" />
                  {label}
                </Badge>
              ))}
            </div>
            
            <p className="text-gray-700 mb-4">{task.description}</p>
            
            {task.dependencies.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Dependencies:</h4>
                <div className="flex flex-wrap gap-2">
                  {task.dependencies.map((depId, index) => (
                    <Badge key={index} variant="info">
                      <Link2 className="h-3 w-3 mr-1" />
                      Task #{depId.split('-')[1]}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {task.isExtensionRequested && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Extension Requested</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.extensionReason}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      New proposed deadline: {formatDate(task.newDueDate || '')}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      Status: <span className={
                        task.extensionStatus === 'Approved' ? 'text-green-600' : 
                        task.extensionStatus === 'Rejected' ? 'text-red-600' : 
                        'text-yellow-600'
                      }>
                        {task.extensionStatus}
                      </span>
                    </p>
                    
                    {canApproveExtension && (
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="success" 
                          onClick={() => handleRespondToExtension(true)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="danger" 
                          onClick={() => handleRespondToExtension(false)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Comments Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Comments ({task.comments.length})
            </h4>
            
            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
              {task.comments.map((comment) => {
                const commentUser = getUserById(comment.userId);
                return (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar 
                      src={commentUser?.avatar} 
                      name={commentUser?.name || ''} 
                      size="sm" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{commentUser?.name}</span>
                        <span className="text-xs text-gray-500">
                          {format(parseISO(comment.createdAt), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
              
              {task.comments.length === 0 && (
                <p className="text-sm text-gray-500 italic">No comments yet</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={2}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Comment
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Actions & Details */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned To</h4>
            <div className="flex items-center gap-2">
              <Avatar 
                src={assignee?.avatar} 
                name={assignee?.name || ''} 
                size="sm" 
              />
              <div>
                <p className="text-sm font-medium">{assignee?.name}</p>
                <p className="text-xs text-gray-500">{assignee?.position}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned By</h4>
            <div className="flex items-center gap-2">
              <Avatar 
                src={assigner?.avatar} 
                name={assigner?.name || ''} 
                size="sm" 
              />
              <div>
                <p className="text-sm font-medium">{assigner?.name}</p>
                <p className="text-xs text-gray-500">{assigner?.position}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Created: {formatDate(task.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Due: {formatDate(task.dueDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">
                Progress: {task.loggedHours} / {task.estimatedHours} hours
              </span>
            </div>
          </div>
          
          {canUpdateStatus && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Update Status</h4>
              <div className="flex gap-2">
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Task['status'])}
                  options={[
                    { value: 'To Do', label: 'To Do' },
                    { value: 'In Progress', label: 'In Progress' },
                    { value: 'Blocked', label: 'Blocked' },
                    { value: 'Under Review', label: 'Under Review' },
                    { value: 'Completed', label: 'Completed' }
                  ]}
                />
                <Button onClick={handleStatusChange}>Update</Button>
              </div>
            </div>
          )}
          
          {isAssignee && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Log Hours</h4>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={loggedHours || ''}
                  onChange={(e) => setLoggedHours(parseFloat(e.target.value) || 0)}
                  placeholder="Hours worked"
                />
                <Button onClick={handleLogHours} disabled={loggedHours <= 0}>Log</Button>
              </div>
            </div>
          )}
          
          {canRequestExtension && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Request Deadline Extension</h4>
              <div className="space-y-3">
                <Input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <Textarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  placeholder="Reason for extension"
                  rows={2}
                />
                <Button 
                  onClick={handleRequestExtension} 
                  disabled={!extensionReason || !newDueDate}
                  fullWidth
                >
                  Request Extension
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;