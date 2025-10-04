export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  department: string;
  status: 'active' | 'inactive';
  password: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  convertedAmount: number;
  category: string;
  description: string;
  receiptUrl?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  expenseDate: string;
  createdAt: string;
}

export interface Approval {
  id: string;
  expenseId: string;
  approverId: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  level: number;
  createdAt: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  minAmount: number;
  maxAmount?: number;
  approverRoles: string[];
  sequence: number;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@monex.com',
    role: 'admin',
    department: 'Management',
    status: 'active',
    password: 'admin123'
  },
  {
    id: '2',
    name: 'John Manager',
    email: 'manager@monex.com',
    role: 'manager',
    department: 'Engineering',
    status: 'active',
    password: 'manager123'
  },
  {
    id: '3',
    name: 'Sarah Employee',
    email: 'employee@monex.com',
    role: 'employee',
    managerId: '2',
    department: 'Engineering',
    status: 'active',
    password: 'employee123'
  },
  {
    id: '4',
    name: 'Mike Developer',
    email: 'mike@monex.com',
    role: 'employee',
    managerId: '2',
    department: 'Engineering',
    status: 'active',
    password: 'password'
  },
  {
    id: '5',
    name: 'Emma Designer',
    email: 'emma@monex.com',
    role: 'employee',
    managerId: '2',
    department: 'Design',
    status: 'active',
    password: 'password'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp1',
    userId: '3',
    amount: 125.50,
    currency: 'USD',
    convertedAmount: 125.50,
    category: 'Food',
    description: 'Team lunch at restaurant',
    status: 'pending',
    expenseDate: '2025-10-01',
    createdAt: '2025-10-01T10:30:00Z'
  },
  {
    id: 'exp2',
    userId: '4',
    amount: 850.00,
    currency: 'USD',
    convertedAmount: 850.00,
    category: 'Travel',
    description: 'Flight tickets for client meeting',
    status: 'pending',
    expenseDate: '2025-09-28',
    createdAt: '2025-09-28T14:20:00Z'
  },
  {
    id: 'exp3',
    userId: '3',
    amount: 45.00,
    currency: 'USD',
    convertedAmount: 45.00,
    category: 'Office',
    description: 'Office supplies',
    status: 'approved',
    expenseDate: '2025-09-25',
    createdAt: '2025-09-25T09:15:00Z'
  },
  {
    id: 'exp4',
    userId: '5',
    amount: 320.00,
    currency: 'USD',
    convertedAmount: 320.00,
    category: 'Software',
    description: 'Adobe Creative Cloud subscription',
    status: 'approved',
    expenseDate: '2025-09-20',
    createdAt: '2025-09-20T11:00:00Z'
  },
  {
    id: 'exp5',
    userId: '4',
    amount: 15.00,
    currency: 'USD',
    convertedAmount: 15.00,
    category: 'Food',
    description: 'Coffee with client',
    status: 'rejected',
    expenseDate: '2025-09-18',
    createdAt: '2025-09-18T16:45:00Z'
  }
];

export const mockApprovals: Approval[] = [
  {
    id: 'app1',
    expenseId: 'exp1',
    approverId: '2',
    status: 'pending',
    level: 1,
    createdAt: '2025-10-01T10:35:00Z'
  },
  {
    id: 'app2',
    expenseId: 'exp2',
    approverId: '2',
    status: 'pending',
    level: 1,
    createdAt: '2025-09-28T14:25:00Z'
  },
  {
    id: 'app3',
    expenseId: 'exp3',
    approverId: '2',
    status: 'approved',
    comment: 'Approved - necessary supplies',
    level: 1,
    createdAt: '2025-09-25T10:00:00Z'
  },
  {
    id: 'app4',
    expenseId: 'exp4',
    approverId: '2',
    status: 'approved',
    comment: 'Approved - required for design work',
    level: 1,
    createdAt: '2025-09-20T12:00:00Z'
  },
  {
    id: 'app5',
    expenseId: 'exp5',
    approverId: '2',
    status: 'rejected',
    comment: 'Personal expense - not eligible',
    level: 1,
    createdAt: '2025-09-19T09:00:00Z'
  }
];

export const mockApprovalRules: ApprovalRule[] = [
  {
    id: 'rule1',
    name: 'Manager approval for expenses under $500',
    minAmount: 0,
    maxAmount: 500,
    approverRoles: ['manager'],
    sequence: 1
  },
  {
    id: 'rule2',
    name: 'Manager + Admin approval for expenses $500-$2000',
    minAmount: 500,
    maxAmount: 2000,
    approverRoles: ['manager', 'admin'],
    sequence: 2
  },
  {
    id: 'rule3',
    name: 'Full approval chain for expenses over $2000',
    minAmount: 2000,
    approverRoles: ['manager', 'admin'],
    sequence: 3
  }
];

export const mockExpenseStats = {
  total: 1355.50,
  approved: 365.00,
  rejected: 15.00,
  pending: 975.50
};

export const mockChartData = {
  monthlyTrend: [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 3800 },
    { month: 'Mar', amount: 5100 },
    { month: 'Apr', amount: 4600 },
    { month: 'May', amount: 5500 },
    { month: 'Jun', amount: 4900 },
    { month: 'Jul', amount: 5800 },
    { month: 'Aug', amount: 6200 },
    { month: 'Sep', amount: 5400 },
    { month: 'Oct', amount: 3200 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 }
  ],
  categoryBreakdown: [
    { category: 'Travel', amount: 4500 },
    { category: 'Food', amount: 1200 },
    { category: 'Office', amount: 2300 },
    { category: 'Software', amount: 1800 },
    { category: 'Misc', amount: 900 }
  ],
  weeklyActivity: [
    { day: 'Mon', receipts: 8.3, expenses: 6.9 },
    { day: 'Tue', receipts: 7.5, expenses: 5.2 },
    { day: 'Wed', receipts: 6.8, expenses: 7.8 },
    { day: 'Thu', receipts: 9.2, expenses: 8.5 },
    { day: 'Fri', receipts: 10.1, expenses: 6.3 },
    { day: 'Sat', receipts: 5.4, expenses: 4.1 },
    { day: 'Sun', receipts: 4.2, expenses: 3.8 }
  ]
};
