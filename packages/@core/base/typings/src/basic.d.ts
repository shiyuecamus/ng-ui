interface BasicOption {
  label: string;
  value: string;
}

type SelectOption = BasicOption;

type TabOption = BasicOption;

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

type ClassType = Array<object | string> | object | string;

export type {
  BasicOption,
  BasicUserInfo,
  ClassType,
  SelectOption,
  SimpleRole,
  TabOption,
};
