import type { BaseEntity, ContactInfo, StatusInfo } from './base';

// TenantInfo interface extends BaseEntity, StatusInfo, and ContactInfo
interface TenantInfo extends BaseEntity, ContactInfo, StatusInfo {
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
