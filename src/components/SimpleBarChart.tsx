interface BarChartProps {
  data: Array<{ day: string; receipts: number; expenses: number }>;
}

export const SimpleBarChart = ({ data }: BarChartProps) => {
  const maxValue = Math.max(...data.flatMap((d) => [d.receipts, d.expenses]));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">
            Cash receipts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">
            Cash expenses
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end gap-1 h-40">
              <div
                className="flex-1 bg-blue-500 rounded-t transition-all duration-500 hover:opacity-80"
                style={{ height: `${(item.receipts / maxValue) * 100}%` }}
              ></div>
              <div
                className="flex-1 bg-blue-400 rounded-t transition-all duration-500 hover:opacity-80"
                style={{ height: `${(item.expenses / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-500">
              {item.day}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            8.3
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Cash receipts
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            6.9
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Cash expenses
          </p>
        </div>
      </div>
    </div>
  );
};
