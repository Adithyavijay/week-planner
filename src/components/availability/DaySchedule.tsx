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
      timeSlots: schedule.timeSlots.map((s, i) => i === index ? slot : s)
    });
  };

  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4 mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={schedule.enabled}
            onChange={(e) => onChange({ ...schedule, enabled: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium capitalize">{day}</span>
        </label>
      </div>

      {schedule.enabled && (
        <div className="space-y-4 ml-6">
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
          <Button onClick={addTimeSlot} className="!p-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}