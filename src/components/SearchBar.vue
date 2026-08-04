<script setup>
import { computed } from 'vue'

const props = defineProps({
  query: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const localQuery = computed({
  get: () => props.query,
  set: (newValue) => emit('update-query', newValue),
})
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      v-model.lazy.trim="localQuery"
      placeholder="검색할 도시 이름 입력"
      class="search-input"
    />
    <p class="search-status">
      검색 중인 도시: <strong>{{ props.query || '없음' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-status {
  margin: 0;
  margin-top: 4px;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
