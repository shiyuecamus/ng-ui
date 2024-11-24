interface CommonPageRequest {
  /**
   * 页码
   */
  page: number;
  /**
   * 分页数量
   */
  pageSize: number;
}

interface CommonPageResponse<T> {
  /**
   * 页码
   */
  page: number;
  /**
   * 分页数量
   */
  pageSize: number;
  /**
   * 总数
   */
  total: number;
  /**
   * 数据
   */
  list: T[];
}

export type { CommonPageRequest, CommonPageResponse };
