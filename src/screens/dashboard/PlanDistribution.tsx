import React from 'react'
import { mockCompanies } from './data';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Plan } from '../plans/planType';

const PlanDistribution:React.FC<Plan> = ({plans}) => {
  console.log(plans);

  interface ChartData {
  name: string;
  value: number;
}
    
const data: ChartData[] = [
  { name: 'Category A', value: plans[0]?.subscribers },
  { name: 'Category B', value: plans[1]?.subscribers },
  { name: 'Category C', value: plans[2]?.subscribers },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
     const planBreakdown = [
    { 
      plan: 'Basic', 
      subscriberCount:plans[0]?.subscribers,
      percentage: 45,
      color: 'bg-blue-500'
    },
    { 
      plan: 'Premium', 
    subscriberCount:plans[1]?.subscribers,
    percentage: 35,
      color: 'bg-purple-500'
    },
    { 
      plan: 'Enterprise', 
     subscriberCount:plans[2]?.subscribers,
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
                    <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
                      <div 
                        className={`${plan.color} h-full`}
                        style={{ width: `${plan.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500">{plan.percentage}% of total</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Plan Revenue Summary */}
              <div className="mt-2 pt-2  border-t">
                
                <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%" // Center X
            cy="50%" // Center Y
            innerRadius={60} // Set this to 0 for a full pie, or >0 for a donut
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
              </div>
            </div>
  )
}

export default PlanDistribution
