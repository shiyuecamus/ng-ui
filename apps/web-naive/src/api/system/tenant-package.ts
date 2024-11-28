import { type CommonPageRequest, CommonStatus } from '@vben/types';

export namespace TenantPackageApi {
  export namespace Url {
    export const base = '/tenantPackage';
    export const page = `${base}/page`;
    export const deleteTenantPackage = (id: number | string) => `${base}/${id}`;
  }

  export interface TenantPackagePageParams extends CommonPageRequest {
    name?: string;
    status?: CommonStatus;
  }
}
