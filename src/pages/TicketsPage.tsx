import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TicketCard from '../components/tickets/TicketCard';
import { mockUsers } from '../data/mockData';
import { TicketStatus, TicketSeverity } from '../types';

const TicketsPage: React.FC = () => {
  const { tickets, userTickets, createTicket } = useTickets();
  const { currentUser, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const visibleTickets = isAdmin ? tickets : userTickets;
  
  const filteredTickets = visibleTickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || ticket.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });
  
  const ticketStatusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Closed', label: 'Closed' }
  ];
  
  const ticketSeverityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
        >
          Create Ticket
        </Button>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search tickets..."
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
              options={ticketStatusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            
            <Select
              label="Severity"
              options={ticketSeverityOptions}
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            />
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} users={mockUsers} />
        ))}
        
        {filteredTickets.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tickets found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;