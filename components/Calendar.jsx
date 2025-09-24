import { useState, useEffect } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, startOfWeek, 
  addDays, isSameMonth, isSameDay, isBefore, isWithinInterval, startOfDay 
} from 'date-fns';
import { it } from 'date-fns/locale';

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default function Calendar({ onDatesSelected, initialDates }) {
  const [currentMonth, setCurrentMonth] = useState(initialDates?.startDate || new Date());
  const [startDate, setStartDate] = useState(initialDates?.startDate || null);
  const [endDate, setEndDate] = useState(initialDates?.endDate || null);

  useEffect(() => {
    onDatesSelected({ startDate, endDate });
  }, [startDate, endDate, onDatesSelected]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    if (!isBefore(startOfMonth(newMonth), startOfMonth(new Date()))) {
      setCurrentMonth(newMonth);
    }
  };

  const handleDateClick = (day) => {
    const today = startOfDay(new Date());
    if (isBefore(day, today)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (isBefore(day, startDate)) {
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  };

  const renderMonth = (month) => {
    const monthStart = startOfMonth(month);
    const startDateOfWeek = startOfWeek(monthStart, { weekStartsOn: 1 });
    const days = [];
    let day = startDateOfWeek;
    while (days.length < 42) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div className="w-full px-4">
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 pb-2">
          {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isPast = isBefore(day, startOfDay(new Date()));
            const isStartDate = startDate && isSameDay(day, startDate);
            const isEndDate = endDate && isSameDay(day, endDate);
            const isInRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });

            const dayClass = `text-sm w-10 h-10 flex items-center justify-center rounded-full transition-colors 
              ${!isCurrentMonth ? 'text-transparent cursor-default' : ''} 
              ${isPast ? 'text-gray-300 line-through cursor-not-allowed' : ''}
              ${!isPast && isCurrentMonth ? 'hover:bg-gray-200 cursor-pointer' : ''}
              ${isStartDate || isEndDate ? 'bg-gray-900 text-white hover:bg-gray-900' : ''}
              ${isInRange && !isStartDate && !isEndDate ? 'bg-gray-100 rounded-none' : ''}`;

            let wrapperClass = "relative h-10 flex items-center justify-center";
            if (isInRange) {
              wrapperClass += " bg-gray-100";
              if (isStartDate) wrapperClass += " rounded-l-full";
              if (isEndDate) wrapperClass += " rounded-r-full";
            }

            return (
              <div key={i} className={wrapperClass}>
                <button
                  onClick={() => handleDateClick(day)}
                  disabled={!isCurrentMonth || isPast}
                  className={dayClass}
                >
                  {format(day, 'd')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isPrevDisabled = isBefore(startOfMonth(subMonths(currentMonth, 1)), startOfMonth(new Date()));

  return (
    <div className="bg-white rounded-xl p-4 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className={`p-2 rounded-full ${isPrevDisabled ? 'text-gray-300' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeftIcon />
        </button>
        <div className="flex justify-around w-full">
          <div className="text-center font-semibold capitalize w-1/2">
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </div>
          <div className="text-center font-semibold capitalize w-1/2">
            {format(addMonths(currentMonth, 1), 'MMMM yyyy', { locale: it })}
          </div>
        </div>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRightIcon />
        </button>
      </div>
      <div className="flex">
        {renderMonth(currentMonth)}
        {renderMonth(addMonths(currentMonth, 1))}
      </div>
      <div className="flex items-center space-x-2 border-t mt-4 pt-4 px-4">
        {['Date esatte', '± 1 giorno', '± 2 giorni', '± 3 giorni'].map((option, i) => (
          <button
            key={option}
            className={`text-sm font-semibold px-4 py-2 rounded-full border ${i === 0 ? 'bg-gray-100' : 'hover:border-black'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
