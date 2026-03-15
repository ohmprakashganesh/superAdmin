import type { CompanyProfileProps } from '../../types/types';
import MainCard from './MainCard';
import { mockCompanies } from './data';
import { Users2Icon } from 'lucide-react';
import PlanDistribution from './PlanDistribution';
import RecentSubs from './RecentSubs';
import { usePlan } from '../../hooks/usePlan';

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
}) => {

  const {
      summery,
      plans
    } = usePlan();

    console.log(summery);
  // Calculate subscription statistics
  // const calculateStats = (): SubscriptionStats => {
  //   const companies = mockCompanies;
  //   const activeSubscribers = companies.filter(c => c.isActive).length;
  //   const suspendedSubscribers = companies.filter(c => !c.isActive).length;
    
  //   // Calculate revenues
  //   const monthlyRevenue = companies
  //     .filter(c => c.isActive)
  //     .reduce((sum, c) => sum + c.monthlyRevenue, 0);
    
  //   const yearlyRevenue = monthlyRevenue * 12;
    
  //   return {
  //     totalSubscribers: companies.length,
  //     activeSubscribers,
  //     suspendedSubscribers,
  //     totalRevenue: monthlyRevenue * 12, // Annual revenue
  //     monthlyRevenue,
  //     yearlyRevenue,
  //     revenueGrowth: 23.5, // Mock growth percentage
  //   };
  // };
  
  // const stats = calculateStats();
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

           {summery?.map((item, ind) => (
         <MainCard key={ind} {...item} />
            ))}

          </div>

          {/* Charts and Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <PlanDistribution plans={plans} />
            <RecentSubs />
          </div>


        </div>

      </div>

  );
};

export default Dashboard;