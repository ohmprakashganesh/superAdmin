import { mockCompanies } from './data';
import { Link } from 'react-router-dom';

const RecentSubs = () => {

      const recentSubscribers = [...mockCompanies]
        .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
        .slice(0, 5);
    
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Subscribers</h3>
                <Link to="/restaurants">
              
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View All →
                </button>
                  </Link>
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
                    <p className="text-xs text-gray-400">Joined {company.joinedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default RecentSubs
