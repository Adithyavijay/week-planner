'use server'

import { revalidatePath } from 'next/cache';
import {  setCachedAvailability } from '@/lib/cache';
import { WeeklyAvailability } from '@/lib/types';
import { hasOverlap, isValidTimeSlot } from '@/lib/utils';

export async function saveAvailability(
  userId: string, 
  availability: WeeklyAvailability
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate all time slots
    for (const day of Object.values(availability)) {
      if (day.enabled && day.timeSlots.length > 0) {
        // Validate individual slots
        for (const slot of day.timeSlots) {
          if (!isValidTimeSlot(slot)) {
            return {
              success: false,
              error: 'Invalid time format or start time is after end time'
            };
          }
        }
        
        // Check for overlaps
        if (hasOverlap(day.timeSlots)) {
          return {
            success: false,
            error: 'Time slots cannot overlap'
          };
        }
      }
    }

    // Save to cache
    const saved = await setCachedAvailability(userId, availability);
    if (!saved) {
      return {
        success: false,
        error: 'Failed to save availability'
      };
    }

    // Revalidate the page
    revalidatePath(`/user/availability/${userId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error saving availability:', error);
    return {
      success: false,
      error: 'An unexpected error occurred'
    };
  }
}