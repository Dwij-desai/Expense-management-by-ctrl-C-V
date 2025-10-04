import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (!success) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-700 dark:bg-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-2xl">M</span>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            m<span className="text-slate-600 dark:text-slate-400">onex</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Expense Management System
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg pl-11 pr-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg pl-11 pr-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-600 text-slate-600 focus:ring-slate-500"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-700 dark:bg-slate-600 text-white font-medium py-3 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-3">
              Demo Credentials:
            </p>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-500">
              <p>
                <span className="text-slate-700 dark:text-slate-300">
                  Admin:
                </span>{" "}
                admin@monex.com / admin123
              </p>
              <p>
                <span className="text-slate-700 dark:text-slate-300">
                  Manager:
                </span>{" "}
                manager@monex.com / manager123
              </p>
              <p>
                <span className="text-slate-700 dark:text-slate-300">
                  Employee:
                </span>{" "}
                employee@monex.com / employee123
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          © 2025 Monex. All rights reserved.
        </p>
      </div>
    </div>
  );
};
