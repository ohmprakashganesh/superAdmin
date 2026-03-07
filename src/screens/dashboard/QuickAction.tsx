import React from 'react'

const QuickAction = () => {
  return (
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
  )
}

export default QuickAction
