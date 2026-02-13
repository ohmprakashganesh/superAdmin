// components/common/Sidebar.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  HomeIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: HomeIcon, href: '/', active: true },
  { name: 'Restaurants', icon: BuildingStorefrontIcon, href: '/restaurants' },
  { name: 'Plans', icon: UsersIcon, href: '/plans' },
  { name: 'Reports', icon: ChartBarIcon, href: '/reports' },
  { name: 'Supports', icon: ChartBarIcon, href: '/supports' },
  { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);


  return (
    <div
      className={`${collapsed ? 'w-20' : 'w-64'
        } bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <span className="text-xl font-bold">Super Admin</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-gray-700"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => {
              const isActive=location.pathname===item.href;
              return  (

              <li key={item.name}>
                <a
                  href={item.href}
                  className={`
                  flex items-center p-3 rounded-lg transition-colors
                  ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                    }
                  ${collapsed ? 'justify-center' : 'space-x-3'}
                `}
                >
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                </a>
              </li>
            )
          }
        )}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">SA</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@super.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};