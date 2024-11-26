<script lang="ts" setup>
import { $t, useI18n } from '@vben/locales';

import { NDynamicInput } from 'naive-ui';

import { useVbenForm, z } from '#/adapter/form';
import { contactSchema } from '#/shared/schema/form';

defineOptions({ name: 'TenantForm' });

const emit = defineEmits<{
  submit: [Record<string, any>];
}>();

const { locale } = useI18n();

// 初始化表单
const [Form, formApi] = useVbenForm({
  handleSubmit: (record: Record<string, any>) => emit('submit', record),
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('ui.placeholder.inputWithName', {
          name: $t('page.system.tenant.name'),
        }),
      },
      fieldName: 'name',
      label: $t('page.system.tenant.name'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'domain',
      label: $t('page.system.tenant.domain'),
      componentProps: {
        max: 5,
      },
      rules: z
        .array(
          z
            .string()
            .regex(
              /^(?:(?:[a-z0-9-]+\.)+[a-z]{2,}|(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?)$/i,
              $t('errors.invalidDomainOrAddress'),
            ),
        )
        .nonempty({
          message: $t('errors.cannotBeEmptyWithName', {
            name: $t('page.system.tenant.domain'),
          }),
        }),
    },
    ...contactSchema(locale.value),
  ],
  showDefaultActions: false,
});
// 导出 formApi
defineExpose({
  formApi,
});
</script>

<template>
  <Form>
    <template #domain="slotProps">
      <NDynamicInput v-bind="slotProps" />
    </template>
  </Form>
</template>

<style scoped></style>
