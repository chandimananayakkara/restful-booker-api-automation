import { test, expect } from '../../src/fixtures/api-fixtures';
import {
  BookingSchema,
  CreatedBookingSchema,
  BookingIdsListSchema,
  AuthTokenSchema,
} from '../../src/schemas/booking.schema';
import { validateSchema, generateBookingData } from '../../src/utils/api-helpers';
import testData from '../../test-data/bookings.json';

test.describe('API Contract / Schema Validation Tests @regression', () => {

  test('auth token response matches schema', async ({ authClient }) => {
    const { username, password } = testData.auth.validCredentials;
    const response = await authClient.createToken(username, password);
    const body = await response.json();

  
    const validated = validateSchema(AuthTokenSchema, body);

    expect(validated).toBeDefined();
    expect(validated.token.length).toBeGreaterThan(0);
  });

  test('booking list response matches schema', async ({ bookingClient }) => {
    const response = await bookingClient.getAllBookingIds();
    const body = await response.json();

    const validated = validateSchema(BookingIdsListSchema, body);
    expect(validated.length).toBeGreaterThan(0);

  
    expect(validated[0]).toHaveProperty('bookingid');
    expect(typeof validated[0].bookingid).toBe('number');
  });

  test('single booking response matches schema', async ({ bookingClient }) => {

    const allResponse = await bookingClient.getAllBookingIds();
    const allBookings = await allResponse.json();
    const id = allBookings[0].bookingid;

    const response = await bookingClient.getBookingById(id);
    const body = await response.json();

    const validated = validateSchema(BookingSchema, body);

   
    expect(typeof validated.firstname).toBe('string');
    expect(typeof validated.lastname).toBe('string');
    expect(typeof validated.totalprice).toBe('number');
    expect(typeof validated.depositpaid).toBe('boolean');
    expect(validated.bookingdates).toBeDefined();
    expect(typeof validated.bookingdates.checkin).toBe('string');
    expect(typeof validated.bookingdates.checkout).toBe('string');
  });

  test('created booking response matches schema', async ({ bookingClient }) => {
    const newBooking = generateBookingData();
    const response = await bookingClient.createBooking(newBooking);
    const body = await response.json();

    const validated = validateSchema(CreatedBookingSchema, body);

    expect(typeof validated.bookingid).toBe('number');
    expect(validated.booking).toBeDefined();
    expect(typeof validated.booking.firstname).toBe('string');
  });
});