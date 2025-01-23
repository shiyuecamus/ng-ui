import type {
  CommonPageRequest,
  CommonPageResponse,
  CommonSortRequest,
  DriverInfo,
} from '@vben/types';

import { CommonStatus } from '@vben/types';

import { downloadRequestClient, requestClient } from '#/api/request';

export namespace DriverApi {
  export const base = '/driver';
  export const page = `${base}/page`;
  export const uploadDriver = `${base}/upload`;
  export const downloadDriver = `${base}/download`;
  export const getByIds = `${base}/ids`;
  export const deleteDriver = (id: number | string) => `${base}/${id}`;
  export const getById = (id: number | string) => `${base}/${id}`;
  export const updateStatus = (id: number | string) => `${base}/status/${id}`;
  /** driver page params */
  export interface DriverPageParams
    extends CommonPageRequest,
      CommonSortRequest {
    name?: string;
    code?: string;
    status?: CommonStatus;
  }
}

/**
 * fetch driver page
 * @param params - Driver page params
 * @returns Promise with driver page response
 */
export async function fetchDriverPage(params: DriverApi.DriverPageParams) {
  return requestClient.get<CommonPageResponse<DriverInfo>>(DriverApi.page, {
    params,
  });
}

/**
 * fetch driver by ids
 * @param ids - Driver IDs
 * @returns Promise with driver info
 */
export async function fetchDriverByIds(ids: number | string[]) {
  return requestClient.get<DriverInfo[]>(DriverApi.getByIds, {
    params: { ids },
  });
}

/**
 * fetch driver by id
 * @param id - Driver ID
 * @returns Promise with driver info
 */
export async function fetchDriverById(id: number | string) {
  return requestClient.get<DriverInfo>(DriverApi.getById(id));
}

/**
 * delete driver
 * @param id - Driver ID
 * @returns Promise with delete response
 */
export async function deleteDriver(id: number | string) {
  return requestClient.delete(DriverApi.deleteDriver(id));
}

/**
 * Upload driver file
 * @param file - Upload parameters containing file and driver ID
 * @returns Promise with upload response
 */
export async function uploadDriver(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return requestClient.post(DriverApi.uploadDriver, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * download driver
 * @param ids - Driver IDs
 * @returns Promise with download response
 */
export async function downloadDriver(ids: number[] | string[]) {
  return downloadRequestClient.download(DriverApi.downloadDriver, {
    params: { ids },
  });
}
