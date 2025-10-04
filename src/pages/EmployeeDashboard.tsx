import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { StatsCard } from "../components/StatsCard";
import { ChartCard } from "../components/ChartCard";
import { SimpleLineChart } from "../components/SimpleLineChart";
import {
  Wallet,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockExpenses, mockChartData } from "../data/mockData";

export const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    category: "Travel",
    amount: "",
    currency: "USD",
    remarks: "",
  });

  const userExpenses = mockExpenses.filter((exp) => exp.userId === user?.id);
  const totalSubmitted = userExpenses.reduce(
    (sum, exp) => sum + exp.convertedAmount,
    0,
  );
  const approved = userExpenses
    .filter((exp) => exp.status === "approved")
    .reduce((sum, exp) => sum + exp.convertedAmount, 0);
  const rejected = userExpenses
    .filter((exp) => exp.status === "rejected")
    .reduce((sum, exp) => sum + exp.convertedAmount, 0);
  const pending = userExpenses
    .filter((exp) => exp.status === "pending")
    .reduce((sum, exp) => sum + exp.convertedAmount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting expense:", formData);
    setShowForm(false);
    setFormData({
      description: "",
      date: "",
      category: "Travel",
      amount: "",
      currency: "USD",
      remarks: "",
    });
  };

  const suggestCategory = (description: string) => {
    const desc = description.toLowerCase();
    if (
      desc.includes("flight") ||
      desc.includes("hotel") ||
      desc.includes("travel") ||
      desc.includes("taxi") ||
      desc.includes("uber")
    ) {
      return "Travel";
    } else if (
      desc.includes("food") ||
      desc.includes("lunch") ||
      desc.includes("dinner") ||
      desc.includes("coffee") ||
      desc.includes("restaurant")
    ) {
      return "Food";
    } else if (
      desc.includes("software") ||
      desc.includes("subscription") ||
      desc.includes("license")
    ) {
      return "Software";
    } else if (
      desc.includes("office") ||
      desc.includes("supplies") ||
      desc.includes("equipment")
    ) {
      return "Office";
    }
    return "Misc";
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
      category: suggestCategory(value) || prev.category,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20";
      case "rejected":
        return "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      case "pending":
        return "text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20";
      default:
        return "text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Employee Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your expenses and track approvals
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ChartCard title="Expense Submission Form">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 transition-colors group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                      <Upload className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      Submit New Expense
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Click to create a new expense claim
                    </p>
                  </div>
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Description
                      </label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) =>
                          handleDescriptionChange(e.target.value)
                        }
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="Team lunch at restaurant"
                        required
                      />
                      {formData.description && (
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI suggested category:{" "}
                          {suggestCategory(formData.description)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <Tag className="w-4 h-4 inline mr-2" />
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                      >
                        <option>Travel</option>
                        <option>Food</option>
                        <option>Office</option>
                        <option>Software</option>
                        <option>Misc</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Amount
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) =>
                          setFormData({ ...formData, currency: e.target.value })
                        }
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>INR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Upload Receipt
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-500 dark:text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      rows={2}
                      placeholder="Additional notes..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-slate-700 dark:bg-slate-600 text-white font-medium py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
                    >
                      Submit Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </ChartCard>
          </div>

          <ChartCard title="Expense Trend" subtitle="Last 12 months">
            <SimpleLineChart data={mockChartData.monthlyTrend} />
          </ChartCard>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-slate-200 dark:divide-slate-700">
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Total Submitted
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{`$${totalSubmitted.toFixed(2)}`}</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Approved
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{`$${approved.toFixed(2)}`}</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Rejected
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{`$${rejected.toFixed(2)}`}</p>
            </div>
            <div className="px-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Pending
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{`$${pending.toFixed(2)}`}</p>
            </div>
          </div>
        </div>

        <ChartCard title="Expense History">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {expense.expenseDate}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">
                      {expense.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                      ${expense.convertedAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded capitalize ${getStatusColor(
                          expense.status,
                        )}`}
                      >
                        {expense.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};
