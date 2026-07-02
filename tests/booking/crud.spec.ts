import { test, expect } from '../../src/fixtures/api-fixtures';
import {
  BookingSchema,
  CreatedBookingSchema,
  BookingIdsListSchema,
} from '../../src/schemas/booking.schema';
import { validateSchema, generateBookingData } from '../../src/utils/api-helpers';
import testData from '../../test-data/bookings.json';

test.describe('Booking CRUD Operations', () => {


  test('should get all booking IDs @smoke', async ({ bookingClient }) => {
    const response = await bookingClient.getAllBookingIds();

  
    expect(response.status()).toBe(200);

  
    const body = await response.json();

   
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

 
    const validated = validateSchema(BookingIdsListSchema, body);
    expect(validated.length).toBeGreaterThan(0);

  
    expect(validated[0]).toHaveProperty('bookingid');
    expect(typeof validated[0].bookingid).toBe('number');

  });

  test('should get single booking by ID @smoke', async ({ bookingClient }) => {
  
    const allResponse = await bookingClient.getAllBookingIds();
    const allBookings = await allResponse.json();
    const firstId = allBookings[0].bookingid;
   
    const response = await bookingClient.getBookingById(firstId);

    expect(response.status()).toBe(200);

    const body = await response.json();


    const validated = validateSchema(BookingSchema, body);
    expect(validated.firstname).toBeTruthy();
    expect(validated.lastname).toBeTruthy();
    expect(typeof validated.totalprice).toBe('number');
    expect(typeof validated.depositpaid).toBe('boolean');
  });



  test('should create a new booking @smoke @critical', async ({
    bookingClient,
  }) => {
    const newBooking = generateBookingData();

    const response = await bookingClient.createBooking(newBooking);

  
    expect(response.status()).toBe(200);

    const body = await response.json();

  
    const validated = validateSchema(CreatedBookingSchema, body);

  
    expect(validated.bookingid).toBeTruthy();
    expect(typeof validated.bookingid).toBe('number');

  
    expect(validated.booking.firstname).toBe(newBooking.firstname);
    expect(validated.booking.lastname).toBe(newBooking.lastname);
    expect(validated.booking.totalprice).toBe(newBooking.totalprice);
    expect(validated.booking.depositpaid).toBe(newBooking.depositpaid);

  });

  test('should create booking and verify by GET @regression @critical', async ({
    bookingClient,
  }) => {
 
    const newBooking = generateBookingData();

    const createResponse = await bookingClient.createBooking(newBooking);
    const created = await createResponse.json();
    const bookingId = created.bookingid;


    const getResponse = await bookingClient.getBookingById(bookingId);
    expect(getResponse.status()).toBe(200);

    const fetched = await getResponse.json();

    expect(fetched.firstname).toBe(newBooking.firstname);
    expect(fetched.lastname).toBe(newBooking.lastname);
    expect(fetched.totalprice).toBe(newBooking.totalprice);
    expect(fetched.depositpaid).toBe(newBooking.depositpaid);
    expect(fetched.bookingdates.checkin).toBe(newBooking.bookingdates.checkin);
    expect(fetched.bookingdates.checkout).toBe(newBooking.bookingdates.checkout);
  });


  test('should update booking fully with PUT @regression', async ({
    bookingClient,
    authToken,
  }) => {
  
    const original = generateBookingData();
    const createResponse = await bookingClient.createBooking(original);
    const { bookingid } = await createResponse.json();

  
    const updatedData = generateBookingData({
      firstname: 'Updated_First',
      lastname: 'Updated_Last',
      totalprice: 999,
    });

    const updateResponse = await bookingClient.updateBooking(
      bookingid,
      updatedData,
      authToken,
    );

    expect(updateResponse.status()).toBe(200);

    const body = await updateResponse.json();

  
    expect(body.firstname).toBe('Updated_First');
    expect(body.lastname).toBe('Updated_Last');
    expect(body.totalprice).toBe(999);


    const getResponse = await bookingClient.getBookingById(bookingid);
    const fetched = await getResponse.json();
    expect(fetched.firstname).toBe('Updated_First');
  });


  test('should partially update booking with PATCH @regression', async ({
    bookingClient,
    authToken,
  }) => {

    const original = generateBookingData();
    const createResponse = await bookingClient.createBooking(original);
    const { bookingid } = await createResponse.json();

  
    const partialUpdate = {
      firstname: 'Patched_Name',
      totalprice: 777,
    };

    const patchResponse = await bookingClient.partialUpdateBooking(
      bookingid,
      partialUpdate,
      authToken,
    );

    expect(patchResponse.status()).toBe(200);

    const body = await patchResponse.json();

 
    expect(body.firstname).toBe('Patched_Name');
    expect(body.totalprice).toBe(777);

    expect(body.lastname).toBe(original.lastname);
    expect(body.depositpaid).toBe(original.depositpaid);

  });

  
  test('should delete booking @regression @critical', async ({
    bookingClient,
    authToken,
  }) => {
  
    const newBooking = generateBookingData();
    const createResponse = await bookingClient.createBooking(newBooking);
    const { bookingid } = await createResponse.json();

  
    const deleteResponse = await bookingClient.deleteBooking(bookingid, authToken);
    expect(deleteResponse.status()).toBe(201);
    
    const getResponse = await bookingClient.getBookingById(bookingid);
    expect(getResponse.status()).toBe(404);
  
  });


  test('should perform complete CRUD lifecycle @regression @critical', async ({
    bookingClient,
    authToken,
  }) => {
   
    const bookingData = generateBookingData();
    const createResponse = await bookingClient.createBooking(bookingData);
    expect(createResponse.status()).toBe(200);
    const created = await createResponse.json();
    const id = created.bookingid;
    expect(id).toBeTruthy();

    
    const readResponse = await bookingClient.getBookingById(id);
    expect(readResponse.status()).toBe(200);
    const readBody = await readResponse.json();
    expect(readBody.firstname).toBe(bookingData.firstname);

    
    const updatedData = generateBookingData({
      firstname: 'CRUD_Updated',
      totalprice: 555,
    });
    const updateResponse = await bookingClient.updateBooking(id, updatedData, authToken);
    expect(updateResponse.status()).toBe(200);

  
    const verifyResponse = await bookingClient.getBookingById(id);
    const verifyBody = await verifyResponse.json();
    expect(verifyBody.firstname).toBe('CRUD_Updated');
    expect(verifyBody.totalprice).toBe(555);

  
    const deleteResponse = await bookingClient.deleteBooking(id, authToken);
    expect(deleteResponse.status()).toBe(201);

  
    const deletedResponse = await bookingClient.getBookingById(id);
    expect(deletedResponse.status()).toBe(404);
  });
});