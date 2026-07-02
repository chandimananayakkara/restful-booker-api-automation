import { test, expect } from '../../src/fixtures/api-fixtures';
import { AuthTokenSchema } from '../../src/schemas/booking.schema';
import { validateSchema } from '../../src/utils/api-helpers';
import testData from '../../test-data/bookings.json';

test.describe('Authentication Tests', () => {

  test('should create auth token with valid credentials @smoke @critical', async ({
    authClient,
  }) => {
    const { username, password } = testData.auth.validCredentials;

    const response = await authClient.createToken(username, password);

    expect(response.status()).toBe(200);

    const body = await response.json();

   expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');

     const validated = validateSchema(AuthTokenSchema, body);
    expect(validated.token).toBeTruthy();
   
  });

  test('should reject invalid credentials @regression', async ({
    authClient,
  }) => {
    const { username, password } = testData.auth.invalidCredentials;

    const response = await authClient.createToken(username, password);

    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
   
  });

  test('should handle empty credentials @regression', async ({
    authClient,
  }) => {
    const response = await authClient.createToken('', '');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });
});