/* 
==============================================
 * [최종 배포용 파일] configStore.js
 * 
 * 💡 파일 역할: Pinia를 활용하여 애플리케이션 전역의 환경 설정(온도 단위 등) 상태를 관리하고, 로컬 스토리지와 실시간으로 동기화하여 상태의 영속성(Persistence)을 유지하는 글로벌 스토어.
 * 
 * 📊 주요 상태(Variables) 정리
 * - unit (Ref): 현재 설정된 온도 단위 상태 ('celsius' 또는 'fahrenheit'). 스토어 초기화 시 로컬 스토리지에 저장된 이전 설정값을 최우선으로 불러와 사용자 경험을 유지함.
 * - unitSymbol (Computed): 현재 unit 상태에 종속되어, 화면에 직접 출력할 수 있는 시각적 기호('℃' 또는 '℉')를 동적으로 반환함.
 * 
 * 🛠 주요 함수(Functions) & 핵심 로직 정리
 * - toggleUnit(): 온도 단위를 섭씨(celsius) ↔ 화씨(fahrenheit)로 상호 전환하는 스토어 액션(Action) 함수.
 * - watch(unit, ...): 상태 변화 자동 동기화 로직. unit 값이 변경될 때마다 이를 즉각 감지하여 수동 호출 없이도 로컬 스토리지('weather-unit')에 상태를 안전하게 덮어씌움.
============================================== 
*/
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
