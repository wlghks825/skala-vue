<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const selectedCityInfo = ref('')

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const isLoading = ref(false)

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

//추가
watch(searchQuery, () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 500)
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
      <div v-if="isLoading" class="loading-state">
        <p>⏳ 데이터를 불러오는 중입니다...</p>
      </div>
      <ul v-else-if="filteredWeatherList.length > 0">
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
.practice-section {
  max-width: 540px;
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h2 {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #111827;
}

h3 {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 12px;
  color: #374151;
}

.search-area,
.weather-area {
  background-color: #f8f9fa;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

small {
  display: block;
  margin-top: 8px;
  color: #6b7280;
  font-size: 0.85rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

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
    box-shadow 0.2s;
}

.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-color: #d1d5db;
}

.info p {
  margin: 0;
  padding: 0;
}

.city-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px !important;
}

.temp {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 10px !important;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-top: 4px;
}

.badge.hot {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge.cool {
  background-color: #dbeafe;
  color: #1e40af;
}

button {
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #f3f4f6;
}

.loading-state p,
.weather-area > p {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  margin: 0;
}

.status-bar {
  text-align: center;
  padding: 16px;
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 8px;
  margin: 0;
  font-weight: 600;
}
</style>
