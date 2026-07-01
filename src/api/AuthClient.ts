import { type APIRequestContext } from "@playwright/test";

export class AuthClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createToken(username: string, password: string) {
    const response = await this.request.post("/auth", {
      data: {
        username,
        password,
      },
    });
    return response;
  }

  async getValidToken():Promise<void>{
    const response = await this.createToken('admin', 'password123')
    const body = await response.json()
    return body.token
  }
}
