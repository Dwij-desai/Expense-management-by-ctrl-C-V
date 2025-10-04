import { useState } from "react";
import { ChartCard } from "../components/ChartCard";
import { StatsCard } from "../components/StatsCard";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Search,
  Filter,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockUsers } from "../data/mockData";

export const AccountsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBasedStats = () => {
    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter((u) => u.status === "active").length;
    const pendingUsers = mockUsers.filter((u) => u.status === "pending").length;
    const adminUsers = mockUsers.filter((u) => u.role === "admin").length;
    const managerUsers = mockUsers.filter((u) => u.role === "manager").length;
    const employeeUsers = mockUsers.filter((u) => u.role === "employee").length;

    switch (user?.role) {
      case "admin":
        return [
          {
            title: "Total Users",
            value: totalUsers,
            icon: Users,
            trend: { value: "+12%", isPositive: true },
          },
          {
            title: "Active Users",
            value: activeUsers,
            icon: UserCheck,
            trend: { value: "+8%", isPositive: true },
          },
          {
            title: "Pending Approval",
            value: pendingUsers,
            icon: UserX,
            trend: { value: "-5%", isPositive: true },
          },
          {
            title: "Admin Users",
            value: adminUsers,
            icon: Shield,
            trend: { value: "0%", isPositive: true },
          },
        ];
      case "manager":
        return [
          {
            title: "Team Members",
            value: mockUsers.filter((u) => u.managerId === user?.id).length,
            icon: Users,
            trend: { value: "+2%", isPositive: true },
          },
          {
            title: "Active Team",
            value: mockUsers.filter(
              (u) => u.managerId === user?.id && u.status === "active",
            ).length,
            icon: UserCheck,
            trend: { value: "+5%", isPositive: true },
          },
          {
            title: "New Hires",
            value: 3,
            icon: UserPlus,
            trend: { value: "+15%", isPositive: true },
          },
          {
            title: "Department Size",
            value: mockUsers.filter((u) => u.department === user?.department)
              .length,
            icon: Shield,
            trend: { value: "+3%", isPositive: true },
          },
        ];
      case "employee":
        return [
          {
            title: "Profile Complete",
            value: "100%",
            icon: UserCheck,
            trend: { value: "+0%", isPositive: true },
          },
          {
            title: "Team Size",
            value: mockUsers.filter((u) => u.department === user?.department)
              .length,
            icon: Users,
            trend: { value: "+2%", isPositive: true },
          },
          {
            title: "Colleagues",
            value: mockUsers.filter(
              (u) => u.department === user?.department && u.id !== user?.id,
            ).length,
            icon: UserPlus,
            trend: { value: "+1%", isPositive: true },
          },
          {
            title: "Account Status",
            value: "Active",
            icon: Shield,
            trend: { value: "0%", isPositive: true },
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
                  User Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage all users, roles, and permissions
                </p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Add User
              </button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <ChartCard
              title="User Management"
              subtitle="Search and manage users"
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                          User
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Role
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Department
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
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </p>
                              </div>
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
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
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
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ChartCard>
          </div>
        );

      case "manager":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Team Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your team members and their information
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <ChartCard
              title="Team Directory"
              subtitle="Your team members and their details"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockUsers
                  .filter((u) => u.managerId === user?.id)
                  .map((member) => (
                    <div
                      key={member.id}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {member.department}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          Joined{" "}
                          {new Date().getFullYear() -
                            Math.floor(Math.random() * 3)}{" "}
                          years ago
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ChartCard>
          </div>
        );

      case "employee":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your personal information and account settings
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {getRoleBasedStats().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Personal Information"
                subtitle="Your account details"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        {user?.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user?.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Engineering Department
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Member since 2022
                      </span>
                    </div>
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Team Directory" subtitle="Your colleagues">
                <div className="space-y-3">
                  {mockUsers
                    .filter(
                      (u) =>
                        u.department === user?.department && u.id !== user?.id,
                    )
                    .slice(0, 5)
                    .map((colleague) => (
                      <div
                        key={colleague.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {colleague.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {colleague.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {colleague.role}
                          </p>
                        </div>
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
