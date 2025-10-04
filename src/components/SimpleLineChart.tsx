interface LineChartProps {
  data: Array<{ month: string; amount: number }>;
}

export const SimpleLineChart = ({ data }: LineChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.amount));
  const minValue = Math.min(...data.map((d) => d.amount));
  const range = maxValue - minValue;

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.amount - minValue) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Income</span>
            <span className="text-green-400 font-semibold">+8.2%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Expense</span>
            <span className="text-green-400 font-semibold">+2.2%</span>
          </div>
        </div>
        <select className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 text-xs px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700">
          <option>Last Year</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="relative h-48">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
        </svg>
        <div className="absolute inset-0 grid grid-cols-12 gap-0 opacity-20">
          {data.map((_, i) => (
            <div key={i} className="border-l border-gray-700"></div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-500">
        {data.map(
          (item, i) => i % 1 === 0 && <span key={i}>{item.month}</span>
        )}
      </div>
    </div>
  );
};
