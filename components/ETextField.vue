<template>
  <div>
    <label :for="elementId" class="text-white font-bold block mb-1 text-sm sm:text-base">{{
      props.label
    }}</label>
    <input
      :id="elementId"
      :type="props.type"
      class="w-full box-border bg-transparent border border-solid border-gray-400 rounded text-sm sm:text-base text-white font-bold px-2 py-1"
      :value="props.modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  type?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  label: '',
  type: 'text',
  modelValue: '',
})

const generatedId = ref('')

onMounted(() => {
  generatedId.value = crypto.randomUUID()
})

const elementId = computed(() => {
  return props.id || `field-${generatedId.value}`
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
// 隱藏 number input 的上下箭頭
input[type='number'] {
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
