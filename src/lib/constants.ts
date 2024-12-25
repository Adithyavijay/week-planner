import { TimeSlot } from "./types";

export const DAYS_OF_WEEK = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ] as const;
  
  export const DEFAULT_TIME_SLOT: TimeSlot = {
    startTime: '9:00 AM',
    endTime: '5:00 PM'
  };