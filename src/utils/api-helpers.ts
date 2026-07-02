import { type APIResponse } from '@playwright/test';
import { z } from 'zod';


export async function parseResponse<T>(response: APIResponse): Promise<T> {
  return await response.json() as T;
}


export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): T {
  return schema.parse(data);
 
}


export function generateFutureDates(
  checkInDaysFromNow: number = 7,
  checkOutDaysFromNow: number = 14,
) {
  const checkin = new Date();
  checkin.setDate(checkin.getDate() + checkInDaysFromNow);

  const checkout = new Date();
  checkout.setDate(checkout.getDate() + checkOutDaysFromNow);

  return {
    checkin: checkin.toISOString().split('T')[0],  
    checkout: checkout.toISOString().split('T')[0],
   
  };
}


export function generateBookingData(overrides = {}) {
  const dates = generateFutureDates();
  const randomId = Math.floor(Math.random() * 10000);

  const baseBooking = {
    firstname: `TestUser_${randomId}`,
    lastname: `AutoQA_${randomId}`,
    totalprice: Math.floor(Math.random() * 500) + 50, 
    depositpaid: Math.random() > 0.5, 
    bookingdates: {
      checkin: dates.checkin,
      checkout: dates.checkout,
    },
    additionalneeds: 'Breakfast',
  };

  return { ...baseBooking, ...overrides };

}