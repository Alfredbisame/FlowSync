import React, { useState } from 'react';
import { Menu, Bell, User, Search, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import Avatar from '../ui/Avatar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200/80 bg-white/80 backdrop-blur-md px-4 shadow-sm lg:ml-64 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 items-center justify-between self-stretch lg:gap-x-6">
        {/* Search bar */}
        <div className="relative flex flex-1 items-center max-w-lg">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search tasks, tickets, users..."
              className="h-10 w-full border border-gray-200 bg-gray-50/50 py-2 pl-11 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 sm:text-sm rounded-xl transition-all duration-200 hover:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-3 lg:gap-x-4">
          {/* Quick actions */}
          <div className="hidden md:flex items-center gap-x-2">
            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200">
              Quick Add
            </button>
          </div>

          {/* Notification button */}
          <div className="relative">
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-xs text-white text-center leading-5 shadow-lg animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                  <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-400 animate-ping"></span>
                </>
              )}
            </button>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-3 p-1.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="hidden sm:flex sm:flex-col sm:items-end sm:text-right">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-600">
                  {currentUser?.role}
                </p>
              </div>
              
              <div className="relative">
                <Avatar 
                  src={currentUser?.avatar} 
                  name={currentUser?.name} 
                  size="sm" 
                  className="ring-2 ring-white shadow-md group-hover:ring-gray-200 transition-all duration-200"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="p-1">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                    <p className="text-sm text-gray-500">{currentUser?.email}</p>
                  </div>
                  
                  {/* Menu items */}
                  <div className="py-1">
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <User className="mr-3 h-4 w-4" />
                      Your Profile
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 py-1">
                    <button 
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
