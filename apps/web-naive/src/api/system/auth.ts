import { baseRequestClient, requestClient } from '#/api/request';
import { useAccessStore } from '@vben/stores';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface TokenParams {
    password?: string;
    username?: string;
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    refresh_token?: string;
  }

  /** 登录接口返回值 */
  export interface TokenResult {
    access_token: string;
    refresh_token: string;
  }
}

/**
 * oauth2登录
 */
export async function loginApi(params: AuthApi.TokenParams) {
  return requestClient.post<AuthApi.TokenResult>('/auth/token', undefined, {
    params,
  });
}

/**
 * oauth2刷新token
 */
export async function refreshTokenApi(params: AuthApi.TokenParams) {
  return baseRequestClient.post<AuthApi.TokenResult>('/auth/token', undefined, {
    params,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  const accessStore = useAccessStore();
  return baseRequestClient.post(
    '/auth/logout',
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
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
