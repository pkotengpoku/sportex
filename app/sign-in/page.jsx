"use client"

import { useState } from 'react';
import { format } from 'date-fns';
import CalendarModal from '@/components/CalendarModal';

export default function HeaderSearch() {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDatesSelected = (selectedDates) => {
    setDates(selectedDates);
    // ❌ Removed auto-closing logic here
    // if (selectedDates.endDate) {
    //   setCalendarOpen(false);
    // }
  };

  const formattedStartDate = dates.startDate ? format(dates.startDate, 'MMM dd') : 'Add date';
  const formattedEndDate = dates.endDate ? format(dates.endDate, 'MMM dd') : 'Add date';

  return (
    <div className="bg-gray-100 p-10 font-sans">
      <div className="bg-white p-2 rounded-full shadow-md flex items-center justify-between max-w-lg mx-auto">
        <button className="px-4 py-2 text-left flex-1">
          <div className="font-bold">Where</div>
          <div className="text-gray-500 text-sm">Search destinations</div>
        </button>
        <div className="flex border-l">
          <button onClick={() => setCalendarOpen(true)} className="px-4 py-2 text-left flex-1">
            <div className="font-bold">Check-in</div>
            <div className="text-gray-500 text-sm">{formattedStartDate}</div>
          </button>
          <button onClick={() => setCalendarOpen(true)} className="px-4 py-2 text-left flex-1 border-l">
            <div className="font-bold">Check-out</div>
            <div className="text-gray-500 text-sm">{formattedEndDate}</div>
          </button>
        </div>
      </div>

      {/* The Modal Component */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        onDatesSelected={handleDatesSelected}
        initialDates={dates}
      />
    </div>
  );
}
  