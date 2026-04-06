import React, { useState } from 'react';
import type { CompanyProfileProps } from '../../types/types';

interface SuperAdminOverviewProps {
  companies?: CompanyProfileProps['company'][];
  onClose: () => void;
  onViewCompany: (companyId: string) => void;
}

interface SubscriptionStats {
  totalSubscribers: number;
  activeSubscribers: number;
  suspendedSubscribers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  revenueGrowth: number;
}

interface PlanBreakdown {
  plan: string;
  subscriberCount: number;
  revenue: number;
  percentage: number;
  color: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  subscribers: number;
}

const Report: React.FC<SuperAdminOverviewProps> = ({ 
  companies = [], 
  onClose, 
  onViewCompany 
}) => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('all');

  // Mock data for demonstration
  const mockCompanies = [
    { id: '1', name: 'momo House', packageTier: 'Basic', isActive: true, monthlyRevenue: 99, joinedDate: '2026-01-15' },
    { id: '2', name: 'Spice Kitchen', packageTier: 'Premium', isActive: true, monthlyRevenue: 199, joinedDate: '2026-02-01' },
    { id: '3', name: 'Burger Point', packageTier: 'Basic', isActive: false, monthlyRevenue: 99, joinedDate: '2026-01-20' },
    { id: '4', name: 'Pizza Heaven', packageTier: 'Enterprise', isActive: true, monthlyRevenue: 299, joinedDate: '2026-02-10' },
    { id: '5', name: 'Sushi Master', packageTier: 'Premium', isActive: true, monthlyRevenue: 199, joinedDate: '2026-03-01' },
    { id: '6', name: 'Taco Fiesta', packageTier: 'Basic', isActive: true, monthlyRevenue: 99, joinedDate: '2026-03-05' },
    { id: '7', name: 'Noodle House', packageTier: 'Basic', isActive: true, monthlyRevenue: 99, joinedDate: '2026-02-15' },
    { id: '8', name: 'Curry Palace', packageTier: 'Premium', isActive: true, monthlyRevenue: 199, joinedDate: '2026-01-25' },
  ];

  // Mock revenue data over time
  const mockRevenueData: RevenueData[] = [
    { month: 'Jan 2026', revenue: 8900, subscribers: 18 },
    { month: 'Feb 2026', revenue: 12400, subscribers: 24 },
    { month: 'Mar 2026', revenue: 15600, subscribers: 32 },
    { month: 'Apr 2026', revenue: 18300, subscribers: 38 },
    { month: 'May 2026', revenue: 21100, subscribers: 45 },
    { month: 'Jun 2026', revenue: 24500, subscribers: 52 },
  ];

  // Calculate subscription statistics
  const calculateStats = (): SubscriptionStats => {
    const companies = mockCompanies;
    const activeSubscribers = companies.filter(c => c.isActive).length;
    const suspendedSubscribers = companies.filter(c => !c.isActive).length;
    
    // Calculate revenues
    const monthlyRevenue = companies
      .filter(c => c.isActive)
      .reduce((sum, c) => sum + c.monthlyRevenue, 0);
    
    const yearlyRevenue = monthlyRevenue * 12;
    
    return {
      totalSubscribers: companies.length,
      activeSubscribers,
      suspendedSubscribers,
      totalRevenue: monthlyRevenue * 12, // Annual revenue
      monthlyRevenue,
      yearlyRevenue,
      revenueGrowth: 23.5, // Mock growth percentage
    };
  };

  // Plan breakdown
  const planBreakdown: PlanBreakdown[] = [
    { 
      plan: 'Basic', 
      subscriberCount: mockCompanies.filter(c => c.packageTier === 'Basic' && c.isActive).length,
      revenue: mockCompanies.filter(c => c.packageTier === 'Basic' && c.isActive).reduce((sum, c) => sum + c.monthlyRevenue, 0),
      percentage: 45,
      color: 'bg-blue-500'
    },
    { 
      plan: 'Premium', 
      subscriberCount: mockCompanies.filter(c => c.packageTier === 'Premium' && c.isActive).length,
      revenue: mockCompanies.filter(c => c.packageTier === 'Premium' && c.isActive).reduce((sum, c) => sum + c.monthlyRevenue, 0),
      percentage: 35,
      color: 'bg-purple-500'
    },
    { 
      plan: 'Enterprise', 
      subscriberCount: mockCompanies.filter(c => c.packageTier === 'Enterprise' && c.isActive).length,
      revenue: mockCompanies.filter(c => c.packageTier === 'Enterprise' && c.isActive).reduce((sum, c) => sum + c.monthlyRevenue, 0),
      percentage: 20,
      color: 'bg-indigo-500'
    },
  ];

  const stats = calculateStats();

  // Recent subscribers
  const recentSubscribers = [...mockCompanies]
    .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
    .slice(0, 5);

  return (
      <div className='bg-white w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex my-2 flex-col'>
        {/* Timeframe Selector */}
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  timeframe === 'monthly' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeframe('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  timeframe === 'yearly' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
              </button>
            </div>
            
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm bg-white"
            >
              <option value="all">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

      </div>

  );
};

export default Report;