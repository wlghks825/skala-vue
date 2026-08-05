<!-- 
==============================================
 * [최종 배포용 파일] WeatherCard.vue
 * 
 * 💡 컴포넌트 역할: 개별 도시의 날씨 정보(온도, 상태, 전일 대비 증감)를 시각적인 카드 형태로 렌더링하고, 사용자 상호작용(클릭, 즐겨찾기)을 처리하는 재사용 가능한 UI 모듈.
 * 
 * 📊 주요 상태(Props & Variables) 정리
 * - props.weather (Object): 부모로부터 전달받은 단일 도시의 날씨 데이터 객체 (이름, 온도, 상태, 어제 온도 등 포함).
 * - props.isFavorite (Boolean): 현재 도시가 즐겨찾기로 등록되어 있는지 여부.
 * - configStore: 전역 설정 스토어(온도 단위 등).
 * - displayTemp (Computed): Store의 단위(celsius/fahrenheit) 상태를 실시간으로 구독하여, 원본 데이터를 훼손하지 않고 화면 출력용 온도로 동적 변환한 값.
 * - tempTrend (Computed): 원본 섭씨 데이터를 기준으로 어제와의 온도 차이를 계산하여 상승/하락 폭과 그에 맞는 CSS 클래스(색상)를 반환하는 객체.
 * 
 * 🛠 주요 이벤트(Emits & Functions) 정리
 * - onCardClick(): 카드 영역 전체 클릭 시 'select-card' 이벤트를 부모로 발생시켜 도시 이름을 전달함.
 * - onDetailClick(): 상세보기 버튼 클릭 시 'click-detail' 이벤트를 발생시키며, 부모 요소를 클릭한 것으로 간주되지 않도록 이벤트 버블링(.stop)을 차단함.
 * - $emit('toggle-fav'): 별(⭐) 아이콘 클릭 시 해당 도시를 즐겨찾기에 추가/제거해 달라고 부모에게 요청함 (역시 버블링 차단 적용).
============================================== 
-->
<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../stores/configStore'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

// 추가: 부모에게 별 클릭 이벤트를 알리기 위한 emit 정의
const emit = defineEmits(['select-card', 'click-detail', 'toggle-fav'])
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

// 추가: 시계열 데이터 증감 계산
const tempTrend = computed(() => {
  if (props.weather.yesterdayTemp === undefined) return null

  const diff = props.weather.temp - props.weather.yesterdayTemp

  if (diff > 0) {
    return { text: `▲ +${diff}`, class: 'text-red' } // 상승: 빨간색
  } else if (diff < 0) {
    return { text: `▼ ${diff}`, class: 'text-blue' } // 하락: 파란색 (- 기호는 diff 자체에 포함됨)
  } else {
    return { text: `- 0`, class: 'text-gray' } // 동일: 회색
  }
})
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
        style="display: flex; align-items: center; justify-content: space-between"
      >
        <span>{{ props.weather.name }} ({{ props.weather.status }})</span>

        <!-- 추가: ⭐ 즐겨찾기 토글 버튼, 부모 컴포넌트(WeatherHomeViewDeploy)로 이벤트를 쏘아 올림 -->
        <span
          style="cursor: pointer; font-size: 1.2rem"
          @click.stop="$emit('toggle-fav', props.weather.cityName)"
        >
          <!-- props로 즐겨찾기 여부를 받아서 빈 별/채워진 별 표시 -->
          {{ props.isFavorite ? '⭐' : '☆' }}
        </span>
      </h4>
      <p class="temp">현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

      <!-- 추가: 변화 추세 뱃지 렌더링 -->
      <span
        v-if="tempTrend"
        :class="tempTrend.class"
        style="
          margin-left: 10px;
          font-size: 0.9em;
          font-weight: bold;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
        "
      >
        어제보다 {{ tempTrend.text }}{{ configStore.unitSymbol }}
      </span>

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
