import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace MenuApi {
  export const base = '/menu';
  export const allTree = `${base}/allTree`;
}

/**
 * get current user all menus
 * @returns Promise with all menus
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>(MenuApi.allTree);
}
