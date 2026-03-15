import React, { useEffect, useRef, useState } from "react";
import type { Plan } from "./planType";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (id: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit, onDelete }) => {
  const [showOpt, setShowOpt] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowOpt(false);
      }
    };
    if (showOpt) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOpt]);

  return (
    <div className="relative w-full">
      <div className="relative rounded-2xl shadow-lg border p-6 bg-white border-gray-200 transition-all">
        <div className="absolute top-4 right-4" ref={popupRef}>
          <button
            onClick={() => setShowOpt(!showOpt)}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
          >
            <MoreVertical size={20} />
          </button>

          {showOpt && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
              <button
                onClick={() => { onEdit(plan); setShowOpt(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={14} className="text-blue-500" /> Edit
              </button>
              <button 
                onClick={() => { if(confirm("Delete plan?")) onDelete(plan.id); setShowOpt(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>

        {plan.isPopular && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
            Most Popular
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{plan.slug}</p>
        <div className="mb-4">
          <span className="text-4xl font-extrabold text-gray-900">₹{plan.price}</span>
          <span className="text-gray-500 text-sm"> / {plan.billingPeriod}</span>
        </div>
        
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="text-green-500">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;