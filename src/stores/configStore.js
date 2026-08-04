import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

// 추가: Pinia Setup Store 패턴 적용 - 전통적인 Options API 방식이 아닌 Composition API 스타일로 스토어를 정의하여, 컴포넌트 스크립트와의 문법적 통일성을 맞추고 가독성을 높임
export const useConfigStore = defineStore('config', () => {
  // 추가: 상태 영속성(Persistence) 부여 - 브라우저를 새로고침하거나 종료해도 사용자가 설정한 온도 단위가 초기화되지 않고 그대로 유지되도록 로컬 스토리지에서 안전하게 초기값을 불러옴
  const savedUnit = localStorage.getItem('weather-unit') || 'celsius'
  const unit = ref(savedUnit)

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  // 추가: 반응형 상태 자동 동기화 (watch) - 사용자가 단위를 변경할 때마다 수동으로 저장 로직을 호출할 필요 없이, 상태 변화를 자동으로 감지하여 즉각적으로 로컬 스토리지에 덮어씌워 데이터를 동기화함
  watch(unit, (newValue) => {
    localStorage.setItem('weather-unit', newValue)
  })

  return {
    unit,
    unitSymbol,
    toggleUnit,
  }
})
