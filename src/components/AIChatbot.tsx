import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  DollarSign,
  Users,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm your AI assistant. I can help you with expense management, approvals, and general questions. How can I assist you today?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRoleBasedGreeting = () => {
    switch (user?.role) {
      case "admin":
        return "Hello Admin! I can help you manage users, view analytics, configure approval rules, and oversee the entire expense management system.";
      case "manager":
        return "Hi Manager! I can assist you with team expense approvals, reviewing reports, managing your team's expenses, and providing insights.";
      case "employee":
        return "Hey there! I'm here to help you submit expenses, track approvals, understand policies, and answer any questions about the expense process.";
      default:
        return "Hello! I'm your AI assistant. How can I help you today?";
    }
  };

  const getQuickActions = (): QuickAction[] => {
    const baseActions: QuickAction[] = [
      {
        id: "help",
        label: "General Help",
        icon: HelpCircle,
        action: () => sendMessage("I need general help with the system"),
      },
    ];

    switch (user?.role) {
      case "admin":
        return [
          ...baseActions,
          {
            id: "users",
            label: "Manage Users",
            icon: Users,
            action: () =>
              sendMessage("How do I manage users and their permissions?"),
          },
          {
            id: "analytics",
            label: "View Analytics",
            icon: DollarSign,
            action: () =>
              sendMessage("Show me the latest analytics and reports"),
          },
          {
            id: "settings",
            label: "System Settings",
            icon: Settings,
            action: () =>
              sendMessage(
                "How do I configure system settings and approval rules?"
              ),
          },
        ];
      case "manager":
        return [
          ...baseActions,
          {
            id: "approvals",
            label: "Pending Approvals",
            icon: DollarSign,
            action: () => sendMessage("Show me my pending expense approvals"),
          },
          {
            id: "team",
            label: "Team Reports",
            icon: Users,
            action: () => sendMessage("Generate team expense reports"),
          },
        ];
      case "employee":
        return [
          ...baseActions,
          {
            id: "submit",
            label: "Submit Expense",
            icon: DollarSign,
            action: () => sendMessage("How do I submit a new expense?"),
          },
          {
            id: "track",
            label: "Track Status",
            icon: HelpCircle,
            action: () => sendMessage("How can I track my expense status?"),
          },
        ];
      default:
        return baseActions;
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Role-based responses
    if (user?.role === "admin") {
      if (message.includes("user") || message.includes("manage")) {
        return "To manage users, go to the Users section in your admin dashboard. You can add new users, modify permissions, deactivate accounts, and reset passwords. Would you like me to walk you through any specific user management task?";
      }
      if (message.includes("analytics") || message.includes("report")) {
        return "The Analytics section provides comprehensive insights into company spending, department breakdowns, approval trends, and budget utilization. You can filter by date ranges, departments, or expense categories. What specific analytics are you looking for?";
      }
      if (message.includes("setting") || message.includes("rule")) {
        return "Approval rules can be configured in the Rules section. You can set spending limits, required approvers, and approval workflows based on amount thresholds and categories. Would you like help setting up specific approval rules?";
      }
    }

    if (user?.role === "manager") {
      if (message.includes("approval") || message.includes("pending")) {
        return "Your pending approvals are shown in the main dashboard. You can review expense details, approve or reject requests, and add comments. The system will highlight any suspicious or unusual expenses for your attention.";
      }
      if (message.includes("team") || message.includes("report")) {
        return "Team reports are available in the Analytics section. You can view spending by team member, category breakdowns, and monthly trends. Reports can be exported for further analysis or sharing with stakeholders.";
      }
    }

    if (user?.role === "employee") {
      if (message.includes("submit") || message.includes("expense")) {
        return "To submit an expense, click the 'Submit New Expense' button on your dashboard. Fill in the description, amount, category, and attach receipts. The system will auto-suggest categories based on your description. Make sure to include all required documentation.";
      }
      if (message.includes("track") || message.includes("status")) {
        return "You can track your expense status in the 'Expense History' table on your dashboard. Statuses include: Pending (awaiting approval), Approved (approved by manager), and Rejected (needs revision). You'll receive notifications when status changes.";
      }
    }

    // General responses
    if (message.includes("help") || message.includes("how")) {
      return "I'm here to help! I can assist with expense submissions, approvals, reporting, user management, and system navigation. What specific area would you like help with?";
    }
    if (message.includes("policy") || message.includes("rule")) {
      return "Expense policies vary by company, but generally include: keep receipts for all expenses, submit within 30 days, use appropriate categories, and follow approval workflows. Check with your manager for specific company policies.";
    }
    if (message.includes("receipt") || message.includes("document")) {
      return "Always attach receipts for expenses over $25. Supported formats include PDF, JPG, and PNG. Make sure receipts are clear and show the date, amount, and vendor. Blurry or incomplete receipts may be rejected.";
    }

    return (
      "I understand you're asking about: " +
      userMessage +
      ". Let me help you with that. Could you provide more specific details about what you need assistance with?"
    );
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const quickActions = getQuickActions();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 group"
        title="AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          AI
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-end p-4">
          <div className="bg-white dark:bg-[#1A1B1E] rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user?.role
                      ? `${
                          user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        } Support`
                      : "General Support"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isUser && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.isUser && (
                    <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Quick Actions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center gap-2 p-2 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
