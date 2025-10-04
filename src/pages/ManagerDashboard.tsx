import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { StatsCard } from "../components/StatsCard";
import { ChartCard } from "../components/ChartCard";
import { SimpleBarChart } from "../components/SimpleBarChart";
import { SimpleLineChart } from "../components/SimpleLineChart";
import {
  Clock,
  CheckCircle,
  XCircle,
  Timer,
  Eye,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  mockExpenses,
  mockApprovals,
  mockUsers,
  mockChartData,
} from "../data/mockData";

export const ManagerDashboard = () => {
  const { user } = useAuth();
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  const teamMembers = mockUsers.filter((u) => u.managerId === user?.id);
  const teamExpenses = mockExpenses.filter((exp) =>
    teamMembers.some((member) => member.id === exp.userId),
  );

  const pendingApprovals = mockApprovals.filter(
    (app) => app.approverId === user?.id && app.status === "pending",
  );

  const pendingExpenses = teamExpenses.filter((exp) =>
    pendingApprovals.some((app) => app.expenseId === exp.id),
  );

  const approvedThisMonth = mockApprovals.filter(
    (app) => app.approverId === user?.id && app.status === "approved",
  ).length;

  const rejectedRequests = mockApprovals.filter(
    (app) => app.approverId === user?.id && app.status === "rejected",
  ).length;

  const handleApprove = (expenseId: string) => {
    console.log("Approving expense:", expenseId);
    alert("Expense approved and sent to next level!");
  };

  const handleReject = (expenseId: string) => {
    setSelectedExpense(expenseId);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    console.log(
      "Rejecting expense:",
      selectedExpense,
      "Comment:",
      rejectComment,
    );
    alert("Expense rejected with comment");
    setShowRejectModal(false);
    setRejectComment("");
    setSelectedExpense(null);
  };

  const getEmployeeName = (userId: string) => {
    return mockUsers.find((u) => u.id === userId)?.name || "Unknown";
  };

  const isSuspicious = (expense: any) => {
    return expense.amount > 800;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manager Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and approve team expense requests
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ChartCard
              title="Pending Approvals Queue"
              subtitle={`${pendingExpenses.length} items waiting`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Employee
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingExpenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedExpense(expense.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {isSuspicious(expense) && (
                              <AlertTriangle
                                className="w-4 h-4 text-red-400"
                                title="Suspicious activity detected"
                              />
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {getEmployeeName(expense.userId)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {expense.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                            {expense.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          ${expense.convertedAmount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {expense.expenseDate}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(expense.id);
                              }}
                              className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(expense.id);
                              }}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedExpense(expense.id);
                              }}
                              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pendingExpenses.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <CheckCircle className="w-12 h-12 text-gray-600" />
                            <p className="text-gray-400">
                              No pending approvals
                            </p>
                            <p className="text-sm text-gray-500">
                              You're all caught up!
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ChartCard>
          </div>

          <ChartCard title="Total Send" subtitle="Last Week">
            <SimpleBarChart data={mockChartData.weeklyActivity} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ChartCard title="Approval Trend" subtitle="Monthly overview">
            <SimpleLineChart data={mockChartData.monthlyTrend} />
          </ChartCard>

          <ChartCard title="Team Statistics">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Team Members
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {teamMembers.length}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Team Expenses
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    $
                    {teamExpenses
                      .reduce((sum, exp) => sum + exp.convertedAmount, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Approval Rate
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    92%
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Avg Response
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      2.4h
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      This Week
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      18
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-700">
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Pending Approvals
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {pendingApprovals.length}
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
                Rejected Requests
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {rejectedRequests}
              </p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Avg. Approval Time
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                2.4h
              </p>
            </div>
          </div>
        </div>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-[#1A1B1E] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 w-full max-w-md animate-slideIn">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Reject Expense
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Please provide a reason for rejecting this expense request.
            </p>
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-red-500 mb-4"
              rows={4}
              placeholder="Enter rejection reason..."
              required
            />
            <div className="flex gap-3">
              <button
                onClick={confirmReject}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                disabled={!rejectComment.trim()}
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectComment("");
                }}
                className="px-6 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
