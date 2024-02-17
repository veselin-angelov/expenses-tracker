import { config } from '../config';
import { tokenStorage } from './user-info-service';
import { eventManager } from '../lib/event-manager';

export interface RequestOptions {
  headers?: { [key: string]: string };
  query?: { [key: string]: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: { [key: string]: any };
}

export class HttpService {
  async get<T>(
    path: string,
    options: { query?: { [key: string]: string } } = {},
  ): Promise<T> {
    return this.request('GET', path, options);
  }

  async post<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('POST', path, options);
  }

  async postFile<T>(path: string, options: RequestOptions): Promise<T> {
    return this.requestFormData('POST', path, options);
  }

  async patch<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('PATCH', path, options);
  }

  async put<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('PUT', path, options);
  }

  async delete<T>(path: string, options: RequestOptions): Promise<T> {
    return this.request('DELETE', path, options);
  }

  private async request(
    method: string,
    path: string,
    { headers, body, query }: RequestOptions,
  ) {
    const authToken = tokenStorage.accessToken;
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${config.serverBaseUrl.replace(/\/$/, '')}/${path.replace(
        /^\//,
        '',
      )}?${queryString}`,
      {
        method,
        headers: headers ?? {
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      // TODO: Error handling, possibly shared errors between cliend & server
      if (response.status === 401 && tokenStorage.refreshToken) {
        eventManager.emit('unauthorized');
      }
      throw new Error('Internal server error');
    }

    return response.json();
  }

  private async requestFormData(
    method: string,
    path: string,
    { headers, body, query }: RequestOptions,
  ) {
    const authToken = tokenStorage.accessToken;
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${config.serverBaseUrl.replace(/\/$/, '')}/${path.replace(
        /^\//,
        '',
      )}?${queryString}`,
      {
        method,
        headers: headers ?? {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: body as FormData,
      },
    );

    if (!response.ok) {
      // TODO: Error handling, possibly shared errors between cliend & server
      if (response.status === 401 && tokenStorage.refreshToken) {
        eventManager.emit('unauthorized');
      }
      throw new Error('Internal server error');
    }

    return response.json();
  }
}
