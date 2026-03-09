import React, { useEffect, useRef, useState } from "react";
import type { PlanCardProps } from "./planType";
import { MoreVertical, Pencil, Trash2 } from "lucide-react"; // Improved icon set
import { PlanForm } from "../../components/formUi/PlanFrom";

const PlanCard: React.FC<PlanCardProps> = ({ plan, selected, onSelect }) => {
  const [showOpt, setShowOpt] = useState(false);
  const [eId, setEid] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowOpt(false);
      }
    };
    if (showOpt) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOpt]);

  return (
    <div className="relative w-full">
      <div
        // className={`
        //   relative rounded-2xl overflow-visible shadow-lg border p-6 transition-all duration-300
        //   ${plan.isPopular ? "border-blue-600 scale-105 bg-blue-50" : "border-gray-200 bg-white"}
        // `}
        onClick={() => onSelect(plan.id)}
        className={`
          relative rounded-2xl overflow-visible shadow-lg border p-6 transition-all duration-300
          ${selected === plan.id ? "border-blue-600 scale-105 bg-blue-50" : "border-gray-200 bg-white"}
        `}
      >
        {/* Top Actions Bar */}
        <div className="absolute top-4 right-4" ref={popupRef}>
          <button
            onClick={(e) => {
              setShowOpt(!showOpt);
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <MoreVertical size={20} />
          </button>

          {/* Professional Dropdown Menu */}
          {showOpt && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
              <button
                onClick={(e) => {
                  setEid(plan.id);
                  setShowOpt(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={14} className="text-blue-500" /> Edit
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Popular Badge */}
        {plan.isPopular && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Most Popular
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-xs text-gray-400 font-mono mb-4">{plan.slug}</p>

        <div className="mb-4">
          <span className="text-4xl font-extrabold text-gray-900">
            ₹{plan.price}
          </span>
          <span className="text-gray-500 text-sm"> / {plan.billingPeriod}</span>
        </div>

        <div className="mb-6 space-y-3">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {plan.tables} Tables included
          </div>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <span className="text-green-500 text-lg">✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal logic */}
      {eId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <PlanForm onCancel={() => setEid(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
