import { config } from '../config';
import { userInfoStorage } from './user-info-service';

export interface RequestOptions {
  query?: { [key: string]: string };
  body?: { [key: string]: undefined };
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
    { body, query }: RequestOptions,
  ) {
    const authToken = userInfoStorage.token;
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${config.serverBaseUrl.replace(/\/$/, '')}/${path.replace(
        /^\//,
        '',
      )}?${queryString}`,
      {
        method,
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      // TODO: Error handling, possibly shared errors between cliend & server
      throw new Error('Internal server error');
    }

    return response.json();
  }
}
