import type { BaseEntity, ContactInfo, StatusInfo } from './base';

/** 租户信息 */
interface TenantInfo extends BaseEntity, StatusInfo, ContactInfo {
  /**
   * 名称
   */
  name?: string;
  /**
   * 域名
   */
  domain?: string;
  /**
   * 套餐Id
   */
  packageId?: number | string;
}

export type { TenantInfo };
