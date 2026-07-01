import { z } from "zod";

export const BookingDatesSchema = z.object({
  checkin: z.string(),
  checkout: z.string(),
});

export const BookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: BookingDatesSchema,
  additionalneeds: z.string().optional(),
});

export const CreatedBookingSchema = z.object({
  bookingid: z.number(),
  booking: BookingSchema,
});

export const BookingIdSchema = z.object({
  bookingid: z.number(),
});

export const BookingIdsListSchema = z.array(BookingIdSchema);

export const AuthTokenSchema = z.object({
  token: z.string().min(1),
});

export type Booking = z.infer<typeof BookingSchema>;
export type CreatedBooking = z.infer<typeof CreatedBookingSchema>;
export type BookingDates = z.infer<typeof BookingDatesSchema>;
export type AuthToken = z.infer<typeof AuthTokenSchema>;
