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
    <!-- 추가: UI 프레임워크(Element Plus) 도입 - 
     기본 <input> 태그를 <el-input> 컴포넌트로 교체하여 크로스 브라우징 환경에서 균일한 디자인을 보장하고,
      clearable(원클릭 초기화 버튼) 속성을 추가-->
    <el-input
      v-model.lazy.trim="localQuery"
      placeholder="검색할 도시 이름 입력"
      clearable
      size="large"
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

/* 추가: CSS 다이어트 - Element Plus 컴포넌트가 자체적인 스타일링을 제공 */

.search-status {
  margin: 0;
  margin-top: 4px;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
