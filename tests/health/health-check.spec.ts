import { test, expect } from '../../src/fixtures/api-fixtures';

test.describe('API Health Check @smoke', () => {

  test('should return 201 for ping endpoint', async ({ bookingClient }) => {
    
    const response = await bookingClient.healthCheck();

    expect(response.status()).toBe(201);
   
  });
});