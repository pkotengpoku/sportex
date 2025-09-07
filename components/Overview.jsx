import { FaBasketballBall, FaUsers, FaShoppingCart } from "react-icons/fa";

export default function OverviewTab() {
  // Sample data, you can replace with real API data
  const stats = [
    { title: "Total Listings", value: 128, icon: <FaBasketballBall className="text-orange-500 w-6 h-6" /> },
    { title: "Active Rentals", value: 34, icon: <FaShoppingCart className="text-orange-500 w-6 h-6" /> },
    { title: "Total Users", value: 56, icon: <FaUsers className="text-orange-500 w-6 h-6" /> },
  ];

  const recentActivities = [
    { user: "Alice", action: "rented a tennis racket", time: "2h ago" },
    { user: "Bob", action: "listed a football", time: "5h ago" },
    { user: "Charlie", action: "rented a basketball", time: "1d ago" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          {recentActivities.map((activity, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <span>
                <span className="font-medium text-gray-700">{activity.user}</span> {activity.action}
              </span>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
