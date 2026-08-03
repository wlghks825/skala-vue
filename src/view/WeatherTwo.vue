<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const selectedCityInfo = ref('')

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

watch(selectedCityInfo, (newVal) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> ${newVal}`)
})

watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})
</script>

<template>
  <div class="practice-section">
    <h2>과제 2: 날씨 (컴포지션)</h2>

    <div class="search-area">
      <h3>도시 검색</h3>
      <input v-model="searchQuery" placeholder="도시 검색" />
      <small>검색 중인 도시: {{ searchQuery }}</small>
    </div>

    <div class="weather-area">
      <h3>지역별 날씨 현황</h3>
      <ul v-if="filteredWeatherList.length > 0">
        <li v-for="weather in filteredWeatherList" :key="weather.id" class="weather-card">
          <div class="info">
            <p class="city-name">{{ weather.name }} ({{ weather.status }})</p>
            <p class="temp">현재 기온: {{ weather.temp }}℃</p>

            <span v-if="weather.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
            <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
          </div>

          <button @click="selectedCityInfo = `${weather.name}이(가) 선택되었습니다.`">
            상세보기
          </button>
        </li>
      </ul>
      <p v-else>검색 결과가 일치하는 도시가 없습니다.</p>
    </div>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>

<style scoped>
.info p {
  margin: 0 0 6px 0;
  background-color: transparent;
  padding: 0;
}

.badge {
  display: inline-block;
  font-size: 0.85em;
  padding: 4px 8px;
  border-radius: 12px;
  margin-top: 4px;
}
.badge.hot {
  background-color: #ffeded;
  color: #ff4d4f;
}
.badge.cool {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-bar {
  text-align: center;
  padding: 15px;
  background-color: #e1f3d8;
  color: #529b2e;
  border-radius: 4px;
  margin: 0;
  margin-top: 20px;
}
</style>
