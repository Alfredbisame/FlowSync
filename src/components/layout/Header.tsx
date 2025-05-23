import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import Avatar from '../ui/Avatar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      
      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
      
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search tasks, tickets, users..."
            className="h-full w-full border-0 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm rounded-full"
          />
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notification button */}
          <button
            type="button"
            className="relative p-1.5 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-xs text-white text-center leading-5">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {/* Profile dropdown */}
          <div className="relative flex items-center gap-x-3">
            <div className="hidden sm:flex sm:items-center sm:gap-x-2">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.role}</p>
            </div>
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;