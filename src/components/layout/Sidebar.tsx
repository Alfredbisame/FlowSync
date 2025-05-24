import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  LogOut,
  X,
  Layers,
  Building2,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Support Tickets', href: '/tickets', icon: MessageSquare },
    ...(isAdmin ? [{ name: 'Team', href: '/team', icon: Users }] : []),
    ...(isAdmin ? [{ name: 'Analytics', href: '/analytics', icon: BarChart2 }] : []),
    { name: 'Projects', href: '/projects', icon: Layers },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"></div>
          
          <div className="fixed inset-0 flex">
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white shadow-2xl">
              {/* Close button */}
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              
              {/* Mobile sidebar content */}
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center px-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      FlowSync
                    </h1>
                  </div>
                </div>
                
                <nav className="mt-8 space-y-2 px-4">
                  {renderNavigation(true)}
                </nav>
              </div>
              
              {/* User info on mobile */}
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4 bg-gray-50">
                <div className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white shadow-lg"
                        src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name}&background=3b82f6&color=fff`}
                        alt=""
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-semibold text-gray-900">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500">{currentUser?.role}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Log out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-white border-r border-gray-200 shadow-xl">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center px-6 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FlowSync
              </h1>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-6 flex flex-1 flex-col px-4 space-y-2">
            {renderNavigation(false)}
          </nav>
          
          {/* User info */}
          <div className="mt-6 flex flex-shrink-0 border-t border-gray-200 p-4 bg-gray-50">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white shadow-lg"
                    src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name}&background=3b82f6&color=fff`}
                    alt=""
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  function renderNavigation(isMobile: boolean) {
    return navigation.map((item) => {
      const active = isActive(item.href);
      return (
        <Link
          key={item.name}
          to={item.href}
          onClick={() => isMobile && setIsOpen(false)}
          className={`
            group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02]
            ${
              active
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
        >
          {/* Active indicator */}
          {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
          )}
          
          <item.icon
            className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
              active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
            }`}
            aria-hidden="true"
          />
          <span className="flex-1">{item.name}</span>
          
          {/* Hover arrow */}
          <ChevronRight
            className={`h-4 w-4 transition-all duration-200 ${
              active 
                ? 'text-white opacity-100' 
                : 'text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
            }`}
          />
        </Link>
      );
    });
  }
};

export default Sidebar;
