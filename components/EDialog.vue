<template>
  <dialog
    ref="dialogRef"
    class="w-[310px] sm:w-[400px] p-4 rounded-lg shadow-2xl bg-dark border border-gray-400 text-white backdrop:bg-black/60"
  >
    <div class="p-4">
      <h3 class="text-lg font-semibold my-0">{{ dialogData.title }}</h3>
      <p v-html="dialogData.message" class="text-gray-300 mb-6"></p>
      <slot />
      <div class="flex justify-end gap-3">
        <EBtn
          v-if="dialogData.onConfirm"
          class="px-3 py-2"
          color="error"
          :text="$t('Cancel')"
          @click="handleCancel"
        />
        <EBtn class="px-3 py-2" color="success" :text="$t('Confirm')" @click="handleConfirm" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose } from 'vue'

type Handler = () => void

interface DialogState {
  title: string
  message: string
  onConfirm?: Handler
  onCancel?: Handler
}

const dialogRef = ref<HTMLDialogElement | null>(null)
const dialogData = reactive<DialogState>({
  title: '',
  message: '',
})

const show = (title: string, message: string, onConfirm?: Handler, onCancel?: Handler) => {
  dialogData.title = title
  dialogData.message = message
  dialogData.onConfirm = onConfirm
  dialogData.onCancel = onCancel

  if (dialogRef.value) {
    dialogRef.value.showModal()
  }
}

const close = () => {
  if (dialogRef.value) {
    dialogRef.value.close()
  }
}

const handleConfirm = () => {
  close()
  dialogData.onConfirm?.()
  dialogData.onConfirm = undefined
  dialogData.onCancel = undefined
}

const handleCancel = () => {
  close()
  dialogData.onCancel?.()
  dialogData.onConfirm = undefined
  dialogData.onCancel = undefined
}

defineExpose({
  show,
  close,
})
</script>
