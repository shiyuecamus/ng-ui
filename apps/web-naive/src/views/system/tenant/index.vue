<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick, ref } from 'vue';

import {
  type ExtendedFormApi,
  Page,
  useVbenModal,
  type VbenFormProps,
} from '@vben/common-ui';
import { useMessageHandler } from '@vben/hooks';
import { $t } from '@vben/locales';
import { CommonStatus, EntityType } from '@vben/types';
import { VbenIcon } from '@vben-core/shadcn-ui';

import { NButton, NPopconfirm, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteTenant, fetchTenantPage } from '#/api/core/tenant';

import TenantForm from './form.vue';

const { handleRequest } = useMessageHandler();

const message = useMessage();
const formRef = ref<{ formApi: ExtendedFormApi }>();

interface RowType {
  id: number | string;
  createdAt: string;
  name: string;
  country: string;
  state: string;
  city: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('page.system.tenant.name'),
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
        placeholder: $t('common.placeholder.select'),
      },
      fieldName: 'status',
      label: $t('page.system.tenant.status'),
    },
    {
      component: 'DatePicker',
      fieldName: 'startTime',
      label: $t('page.system.tenant.startTime'),
      componentProps: {
        type: 'datetime',
        clearable: true,
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'endTime',
      label: $t('page.system.tenant.endTime'),
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

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'name', title: $t('common.baseInfo.name') },
    { field: 'contactInfo.country', title: $t('common.contactInfo.country') },
    { field: 'contactInfo.state', title: $t('common.contactInfo.state') },
    { field: 'contactInfo.city', title: $t('common.contactInfo.city') },
    {
      field: 'createdAt',
      formatter: 'formatDateTime',
      title: $t('common.baseInfo.createdAt'),
    },
    { slots: { default: 'action' }, title: $t('common.actions') },
  ],
  exportConfig: {},
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
      query: async ({ page }, formValues) => {
        return await fetchTenantPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    const { formApi } = formRef.value!;
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    nextTick(() => {
      if (isOpen) {
        if (!formRef.value) {
          console.warn('Form ref is not ready yet.');
          return;
        }
        const { formApi } = formRef.value!;
        const { values } = modalApi.getData<Record<string, any>>();
        if (values) {
          formApi.setValues(values);
        }
      }
    });
  },
  title: $t('common.createWithName', { name: $t('page.system.tenant.title') }),
});

const handleDelete = async (row: RowType) => {
  await handleRequest(
    () => deleteTenant(row.id),
    () => {
      message.success(
        $t('common.action.deleteSuccessWithName', { name: row.name }),
      );
    },
    (_: any) => {
      message.error($t('common.action.deleteFailWithName', { name: row.name }));
    },
  );
  await gridApi.query();
};

const handleSubmit = (record: Record<string, any>) => {
  // eslint-disable-next-line no-console
  console.log(record);
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <NButton class="mr-2" type="primary" @click="() => modalApi.open()">
          <span>{{
            `${$t('common.createWithName', { name: $t('page.system.tenant.title') })}`
          }}</span>
        </NButton>
      </template>
      <template #action="{ row }">
        <NPopconfirm @positive-click="handleDelete(row)">
          <template #trigger>
            <NButton circle size="small" tertiary type="error">
              <template #icon>
                <VbenIcon icon="lucide:trash-2" />
              </template>
            </NButton>
          </template>
          {{
            $t('common.action.deleteConfirm', {
              entityType: $t(`entity.${EntityType.TENANT}`),
              name: row.name,
            })
          }}
        </NPopconfirm>
      </template>
    </Grid>
    <Modal>
      <TenantForm ref="formRef" @submit="handleSubmit" />
    </Modal>
  </Page>
</template>
