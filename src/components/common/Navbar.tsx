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
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Super Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};