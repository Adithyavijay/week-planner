  import * as memjs from 'memjs';
  import { WeeklyAvailability } from './types';


  const memcache = memjs.Client.create(process.env.MEMCACHIER_SERVERS || '127.0.0.1:11211', {
    username: process.env.MEMCACHIER_USERNAME || '',
    password: process.env.MEMCACHIER_PASSWORD || '',
    timeout: 1,
    retries: 2
  })



  export const getCachedAvailability = async (userId: string): Promise<WeeklyAvailability | null> => {
    try {
      const { value } = await memcache.get(`availability:${userId}`);
      return value ? JSON.parse(value.toString()) : null;
    } catch (error) {
      console.error('Error fetching from cache:', error);
      return null;
    }
  };

  export const setCachedAvailability = async (
    userId: string, 
    availability: WeeklyAvailability
  ): Promise<boolean> => {
    try {
      await memcache.set(
        `availability:${userId}`,
        JSON.stringify(availability),
        { expires: 0 }
      );
      return true;
    } catch (error) {
      console.error('Error setting cache:', error);
      return false;
    }
  };