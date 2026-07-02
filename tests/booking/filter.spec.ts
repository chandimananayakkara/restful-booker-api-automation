import { test, expect } from '../../src/fixtures/api-fixtures';
import { generateBookingData } from '../../src/utils/api-helpers';

test.describe('Booking Filter Tests @regression', () => {

  test('should filter bookings by firstname', async ({ bookingClient }) => {
  
    const uniqueName = `FilterTest_${Date.now()}`;
    const bookingData = generateBookingData({ firstname: uniqueName });
    await bookingClient.createBooking(bookingData);

   
    const response = await bookingClient.getBookingIdsByName(uniqueName);
    expect(response.status()).toBe(200);

    const body = await response.json();

  
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThanOrEqual(1);
    
  });

  test('should return empty array for non-existent name', async ({
    bookingClient,
  }) => {
    const response = await bookingClient.getBookingIdsByName(
      'NonExistent_Name_XYZ_999',
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(0);
  });
});