import { TimeSlot } from "./types";

export const parseTime = (timeStr: string): Date => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    const date = new Date();
    let hour = parseInt(hours);
    
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    date.setHours(hour, parseInt(minutes), 0, 0);
    return date;
  };
  
  export const isValidTimeFormat = (time: string): boolean => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    return timeRegex.test(time);
  };
  
  export const hasOverlap = (slots: TimeSlot[]): boolean => {
    const sortedSlots = [...slots].sort((a, b) => 
      parseTime(a.startTime).getTime() - parseTime(b.startTime).getTime()
    );
  
    for (let i = 1; i < sortedSlots.length; i++) {
      const prevEnd = parseTime(sortedSlots[i - 1].endTime);
      const currentStart = parseTime(sortedSlots[i].startTime);
      if (currentStart <= prevEnd) {
        return true;
      }
    }
    return false;
  };
  
  export const isValidTimeSlot = (slot: TimeSlot): boolean => {
    if (!isValidTimeFormat(slot.startTime) || !isValidTimeFormat(slot.endTime)) {
      return false;
    }
    
    const start = parseTime(slot.startTime);
    const end = parseTime(slot.endTime);
    return start < end;
  };