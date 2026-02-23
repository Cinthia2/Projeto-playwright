import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(email: string, password: string): Promise<APIResponse> {
    return this.request.post('/login', {
      data: {
        email,
        password
      }
    });
  }
}
