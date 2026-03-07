import { LucideIcon } from "lucide-react";

interface MainCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: number;
  iconColor: LucideIcon; // e.g., "text-blue-600"
  iconBg: string;    // e.g., "bg-blue-50"
  extraInfo?: React.ReactNode;
}

const MainCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  iconColor, 
  iconBg, 
  extraInfo 
}: MainCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${iconBg} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* Icon Container with Glassmorphism effect */}
          <div className={`w-12 h-12 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center shadow-inner`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
          
          {/* Trend Badge */}
          {trend && (
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                <span className="text-[10px]">▲</span> {trend}%
              </span>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {value}
          </p>
        </div>

        {/* Dynamic Footer Section */}
        {extraInfo && (
          <div className="mt-4 pt-4 border-t border-gray-50">
            {extraInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCard;