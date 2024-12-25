import { isValidTimeFormat } from '@/lib/utils';

export function TimeInput({
  value,
  onChange,
  error
}: {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="HH:MM AM/PM"
      className={`w-32 px-3 py-2 border rounded-md text-sm
        ${error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-blue-500'}
        focus:outline-none focus:ring-2`}
    />
  );
}
