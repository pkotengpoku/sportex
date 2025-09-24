// FiltersModal.jsx
import React from "react";

const FiltersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        {/* Example filters */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select className="w-full border rounded-lg p-2">
              <option>E-Bike</option>
              <option>Scooter</option>
              <option>Surfboard</option>
              <option>Tennis Racket</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Price Range</label>
            <input
              type="range"
              min="10"
              max="500"
              className="w-full"
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
