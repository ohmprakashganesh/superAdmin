import React from "react";
import type { PlanCardProps } from "./planType";


const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div
      className={`
        relative rounded-2xl shadow-lg border p-6 transition-all duration-300
        ${plan.isPopular ? "border-blue-600 scale-105 bg-blue-50" : "border-gray-200 bg-white"}
      `}
    >
      {plan.isPopular && (
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <h3 className="text-xl font-semibold mb-2">{plan.slug}</h3>


      <div className="mb-4">
        <span className="text-3xl font-bold">₹{plan.price}</span>
        <span className="text-gray-500 text-sm"> / {plan.billingPeriod}</span>

      </div>
      <div>
       <span className="text-gray-500 text-sm">  ✓ {plan.tables} tables</span>

      </div>

      <ul className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-center">
            ✓ {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.id)}
        className={`
          w-full py-2 rounded-lg font-medium transition
          ${
            plan.isPopular
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-800 text-white hover:bg-black"
          }
        `}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PlanCard;
