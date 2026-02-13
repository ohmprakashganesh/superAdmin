import { Card } from '../../components/ui/Card'
import { LucideIcon } from 'lucide-react';

interface MainCardProps {
  topIcon: LucideIcon;
  bottomIcon: LucideIcon;
  title: string;
  subTitle: string;
  content: string | number;
  gradientClass?: string; // Allow different colors
}

const MainCard = ({ 
  topIcon: TopIcon, 
  bottomIcon: BottomIcon, 
  title, 
  subTitle, 
  content,
  gradientClass = "from-purple-600 to-indigo-700" // Default color
}: MainCardProps) => {
  return (
    <Card className={`relative overflow-hidden border-none bg-gradient-to-br ${gradientClass} p-6 text-white shadow-xl transition-all hover:scale-[1.02]`}>
      {/* Decorative background circle */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <div className="flex items-start justify-between">
        <div className="space-y-4">
          {/* Header Area */}
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-md">
              <TopIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wide text-white/90 uppercase">
              {title}
            </span>
          </div>

          {/* Stats Area */}
          <div>
            <h3 className="text-4xl font-bold tracking-tight">{content}</h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
              <BottomIcon className="h-3 w-3" />
              <span>{subTitle}</span>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-inner backdrop-blur-sm">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </Card>
  )
}

export default MainCard;