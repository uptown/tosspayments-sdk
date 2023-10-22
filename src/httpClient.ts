import got, { HTTPError } from 'got';
import { TossPaymentsError } from './utils/tossPaymentsError.js';
import { ErrorBody } from './types/errorTypes.js';
import { encodeBase64 } from './utils/encodeBase64.js';
import { filterUndefined } from './utils/filterUndefined.js';

export class HttpClient {

  constructor(private domain: string, private basicAuth: string) {
  }

  async post<T>(headers: { [key: string]: string }, path: string, body: any): Promise<T> {
    try {
      return await got.post(this.domain + path, filterUndefined({
        json: body,
        headers: {
          ...headers,
          'Authorization': 'basic ' + encodeBase64(this.basicAuth + ":"),
        },
      })).json() as T;
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new TossPaymentsError(error.response.statusCode, error.response.body as ErrorBody);
      }
      throw HTTPError;
    }
  }

  async get<T>(path: string, searchParams: any = {}): Promise<T> {
    return await got.get(this.domain + path, {
      searchParams,
      headers: {
        'Authorization': 'basic ' + this.basicAuth,
      },
    }).json() as T;
  }

}
