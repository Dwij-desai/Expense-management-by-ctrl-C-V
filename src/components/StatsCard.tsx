import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className = "",
}: StatsCardProps) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
          <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {value}
            </p>
            {trend && (
              <span
                className={`text-sm font-semibold ${
                  trend.isPositive ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
