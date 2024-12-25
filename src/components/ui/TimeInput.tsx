import { convert24to12, convert12to24 } from '@/lib/utils';

export function TimeInput({
  value,
  onChange,
  error
}: {
  value: string;  // in 12-hour format (HH:MM AM/PM)
  onChange: (value: string) => void;
  error?: boolean;
}) {
  // Convert 12-hour to 24-hour for HTML time input
  const time24 = convert12to24(value);
  
  return (
    <input
      type="time"
      value={time24}
      onChange={(e) => {
        const time12 = convert24to12(e.target.value);
        onChange(time12);
      }}
      className={`w-32 px-3 py-2 border rounded-md text-sm
        ${error 
          ? 'border-red-500 focus:ring-red-500' 
          : 'border-gray-300 focus:ring-blue-500'}
        focus:outline-none focus:ring-2`}
    />
  );
}