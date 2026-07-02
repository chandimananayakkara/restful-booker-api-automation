import { test as base } from '@playwright/test';
import { AuthClient } from '../api/AuthClient';
import { BookingClient } from '../api/BookingClient';

type APIFixtures = {
  authClient: AuthClient;
  bookingClient: BookingClient;
  authToken: string;
};

export const test = base.extend<APIFixtures>({

  authClient: async ({ request }, use) => {
    const authClient = new AuthClient(request);
    await use(authClient);
  },

  bookingClient: async ({ request }, use) => {
    const bookingClient = new BookingClient(request);
    await use(bookingClient);
  },

  
  authToken: async ({ authClient }, use) => {
    const token = await authClient.getValidToken();
    await use(token);
  },
});

export { expect } from '@playwright/test';