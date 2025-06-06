import { User, Task, Ticket, Notification, UserRole, TaskStatus, TaskPriority, TicketStatus, TicketSeverity, DepartmentPerformance, UserPerformance, } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Kyei Baffour',
    email: 'ceo@example.com',
    role: 'CEO',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    department: 'Executive',
    position: 'Chief Executive Officer',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: 'user-2',
    name: 'Mr Mens',
    email: 'admin@example.com',
    role: 'Admin',
    avatar: './mens.jpg',
    department: 'Operations',
    position: 'Operations Manager',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: 'user-3',
    name: 'Mr Enoch',
    email: 'lead@example.com',
    role: 'Team Lead',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    department: 'Engineering',
    position: 'Senior Developer',
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: 'user-4',
    name: 'Mr Alfred',
    email: 'dev@example.com',
    role: 'Developer',
    avatar: './fred.jpg',
    department: 'Engineering',
    position: 'Frontend Developer',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: 'user-5',
    name: 'Miss Joyce',
    email: 'staff@example.com',
    role: 'Non-Tech',
    avatar: './joyce.jpg',
    department: 'Marketing',
    position: 'Marketing Specialist',
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implement user authentication',
    description: 'Create a secure authentication system with JWT tokens and role-based access control.',
    assigneeId: 'user-4',
    assignerId: 'user-3',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2023-05-15T10:00:00Z',
    dueDate: '2023-05-22T18:00:00Z',
    estimatedHours: 16,
    loggedHours: 6,
    labels: ['Backend', 'Security'],
    dependencies: [],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        content: 'Make sure to follow the security guidelines from our documentation.',
        createdAt: '2023-05-15T14:30:00Z'
      },
      {
        id: 'comment-2',
        userId: 'user-4',
        content: 'I\'ve completed the basic authentication flow, working on role-based permissions now.',
        createdAt: '2023-05-17T09:15:00Z'
      }
    ],
    isExtensionRequested: false
  },
  {
    id: 'task-2',
    title: 'Design & Develop Web App',
    description: 'Create a modern and responsive landing page design following our brand guidelines.',
    assigneeId: 'user-5',
    assignerId: 'user-2',
    status: 'To Do',
    priority: 'Medium',
    createdAt: '2023-05-16T08:30:00Z',
    dueDate: '2023-05-23T18:00:00Z',
    estimatedHours: 12,
    loggedHours: 0,
    labels: ['Design', 'Frontend'],
    dependencies: [],
    comments: [],
    isExtensionRequested: false
  },
  {
    id: 'task-3',
    title: 'Fix payment gateway integration',
    description: 'Debug and resolve issues with the Stripe payment gateway integration in the checkout process.',
    assigneeId: 'user-4',
    assignerId: 'user-1',
    status: 'Blocked',
    priority: 'Urgent',
    createdAt: '2023-05-14T16:45:00Z',
    dueDate: '2023-05-17T18:00:00Z',
    estimatedHours: 8,
    loggedHours: 5,
    labels: ['Backend', 'Bug'],
    dependencies: [],
    comments: [
      {
        id: 'comment-3',
        userId: 'user-4',
        content: 'I\'m blocked because our Stripe test account is showing errors. Need access to the dashboard.',
        createdAt: '2023-05-15T11:20:00Z'
      }
    ],
    isExtensionRequested: true,
    extensionReason: 'Blocked due to Stripe account access issues',
    extensionStatus: 'Pending',
    newDueDate: '2023-05-19T18:00:00Z'
  },
  {
    id: 'task-4',
    title: 'Create Q2 marketing campaign',
    description: 'Develop a comprehensive marketing strategy for Q2 product launch.',
    assigneeId: 'user-5',
    assignerId: 'user-1',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2023-05-10T09:00:00Z',
    dueDate: '2023-05-25T18:00:00Z',
    estimatedHours: 40,
    loggedHours: 15,
    labels: ['Marketing', 'Strategy'],
    dependencies: [],
    comments: [],
    isExtensionRequested: false
  },
  {
    id: 'task-5',
    title: 'Optimize database queries',
    description: 'Improve performance of slow database queries on the user dashboard.',
    assigneeId: 'user-3',
    assignerId: 'user-2',
    status: 'To Do',
    priority: 'Medium',
    createdAt: '2023-05-16T14:00:00Z',
    dueDate: '2023-05-24T18:00:00Z',
    estimatedHours: 16,
    loggedHours: 0,
    labels: ['Backend', 'Performance'],
    dependencies: ['task-1'],
    comments: [],
    isExtensionRequested: false
  }
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    title: 'Cannot access API endpoints',
    description: 'Getting 403 errors when trying to access the user management API endpoints.',
    createdBy: 'user-4',
    assignedTo: 'user-3',
    severity: 'High',
    status: 'In Progress',
    createdAt: '2023-05-15T13:25:00Z',
    updatedAt: '2023-05-16T09:10:00Z',
    relatedTaskId: 'task-1',
    comments: [
      {
        id: 'ticket-comment-1',
        userId: 'user-3',
        content: 'Looking into this, might be related to the recent permission changes.',
        createdAt: '2023-05-16T09:10:00Z'
      }
    ]
  },
  {
    id: 'ticket-2',
    title: 'Need additional resource for deployment',
    description: 'The current staging environment is insufficient for testing the new features. Need more memory allocation.',
    createdBy: 'user-3',
    assignedTo: 'user-2',
    severity: 'Medium',
    status: 'Open',
    createdAt: '2023-05-14T15:30:00Z',
    updatedAt: '2023-05-14T15:30:00Z',
    comments: []
  },
  {
    id: 'ticket-3',
    title: 'Request for design software license',
    description: 'Need a license for Adobe XD to work on the new UI designs.',
    createdBy: 'user-5',
    assignedTo: 'user-1',
    severity: 'Low',
    status: 'Resolved',
    createdAt: '2023-05-10T11:45:00Z',
    updatedAt: '2023-05-12T16:20:00Z',
    comments: [
      {
        id: 'ticket-comment-2',
        userId: 'user-1',
        content: 'Approved. License details sent to your email.',
        createdAt: '2023-05-12T16:20:00Z'
      }
    ]
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    userId: 'user-4',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: Implement user authentication',
    type: 'task',
    relatedId: 'task-1',
    isRead: false,
    createdAt: '2023-05-15T10:05:00Z'
  },
  {
    id: 'notification-2',
    userId: 'user-3',
    title: 'Task Update',
    message: 'Sarah has commented on the user authentication task',
    type: 'task',
    relatedId: 'task-1',
    isRead: true,
    createdAt: '2023-05-17T09:20:00Z'
  },
  {
    id: 'notification-3',
    userId: 'user-3',
    title: 'New Support Ticket',
    message: 'A new support ticket has been assigned to you: Cannot access API endpoints',
    type: 'ticket',
    relatedId: 'ticket-1',
    isRead: false,
    createdAt: '2023-05-16T09:00:00Z'
  },
  {
    id: 'notification-4',
    userId: 'user-1',
    title: 'Extension Request',
    message: 'Sarah has requested a deadline extension for the payment gateway task',
    type: 'task',
    relatedId: 'task-3',
    isRead: false,
    createdAt: '2023-05-15T11:25:00Z'
  },
  {
    id: 'notification-5',
    userId: 'user-5',
    title: 'Task Approaching Deadline',
    message: 'The "Design landing page" task is due in 2 days',
    type: 'system',
    relatedId: 'task-2',
    isRead: false,
    createdAt: '2023-05-21T08:00:00Z'
  }
];

// Mock Analytics Data
export const mockDepartmentPerformance: DepartmentPerformance[] = [
  {
    department: 'Engineering',
    tasksCompleted: 45,
    tasksInProgress: 12,
    averageCompletionTime: 3.2, // days
    ticketsRaised: 8
  },
  {
    department: 'Marketing',
    tasksCompleted: 28,
    tasksInProgress: 7,
    averageCompletionTime: 2.8,
    ticketsRaised: 3
  },
  {
    department: 'Operations',
    tasksCompleted: 32,
    tasksInProgress: 5,
    averageCompletionTime: 2.5,
    ticketsRaised: 5
  },
  {
    department: 'Sales',
    tasksCompleted: 38,
    tasksInProgress: 9,
    averageCompletionTime: 2.1,
    ticketsRaised: 2
  }
];

export const mockUserPerformance: UserPerformance[] = [
  {
    userId: 'user-3',
    tasksCompleted: 18,
    tasksInProgress: 3,
    averageCompletionTime: 2.5,
    onTimeDelivery: 0.92, // 92%
    extensionRequests: 2
  },
  {
    userId: 'user-4',
    tasksCompleted: 24,
    tasksInProgress: 4,
    averageCompletionTime: 2.8,
    onTimeDelivery: 0.85,
    extensionRequests: 4
  },
  {
    userId: 'user-5',
    tasksCompleted: 15,
    tasksInProgress: 2,
    averageCompletionTime: 2.2,
    onTimeDelivery: 0.95,
    extensionRequests: 1
  }
];

export const mockProjectProgress = [
  { month: 'Jan', completedTasks: 32, estimatedTasks: 30 },
  { month: 'Feb', completedTasks: 45, estimatedTasks: 40 },
  { month: 'Mar', completedTasks: 38, estimatedTasks: 45 },
  { month: 'Apr', completedTasks: 42, estimatedTasks: 50 },
  { month: 'May', completedTasks: 35, estimatedTasks: 40 },
  { month: 'Jun', completedTasks: 0, estimatedTasks: 45 }
];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  managerId: string;
  teamMembers: string[];
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
  milestones: {
    id: string;
    name: string;
    dueDate: string;
    completed: boolean;
  }[];
  tags: string[];
  client?: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX and enhanced functionality.',
    status: 'Active',
    priority: 'High',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 150000,
    spent: 87500,
    progress: 65,
    managerId: '1',
    teamMembers: ['1', '2', '3', '4', '5'],
    tasks: {
      total: 45,
      completed: 28,
      inProgress: 12,
      pending: 5
    },
    milestones: [
      { id: '1', name: 'UI/UX Design Complete', dueDate: '2024-02-28', completed: true },
      { id: '2', name: 'Backend API Development', dueDate: '2024-04-15', completed: true },
      { id: '3', name: 'Frontend Implementation', dueDate: '2024-05-30', completed: false },
      { id: '4', name: 'Testing & QA', dueDate: '2024-06-15', completed: false }
    ],
    tags: ['Web Development', 'E-commerce', 'React', 'Node.js'],
    client: 'TechCorp Inc.',
    department: 'Engineering',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-14T10:30:00Z'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms with real-time features.',
    status: 'Active',
    priority: 'High',
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    budget: 200000,
    spent: 45000,
    progress: 35,
    managerId: '2',
    teamMembers: ['2', '6', '7', '8'],
    tasks: {
      total: 38,
      completed: 12,
      inProgress: 15,
      pending: 11
    },
    milestones: [
      { id: '1', name: 'App Architecture Design', dueDate: '2024-02-20', completed: true },
      { id: '2', name: 'Core Features Development', dueDate: '2024-05-01', completed: false },
      { id: '3', name: 'Beta Testing', dueDate: '2024-07-01', completed: false },
      { id: '4', name: 'App Store Deployment', dueDate: '2024-08-10', completed: false }
    ],
    tags: ['Mobile', 'React Native', 'iOS', 'Android'],
    client: 'StartupXYZ',
    department: 'Engineering',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '3',
    name: 'Marketing Campaign Q2',
    description: 'Comprehensive digital marketing campaign for Q2 product launch.',
    status: 'Planning',
    priority: 'Medium',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    budget: 75000,
    spent: 5000,
    progress: 15,
    managerId: '3',
    teamMembers: ['3', '9', '10'],
    tasks: {
      total: 25,
      completed: 3,
      inProgress: 5,
      pending: 17
    },
    milestones: [
      { id: '1', name: 'Campaign Strategy', dueDate: '2024-03-15', completed: true },
      { id: '2', name: 'Content Creation', dueDate: '2024-04-15', completed: false },
      { id: '3', name: 'Campaign Launch', dueDate: '2024-05-01', completed: false },
      { id: '4', name: 'Performance Analysis', dueDate: '2024-06-25', completed: false }
    ],
    tags: ['Marketing', 'Digital Campaign', 'Social Media'],
    department: 'Marketing',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-10T14:20:00Z'
  },
  {
    id: '4',
    name: 'Data Analytics Dashboard',
    description: 'Business intelligence dashboard for real-time data visualization and reporting.',
    status: 'Completed',
    priority: 'Medium',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    budget: 80000,
    spent: 78000,
    progress: 100,
    managerId: '4',
    teamMembers: ['4', '11', '12'],
    tasks: {
      total: 32,
      completed: 32,
      inProgress: 0,
      pending: 0
    },
    milestones: [
      { id: '1', name: 'Requirements Analysis', dueDate: '2023-10-15', completed: true },
      { id: '2', name: 'Database Design', dueDate: '2023-11-15', completed: true },
      { id: '3', name: 'Dashboard Development', dueDate: '2023-12-31', completed: true },
      { id: '4', name: 'User Training', dueDate: '2024-01-25', completed: true }
    ],
    tags: ['Analytics', 'Dashboard', 'Business Intelligence'],
    department: 'Operations',
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2024-01-31T16:45:00Z'
  },
  {
    id: '5',
    name: 'Infrastructure Upgrade',
    description: 'Server infrastructure modernization and cloud migration project.',
    status: 'On Hold',
    priority: 'Low',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    budget: 120000,
    spent: 15000,
    progress: 10,
    managerId: '5',
    teamMembers: ['5', '13'],
    tasks: {
      total: 28,
      completed: 2,
      inProgress: 3,
      pending: 23
    },
    milestones: [
      { id: '1', name: 'Infrastructure Assessment', dueDate: '2024-03-15', completed: true },
      { id: '2', name: 'Migration Planning', dueDate: '2024-04-30', completed: false },
      { id: '3', name: 'Cloud Setup', dueDate: '2024-07-15', completed: false },
      { id: '4', name: 'Data Migration', dueDate: '2024-09-15', completed: false }
    ],
    tags: ['Infrastructure', 'Cloud Migration', 'DevOps'],
    department: 'Operations',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-28T11:30:00Z'
  }
];

export const mockProjectStats = {
  totalProjects: mockProjects.length,
  activeProjects: mockProjects.filter(p => p.status === 'Active').length,
  completedProjects: mockProjects.filter(p => p.status === 'Completed').length,
  totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
  totalSpent: mockProjects.reduce((sum, p) => sum + p.spent, 0),
  averageProgress: Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length),
  onTimeProjects: mockProjects.filter(p => 
    p.status === 'Completed' || new Date(p.endDate) > new Date()
  ).length,
  overdueProjects: mockProjects.filter(p => 
    p.status !== 'Completed' && new Date(p.endDate) < new Date()
  ).length
};
