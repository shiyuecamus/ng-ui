import {
  type CommonPageRequest,
  type CommonPageResponse,
  CommonStatus,
  type TenantInfo,
} from '@vben/types';

import { requestClient } from '#/api/request';

export namespace TenantApi {
  export namespace Url {
    export const base = '/tenant';
    export const page = `${base}/page`;
    export const deleteTenant = (id: number | string) => `${base}/${id}`;
  }

  export interface TenantPageParams extends CommonPageRequest {
    name?: string;
    status?: CommonStatus;
  }
}

/**
 * 租户分页
 */
export async function fetchTenantPage(params: TenantApi.TenantPageParams) {
  return requestClient.get<CommonPageResponse<TenantInfo>>(TenantApi.Url.page, {
    params,
  });
}

/**
 * 删除租户
 */
export async function deleteTenant(id: number | string) {
  return requestClient.delete(TenantApi.Url.deleteTenant(id));
}
