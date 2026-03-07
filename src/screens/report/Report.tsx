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
      <div className='bg-white w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col'>
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Total Subscribers */}
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  ↑ {stats.revenueGrowth}%
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.totalSubscribers}</p>
              <p className="text-sm text-gray-500 mt-1">Total Subscribers</p>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-green-600">● {stats.activeSubscribers} Active</span>
                <span className="text-red-600">● {stats.suspendedSubscribers} Suspended</span>
              </div>
            </div>

            {/* Active Subscribers */}
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.activeSubscribers}</p>
              <p className="text-sm text-gray-500 mt-1">Active Subscribers</p>
              <p className="text-xs text-gray-400 mt-2">
                {((stats.activeSubscribers / stats.totalSubscribers) * 100).toFixed(1)}% of total
              </p>
            </div>

            {/* Monthly Revenue */}
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">💰</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">${stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Monthly Revenue</p>
              <p className="text-xs text-gray-400 mt-2">MRR: ${stats.monthlyRevenue.toLocaleString()}</p>
            </div>

            {/* Yearly Revenue */}
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">${stats.yearlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Yearly Revenue (Projected)</p>
              <p className="text-xs text-gray-400 mt-2">ARR: ${stats.yearlyRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Charts and Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Plan Distribution */}
            <div className="lg:col-span-1 bg-white rounded-xl border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Plan Distribution</h3>
              <div className="space-y-4">
                {planBreakdown.map((plan) => (
                  <div key={plan.plan}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{plan.plan}</span>
                      <span className="text-gray-600">{plan.subscriberCount} subscribers</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`${plan.color} h-full`}
                        style={{ width: `${plan.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500">{plan.percentage}% of total</span>
                      <span className="font-bold text-gray-700">${plan.revenue}/mo</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Plan Revenue Summary */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Revenue by Plan</h4>
                <div className="space-y-2">
                  {planBreakdown.map((plan) => (
                    <div key={plan.plan} className="flex justify-between text-sm">
                      <span className="text-gray-600">{plan.plan}</span>
                      <span className="font-medium text-gray-800">${plan.revenue}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Trend */}
            <div className="lg:col-span-2 bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Revenue Trend</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs border rounded hover:bg-gray-50">6M</button>
                  <button className="px-3 py-1 text-xs border rounded hover:bg-gray-50">1Y</button>
                  <button className="px-3 py-1 text-xs border rounded hover:bg-gray-50">All</button>
                </div>
              </div>
              
              {/* Simple Bar Chart Representation */}
              <div className="space-y-4">
                {mockRevenueData.map((data) => (
                  <div key={data.month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{data.month}</span>
                      <div className="flex gap-4">
                        <span className="text-indigo-600 font-medium">${data.revenue.toLocaleString()}</span>
                        <span className="text-gray-400">({data.subscribers} subs)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-8 rounded-lg overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-lg flex items-center justify-end px-3 text-xs text-white font-bold"
                        style={{ width: `${(data.revenue / 25000) * 100}%` }}
                      >
                        ${data.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Subscribers & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Subscribers */}
            <div className="lg:col-span-2 bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Subscribers</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View All →
                </button>
              </div>
              
              <div className="space-y-3">
                {recentSubscribers.map((company) => (
                  <div 
                    key={company.id}
                    onClick={() => onViewCompany(company.id)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                        company.packageTier === 'Basic' ? 'bg-blue-500' :
                        company.packageTier === 'Premium' ? 'bg-purple-500' : 'bg-indigo-500'
                      }`}>
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-indigo-600">{company.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            company.isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {company.isActive ? 'Active' : 'Suspended'}
                          </span>
                          <span className="text-xs text-gray-400">{company.packageTier}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${company.monthlyRevenue}/mo</p>
                      <p className="text-xs text-gray-400">Joined {company.joinedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3 mb-6">
                <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2">
                  <span>➕</span> Add New Subscription
                </button>
                <button className="w-full py-2.5 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium flex items-center justify-center gap-2">
                  <span>📊</span> Generate Report
                </button>
                <button className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
                  <span>📧</span> Send Newsletter
                </button>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Platform Health</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Subscription Growth</span>
                      <span className="font-bold text-green-600">+15.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Revenue Growth</span>
                      <span className="font-bold text-indigo-600">+23.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Retention Rate</span>
                      <span className="font-bold text-purple-600">94.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Summary */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center text-sm">
            <div className="flex gap-6">
              <div>
                <span className="text-gray-500">Average Revenue per User:</span>
                <span className="ml-2 font-bold text-gray-800">
                  ${(stats.monthlyRevenue / stats.activeSubscribers).toFixed(2)}/mo
                </span>
              </div>
              <div>
                <span className="text-gray-500">Plan Upgrades (This Month):</span>
                <span className="ml-2 font-bold text-green-600">+8</span>
              </div>
              <div>
                <span className="text-gray-500">Churn Rate:</span>
                <span className="ml-2 font-bold text-red-600">2.3%</span>
              </div>
            </div>
            <div className="text-gray-400 text-xs">
              *Data updates in real-time
            </div>
          </div>
        </div>
      </div>

  );
};

export default Report;