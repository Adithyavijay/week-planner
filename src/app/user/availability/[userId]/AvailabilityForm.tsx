'use client';

import { useState } from 'react';
import { WeeklyAvailability } from '@/lib/types';
import { DAYS_OF_WEEK } from '@/lib/constants';
import { hasOverlap, isValidTimeSlot } from '@/lib/utils';
import { saveAvailability } from '@/actions';
import { DaySchedule } from '@/components/availability/DaySchedule';
import { Button } from '@/components/ui/Button';

export default function AvailabilityForm({
  userId,
  initialAvailability
}: {
  userId: string;
  initialAvailability: WeeklyAvailability;
}) {
  const [availability, setAvailability] = useState(initialAvailability);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, Record<number, boolean>>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, Record<number, boolean>> = {};
    let isValid = true;

    for (const day of DAYS_OF_WEEK) {
      const schedule = availability[day];
      if (schedule.enabled && schedule.timeSlots.length > 0) {
        errors[day] = {};
        
        // Validate individual slots
        schedule.timeSlots.forEach((slot, index) => {
          if (!isValidTimeSlot(slot)) {
            errors[day][index] = true;
            isValid = false;
          }
        });

        // Check for overlaps
        if (hasOverlap(schedule.timeSlots)) {
          schedule.timeSlots.forEach((_, index) => {
            errors[day][index] = true;
          });
          isValid = false;
        }
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError('Please fix the validation errors before saving.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const result = await saveAvailability(userId, availability);
      if (!result.success) {
        setError(result.error || 'Failed to save availability');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) { 
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const updateDaySchedule = (day: keyof WeeklyAvailability, schedule: WeeklyAvailability[keyof WeeklyAvailability]) => {
    setAvailability(prev => ({
      ...prev,
      [day]: schedule
    }));
    // Clear validation errors for the updated day
    setValidationErrors(prev => ({
      ...prev,
      [day]: {}
    }));
  };

  const isValid = Object.values(availability).some(day => 
    day.enabled && day.timeSlots.length > 0
  );

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="divide-y divide-gray-200">
        {DAYS_OF_WEEK.map(day => (
          <DaySchedule
            key={day}
            day={day}
            schedule={availability[day]}
            onChange={(schedule) => updateDaySchedule(day, schedule)}
            errors={validationErrors[day]}
          />
        ))}
      </div>

      {error && (
        <div className="px-6 py-4 border-t border-gray-200 bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <Button
          type="submit"
          disabled={saving || !isValid}
          className="w-full sm:w-auto"
        >
          {saving ? 'Saving...' : 'Save Availability'}
        </Button>
      </div>
    </form>
  );
}