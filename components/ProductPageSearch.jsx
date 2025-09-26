import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { it } from "date-fns/locale";
import { useRouter } from "next/navigation";

// --- Helper Icon Components ---
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
  </svg>
);

// --- Calendar Component ---
const AirbnbCalendar = ({ onDatesSelected, initialDates }) => {
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
          {["L", "M", "M", "G", "V", "S", "D"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isPast = isBefore(day, startOfDay(new Date()));
            const isStartDate = startDate && isSameDay(day, startDate);
            const isEndDate = endDate && isSameDay(day, endDate);
            const isInRange =
              startDate && endDate &&
              isWithinInterval(day, { start: startDate, end: endDate });

            const dayClass = `text-sm w-10 h-10 flex items-center justify-center rounded-full transition-colors 
              ${!isCurrentMonth ? "text-transparent cursor-default" : ""} 
              ${isPast ? "text-gray-300 line-through cursor-not-allowed" : ""}
              ${!isPast && isCurrentMonth ? "hover:bg-gray-200 cursor-pointer" : ""}
              ${isStartDate || isEndDate ? "bg-gray-900 text-white hover:bg-gray-900" : ""}`;

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
                  {format(day, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isPrevDisabled = isBefore(
    startOfMonth(subMonths(currentMonth, 1)),
    startOfMonth(new Date())
  );

  return (
    <div className="bg-white rounded-xl p-4 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className={`p-2 rounded-full ${isPrevDisabled ? "text-gray-300" : "hover:bg-gray-100"}`}
        >
          <ChevronLeftIcon />
        </button>
        <div className="flex justify-around w-full">
          <div className="text-center font-semibold capitalize w-1/2">
            {format(currentMonth, "MMMM yyyy", { locale: it })}
          </div>
          <div className="text-center font-semibold capitalize w-1/2">
            {format(addMonths(currentMonth, 1), "MMMM yyyy", { locale: it })}
          </div>
        </div>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="flex">
        {renderMonth(currentMonth)}
        {renderMonth(addMonths(currentMonth, 1))}
      </div>
    </div>
  );
};

// --- Modal Component ---
const CalendarModal = ({ isOpen, onClose, onDatesSelected, initialDates }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
      onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <AirbnbCalendar onDatesSelected={onDatesSelected} initialDates={initialDates} />
      </div>
    </div>
  );
};

// --- Main Exported Component ---
const ProductPageSearch = ({ product, city, dates, onDatesChange }) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState(product || "");
  const [location, setLocation] = useState(city || "");
  const router = useRouter();

  const handleDatesSelected = (selectedDates) => {
    onDatesChange(selectedDates);
  };

  const getDateValue = () => {
    if (!dates.startDate) return "Select Dates";
    if (!dates.endDate) return format(dates.startDate, "MMM dd");
    return `${format(dates.startDate, "MMM dd")} - ${format(dates.endDate, "MMM dd")}`;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchProduct) params.set("product", searchProduct);
    if (location) params.set("location", location);
    if (dates.startDate) params.set("startDate", dates.startDate.toISOString());
    if (dates.endDate) params.set("endDate", dates.endDate.toISOString());

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div>
      <div className="w-full flex my-3">
        <div className="w-10/12 md:w-8/12 lg:w-9/12 rounded-full mx-auto py-2 pr-2 pl-6 flex items-center h-16 border border-slate-300 shadow">
          <div className="flex-grow px-2">
            <label className="block text-xs font-bold">Product</label>
            <input
              type="text"
              placeholder="Product or category"
              onChange={(e) => setSearchProduct(e.target.value)}
              value={searchProduct}
              className="w-full outline-none border-none focus:ring-0 p-0"
            />
          </div>
          <div className="h-8 border-r border-slate-300"></div>
          <div className="flex-grow px-4 cursor-pointer" onClick={() => setCalendarOpen(true)}>
            <label className="block text-xs font-bold">Dates</label>
            <input
              type="text"
              readOnly
              value={getDateValue()}
              className="w-full outline-none border-none focus:ring-0 p-0 cursor-pointer bg-transparent"
            />
          </div>
          <div className="h-8 border-r border-slate-300"></div>
          <div className="flex-grow px-4">
            <label className="block text-xs font-bold">Location</label>
            <input
              type="text"
              placeholder="Posto di Noleggio"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="w-full outline-none border-none focus:ring-0 p-0"
            />
          </div>
          <div
            onClick={handleSearch}
            className="bg-amber-300 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth={2.1}
              stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
            </svg>
          </div>
        </div>
      </div>
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        onDatesSelected={handleDatesSelected}
        initialDates={dates}
      />
    </div>
  );
};

export default ProductPageSearch;
