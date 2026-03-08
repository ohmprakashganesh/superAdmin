import React, { useState } from 'react';
import type { CompanyProfileProps } from '../../types/types';
import MainCard from './MainCard';
import { mockCompanies } from './data';
import { mockRevenueData } from './data';
import { DollarSign, UploadCloud, User, Users2Icon } from 'lucide-react';
import PlanDistribution from './PlanDistribution';
import RevenueTrend from './RevenueTrend';
import RecentSubs from './RecentSubs';
import QuickAction from './QuickAction';
interface SuperAdminOverviewProps {
  companies?: CompanyProfileProps['company'][];
  onClose: () => void;
  onViewCompany: (companyId: string) => void;
}

export interface SubscriptionStats {
  totalSubscribers: number;
  activeSubscribers: number;
  suspendedSubscribers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  revenueGrowth: number;
}
 
export interface PlanBreakdown {
  plan: string;
  subscriberCount: number;
  revenue: number;
  percentage: number;
  color: string;
}


export interface RevenueData {
  month: string;
  revenue: number;
  subscribers: number;
}

const Dashboard: React.FC<SuperAdminOverviewProps> = ({ 
  companies = [], 
  onViewCompany 
}) => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('all');


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


  

  const stats = calculateStats();

  // Recent subscribers
  const recentSubscribers = [...mockCompanies]
    .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
    .slice(0, 5);


    const statItems = [
    {
      title: "Total Subscribers",
      value: stats.totalSubscribers,
      icon: Users2Icon,
      iconBg: "bg-blue-100",
      trend: stats.revenueGrowth,
      extraInfo: (
        <div className="flex gap-4 mt-1 text-xs">
          <span className="text-green-600">● {stats.activeSubscribers} Active</span>
          <span className="text-red-600">● {stats.suspendedSubscribers} Suspended</span>
        </div>
      ),
    },
    {
      title: "Active Subscribers",
      value: stats.activeSubscribers,
      icon: User,
      iconBg: "bg-green-100",
      extraInfo: (
        <p className="text-xs text-gray-400">
          {((stats.activeSubscribers / stats.totalSubscribers) * 100).toFixed(1)}% of total
        </p>
      ),
    },
    {
      title: "Total plans",
      value: `3`,
      icon: DollarSign,
      iconBg: "bg-purple-100",
      extraInfo: <p className="text-xs text-gray-400">MRR: ${stats.monthlyRevenue.toLocaleString()}</p>,
    }
  ];
  return (
      <div className='bg-white w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col'>
        {/* Timeframe Selector */}
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          {/* <div className="flex items-center gap-4">
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
          </div> */}
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

            {statItems.map((item, index) => (
            <MainCard key={index} {...item} />
           ))}

          </div>

          {/* Charts and Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <PlanDistribution />
            <RecentSubs />
          </div>


        </div>

      </div>

  );
};

export default Dashboard;