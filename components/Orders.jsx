import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function OrdersTab() {
  // Sample data, replace with API data
  const orders = [
    { id: 1, user: "Alice", equipment: "Tennis Racket", status: "Active", date: "2025-09-05" },
    { id: 2, user: "Bob", equipment: "Football", status: "Pending", date: "2025-09-04" },
    { id: 3, user: "Charlie", equipment: "Basketball", status: "Completed", date: "2025-09-03" },
  ];

  const statusStyles = {
    Active: "bg-orange-100 text-orange-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-orange-50">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600">ID</th>
              <th className="py-3 px-6 text-left text-gray-600">User</th>
              <th className="py-3 px-6 text-left text-gray-600">Equipment</th>
              <th className="py-3 px-6 text-left text-gray-600">Status</th>
              <th className="py-3 px-6 text-left text-gray-600">Date</th>
              <th className="py-3 px-6 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-none">
                <td className="py-3 px-6">{order.id}</td>
                <td className="py-3 px-6">{order.user}</td>
                <td className="py-3 px-6">{order.equipment}</td>
                <td className="py-3 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6">{order.date}</td>
                <td className="py-3 px-6 flex gap-2">
                  {order.status !== "Completed" && (
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                      <FaCheckCircle /> Complete
                    </button>
                  )}
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                    <FaTimesCircle /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
