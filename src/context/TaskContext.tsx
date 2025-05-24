import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, User } from '../types';
import { mockTasks } from '../data/mockData';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  userTasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'comments'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  updateTaskProgress: (taskId: string, loggedHours: number) => void;
  requestExtension: (taskId: string, reason: string, newDueDate: string) => void;
  respondToExtension: (taskId: string, approved: boolean) => void;
  addTaskComment: (taskId: string, content: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch from an API
    setTasks(mockTasks);
  }, []);

  // Filter tasks relevant to the current user
  const userTasks = currentUser 
    ? tasks.filter(task => 
        task.assigneeId === currentUser.id || 
        (currentUser.role === 'CEO' || currentUser.role === 'Admin' || 
         (currentUser.role === 'Team Lead' && task.assignerId === currentUser.id)))
    : [];

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'comments'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      comments: []
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status } 
          : task
      )
    );
  };

  const updateTaskProgress = (taskId: string, loggedHours: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, loggedHours: task.loggedHours + loggedHours } 
          : task
      )
    );
  };

  const requestExtension = (taskId: string, reason: string, newDueDate: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              isExtensionRequested: true, 
              extensionReason: reason,
              extensionStatus: 'Pending',
              newDueDate
            } 
          : task
      )
    );
  };

  const respondToExtension = (taskId: string, approved: boolean) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return { 
            ...task, 
            extensionStatus: approved ? 'Approved' : 'Rejected',
            dueDate: approved && task.newDueDate ? task.newDueDate : task.dueDate
          };
        }
        return task;
      })
    );
  };

  const addTaskComment = (taskId: string, content: string) => {
    if (!currentUser) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      content,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, comments: [...task.comments, newComment] } 
          : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      userTasks,
      addTask,
      updateTaskStatus,
      updateTaskProgress,
      requestExtension,
      respondToExtension,
      addTaskComment
    }}>
      {children}
    </TaskContext.Provider>
  );
};