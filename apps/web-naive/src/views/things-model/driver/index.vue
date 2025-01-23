<!-- eslint-disable no-use-before-define -->
<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';
import type { RequestResponse } from '@vben/request';
import type { DriverInfo } from '@vben/types';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { useMessageHandler } from '@vben/hooks';
import { $t } from '@vben/locales';
import {
  CommonStatus,
  DriverExtType,
  DriverExtTypeColor,
  DriverExtTypeTrans,
  DriverType,
  DriverTypeColor,
  DriverTypeTrans,
  EntityType,
} from '@vben/types';
import { downloadFileFromBlob } from '@vben/utils';

import { VbenIcon } from '@vben-core/shadcn-ui';

import { NButton, NPopconfirm, NTag, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteDriver,
  downloadDriver,
  fetchDriverPage,
  uploadDriver,
} from '#/api/things-model/driver';
import EntityStatus from '#/components/entity/entity-status.vue';

const { handleRequest } = useMessageHandler();

const message = useMessage();

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('common.baseInfo.name'),
      componentProps: {
        clearable: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('common.baseInfo.code'),
      componentProps: {
        clearable: true,
      },
    },
    {
      component: 'Select',
      componentProps: {
        clearable: true,
        options: [
          {
            label: $t('common.status.enabled'),
            value: CommonStatus.ENABLED,
          },
          {
            label: $t('common.status.disabled'),
            value: CommonStatus.DISABLED,
          },
        ],
        placeholder: $t('ui.placeholder.select'),
      },
      fieldName: 'status',
      label: $t('common.status.title'),
    },
    {
      component: 'DatePicker',
      fieldName: 'startTime',
      label: $t('common.baseInfo.startTime'),
      componentProps: {
        type: 'datetime',
        clearable: true,
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'endTime',
      label: $t('common.baseInfo.endTime'),
      componentProps: {
        type: 'datetime',
        clearable: true,
      },
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<DriverInfo> = {
  checkboxConfig: {
    highlight: true,
    checkMethod: (params: { row: DriverInfo }) => {
      return params.row.type !== DriverType.BUILTIN;
    },
  },
  columns: [
    { type: 'checkbox', field: 'checkbox', width: 50 },
    {
      field: 'createdAt',
      sortable: true,
      formatter: 'formatDateTime',
      title: $t('common.baseInfo.createdAt'),
      width: 180,
    },
    { field: 'name', sortable: true, title: $t('common.baseInfo.name') },
    { field: 'code', title: $t('common.baseInfo.code') },
    { field: 'desc', title: $t('common.baseInfo.desc') },
    { field: 'size', title: $t('page.thingsModel.driver.size') },
    { field: 'version', title: $t('page.thingsModel.driver.version') },
    {
      field: 'status',
      title: $t('common.status.title'),
      slots: { default: 'status' },
    },
    {
      field: 'type',
      title: $t('page.thingsModel.driver.type'),
      slots: { default: 'type' },
    },
    {
      field: 'extType',
      title: $t('page.thingsModel.driver.extType'),
      slots: { default: 'extType' },
    },
    { slots: { default: 'action' }, title: $t('common.actions') },
  ],
  height: 'auto', // 如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素，否则会出现高度闪动问题
  keepSource: true,
  proxyConfig: {
    autoLoad: true,
    response: {
      result: 'list',
      total: 'total',
      list: 'list',
    },
    ajax: {
      query: ({ page, sort }, formValues) => {
        return fetchDriverPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
          ...formValues,
        });
      },
    },
  },
  importConfig: {
    types: ['so', 'dll', 'dylib'],
    remote: true,
    modes: ['insertTop'],
    importMethod: ({ file }) => {
      return handleRequest(
        () => uploadDriver(file),
        async (_) => {
          message.success($t('common.action.importSuccess'));
          await gridApi.query();
        },
      );
    },
  },
  sortConfig: {
    defaultSort: {
      field: 'createdAt',
      order: 'desc',
    },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    import: true,
    refresh: { code: 'query' },
    zoom: true,
  },
};

const selectedRows = ref<DriverInfo[]>([]);

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    sortChange: async () => {
      await gridApi.query();
    },
    checkboxChange: ({ $table }: { $table: any }) => {
      selectedRows.value = $table.getCheckboxRecords();
    },
    checkboxAll: ({ $table }: { $table: any }) => {
      selectedRows.value = $table.getCheckboxRecords();
    },
  },
});

const handleDelete = async (row: DriverInfo) => {
  await handleRequest(
    () => deleteDriver(row.id),
    async (_) => {
      message.success(
        $t('common.action.deleteSuccessWithName', { name: row.name }),
      );
      await gridApi.query();
    },
  );
};

const handleDownload = async (row: DriverInfo) => {
  await handleRequest(
    () => downloadDriver([row.id as number]),
    async (res) => {
      downloadFromResponse(res);
    },
  );
};

const handleDownloadBatch = async () => {
  await handleRequest(
    () => downloadDriver(selectedRows.value.map((row) => row.id) as number[]),
    async (res) => {
      downloadFromResponse(res);
    },
  );
};

const handleStatusChange = async (_: CommonStatus) => {
  await gridApi.query();
};

const downloadFromResponse = (res: RequestResponse) => {
  const contentDisposition = res.headers['content-disposition'];
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename=([^;]+)/);
    if (filenameMatch && filenameMatch.length === 2) {
      downloadFileFromBlob({
        fileName: filenameMatch[1].trim(),
        source: res.data,
      });
    }
  }
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <NButton
          v-if="selectedRows.length > 0"
          class="mr-2"
          type="primary"
          @click="handleDownloadBatch"
        >
          <span>{{ $t('common.downloadBatch') }}</span>
        </NButton>
      </template>
      <template #type="{ row }">
        <NTag
          :bordered="false"
          :color="DriverTypeColor.get(row.type as DriverType) ?? {}"
        >
          {{ $t(DriverTypeTrans.get(row.type as DriverType) ?? '') }}
        </NTag>
      </template>
      <template #extType="{ row }">
        <NTag
          :bordered="false"
          :color="DriverExtTypeColor.get(row.extType as DriverExtType) ?? {}"
        >
          {{ $t(DriverExtTypeTrans.get(row.extType as DriverExtType) ?? '') }}
        </NTag>
      </template>
      <template #status="{ row }">
        <EntityStatus
          :entity-id="row.id"
          :entity-type="EntityType.DRIVER"
          :value="row.status"
          @update:status="handleStatusChange"
        />
      </template>
      <template #action="{ row }">
        <NButton
          circle
          size="small"
          tertiary
          @click="handleDownload(row)"
          :disabled="row.type === DriverType.BUILTIN"
          class="bg-transparent"
        >
          <template #icon>
            <VbenIcon icon="lucide:download" />
          </template>
        </NButton>
        <NPopconfirm @positive-click="handleDelete(row)">
          <template #trigger>
            <NButton
              :disabled="row.type === DriverType.BUILTIN"
              circle
              size="small"
              tertiary
              type="error"
              class="bg-transparent"
            >
              <template #icon>
                <VbenIcon icon="lucide:trash-2" />
              </template>
            </NButton>
          </template>
          {{
            $t('common.action.deleteConfirm', {
              entityType: $t(`entity.${EntityType.DRIVER.toLowerCase()}`),
              name: row.name,
            })
          }}
        </NPopconfirm>
      </template>
    </Grid>
  </Page>
</template>
