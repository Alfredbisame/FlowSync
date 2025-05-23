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
  Layers
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
          <div className="fixed inset-0 bg-gray-900/80"></div>
          
          <div className="fixed inset-0 flex">
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-b from-blue-600 to-blue-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              
              {/* Mobile sidebar content */}
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-2xl font-bold text-white">FlowSync</h1>
                </div>
                <nav className="mt-8 space-y-1 px-2">
                  {renderNavigation(true)}
                </nav>
              </div>
              
              {/* User info on mobile */}
              <div className="flex flex-shrink-0 border-t border-blue-500 p-4">
                <div className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={currentUser?.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                      <button 
                        onClick={logout} 
                        className="text-xs font-medium text-blue-200 group-hover:text-white flex items-center mt-1"
                      >
                        <LogOut className="mr-1 h-4 w-4" /> Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-gradient-to-b from-blue-600 to-blue-800 pb-4">
          <div className="flex flex-shrink-0 items-center px-6 py-6">
            <h1 className="text-2xl font-bold text-white">FlowSync</h1>
          </div>
          <nav className="mt-6 flex flex-1 flex-col px-6 space-y-1">
            {renderNavigation(false)}
          </nav>
          
          {/* User info */}
          <div className="mt-6 flex flex-shrink-0 border-t border-blue-500 p-6">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={currentUser?.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{currentUser?.name}</p>
                  <button 
                    onClick={logout} 
                    className="text-xs font-medium text-blue-200 group-hover:text-white flex items-center mt-1"
                  >
                    <LogOut className="mr-1 h-4 w-4" /> Log out
                  </button>
                </div>
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
            group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
            ${
              active
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            }
          `}
        >
          <item.icon
            className={`mr-3 h-5 w-5 flex-shrink-0 ${
              active ? 'text-white' : 'text-blue-200 group-hover:text-white'
            }`}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      );
    });
  }
};

export default Sidebar;