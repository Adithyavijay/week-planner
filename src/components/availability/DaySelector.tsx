// components/availability/DaySelector.tsx
import { DAYS_OF_WEEK } from '@/lib/constants';
import { WeeklyAvailability } from '@/lib/types';

export function DaySelector({
  availability,
  onToggleDay
}: {
  availability: WeeklyAvailability;
  onToggleDay: (day: keyof WeeklyAvailability) => void;
}) {
  return (
    <div className="flex justify-start gap-2 mb-6">
      {DAYS_OF_WEEK.map(day => (
        <button
          key={day}
          onClick={() => onToggleDay(day)}
          className={`w-8 h-8  rounded-full text-sm font-medium
            ${availability[day].enabled 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600'}`}
        >
          {day[0].toUpperCase()}
        </button>
      ))}
    </div>
  );
}