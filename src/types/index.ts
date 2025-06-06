export type UserRole = 'CEO' | 'Admin' | 'Team Lead' | 'Developer' | 'Non-Tech';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  avatar?: string;
  position?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Blocked' | 'Under Review' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assignerId: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
  labels: string[];
  dependencies: string[];
  comments: Comment[];
  isExtensionRequested: boolean;
  extensionReason?: string;
  extensionStatus?: 'Pending' | 'Approved' | 'Rejected';
  newDueDate?: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export type TicketSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo?: string;
  severity: TicketSeverity;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  relatedTaskId?: string;
  comments: Comment[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task' | 'ticket' | 'system';
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DepartmentPerformance {
  department: string;
  tasksCompleted: number;
  tasksInProgress: number;
  averageCompletionTime: number;
  ticketsRaised: number;
}

export interface UserPerformance {
  userId: string;
  tasksCompleted: number;
  tasksInProgress: number;
  averageCompletionTime: number;
  onTimeDelivery: number;
  extensionRequests: number;
}

export interface Project {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low'; 
  budget: number;
  spent: number;
  description: string; 
  progress: number;
  teamMembers: string[];
  startDate: string;
  endDate: string;
  tasks: {
    total: number;
    // Add other task-related properties if needed
  };
}