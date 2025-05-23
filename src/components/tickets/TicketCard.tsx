import React, { useState } from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Ticket, User } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import TicketModal from './TicketModal';

interface TicketCardProps {
  ticket: Ticket;
  users: User[];
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const creator = users.find(user => user.id === ticket.createdBy);
  const assignee = ticket.assignedTo ? users.find(user => user.id === ticket.assignedTo) : undefined;
  
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
  
  return (
    <>
      <Card className="h-full transition-all duration-200 hover:shadow-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
            <Badge variant={getSeverityVariant(ticket.severity)}>{ticket.severity}</Badge>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2">{ticket.title}</h3>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{ticket.description}</p>
          
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
              
              {ticket.comments.length > 0 && (
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{ticket.comments.length}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar 
                  src={creator?.avatar} 
                  name={creator?.name || ''} 
                  size="xs" 
                  className="border border-white"
                />
                <span className="text-xs text-gray-500 ml-2">
                  {creator?.name?.split(' ')[0]}
                </span>
              </div>
              
              {assignee && (
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">
                    Assigned to:
                  </span>
                  <Avatar 
                    src={assignee?.avatar} 
                    name={assignee?.name || ''} 
                    size="xs" 
                    className="border border-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {isModalOpen && (
        <TicketModal
          ticket={ticket}
          users={users}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TicketCard;