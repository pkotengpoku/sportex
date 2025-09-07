import { FaPlusCircle } from "react-icons/fa";

export default function StoreTab() {
  // Sample products that are available for rent
  const products = [
    { id: 1, name: "Yoga Mat", price: "$5/day", category: "Fitness" },
    { id: 2, name: "Badminton Racket", price: "$7/day", category: "Racket Sports" },
    { id: 3, name: "Kayak Paddle", price: "$12/day", category: "Water Sports" },
    { id: 4, name: "Dumbbell Set", price: "$8/day", category: "Strength Training" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Store</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Category:</span> {product.category}</p>
              <p className="text-gray-800 font-semibold">{product.price}</p>
            </div>
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1">
              <FaPlusCircle /> Add to Rental
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
