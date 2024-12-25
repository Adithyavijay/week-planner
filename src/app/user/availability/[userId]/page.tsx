import { getCachedAvailability } from '@/lib/cache';
import { DAYS_OF_WEEK, DEFAULT_TIME_SLOT } from '@/lib/constants';
import { WeeklyAvailability } from '@/lib/types';
import AvailabilityForm from './AvailabilityForm';

const defaultAvailability: WeeklyAvailability = DAYS_OF_WEEK.reduce((acc, day) => ({
  ...acc,
  [day]: {
    enabled: true,
    timeSlots: [{ ...DEFAULT_TIME_SLOT }]
  }
}), {} as WeeklyAvailability); 
interface AvailabilityPageProps{
  params : Promise<{
      userId: string
  }>
}

export default async function AvailabilityPage(props : AvailabilityPageProps) { 

  const { userId } = await props.params ;
  const availability = await getCachedAvailability(userId) || defaultAvailability;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Weekly Availability</h1>
          <p className="mt-2 text-sm text-gray-600">
            Set your available time slots for each day of the week
          </p>
        </header>
        <AvailabilityForm userId={userId} initialAvailability={availability} />
      </div>
    </main>
  );
}