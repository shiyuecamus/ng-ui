import type {
  CommonPageRequest,
  CommonPageResponse,
  TenantInfo,
} from '@vben/types';

import { CommonStatus } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace TenantApi {
  export const base = '/tenant';
  export const page = `${base}/page`;
  export const getByIds = `${base}/ids`;
  export const deleteTenant = (id: number | string) => `${base}/${id}`;
  export const getById = (id: number | string) => `${base}/${id}`;
  export const updateStatus = (id: number | string) => `${base}/status/${id}`;
  /** tenant page params */
  export interface TenantPageParams extends CommonPageRequest {
    name?: string;
    status?: CommonStatus;
  }
}

/**
 * fetch tenant page
 * @param params - Tenant page params
 * @returns Promise with tenant page response
 */
export async function fetchTenantPage(params: TenantApi.TenantPageParams) {
  return requestClient.get<CommonPageResponse<TenantInfo>>(TenantApi.page, {
    params,
  });
}

/**
 * delete tenant
 * @param id - Tenant ID
 * @returns Promise with delete response
 */
export async function deleteTenant(id: number | string) {
  return requestClient.delete(TenantApi.deleteTenant(id));
}

/**
 * update tenant status
 * @param id - Tenant ID
 * @param status - Tenant status
 * @returns Promise with update status response
 */
export async function updateTenantStatus(
  id: number | string,
  status: CommonStatus,
) {
  return requestClient.put(TenantApi.updateStatus(id), undefined, {
    params: { status },
  });
}
