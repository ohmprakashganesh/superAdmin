// components/common/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  HomeIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useRestaurants } from '../../hooks/useResturents';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Restaurants', icon: BuildingStorefrontIcon, href: '/restaurants' },
  { name: 'Plans', icon: UsersIcon, href: '/plans' },
  // { name: 'Reports', icon: ChartBarIcon, href: '/reports' },
];

export const Sidebar: React.FC = () => {
    const{toggleSidebar,sideStatus}=useRestaurants();
    return (
   <div
      className={`
      fixed md:static
      top-0 left-0 min-h-screen 
      bg-white w-[250px] md:w-[200px] lg:w-[250px] 
      transform transition-transform duration-300
      ${sideStatus? "translate-x-0" : "-translate-x-full "}
      md:translate-x-0
      z-30 
      `}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-bold text-primary-dark  ">ADMIN</h1>

        {/* Close button (mobile only) */}
        <button
          className="md:hidden text-xl"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>

      <ul className="space-y-3 px-3 mt-4">
      {menuItems.map((item, index) => {
      const Icon = item.icon;

  return (
    <NavLink
      key={index}
      to={item.href}
      onClick={toggleSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-3 rounded-md
        ${
          isActive
            ? "bg-primary text-white"
            : "hover:bg-orange-100 text-gray-700"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{item.name}</span>
    </NavLink>
  );
})}
      </ul>
    </div>
  );
};