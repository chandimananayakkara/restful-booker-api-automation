import { type APIRequestContext, type APIResponse } from '@playwright/test';

export class BookingClient {

  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllBookingIds(): Promise<APIResponse> {
    return await this.request.get('/booking');
  }

  async getBookingIdsByName(
    firstname?: string,
    lastname?: string,
  ): Promise<APIResponse> {
 
    const params = new URLSearchParams();
    if (firstname) params.append('firstname', firstname);
    if (lastname) params.append('lastname', lastname);

    const queryString = params.toString();
    const url = queryString ? `/booking?${queryString}` : '/booking';

    return await this.request.get(url);
  }

  async getBookingById(id: number): Promise<APIResponse> {
    return await this.request.get(`/booking/${id}`);
  
  }


  async createBooking(bookingData: Record<string, unknown>): Promise<APIResponse> {

    return await this.request.post('/booking', {
      data: bookingData,
    });
  }

  async updateBooking(
    id: number,
    bookingData: Record<string, unknown>,
    token: string,
  ): Promise<APIResponse> {
    return await this.request.put(`/booking/${id}`, {
      data: bookingData,
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async partialUpdateBooking(
    id: number,
    partialData: Record<string, unknown>,
    token: string,
  ): Promise<APIResponse> {
    return await this.request.patch(`/booking/${id}`, {
      data: partialData,
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    return await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
  async healthCheck(): Promise<APIResponse> {
    return await this.request.get('/ping');
  }
}