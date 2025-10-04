import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { ChartCard } from "../components/ChartCard";
import { SimpleLineChart } from "../components/SimpleLineChart";
import {
  Users,
  Clock,
  CheckCircle,
  DollarSign,
  CreditCard as Edit,
  UserX,
  Key,
  Plus,
  Trash2,
} from "lucide-react";
import {
  mockUsers,
  mockExpenses,
  mockApprovals,
  mockApprovalRules,
  mockChartData,
} from "../data/mockData";

export const AdminDashboard = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const totalEmployees = mockUsers.filter((u) => u.status === "active").length;
  const pendingApprovals = mockApprovals.filter(
    (app) => app.status === "pending",
  ).length;
  const approvedThisMonth = mockApprovals.filter(
    (app) => app.status === "approved",
  ).length;
  const totalSpend = mockExpenses
    .filter((exp) => exp.status === "approved")
    .reduce((sum, exp) => sum + exp.convertedAmount, 0);

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleDeactivateUser = (userId: string) => {
    if (confirm("Are you sure you want to deactivate this user?")) {
      console.log("Deactivating user:", userId);
      alert("User deactivated successfully");
    }
  };

  const handleResetPassword = (userId: string) => {
    if (confirm("Send password reset link to user?")) {
      console.log("Resetting password for:", userId);
      alert("Password reset link sent");
    }
  };

  const getCategoryBreakdown = () => {
    const categories: { [key: string]: number } = {};
    mockExpenses.forEach((exp) => {
      if (exp.status === "approved") {
        categories[exp.category] =
          (categories[exp.category] || 0) + exp.convertedAmount;
      }
    });
    return Object.entries(categories).map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalSpend) * 100).toFixed(1),
    }));
  };

  const getDepartmentBreakdown = () => {
    const departments: { [key: string]: number } = {};
    mockExpenses.forEach((exp) => {
      if (exp.status === "approved") {
        const user = mockUsers.find((u) => u.id === exp.userId);
        if (user) {
          departments[user.department] =
            (departments[user.department] || 0) + exp.convertedAmount;
        }
      }
    });
    return Object.entries(departments).map(([dept, amount]) => ({
      department: dept,
      amount,
      percentage: ((amount / totalSpend) * 100).toFixed(1),
    }));
  };

  const categoryData = getCategoryBreakdown();
  const departmentData = getDepartmentBreakdown();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage users, rules, and company-wide analytics
            </p>
          </div>
          <button
            onClick={() => setShowUserModal(true)}
            className="flex items-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ChartCard title="User Management">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Department
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded capitalize ${
                              user.role === "admin"
                                ? "bg-red-500/10 text-red-400"
                                : user.role === "manager"
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {user.email}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {user.department}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              user.status === "active"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-gray-500/10 text-gray-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeactivateUser(user.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                              title="Deactivate"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleResetPassword(user.id)}
                              className="p-1.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 rounded transition-colors"
                              title="Reset Password"
                            >
                              <Key className="w-4 h-4" />
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

          <ChartCard title="Company Expense Trend" subtitle="Last 12 months">
            <SimpleLineChart data={mockChartData.monthlyTrend} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ChartCard title="Approval Rules Configuration">
            <div className="space-y-3 mb-4">
              {mockApprovalRules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {rule.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        Amount: ${rule.minAmount} -{" "}
                        {rule.maxAmount ? `$${rule.maxAmount}` : "No limit"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rule.approverRoles.map((role, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded capitalize"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowRuleModal(true)}
              className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors text-sm font-medium"
            >
              + Add New Rule
            </button>
          </ChartCard>

          <ChartCard title="Analytics Overview">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Expense by Category
                </h4>
                <div className="space-y-3">
                  {categoryData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          ${item.amount.toFixed(0)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Expense by Department
                </h4>
                <div className="space-y-3">
                  {departmentData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">
                          {item.department}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          ${item.amount.toFixed(0)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
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

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-700">
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Total Employees
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {totalEmployees}
              </p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Pending Approvals
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {pendingApprovals}
              </p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Approved This Month
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {approvedThisMonth}
              </p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Total Company Spend
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{`$${totalSpend.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
