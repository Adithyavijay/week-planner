import { TimeSlot as TimeSlotType } from '@/lib/types';
import { TimeInput } from '../ui/TimeInput';
import { Button } from '../ui/Button';

export function TimeSlot({
  slot,
  onChange,
  onRemove,
  error,
  showRemove
}: {
  slot: TimeSlotType;
  onChange: (slot: TimeSlotType) => void;
  onRemove?: () => void;
  error?: boolean;
  showRemove?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <TimeInput
        value={slot.startTime}
        onChange={(startTime) => onChange({ ...slot, startTime })}
        error={error}
      />
      <span className="text-gray-500">to</span>
      <TimeInput
        value={slot.endTime}
        onChange={(endTime) => onChange({ ...slot, endTime })}
        error={error}
      />
      {showRemove && onRemove && (
        <Button onClick={onRemove} className="!p-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </Button>
      )}
    </div>
  );
}