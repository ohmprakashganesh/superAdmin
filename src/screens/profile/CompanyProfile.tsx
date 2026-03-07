import React, { useState } from 'react';
import type { CompanyProfileProps } from '../../types/types';

const CompanyProfile: React.FC<CompanyProfileProps> = ({ 
  company, 
  onEdit, 
  onClose, 
  onManageSubscription,
  onToggleStatus 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(company);

  // 🔹 Mock payment history based on image data structure
  const mockPayments = [
    {
      id: "1",
      date: "2026-01-10",
      amount: 99,
      status: "paid",
      method: "stripe",
      invoice: "#INV-2026-001"
    },
    {
      id: "2",
      date: "2026-02-10",
      amount: 99,
      status: "paid",
      method: "paypal",
      invoice: "#INV-2026-002"
    },
    {
      id: "3",
      date: "2026-03-10",
      amount: 99,
      status: "pending",
      method: "stripe",
      invoice: "#INV-2026-003"
    }
  ];

  // 🔹 Company data with all fields from image
  const data = {
    // Business Identity
    id: company?.id || "demo-id",
    name: company?.name || "momo House",
    slug: company?.slug || "momo-house",
    totalCapacity: company?.totalCapacity || 20,
    
    // Owner Credentials
    ownerName: company?.ownerName || "John Doe",
    loginEmail: company?.loginEmail || "cashier@gmail.com",
    
    // Status & Subscription
    isActive: company?.isActive ?? true,
    packageTier: company?.packageTier || "Basic",
    activationDate: company?.activationDate || "2026-01-01",
    expiryDate: company?.expiryDate || "2026-12-31",
    
    // Additional metrics
    totalOrders: company?.totalOrders || 1240,
    nextBillingDate: company?.nextBillingDate || "2026-04-01",
    paymentHistory: company?.paymentHistory?.length
      ? company.paymentHistory
      : mockPayments,
    currentStaffCount: company?.currentStaffCount || 6,
    staffLimit: company?.staffLimit || 10,
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit?.(editedCompany);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditedCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm w-screen h-screen flex items-center justify-center z-50 p-4'>
      <div className='bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col'>
        
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {data.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{data.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">ID: {data.slug}</span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${data.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="text-sm font-medium text-gray-600">
                    {data.isActive ? 'Active' : 'Suspended'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleEdit}
              className="px-5 py-2.5 text-sm font-semibold border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {isEditing ? 'Save Changes' : 'Edit Company'}
            </button>
            <button 
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Business Identity & Owner Credentials */}
            <div className="grid grid-cols-2 gap-6">
              {/* Business Identity Card */}
              <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Business Identity
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Restaurant Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedCompany?.name || data.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full p-2 border rounded-lg mt-1 font-medium"
                      />
                    ) : (
                      <p className="font-bold text-gray-800">{data.name}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Slug (URL identifier)</p>
                    <p className="font-mono text-sm text-gray-600">{data.slug}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Capacity (Tables)</p>
                    <p className="font-bold text-gray-800">{data.totalCapacity} Tables</p>
                  </div>
                </div>
              </div>

              {/* Owner Credentials Card */}
              <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold text-purple-600 uppercase mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Owner Credentials
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedCompany?.ownerName || data.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        className="w-full p-2 border rounded-lg mt-1 font-medium"
                      />
                    ) : (
                      <p className="font-bold text-gray-800">{data.ownerName}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Login Email</p>
                    <p className="font-mono text-sm text-gray-600">{data.loginEmail}</p>
                  </div>
                  <div className="pt-2">
                    <button className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Plan */}
            <div className="p-5 rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Subscription Plan
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Select Tier</p>
                  {isEditing ? (
                    <select
                      value={editedCompany?.packageTier || data.packageTier}
                      onChange={(e) => handleInputChange('packageTier', e.target.value)}
                      className="w-full p-2 border rounded-lg mt-1 font-bold"
                    >
                      <option>Basic</option>
                      <option>Premium</option>
                      <option>Enterprise</option>
                    </select>
                  ) : (
                    <p className="font-bold text-indigo-600">{data.packageTier}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Activation Date</p>
                  <p className="font-medium text-gray-800">{formatDate(data.activationDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expiry Date</p>
                  <p className="font-medium text-gray-800">{formatDate(data.expiryDate)}</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Monthly Orders</p>
                <p className="text-2xl font-black text-gray-800">{data.totalOrders.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </div>

              <div className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Staff Usage</p>
                <p className="text-2xl font-black text-gray-800">{data.currentStaffCount}/{data.staffLimit}</p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-indigo-600 h-full rounded-full" 
                    style={{ width: `${(data.currentStaffCount / data.staffLimit) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Next Billing</p>
                <p className="text-2xl font-black text-gray-800">{formatDate(data.nextBillingDate)}</p>
                <p className="text-xs text-gray-500 mt-1">$99.00/month</p>
              </div>
            </div>

            {/* Payment History */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Payment History
              </h3>

              <div className="border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Invoice</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Method</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data.paymentHistory.map((pay) => (
                      <tr key={pay.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs">{pay.invoice || `#INV-${pay.id}`}</td>
                        <td className="px-4 py-3">{formatDate(pay.date)}</td>
                        <td className="px-4 py-3">
                          <span className="font-medium uppercase text-xs bg-gray-100 px-2 py-1 rounded">
                            {pay.method}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold">${pay.amount.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${getStatusColor(pay.status)}`}>
                            {pay.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar - Admin Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg sticky top-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-6 text-center tracking-wider">
                Super Admin Actions
              </h3>
              
              <div className="space-y-4">
                <button 
                  onClick={() => onManageSubscription(data.id)}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Modify Subscription
                </button>
                
                <button 
                  onClick={() => onToggleStatus(data.id, !data.isActive)}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                    data.isActive 
                      ? 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300' 
                      : 'border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {data.isActive ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  {data.isActive ? 'Suspend Company' : 'Activate Company'}
                </button>
              </div>

              {/* Quick Info */}
              <div className="mt-8 border-t pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Plan Type</span>
                    <span className="text-sm font-bold text-indigo-600">{data.packageTier}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Staff Limit</span>
                    <span className="text-sm font-bold">{data.staffLimit} users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Monthly Payment</span>
                    <span className="text-sm font-bold">$99.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;