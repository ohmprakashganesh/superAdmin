import React from "react";

interface subscriptionProps {
  data: any;
}

const SubscriptionCard: React.FC<subscriptionProps> = ({
  data,
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
     
          <p className="font-bold text-indigo-600">{data.packageTier}</p>

      </div>
      <div>
        <p className="text-xs text-gray-500">Activation Date</p>
        <p className="font-medium text-gray-800">{data.activationDate}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Expiry Date</p>

          <p className="font-medium text-gray-800">{data.expiryDate}</p>

      </div>
    </div>
  </div>
);

export default SubscriptionCard;
