import { requestClient } from '#/api/request';

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
 * oauth2登录及刷新token
 */
export async function tokenApi(params: AuthApi.TokenParams) {
  return requestClient.post<AuthApi.TokenResult>('/auth/token', undefined, {
    params,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return requestClient.post('/auth/logout');
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
