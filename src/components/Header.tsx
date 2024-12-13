import React from 'react';
import { Bell, Home, Search, User, PlusSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Header() {
  const { currentUser, notifications } = useApp();
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">Social</div>
        
        <div className="flex items-center space-x-6">
          <Home className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
          <Search className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
          <PlusSquare className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
          
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </div>
          
          {currentUser && (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          )}
        </div>
      </div>
    </header>
  );
}