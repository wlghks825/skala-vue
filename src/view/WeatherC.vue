<script setup>
import { ref, computed, watch } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])
const searchQuery = ref('')
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSelectCard = (cityName) => {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

const handleClickDetail = (cityName, status) => {
  alert(`${cityName}의 현재 날씨는 ${status}입니다.`)
}

//추가
watch(searchQuery, (newValue) => {
  if (newValue === '') {
    statusMessage.value = '카드를 클릭하거나 검색해 보세요.'
  } else {
    statusMessage.value = `'${newValue}'(으)로 검색 중입니다...`
  }
})
</script>

<template>
  <div class="practice-section">
    <h2>과제 3: 날씨 (컴포넌트)</h2>
    <BaseDashboardCard>
      <search-bar :query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>지역별 날씨 현황</h3>
      <ul v-if="filteredWeatherList.length > 0">
        <weather-card
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />
      </ul>

      <!-- 추가 -->
      <div v-else class="empty-state">
        <p>해당 도시의 날씨 정보가 없습니다.</p>
      </div>
    </BaseDashboardCard>
    <p class="status-bar">{{ statusMessage }}</p>
  </div>
</template>
