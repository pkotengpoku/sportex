import Calendar from './Calendar';

export default function CalendarModal({ isOpen, onClose, onDatesSelected, initialDates }) {
  if (!isOpen) return null;

  return (
    // Modal Overlay (backdrop)
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
      onClick={onClose} // Close modal when clicking outside
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <Calendar
          onDatesSelected={onDatesSelected}
          initialDates={initialDates}
        />
      </div>
    </div>
  );
}
