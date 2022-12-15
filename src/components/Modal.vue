<script setup lang="ts">
import uesDomCreate from '@/hooks/useDomCreate';

const { title = '标题', visiable = false } = defineProps<{ title: string, visiable: boolean }>()
const emits = defineEmits(['modal-on-close', 'modal-on-confirm'])

uesDomCreate('modal')

const onClose = () => {
  emits('modal-on-close')
}
const onConfirm = () => {
  emits('modal-on-confirm')
}
</script>

<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visiable">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onClose">取消</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">确认</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
