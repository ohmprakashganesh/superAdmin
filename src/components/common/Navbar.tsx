// components/common/Navbar.tsx
import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-100">
           <h1 className="text-2xl font-bold text-gray-900">Restaurant Management</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Welcome back, Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};