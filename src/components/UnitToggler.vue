<script setup>
import { useConfigStore } from '../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-text">
      날씨단위: {{ configStore.unit === 'celsius' ? '섭씨' : '화씨' }}({{ configStore.unitSymbol }})
    </span>
    <button class="toggle-btn" @click="configStore.toggleUnit">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 12px;
}

.unit-text {
  font-size: 0.9rem;
  color: #4b5563;
  font-weight: 500;
}

.toggle-btn {
  padding: 6px 12px;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: #1f2937;
}
</style>
