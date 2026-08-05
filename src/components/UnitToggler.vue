<!-- 
==============================================
 * [최종 배포용 파일] UnitToggler.vue
 * 
 * 💡 컴포넌트 역할: 전역 스토어(Pinia)와 연결되어 애플리케이션 전체의 온도 단위(섭씨/화씨)를 표시하고 변경하는 토글 버튼 UI.
 * 
 * 📊 주요 상태(Variables) 정리
 * - configStore: Pinia의 configStore 인스턴스. 앱 전역의 환경 설정 상태를 관리함.
 * - configStore.unit: 현재 설정된 온도 단위 값 ('celsius' 또는 'fahrenheit').
 * - configStore.unitSymbol: 현재 온도 단위에 맞는 기호 표시 ('℃' 또는 '℉').
 * 
 * 🛠 주요 함수(Functions) 정리
 * - configStore.toggleUnit(): '단위변경' 버튼 클릭 시 호출되는 액션(Action) 함수. 전역 스토어의 온도 단위를 섭씨 ↔ 화씨로 즉시 전환함.
============================================== 
-->
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
