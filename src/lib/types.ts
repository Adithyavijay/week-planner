export interface TimeSlot {
    startTime: string;
    endTime: string;
  }
  
  export interface DaySchedule {
    enabled: boolean;
    timeSlots: TimeSlot[];
  }
  
  export interface WeeklyAvailability {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  }