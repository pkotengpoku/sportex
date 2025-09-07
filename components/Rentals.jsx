import { FaTrashAlt } from "react-icons/fa";

export default function RentalsTab() {
  // Sample rental products
  const rentals = [
    { id: 1, name: "Tennis Racket", renter: "Alice", startDate: "2025-09-01", endDate: "2025-09-07", price: "$10/day" },
    { id: 2, name: "Football", renter: "Bob", startDate: "2025-09-03", endDate: "2025-09-10", price: "$8/day" },
    { id: 3, name: "Basketball", renter: "Charlie", startDate: "2025-09-04", endDate: "2025-09-08", price: "$12/day" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Active Rentals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{rental.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Renter:</span> {rental.renter}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Start:</span> {rental.startDate}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">End:</span> {rental.endDate}</p>
              <p className="text-gray-800 font-semibold">{rental.price}</p>
            </div>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1">
              <FaTrashAlt /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
