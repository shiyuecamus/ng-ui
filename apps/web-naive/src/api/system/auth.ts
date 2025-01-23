import { useAccessStore } from '@vben/stores';

import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  export const base = '/auth';
  export const token = `${base}/token`;
  export const refreshToken = `${base}/refreshToken`;
  export const logout = `${base}/logout`;
  export const codes = `${base}/codes`;

  /** login params */
  export interface TokenParams {
    password?: string;
    username?: string;
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    refresh_token?: string;
  }

  /** login result */
  export interface TokenResult {
    access_token: string;
    refresh_token: string;
  }
}

/**
 * oauth2 login
 * @param params - Login params
 * @returns Promise with login result
 */
export async function loginApi(params: AuthApi.TokenParams) {
  return requestClient.post<AuthApi.TokenResult>(AuthApi.token, undefined, {
    params,
  });
}

/**
 * oauth2 refresh token
 * @param params - Login params
 * @returns Promise with login result
 */
export async function refreshTokenApi(params: AuthApi.TokenParams) {
  return baseRequestClient.post<AuthApi.TokenResult>(
    AuthApi.refreshToken,
    undefined,
    {
      params,
    },
  );
}

/**
 * logout
 * @returns Promise with logout result
 */
export async function logoutApi() {
  const accessStore = useAccessStore();
  return baseRequestClient.post(
    AuthApi.logout,
    {},
    {
      headers: {
        Authorization: accessStore.accessToken
          ? `Bearer ${accessStore.accessToken}`
          : null,
      },
    },
  );
}

/**
 * get current user access codes
 * @returns Promise with access codes
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>(AuthApi.codes);
}
