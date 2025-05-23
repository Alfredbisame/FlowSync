import React, { useState } from 'react';
import { 
  Clock, 
  MessageSquare,
  AlertCircle,
  User as UserIcon
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Ticket, User, Comment } from '../../types';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';

interface TicketModalProps {
  ticket: Ticket;
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, users, isOpen, onClose }) => {
  const { updateTicketStatus, assignTicket, addTicketComment } = useTickets();
  const { currentUser, isAdmin } = useAuth();
  
  const [status, setStatus] = useState<Ticket['status']>(ticket.status);
  const [assignedTo, setAssignedTo] = useState<string>(ticket.assignedTo || '');
  const [newComment, setNewComment] = useState<string>('');
  
  const creator = users.find(user => user.id === ticket.createdBy);
  const assignee = ticket.assignedTo ? users.find(user => user.id === ticket.assignedTo) : undefined;
  
  const isCreator = currentUser?.id === ticket.createdBy;
  const isAssignee = currentUser?.id === ticket.assignedTo;
  const canUpdateStatus = isAdmin || isAssignee;
  const canAssign = isAdmin;
  
  const getSeverityVariant = (severity: Ticket['severity']) => {
    switch (severity) {
      case 'Low': return 'info';
      case 'Medium': return 'warning';
      case 'High': return 'secondary';
      case 'Critical': return 'danger';
      default: return 'default';
    }
  };
  
  const getStatusVariant = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return 'primary';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Closed': return 'default';
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
    updateTicketStatus(ticket.id, status);
  };
  
  const handleAssign = () => {
    if (assignedTo) {
      assignTicket(ticket.id, assignedTo);
    }
  };
  
  const handleAddComment = () => {
    if (newComment.trim()) {
      addTicketComment(ticket.id, newComment);
      setNewComment('');
    }
  };
  
  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={ticket.title}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Ticket Details */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
              <Badge variant={getSeverityVariant(ticket.severity)}>{ticket.severity}</Badge>
            </div>
            
            <p className="text-gray-700 mb-4">{ticket.description}</p>
            
            {ticket.relatedTaskId && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Related Task</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      This ticket is related to task #{ticket.relatedTaskId.split('-')[1]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Comments Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Comments ({ticket.comments.length})
            </h4>
            
            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
              {ticket.comments.map((comment) => {
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
              
              {ticket.comments.length === 0 && (
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Reported By</h4>
            <div className="flex items-center gap-2">
              <Avatar 
                src={creator?.avatar} 
                name={creator?.name || ''} 
                size="sm" 
              />
              <div>
                <p className="text-sm font-medium">{creator?.name}</p>
                <p className="text-xs text-gray-500">{creator?.position}</p>
              </div>
            </div>
          </div>
          
          {assignee && (
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
          )}
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Created: {formatDate(ticket.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Updated: {formatDate(ticket.updatedAt)}</span>
            </div>
          </div>
          
          {canUpdateStatus && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Update Status</h4>
              <div className="flex gap-2">
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Ticket['status'])}
                  options={[
                    { value: 'Open', label: 'Open' },
                    { value: 'In Progress', label: 'In Progress' },
                    { value: 'Resolved', label: 'Resolved' },
                    { value: 'Closed', label: 'Closed' }
                  ]}
                />
                <Button onClick={handleStatusChange}>Update</Button>
              </div>
            </div>
          )}
          
          {canAssign && (
            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Assign Ticket</h4>
              <div className="flex gap-2">
                <Select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  options={[
                    { value: '', label: 'Unassigned' },
                    ...users.map(user => ({
                      value: user.id,
                      label: user.name
                    }))
                  ]}
                />
                <Button onClick={handleAssign}>Assign</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TicketModal;