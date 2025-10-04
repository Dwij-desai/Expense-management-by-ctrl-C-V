import { useState } from "react";
import { ChartCard } from "../components/ChartCard";
import { StatsCard } from "../components/StatsCard";
import {
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Download,
  Upload,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const CardsPage = () => {
  const { user } = useAuth();
  const [showCardNumber, setShowCardNumber] = useState(false);

  const getRoleBasedStats = () => {
    switch (user?.role) {
      case "admin":
        return [
          {
            title: "Total Cards",
            value: 156,
            icon: CreditCard,
            trend: { value: "+8%", isPositive: true },
          },
          {
            title: "Active Cards",
            value: 142,
            icon: CheckCircle,
            trend: { value: "+5%", isPositive: true },
          },
          {
            title: "Pending Approval",
            value: 8,
            icon: Clock,
            trend: { value: "-12%", isPositive: true },
          },
          {
            title: "Monthly Spend",
            value: "$45,230",
            icon: DollarSign,
            trend: { value: "+15%", isPositive: false },
          },
        ];
      case "manager":
        return [
          {
            title: "Team Cards",
            value: 24,
            icon: CreditCard,
            trend: { value: "+2%", isPositive: true },
          },
          {
            title: "Active Team Cards",
            value: 22,
            icon: CheckCircle,
            trend: { value: "+1%", isPositive: true },
          },
          {
            title: "Pending Requests",
            value: 3,
            icon: Clock,
            trend: { value: "-25%", isPositive: true },
          },
          {
            title: "Team Spend",
            value: "$8,450",
            icon: DollarSign,
            trend: { value: "+8%", isPositive: false },
          },
        ];
      case "employee":
        return [
          {
            title: "My Cards",
            value: 2,
            icon: CreditCard,
            trend: { value: "0%", isPositive: true },
          },
          {
            title: "Active Cards",
            value: 2,
            icon: CheckCircle,
            trend: { value: "0%", isPositive: true },
          },
          {
            title: "Monthly Limit",
            value: "$2,500",
            icon: DollarSign,
            trend: { value: "0%", isPositive: true },
          },
          {
            title: "Used This Month",
            value: "$1,240",
            icon: TrendingUp,
            trend: { value: "+12%", isPositive: false },
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
                  Card Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage all corporate cards and spending policies
                </p>
              </div>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                Issue New Card
              </button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Card Requests"
                subtitle="Pending card approvals"
              >
                <div className="space-y-3">
                  {[
                    {
                      name: "John Smith",
                      department: "Engineering",
                      amount: "$2,500",
                      status: "pending",
                    },
                    {
                      name: "Sarah Johnson",
                      department: "Marketing",
                      amount: "$1,500",
                      status: "pending",
                    },
                    {
                      name: "Mike Davis",
                      department: "Sales",
                      amount: "$3,000",
                      status: "approved",
                    },
                    {
                      name: "Lisa Wilson",
                      department: "HR",
                      amount: "$1,000",
                      status: "pending",
                    },
                  ].map((request, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {request.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {request.department}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {request.amount}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            request.status === "approved"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard
                title="Spending by Department"
                subtitle="Monthly card usage"
              >
                <div className="space-y-4">
                  {[
                    {
                      department: "Engineering",
                      amount: 18500,
                      percentage: 35,
                      color: "bg-blue-500",
                    },
                    {
                      department: "Sales",
                      amount: 15200,
                      percentage: 28,
                      color: "bg-green-500",
                    },
                    {
                      department: "Marketing",
                      amount: 9800,
                      percentage: 18,
                      color: "bg-purple-500",
                    },
                    {
                      department: "HR",
                      amount: 4500,
                      percentage: 8,
                      color: "bg-orange-500",
                    },
                    {
                      department: "Finance",
                      amount: 6000,
                      percentage: 11,
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
              title="All Corporate Cards"
              subtitle="Complete card directory"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Cardholder
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Card Number
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Department
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Limit
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "John Smith",
                        card: "**** 1234",
                        department: "Engineering",
                        limit: "$2,500",
                        status: "active",
                      },
                      {
                        name: "Sarah Johnson",
                        card: "**** 5678",
                        department: "Marketing",
                        limit: "$1,500",
                        status: "active",
                      },
                      {
                        name: "Mike Davis",
                        card: "**** 9012",
                        department: "Sales",
                        limit: "$3,000",
                        status: "active",
                      },
                      {
                        name: "Lisa Wilson",
                        card: "**** 3456",
                        department: "HR",
                        limit: "$1,000",
                        status: "suspended",
                      },
                    ].map((card, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                          {card.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                          {card.card}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {card.department}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {card.limit}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              card.status === "active"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {card.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                              <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>
          </div>
        );

      case "manager":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Team Cards
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your team's corporate cards and spending
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Team Card Requests"
                subtitle="Pending approvals"
              >
                <div className="space-y-3">
                  {[
                    {
                      name: "Alex Chen",
                      amount: "$2,000",
                      reason: "Client meetings",
                      status: "pending",
                    },
                    {
                      name: "Emma Rodriguez",
                      amount: "$1,200",
                      reason: "Conference travel",
                      status: "pending",
                    },
                    {
                      name: "David Kim",
                      amount: "$800",
                      reason: "Equipment purchase",
                      status: "approved",
                    },
                  ].map((request, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {request.name}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            request.status === "approved"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {request.reason}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {request.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard
                title="Team Spending Overview"
                subtitle="Current month"
              >
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      $8,450
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Team Spend
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { category: "Travel", amount: 3200, percentage: 38 },
                      { category: "Meals", amount: 2100, percentage: 25 },
                      { category: "Supplies", amount: 1800, percentage: 21 },
                      { category: "Other", amount: 1350, percentage: 16 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.category}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            ${item.amount}
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
              </ChartCard>
            </div>
          </div>
        );

      case "employee":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Cards
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your corporate cards and spending
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="My Corporate Cards" subtitle="Active cards">
                <div className="space-y-4">
                  {[
                    {
                      name: "Primary Card",
                      number: "**** 1234",
                      limit: "$2,500",
                      used: "$1,240",
                      available: "$1,260",
                      expiry: "12/25",
                    },
                    {
                      name: "Travel Card",
                      number: "**** 5678",
                      limit: "$1,000",
                      used: "$320",
                      available: "$680",
                      expiry: "12/25",
                    },
                  ].map((card, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {card.name}
                        </h3>
                        <button
                          onClick={() => setShowCardNumber(!showCardNumber)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          {showCardNumber ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                          {showCardNumber ? card.number : "**** ****"}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Limit:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {card.limit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Used:
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {card.used}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Available:
                          </span>
                          <span className="text-green-600 dark:text-green-400">
                            {card.available}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (parseInt(
                                  card.used.replace("$", "").replace(",", ""),
                                ) /
                                  parseInt(
                                    card.limit
                                      .replace("$", "")
                                      .replace(",", ""),
                                  )) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard title="Recent Transactions" subtitle="Last 7 days">
                <div className="space-y-3">
                  {[
                    {
                      description: "Office Supplies - Staples",
                      amount: "$45.20",
                      date: "Today",
                      category: "Supplies",
                    },
                    {
                      description: "Client Lunch - Restaurant",
                      amount: "$78.50",
                      date: "Yesterday",
                      category: "Meals",
                    },
                    {
                      description: "Uber Ride - Airport",
                      amount: "$32.00",
                      date: "2 days ago",
                      category: "Travel",
                    },
                    {
                      description: "Coffee Meeting",
                      amount: "$12.30",
                      date: "3 days ago",
                      category: "Meals",
                    },
                  ].map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {transaction.date} • {transaction.category}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {transaction.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
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
