<template>
  <button
    :class="[
      'rounded-full px-4 py-2 text-sm transition-colors duration-150',
      selected ? 'bg-white border border-stone-800 text-gray-900' : 'bg-gray-200 text-gray-700'
    ]"
    @click="emit('toggle')"
    type="button"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{ label: string; selected?: boolean }>()
  const emit = defineEmits<{
    (e: 'toggle'): void
  }>()
</script>

<style scoped></style>
