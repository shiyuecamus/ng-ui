import type { CommonStatus } from '@vben/types';

import { EntityType } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace EntityApi {
  export const base = '/entity';
  export const toggleStatus = (
    entityType: EntityType,
    entityId: number | string,
  ) => `${base}/status/${entityType}/${entityId}`;
}

export async function updateEntityStatus(
  entityType: EntityType,
  entityId: number | string,
  status: CommonStatus,
) {
  return requestClient.put(
    EntityApi.toggleStatus(entityType, entityId),
    undefined,
    {
      params: { status },
    },
  );
}
