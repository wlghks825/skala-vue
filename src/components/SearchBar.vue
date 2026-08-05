<!-- 
==============================================
 * [최종 배포용 파일] SearchBar.vue
 * 
 * 💡 컴포넌트 역할: 사용자의 텍스트 입력을 받아 검색어를 부모 컴포넌트로 전달하는 검색창 UI.
 * 
 * 📊 주요 상태(Props & Variables) 정리
 * - props.query (String): 부모 컴포넌트(대시보드)로부터 주입받은 현재 검색어 상태 값.
 * - localQuery (Computed): <el-input>과 안전하게 양방향 바인딩(v-model)을 하기 위한 계산된 속성. 값을 읽을 때는 props.query를 반환하고, 값이 입력(수정)될 때는 setter를 통해 이벤트를 발생시킴.
 * 
 * 🛠 주요 이벤트(Emits & Functions) 정리
 * - emit('update-query', newValue): 사용자가 새로운 텍스트를 입력하거나 지웠을 때, 부모 컴포넌트에게 새로운 검색어(newValue) 상태로 업데이트해 달라고 요청하는 커스텀 이벤트.
============================================== 
-->
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
