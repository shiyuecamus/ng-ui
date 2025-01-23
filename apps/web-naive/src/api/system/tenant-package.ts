import type { CommonPageRequest } from '@vben/types';

import { CommonStatus } from '@vben/types';

export namespace TenantPackageApi {
  export const base = '/tenantPackage';
  export const page = `${base}/page`;
  export const deleteTenantPackage = (id: number | string) => `${base}/${id}`;

  /** tenant package page params */
  export interface TenantPackagePageParams extends CommonPageRequest {
    name?: string;
    status?: CommonStatus;
  }
}
