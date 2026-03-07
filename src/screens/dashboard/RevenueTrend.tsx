import React from 'react'
import { mockRevenueData } from './data'

const RevenueTrend = () => {
  return (
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
  )
}

export default RevenueTrend
