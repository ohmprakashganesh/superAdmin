import React, { useState } from 'react';
import type { CompanyProfileProps } from '../../types/types';
import Header from './Header';
import Input from '../../components/ui/Input';
import BusinessCard from './BusinessCard';
import OwnerCard from './OwnerCard';
import SubscriptionCard from './SubscriptionCard';




const CompanyProfile: React.FC<CompanyProfileProps> = ({
  company,
  onEdit,
  onClose,
  onManageSubscription,
  onToggleStatus
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(company);

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
      : "",
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

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm w-screen h-screen flex items-center justify-center z-50 p-4'>
      <div className='bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col'>
        {/* Header */}
        <Header isEditing={isEditing} setIsEditing={setIsEditing} data={data} onEdit={handleEdit} onClose={onClose} />

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1  gap-8">

          {/* Main Content */}
          <div className=" space-y-8">

            {/* Business Identity & Owner Credentials */}
            <div className="grid grid-cols-2 gap-6">
              {/* Business Identity Card */}
              <BusinessCard isEditing={isEditing} handleInputChange={handleInputChange} editedCompany={editedCompany} data={data} />
              <OwnerCard isEditing={isEditing} handleInputChange={handleInputChange} editedCompany={editedCompany} data={data} />
            </div>
            {/* Subscription Plan */}
            <SubscriptionCard isEditing={isEditing}  handleInputChange={handleInputChange} editedCompany={editedCompany} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default CompanyProfile;