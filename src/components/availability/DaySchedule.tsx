import { DaySchedule as DayScheduleType, TimeSlot as TimeSlotType } from '@/lib/types';
import { DEFAULT_TIME_SLOT } from '@/lib/constants';
import { TimeSlot } from './TimeSlot';
import { Button } from '../ui/Button';

export function DaySchedule({
  day,
  schedule,
  onChange,
  errors = {}
}: {
  day: string;
  schedule: DayScheduleType;
  onChange: (schedule: DayScheduleType) => void;
  errors?: Record<number, boolean>;
}) {
  const addTimeSlot = () => {
    onChange({
      ...schedule,
      timeSlots: [...schedule.timeSlots, { ...DEFAULT_TIME_SLOT }]
    });
  };

  const removeTimeSlot = (index: number) => {
    onChange({
      ...schedule,
      timeSlots: schedule.timeSlots.filter((_, i) => i !== index)
    });
  };

  const updateTimeSlot = (index: number, slot: TimeSlotType) => {
    onChange({
      ...schedule,
      timeSlots: schedule.timeSlots.map((s, i) => (i === index ? slot : s))
    });
  };

  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="grid grid-cols-[auto_200px_1fr_auto] items-center gap-6">
        {/* Checkbox Column */}
        <div className="flex items-center justify-center pl-4">
          <input
            type="checkbox"
            checked={schedule.enabled}
            onChange={(e) => onChange({ ...schedule, enabled: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        {/* Day Label Column */}
        <div className="text-sm font-medium capitalize">
          {day}
        </div>

        {/* Time Slots Column */}
        <div className="bg-gray-200 rounded-lg p-3 min-h-[3rem] flex flex-wrap items-center gap-3">
          {schedule.timeSlots.map((slot, index) => (
            <TimeSlot
              key={index}
              slot={slot}
              onChange={(slot) => updateTimeSlot(index, slot)}
              onRemove={() => removeTimeSlot(index)}
              error={errors[index]}
              showRemove={schedule.timeSlots.length > 1}
            />
          ))}
        </div>

        {/* Actions Column */}
        <div className="pr-4">
          <Button 
            onClick={addTimeSlot} 
            className="!p-2 !rounded-full !bg-gray-200 hover:!bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="black">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}