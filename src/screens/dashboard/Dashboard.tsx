import type { CompanyProfileProps } from '../../types/types';
import MainCard from './MainCard';
import PlanDistribution from './PlanDistribution';
import RecentSubs from './RecentSubs';
import { usePlan } from '../../hooks/usePlan';
import { useLocation } from 'react-router-dom';

interface SuperAdminOverviewProps {
  companies?: CompanyProfileProps['company'][];
  onClose?: () => void;
  onViewCompany?: (companyId: string) => void;
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

  const loc = useLocation();
  console.log(loc.pathname)
  const {
    summery,
    plans
  } = usePlan();

  console.log(summery);

  // const stats = calculateStats();
  return (
    <div className='bg-white w-full max-w-7xl  rounded-2xl shadow-2xl overflow-hidden flex flex-col'>


      {/* Main Content */}
      <div className=" p-6">
        {/* Key Metrics Cards */}
        <div className="grid w-full  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 md:gap-5 sm:gap-4 gap-2 lg:gap-5 md:mb-8 mb-3 ">
          {summery?.map((item, ind) => (
            <MainCard
              key={ind}
              className={ind === 2 ? "col-span-2" : ""}
              ind={ind}
              {...item}
            />
          ))}
        </div>


        {/* Charts and Analytics Grid */}
        <div className=" relative  grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <RecentSubs />
           <PlanDistribution plans={plans} />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;