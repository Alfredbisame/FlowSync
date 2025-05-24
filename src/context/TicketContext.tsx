import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ticket } from '../types';
import { mockTickets } from '../data/mockData';
import { useAuth } from './AuthContext';

interface TicketContextType {
  tickets: Ticket[];
  userTickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  assignTicket: (ticketId: string, userId: string) => void;
  addTicketComment: (ticketId: string, content: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch from an API
    setTickets(mockTickets);
  }, []);

  // Filter tickets relevant to the current user
  const userTickets = currentUser 
    ? tickets.filter(ticket => 
        ticket.createdBy === currentUser.id || 
        ticket.assignedTo === currentUser.id ||
        currentUser.role === 'CEO' || 
        currentUser.role === 'Admin')
    : [];

  const createTicket = (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    if (!currentUser) return;
    
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      ...ticket,
      id: `ticket-${Date.now()}`,
      createdBy: currentUser.id,
      createdAt: now,
      updatedAt: now,
      comments: []
    };
    
    setTickets(prev => [...prev, newTicket]);
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              status,
              updatedAt: new Date().toISOString() 
            } 
          : ticket
      )
    );
  };

  const assignTicket = (ticketId: string, userId: string) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              assignedTo: userId,
              updatedAt: new Date().toISOString() 
            } 
          : ticket
      )
    );
  };

  const addTicketComment = (ticketId: string, content: string) => {
    if (!currentUser) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      content,
      createdAt: new Date().toISOString()
    };

    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              comments: [...ticket.comments, newComment],
              updatedAt: new Date().toISOString()
            } 
          : ticket
      )
    );
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      userTickets,
      createTicket,
      updateTicketStatus,
      assignTicket,
      addTicketComment
    }}>
      {children}
    </TicketContext.Provider>
  );
};