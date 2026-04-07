// components/common/Navbar.tsx
import React, { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HiMenu } from 'react-icons/hi';
import { useRestaurants } from '../../hooks/useResturents';
import UserMenu from '../ui/ProfileMenu';

export const Navbar: React.FC = () => {
  const{toggleSidebar}=useRestaurants();

  return (
    <nav className="bg-white  z-50 sticky max-w-7xl w-full mx-auto top-0 left-0 border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-x-6 flex-1">
        <button
        className="md:hidden  text-2xl"
        onClick={toggleSidebar}>
        <HiMenu />
      </button>

          <div className="relative ">
           <h1 className="text-2xl font-bold text-gray-900">RSM</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <UserMenu />
        </div>

      </div>
    </nav>
  );
};