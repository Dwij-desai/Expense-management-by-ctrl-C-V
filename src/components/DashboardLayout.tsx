import { ReactNode, useState } from "react";
import {
  LogOut,
  Bell,
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Sun,
  Moon,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { AIChatbot } from "./AIChatbot";
import { AccountsPage } from "../pages/AccountsPage";
import { CardsPage } from "../pages/CardsPage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { TeamCalendarsPage } from "../pages/TeamCalendarsPage";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export const DashboardLayout = ({
  children,
  activeTab = "dashboard",
}: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "accounts", label: "Accounts", icon: Users },
    { id: "cards", label: "Cards", icon: CreditCard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "calendars", label: "Team Calendars", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">M</span>
              </div>
              <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                m
                <span className="text-slate-600 dark:text-slate-400">onex</span>
              </span>
            </div>
            <nav className="flex gap-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === item.id
                      ? "text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors rounded-lg"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-slate-600 dark:bg-slate-400 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                  {user?.role}
                </p>
              </div>
              <div className="w-10 h-10 bg-slate-700 dark:bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name.charAt(0)}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors ml-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </header>
      <main className="p-8">
        {currentTab === "dashboard" && children}
        {currentTab === "accounts" && <AccountsPage />}
        {currentTab === "cards" && <CardsPage />}
        {currentTab === "analytics" && <AnalyticsPage />}
        {currentTab === "calendars" && <TeamCalendarsPage />}
      </main>
      <AIChatbot />
    </div>
  );
};
