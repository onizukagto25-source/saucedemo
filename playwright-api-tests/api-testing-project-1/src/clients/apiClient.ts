import { request, APIRequestContext } from '@playwright/test';
import { config } from '../utils/config';

export class APIClient {
  private request!: APIRequestContext;

  async init() {
    this.request = await request.newContext({
      baseURL: config.baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getRequest() {
    return this.request;
  }
}