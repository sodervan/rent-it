import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";
import Sidebar from "@/components/AgentDashboard/Sidebar.jsx";

// Dummy data
const transactionsData = [
  {
    id: "TRX-0001",
    property: "Shomolu Apartment",
    type: "Maintenance",
    amount: 15000,
    status: "Pending",
    date: "April 17, 2025",
  },
  {
    id: "TRX-0002",
    property: "Shomolu Apartment",
    type: "Rent Payment",
    amount: 90000,
    status: "Processing",
    date: "April 18, 2025",
  },
  {
    id: "TRX-0003",
    property: "Lekki Heights",
    type: "Rent Payment",
    amount: 90000,
    status: "Completed",
    date: "April 19, 2025",
  },
  {
    id: "TRX-0004",
    property: "Surulere Court",
    type: "Rent Payment",
    amount: 90000,
    status: "Pending",
    date: "April 20, 2025",
  },
  {
    id: "TRX-0005",
    property: "Sarah Williams",
    type: "Maintenance",
    amount: 15000,
    status: "Completed",
    date: "April 21, 2025",
  },
];

const summaryData = {
  totalRevenue: 2450000,
  pendingPayments: 180000,
  totalExpenses: 320000,
  netIncome: 2130000,
};

export default function AgentTransactionsPage() {
  const [transactions] = useState(transactionsData);
  const [agentData, setAgentData] = useState(null);

  // Status badge styling
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-600";
      case "Processing":
        return "bg-purple-100 text-purple-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    setAgentData(JSON.parse(localStorage.getItem("agentData")));
  }, []);
  return (
    <>
      <Sidebar firstname={agentData?.firstname} />
      <div className="min-h-screen bg-gray-50 p-2 lg:ml-64">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-20 max-w-7xl mx-auto rounded-xl shadow-sm overflow-hidden"
        >
          {/* Content */}
          <div className="p-6">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Transactions
                </h2>
                <p className="text-gray-500 text-sm">
                  Track your rental payments and expenses
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Export Report</span>
              </motion.button>
            </div>

            {/* Summary Cards */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {/* Total Revenue */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
                <div className="text-xl font-bold">
                  ₦{summaryData.totalRevenue.toLocaleString()}
                </div>
                <div className="flex items-center text-green-500 text-xs mt-2">
                  <ArrowUpRight size={14} />
                  <span>+15% from last month</span>
                </div>
              </motion.div>

              {/* Pending Payments */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-gray-500 text-sm mb-2">Pending Payments</h3>
                <div className="text-xl font-bold">
                  ₦{summaryData.pendingPayments.toLocaleString()}
                </div>
                <div className="flex items-center text-red-500 text-xs mt-2">
                  <ArrowUpRight size={14} />
                  <span>+5% from last month</span>
                </div>
              </motion.div>

              {/* Total Expenses */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-gray-500 text-sm mb-2">Total Expenses</h3>
                <div className="text-xl font-bold">
                  ₦{summaryData.totalExpenses.toLocaleString()}
                </div>
                <div className="flex items-center text-red-500 text-xs mt-2">
                  <ArrowDownRight size={14} />
                  <span>-3% from last month</span>
                </div>
              </motion.div>

              {/* Net Income */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-gray-500 text-sm mb-2">Net Income</h3>
                <div className="text-xl font-bold">
                  ₦{summaryData.netIncome.toLocaleString()}
                </div>
                <div className="flex items-center text-green-500 text-xs mt-2">
                  <ArrowUpRight size={14} />
                  <span>+11% from last month</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md mb-4"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">Recent Transactions</h3>
                <button className="text-gray-500 flex items-center text-sm">
                  <Filter size={14} className="mr-1" />
                  Filter
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left text-gray-500 text-sm">
                    <tr>
                      <th className="p-4">Transaction ID</th>
                      <th className="p-4">Property</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {transactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-4 text-purple-600">
                          {transaction.id}
                        </td>
                        <td className="p-4">{transaction.property}</td>
                        <td className="p-4">{transaction.type}</td>
                        <td className="p-4">
                          ₦{transaction.amount.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeStyle(transaction.status)}`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="p-4">{transaction.date}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
