import React, { useState } from 'react';
import { mockUsers, mockProjects } from '../data/mockData';
import GeneralSettings from '../components/settings/GeneralSettings';
import UsersSettings from '../components/settings/UsersSettings';
import DepartmentsSettings from '../components/settings/DepartmentsSettings';
import ProjectsSettings from '../components/settings/ProjectsSettings';
import NotificationsSettings from '../components/settings/NotificationsSettings';
import SystemSettings from '../components/settings/SystemSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [newDepartment, setNewDepartment] = useState('');
  const [departments, setDepartments] = useState([
    'Engineering', 'Marketing', 'Operations', 'Sales', 'Executive'
  ]);
  const [projectTags, setProjectTags] = useState([
    'Web Development', 'E-commerce', 'React', 'Node.js', 'Mobile', 'Analytics'
  ]);
  const [notificationSettings, setNotificationSettings] = useState({
    taskUpdates: true,
    deadlineReminders: true,
    systemAlerts: false,
    emailNotifications: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const tabs = [
    { id: 'general', name: 'General' },
    { id: 'users', name: 'Users' },
    { id: 'departments', name: 'Departments' },
    { id: 'projects', name: 'Projects' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'system', name: 'System' }
  ];

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDepartment && !departments.includes(newDepartment)) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment('');
    }
  };

  const handleRemoveDepartment = (dept: string) => {
    setDepartments(departments.filter(d => d !== dept));
  };

  const handleAddTag = (e: React.FormEvent, newTag: string) => {
    e.preventDefault();
    if (newTag && !projectTags.includes(newTag)) {
      setProjectTags([...projectTags, newTag]);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
      
      {/* Tabs Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Render active tab content */}
      {activeTab === 'general' && (
        <GeneralSettings
          darkMode={darkMode}
          highContrast={highContrast}
          setDarkMode={setDarkMode}
          setHighContrast={setHighContrast}
        />
      )}

      {activeTab === 'users' && (
        <UsersSettings />
      )}

      {activeTab === 'departments' && (
        <DepartmentsSettings
          departments={departments}
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          handleAddDepartment={handleAddDepartment}
          handleRemoveDepartment={handleRemoveDepartment}
        />
      )}

      {activeTab === 'projects' && (
        <ProjectsSettings
          projectTags={projectTags}
          handleAddTag={handleAddTag}
        />
      )}

      {activeTab === 'notifications' && (
        <NotificationsSettings
          notificationSettings={notificationSettings}
          setNotificationSettings={setNotificationSettings}
        />
      )}

      {activeTab === 'system' && (
        <SystemSettings mockUsers={mockUsers} mockProjects={mockProjects} />
      )}
    </div>
  );
};

export default SettingsPage;