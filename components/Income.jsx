import { FaDollarSign } from "react-icons/fa";

export default function IncomeTab() {
  // Sample income data
  const summary = [
    { title: "Total Income", value: "$1,240", icon: <FaDollarSign className="text-orange-500 w-5 h-5" /> },
    { title: "This Month", value: "$430", icon: <FaDollarSign className="text-orange-500 w-5 h-5" /> },
    { title: "Last Month", value: "$520", icon: <FaDollarSign className="text-orange-500 w-5 h-5" /> },
  ];

  const transactions = [
    { id: 1, product: "Tennis Racket", renter: "Alice", amount: "$10", date: "2025-09-05" },
    { id: 2, product: "Football", renter: "Bob", amount: "$8", date: "2025-09-04" },
    { id: 3, product: "Basketball", renter: "Charlie", amount: "$12", date: "2025-09-03" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Income</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summary.map((item) => (
          <div key={item.title} className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">{item.icon}</div>
            <div>
              <p className="text-gray-500">{item.title}</p>
              <p className="text-2xl font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li key={tx.id} className="py-3 flex justify-between items-center">
              <span>
                <span className="font-medium text-gray-700">{tx.renter}</span> rented <span className="font-medium">{tx.product}</span>
              </span>
              <span className="text-gray-400 text-sm">{tx.amount} • {tx.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
