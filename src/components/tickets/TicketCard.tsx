import React, { useState } from 'react';
import { Clock, MessageSquare, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Ticket, User as UserType } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import TicketModal from './TicketModal';

interface TicketCardProps {
  ticket: Ticket;
  users: UserType[];
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
  
  // Get gradient classes based on severity
  const getHeaderGradient = (severity: Ticket['severity']) => {
    switch (severity) {
      case 'Critical': return 'from-red-500 to-orange-500';
      case 'High': return 'from-purple-500 to-indigo-500';
      case 'Medium': return 'from-yellow-400 to-amber-500';
      case 'Low': return 'from-blue-400 to-cyan-400';
      default: return 'from-gray-400 to-gray-600';
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
        onClick={() => setIsModalOpen(true)}
        className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100 rounded-xl overflow-hidden group"
      >
        {/* Gradient header based on severity */}
        <div className={`h-2 bg-gradient-to-r ${getHeaderGradient(ticket.severity)} transform group-hover:scale-x-105 transition-transform origin-left`}></div>
        
        <div className="p-5 h-full flex flex-col">
          {/* Status and Severity Badges */}
          <div className="flex justify-between items-start mb-4">
            <Badge 
              variant={getStatusVariant(ticket.status)} 
              className="px-2 py-0.5 text-xs font-medium"
            >
              {ticket.status}
            </Badge>
            <Badge 
              variant={getSeverityVariant(ticket.severity)} 
              className="px-2 py-0.5 text-xs font-medium"
            >
              {ticket.severity}
            </Badge>
          </div>
          
          {/* Ticket Title */}
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-lg">
            {ticket.title}
          </h3>
          
          {/* Ticket Description */}
          <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow">
            {ticket.description || <span className="text-gray-400 italic">No description provided</span>}
          </p>
          
          {/* Ticket Details */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
              
              {ticket.comments.length > 0 && (
                <div className="flex items-center group-hover:text-blue-500 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  <span>{ticket.comments.length}</span>
                </div>
              )}
            </div>
            
            {/* Creator and Assignee */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar 
                  src={creator?.avatar} 
                  name={creator?.name || ''} 
                  size="sm" 
                  className="border-2 border-white shadow-sm hover:shadow-md transition-shadow"
                />
                <span className="text-xs text-gray-500 ml-2 truncate max-w-[100px]">
                  {creator?.name?.split(' ')[0]}
                </span>
              </div>
              
              {assignee ? (
                <Avatar 
                  src={assignee.avatar} 
                  name={assignee.name} 
                  size="sm" 
                  className="border-2 border-white shadow-sm hover:shadow-md transition-shadow"
                />
              ) : (
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 border-2 border-white">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Modal with enhanced styling */}
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