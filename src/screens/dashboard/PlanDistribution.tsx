import React from 'react'
import { mockCompanies } from './data';

const PlanDistribution = () => {
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


  return (
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
  )
}

export default PlanDistribution
