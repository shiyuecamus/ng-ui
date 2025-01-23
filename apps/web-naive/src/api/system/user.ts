import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace UserApi {
  export const base = '/user';
  export const userinfo = `${base}/userinfo`;
}

/**
 * fetch user info
 * @returns Promise with user info
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>(UserApi.userinfo);
}
