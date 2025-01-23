<script setup lang="ts">
import { ref, watch } from 'vue';

import { useMessageHandler } from '@vben/hooks';
import { $t } from '@vben/locales';
import { CommonStatus, EntityType } from '@vben/types';

import { NSwitch, useMessage } from 'naive-ui';

import { updateEntityStatus } from '#/api/common/entity';

// Define props for the component
const props = defineProps<{
  entityId: number;
  entityType: EntityType;
  value: CommonStatus;
}>();

// Define emits for the component
const emit = defineEmits<{
  (e: 'update:status', value: CommonStatus): void;
}>();

const { handleRequest } = useMessageHandler();

// Message instance for user feedback
const message = useMessage();

// Local status state
const status = ref(props.value);

// Watch for changes in the status prop
watch(
  () => props.value,
  (newValue) => {
    status.value = newValue;
  },
);

// Handle status change
const handleStatusChange = async (value: boolean) => {
  status.value = value ? CommonStatus.ENABLED : CommonStatus.DISABLED;
  await handleRequest(
    () => updateEntityStatus(props.entityType, props.entityId, status.value),
    async (_) => {
      message.success($t('common.action.changeStatusSuccess'));
      emit('update:status', status.value);
    },
  );
};
</script>

<template>
  <NSwitch
    :value="status === CommonStatus.ENABLED"
    @update:value="handleStatusChange"
  />
</template>
