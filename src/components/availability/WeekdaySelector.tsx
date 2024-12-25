import React from 'react';
import { DAYS_OF_WEEK } from '@/lib/constants';
import { WeeklyAvailability } from '@/lib/types';

export function WeekdaySelector({
  availability,
  onChange
}: {
  availability: WeeklyAvailability;
  onChange: (day: keyof WeeklyAvailability, enabled: boolean) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center gap-2">
        {DAYS_OF_WEEK.map((day) => {
          const isActive = availability[day].enabled;
          return (
            <button
              key={day}
              onClick={() => onChange(day, !isActive)}
              className={`
                flex flex-col items-center justify-center
                w-16 h-16 rounded-full
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              `}
            >
              <span className="text-sm font-medium capitalize">
                {day.slice(0, 3)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}