<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../stores/configStore'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()

// 추가: 전역 상태 기반 반응형 데이터 가공 (computed) - Store의 단위(unit) 상태를 실시간으로 구독하여 원본 데이터를 훼손하지 않고 화면 출력용 온도만 동적으로 변환
const displayTemp = computed(() => {
  const rawTemp = props.weather.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const onCardClick = () => {
  emit('select-card', props.weather.name)
}
const onDetailClick = () => {
  emit('click-detail', props.weather.name, props.weather.status)
}
</script>

<template>
  <li class="weather-card" @click="onCardClick">
    <div class="info">
      <h4
        :class="{
          'text-red': props.weather.status === '맑음',
          'text-blue': props.weather.status === '비',
          'text-gray': props.weather.status === '구름',
        }"
      >
        {{ props.weather.name }} ({{ props.weather.status }})
      </h4>
      <p class="temp">현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

      <!-- 추가: 원본 데이터 기반의 다중 조건부 렌더링 - 화면에 출력되는 변환 온도(displayTemp)가 아닌 절대적인 원본 섭씨 데이터(props.weather.temp)를 기준으로 조건을 평가하여, 사용자가 단위를 화씨로 변경하더라도 뱃지 로직이 무너지지 않도록 견고하게 설계 -->
      <span v-if="props.weather.temp >= 33" class="badge hot">🔥 폭염</span>
      <span v-else-if="props.weather.temp >= 25" class="badge hot">🥵 더움</span>
      <span v-else-if="props.weather.temp >= 15" class="badge normal">⛅ 보통</span>
      <span v-else-if="props.weather.temp >= 5" class="badge cool">🍃 선선함</span>
      <span v-else-if="props.weather.temp > -10" class="badge cold">❄️ 추움</span>
      <span v-else class="badge extreme">🥶 한파</span>
    </div>

    <!-- 추가: Fallback Content가 포함된 Action Slot - 부모 컴포넌트가 커스텀 버튼을 주입하지 않으면 기본 '상세보기' 버튼이 렌더링되고, 주입하면 부모의 버튼으로 대체되는 유연한 확장성 제공 -->
    <slot name="action">
      <!-- 추가: 이벤트 수식어(.stop)를 활용한 버블링 차단 - 버튼 클릭 시 부모 컨테이너(li)의 @click 이벤트까지 같이 터지는 현상을 완벽하게 방지 -->
      <!-- 추가: UI 라이브러리 활용 및 이벤트 버블링 차단 - 대시보드 표준 스타일에 맞추어 <el-button>을 적용하고, .stop 수식어를 유지하여 버튼 클릭 시 부모 컨테이너(li)의 이벤트가 의도치 않게 트리거되는 현상을 완벽히 방지함 -->
      <el-button type="primary" class="detail-btn" @click.stop="onDetailClick">상세보기</el-button>
    </slot>
  </li>
</template>

<style scoped>
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  cursor: pointer;
}

.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: #3b82f6;
}

.info h4 {
  margin-top: 0;
  margin-bottom: 6px;
  font-size: 1.1rem;
}

.text-red {
  color: #ef4444;
}
.text-blue {
  color: #3b82f6;
}
.text-gray {
  color: #6b7280;
}

.info p {
  margin: 0;
  padding: 0;
}

.temp {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 8px !important;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  margin-top: 4px;
}

.badge.hot {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge.normal {
  background-color: #f3f4f6;
  color: #374151;
}

.badge.cool {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge.cold {
  background-color: #e0f2fe;
  color: #0284c7;
}

.badge.extreme {
  background-color: #1e3a8a;
  color: #ffffff;
  font-weight: bold;
}

.detail-btn {
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4b5563;
  background-color: #f3f4f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.detail-btn:hover {
  background-color: #e5e7eb;
  color: #111827;
}
</style>
