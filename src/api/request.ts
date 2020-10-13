/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createEffect,
  createStore,
  attach,
  forward,
} from 'effector-logger';
import { HttpNetworkError } from './error';
import { $token } from '../models/session';
import { router } from '../router';

interface Request {
  uri: URL;

  method: 'GET' | 'POST' | 'PUT' | 'DELETE';

  body?: {[key: string]: any};

  params?: Record<string, any>;

  headers?: Record<string, string>;
}

interface RequestInternal {
  path: string;

  method: 'GET' | 'POST' | 'PUT' | 'DELETE';

  body?: Record<string, any>;

  params?: Record<string, any>;

  headers?: Record<string, string>;
}

const $backendUrl = createStore(process.env.VUE_APP_API_URL as string);

const fxRequest = createEffect<Request, any, HttpNetworkError>({
  handler: async (payload: Request) => {
    const { uri, method, ...config } = payload;

    const headers = {
      ...config.headers,
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json, text/plain, */*',
    };

    const response = await fetch(uri.href, {
      method,
      headers,
      body: JSON.stringify(config.body),
    });

    if (!response.ok) {
      throw new HttpNetworkError({
        status: response.status,
        message: response.statusText,
      });
    }

    const data = await response.json();
    return data;
  },
});

const fxRequestInternal = attach({
  source: $backendUrl,
  effect: fxRequest,
  mapParams: ({ path, ...config }: RequestInternal, backendUrl) => {
    const uri = new URL(`${backendUrl}${path}`);
    const { params } = config;

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value !== 'undefined') {
          uri.searchParams.append(key, value);
        }
      });
    }

    return {
      ...config,
      uri,
    };
  },
});

const fxRequestAuthorized = attach({
  source: $token,
  effect: fxRequestInternal,
  mapParams(config: RequestInternal, token: string) {
    const headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return {
      ...config,
      headers,
    };
  },
});

forward({
  from: fxRequestAuthorized.fail,
  to: createEffect({
    handler() {
      router.push({
        name: 'Auth',
      });
    },
  }),
});

export { fxRequestInternal, fxRequestAuthorized };
