import React from 'react'

const MainModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center top-32">
          {/* Background overlay */}
          <div
            className="absolute inset-0"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal box */}
          <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-lg md:max-w-2xl lg:max-w-3xl p-6">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Modal content (empty for now) */}
            <div className="text-center text-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Empty Modal</h2>
              <p className="text-gray-500">Add your content here...</p>
            </div>
          </div>
        </div>
  )
}

export default MainModal
