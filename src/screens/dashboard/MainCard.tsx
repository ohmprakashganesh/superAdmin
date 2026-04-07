import { type LucideIcon } from "lucide-react";

interface MainCardProps {
  value: string | number;
  title: string;
  icon: LucideIcon;
  bgColor: string;
}

const MainCard = ({ind, value, title, bgColor, icon: Icon }: MainCardProps) => {
  return (
    <div
      className={`group w-full ${ind===2?"col-span-2 md:col-span-1 sm:col-span-1 lg:col-span-1":""} rounded-2xl border border-gray-100  shadow-sm hover:shadow-xl ${bgColor} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      <div className="relative w-full  items-center flex justify-between md:py-5 sm:py-3 py-4  lg:py-5 px-3 z-10">
        <div className=" md:block items-center lg:block sm:block flex justify-between w-full">
          <h3 className="text-sm  font-medium text-gray-500 mb-1">
            {title || "demo"}
          </h3>

          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {value}
          </p>
        </div>

        <div className="w-12 md:block sm:block lg:block hidden h-12 rounded-xl flex items-center justify-center shadow-inner">
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default MainCard;