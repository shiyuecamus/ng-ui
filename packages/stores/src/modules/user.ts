import { acceptHMRUpdate, defineStore } from 'pinia';

interface SimpleRole {
  /**
   * 编码
   */
  code: string;
  /**
   * id
   */
  id: number | string;
  /**
   * 名称
   */
  name: string;
}

interface BasicUserInfo {
  [key: string]: any;

  /**
   * 部门id
   */
  deptId?: number | string;
  /**
   * 头像
   */
  headerImg: string;
  /**
   * 用户id
   */
  id: number | string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 用户角色
   */
  roles?: SimpleRole[];
  /**
   * 状态
   */
  status?: number;
  /**
   * 租户id
   */
  tenantId?: number | string;
  /**
   * 用户名
   */
  username: string;
}

interface AccessState {
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null;
  /**
   * 用户角色
   */
  userRoles: string[];
}

/**
 * @zh_CN 用户信息相关
 */
export const useUserStore = defineStore('core-user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo | null) {
      // 设置用户信息
      this.userInfo = userInfo;
      // 设置角色信息
      const roles = (userInfo?.roles ?? []).map((role) => role.code);
      this.setUserRoles(roles);
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles;
    },
  },
  state: (): AccessState => ({
    userInfo: null,
    userRoles: [],
  }),
});

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
