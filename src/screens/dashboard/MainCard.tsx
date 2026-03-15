import { type LucideIcon } from "lucide-react";

interface MainCardProps {
  value: string | number;
  title: string;
  icon: LucideIcon;
  bgColor: string;
}

const MainCard = ({ value, title, bgColor, icon: Icon }: MainCardProps) => {
  return (
    <div
      className={`group relative rounded-2xl border border-gray-100 p-2 shadow-sm hover:shadow-xl ${bgColor} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      <div className="relative flex justify-between py-5 px-3 z-10">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            {title || "demo"}
          </h3>

          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {value}
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default MainCard;