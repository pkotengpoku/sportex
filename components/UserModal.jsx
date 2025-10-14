import { useState } from "react";
import { User, Settings, Heart, ShoppingBag, LogOut } from "lucide-react";

export default function UserModal({ user, onClose }) {
  // Example condition — you can replace with your own user role check
  const isRenter = user?.role === "renter";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* List of options */}
        <ul className="space-y-3">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <ShoppingBag className="w-5 h-5 text-gray-600" />
            <span>My Orders</span>
          </li>
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Heart className="w-5 h-5 text-gray-600" />
            <span>Wishlist</span>
          </li>
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Account Settings</span>
          </li>
        </ul>

        {/* Divider */}
        <hr className="my-5" />

        {/* Action button */}
        <button
          className={`w-full py-2.5 rounded-xl font-medium text-white ${
            isRenter
              ? "bg-lime-600 hover:bg-lime-700"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {isRenter ? "Go to Rental Dashboard" : "Become a Renter"}
        </button>

        {/* Logout */}
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mt-4 w-full justify-center text-sm">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
