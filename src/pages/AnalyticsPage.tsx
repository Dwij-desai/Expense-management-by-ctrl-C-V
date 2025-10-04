import { useState } from "react";
import { ChartCard } from "../components/ChartCard";
import { StatsCard } from "../components/StatsCard";
import { SimpleLineChart } from "../components/SimpleLineChart";
import { SimpleBarChart } from "../components/SimpleBarChart";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockChartData } from "../data/mockData";

export const AnalyticsPage = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState("30d");
  const [showDetailed, setShowDetailed] = useState(false);

  const getRoleBasedStats = () => {
    switch (user?.role) {
      case "admin":
        return [
          {
            title: "Total Expenses",
            value: "$125,430",
            icon: DollarSign,
            trend: { value: "+12%", isPositive: false },
          },
          {
            title: "Approved Expenses",
            value: "$118,200",
            icon: TrendingUp,
            trend: { value: "+8%", isPositive: true },
          },
          {
            title: "Pending Review",
            value: "$7,230",
            icon: Calendar,
            trend: { value: "-15%", isPositive: true },
          },
          {
            title: "Active Users",
            value: 142,
            icon: Users,
            trend: { value: "+5%", isPositive: true },
          },
        ];
      case "manager":
        return [
          {
            title: "Team Expenses",
            value: "$28,450",
            icon: DollarSign,
            trend: { value: "+8%", isPositive: false },
          },
          {
            title: "Approved This Month",
            value: "$26,200",
            icon: TrendingUp,
            trend: { value: "+12%", isPositive: true },
          },
          {
            title: "Pending Approvals",
            value: "$2,250",
            icon: Calendar,
            trend: { value: "-20%", isPositive: true },
          },
          {
            title: "Team Members",
            value: 12,
            icon: Users,
            trend: { value: "+2%", isPositive: true },
          },
        ];
      case "employee":
        return [
          {
            title: "My Expenses",
            value: "$2,340",
            icon: DollarSign,
            trend: { value: "+15%", isPositive: false },
          },
          {
            title: "Approved",
            value: "$2,100",
            icon: TrendingUp,
            trend: { value: "+10%", isPositive: true },
          },
          {
            title: "Pending",
            value: "$240",
            icon: Calendar,
            trend: { value: "-5%", isPositive: true },
          },
          {
            title: "This Month",
            value: "$890",
            icon: BarChart3,
            trend: { value: "+8%", isPositive: false },
          },
        ];
      default:
        return [];
    }
  };

  const getRoleBasedContent = () => {
    switch (user?.role) {
      case "admin":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive insights into company spending and trends
                </p>
              </div>
              <div className="flex gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Expense Trends"
                subtitle="Monthly spending patterns"
              >
                <SimpleLineChart data={mockChartData.monthlyTrend} />
              </ChartCard>

              <ChartCard
                title="Department Spending"
                subtitle="Current month breakdown"
              >
                <div className="space-y-4">
                  {[
                    {
                      department: "Engineering",
                      amount: 45000,
                      percentage: 35,
                      color: "bg-blue-500",
                    },
                    {
                      department: "Sales",
                      amount: 32000,
                      percentage: 25,
                      color: "bg-green-500",
                    },
                    {
                      department: "Marketing",
                      amount: 28000,
                      percentage: 22,
                      color: "bg-purple-500",
                    },
                    {
                      department: "HR",
                      amount: 15000,
                      percentage: 12,
                      color: "bg-orange-500",
                    },
                    {
                      department: "Finance",
                      amount: 8000,
                      percentage: 6,
                      color: "bg-red-500",
                    },
                  ].map((dept, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {dept.department}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${dept.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${dept.color}`}
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            <ChartCard
              title="Detailed Analytics"
              subtitle="Comprehensive spending analysis"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Top Categories
                    </h4>
                    <div className="space-y-2">
                      {[
                        { category: "Travel", amount: 45000, count: 234 },
                        { category: "Meals", amount: 32000, count: 189 },
                        { category: "Supplies", amount: 28000, count: 156 },
                        { category: "Software", amount: 15000, count: 45 },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.category}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Approval Rates
                    </h4>
                    <div className="space-y-2">
                      {[
                        { period: "This Month", rate: 94, trend: "+2%" },
                        { period: "Last Month", rate: 92, trend: "+1%" },
                        { period: "This Quarter", rate: 93, trend: "+3%" },
                        { period: "Last Quarter", rate: 90, trend: "-1%" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.period}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {item.rate}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Top Spenders
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          name: "John Smith",
                          amount: 8500,
                          department: "Engineering",
                        },
                        {
                          name: "Sarah Johnson",
                          amount: 7200,
                          department: "Sales",
                        },
                        {
                          name: "Mike Davis",
                          amount: 6800,
                          department: "Marketing",
                        },
                        { name: "Lisa Wilson", amount: 5400, department: "HR" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.name}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        );

      case "manager":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Team Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Insights into your team's spending patterns and trends
                </p>
              </div>
              <div className="flex gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Team Spending Trend"
                subtitle="Monthly team expenses"
              >
                <SimpleLineChart data={mockChartData.monthlyTrend} />
              </ChartCard>

              <ChartCard
                title="Team Member Spending"
                subtitle="Individual contributions"
              >
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Chen",
                      amount: 4200,
                      percentage: 18,
                      role: "Senior Developer",
                    },
                    {
                      name: "Emma Rodriguez",
                      amount: 3800,
                      percentage: 16,
                      role: "Marketing Manager",
                    },
                    {
                      name: "David Kim",
                      amount: 3200,
                      percentage: 14,
                      role: "Sales Rep",
                    },
                    {
                      name: "Sarah Wilson",
                      amount: 2800,
                      percentage: 12,
                      role: "Designer",
                    },
                    {
                      name: "Mike Johnson",
                      amount: 2400,
                      percentage: 10,
                      role: "Analyst",
                    },
                  ].map((member, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                            ({member.role})
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${member.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${member.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            <ChartCard
              title="Team Performance Metrics"
              subtitle="Approval and efficiency data"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Approval Performance
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        metric: "Average Approval Time",
                        value: "2.4 hours",
                        trend: "+15%",
                      },
                      { metric: "Approval Rate", value: "96%", trend: "+2%" },
                      { metric: "Rejection Rate", value: "4%", trend: "-1%" },
                      { metric: "Pending Items", value: "3", trend: "-25%" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.metric}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.value}
                          </span>
                          <span className="text-xs text-green-400 ml-2">
                            {item.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Spending Categories
                  </h4>
                  <div className="space-y-3">
                    {[
                      { category: "Travel", amount: 12000, percentage: 42 },
                      { category: "Meals", amount: 8500, percentage: 30 },
                      { category: "Supplies", amount: 4500, percentage: 16 },
                      { category: "Training", amount: 3000, percentage: 12 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.category}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        );

      case "employee":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your spending patterns and expense trends
                </p>
              </div>
              <div className="flex gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="My Spending Trend"
                subtitle="Monthly expense patterns"
              >
                <SimpleLineChart data={mockChartData.monthlyTrend} />
              </ChartCard>

              <ChartCard
                title="Expense Categories"
                subtitle="Where I spend most"
              >
                <div className="space-y-4">
                  {[
                    {
                      category: "Meals",
                      amount: 890,
                      percentage: 38,
                      color: "bg-green-500",
                    },
                    {
                      category: "Travel",
                      amount: 650,
                      percentage: 28,
                      color: "bg-blue-500",
                    },
                    {
                      category: "Supplies",
                      amount: 420,
                      percentage: 18,
                      color: "bg-purple-500",
                    },
                    {
                      category: "Other",
                      amount: 380,
                      percentage: 16,
                      color: "bg-orange-500",
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${item.amount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            <ChartCard
              title="Personal Insights"
              subtitle="Your expense behavior analysis"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Spending Habits
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        habit: "Average per expense",
                        value: "$45.20",
                        trend: "+8%",
                      },
                      {
                        habit: "Expenses this month",
                        value: "18",
                        trend: "+2",
                      },
                      { habit: "Approval rate", value: "94%", trend: "+3%" },
                      {
                        habit: "Fastest approval",
                        value: "2 hours",
                        trend: "-30min",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.habit}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.value}
                          </span>
                          <span className="text-xs text-green-400 ml-2">
                            {item.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        activity: "Expense approved",
                        amount: "$78.50",
                        time: "2 hours ago",
                      },
                      {
                        activity: "Expense submitted",
                        amount: "$45.20",
                        time: "1 day ago",
                      },
                      {
                        activity: "Expense approved",
                        amount: "$32.00",
                        time: "2 days ago",
                      },
                      {
                        activity: "Expense submitted",
                        amount: "$12.30",
                        time: "3 days ago",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.activity}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {item.time}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You don't have permission to view this page.
            </p>
          </div>
        );
    }
  };

  return <div className="space-y-6">{getRoleBasedContent()}</div>;
};
