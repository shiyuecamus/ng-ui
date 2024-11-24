export enum CommonStatus {
  /**
   * 禁用
   */
  DISABLED = 2,
  /**
   * 正常
   */
  ENABLED = 1,
}

export enum EntityType {
  /**
   * 部门
   */
  DEPT = 'dept',
  /**
   * 设备
   */
  DEVICE = 'device',
  /**
   * 设备凭证
   */
  DEVICE_CREDENTIALS = 'deviceCredentials',
  /**
   * 字典
   */
  DICTIONARY = 'dictionary',
  /**
   * 字典详情
   */
  DICTIONARY_DETAIL = 'dictionary_detail',
  /**
   * 厂商
   */
  MANUFACTURER = 'manufacturer',
  /**
   * 菜单
   */
  MENU = 'menu',
  /**
   * oauth客户端
   */
  OAUTH2_CLIENT = 'oauth2Client',
  /**
   * 操作日志
   */
  OPERATION_RECORD = 'operationRecord',
  /**
   * 产品
   */
  PRODUCT = 'product',
  /**
   * 角色
   */
  ROLE = 'role',
  /**
   * 菜单
   */
  TENANT = 'tenant',
  /**
   * 租户套餐
   */
  TENANT_PACKAGE = 'tenantPackage',
  /**
   * 用户
   */
  USER = 'user',
}

interface BaseEntity {
  id: number | string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

interface TenantModel {
  tenantId?: number | string;
}

interface DeptModel extends TenantModel {
  deptId?: number | string;
}

interface StatusInfo {
  /**
   * 状态
   */
  status?: CommonStatus;
}

/** 联系信息 */
interface ContactInfo {
  /**
   * 国家
   */
  country?: string;
  /**
   * 省/州
   */
  state?: string;
  /**
   * 城市
   */
  city?: string;
  /**
   * 邮编
   */
  zip?: string;
  /**
   * 电话
   */
  phone?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 地址1
   */
  address?: string;
  /**
   * 地址2
   */
  address2?: string;
}

interface AdditionalInfo {
  additionalInfo?: string;
}

export type {
  AdditionalInfo,
  BaseEntity,
  ContactInfo,
  DeptModel,
  StatusInfo,
  TenantModel,
};
