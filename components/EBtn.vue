<template>
  <button
    :class="`e-btn e-btn-${props.color}`"
    class="rounded cursor-pointer border-none font-bold"
  >
    {{ props.text || 'slot' }}
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  text: '',
})
</script>

<style scoped lang="scss">
.e-btn {
  // success 綠
  &-success {
    background-color: #0d871c;
    color: white;
    &:hover,
    :active {
      background-color: #086613;
    }
  }

  // error 紅
  &-error {
    background-color: #b21c1c;
    color: white;
    &:hover,
    :active {
      background-color: #7d1414;
    }
  }

  // warn 黃
  &-warn {
    background-color: #fdc038;
    color: black;
    &:hover,
    :active {
      background-color: #e6b22d;
    }
  }
}
</style>
