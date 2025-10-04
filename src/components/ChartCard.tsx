import { ReactNode } from "react";
import { MoreVertical } from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({
  title,
  subtitle,
  children,
  className = "",
}: ChartCardProps) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
};
