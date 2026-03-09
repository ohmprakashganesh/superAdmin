import React from "react";
import Input from "../../components/ui/Input";

interface subscriptionProps {
  isEditing: boolean;
  editedCompany: any;
  formData: any;
  handleInputChange: (field: string, value: string) => void; // Fixed type    data: any;
  handleFormChange: (field: string, value: string) => void; // Fixed type    data: any;
  data: any;
}

const SubscriptionCard: React.FC<subscriptionProps> = ({
  isEditing,
  editedCompany,
  handleInputChange,
  data,
  formData,
  handleFormChange,
}) => (
  <div className="p-5 rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
    <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
      Subscription Plan
    </h3>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-gray-500">Select Tier</p>
        {isEditing ? (
          <select
            value={editedCompany?.packageTier || data.packageTier}
            onChange={(e) => handleInputChange("packageTier", e.target.value)}
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
        <p className="font-medium text-gray-800">{data.activationDate}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Expiry Date</p>
        {isEditing ? (
          <Input
            onChange={(e) => handleFormChange("expiryDate", e.target.value)}
            value={editedCompany?.expiryDate }
          />
        ) : (
          <p className="font-medium text-gray-800">{data.expiryDate}</p>
        )}
      </div>
    </div>
  </div>
);

export default SubscriptionCard;
