import type { BasicUserInfo } from '@vben-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 手机号码
   */
  phone?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 首页地址
   */
  homePath: string;
}

export type { UserInfo };
