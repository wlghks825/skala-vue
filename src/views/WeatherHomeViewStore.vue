<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import UnitToggler from '../components/UnitToggler.vue'

import { useWeatherSearch } from '../composables/useWeatherSearch.js'
const { searchQuery, filteredWeatherList } = useWeatherSearch()

const router = useRouter()
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

// 기능복구
const isLoading = ref(false)

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSelectCard = (cityName) => {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

const handleClickDetail = (id) => {
  router.push(`/weather/${id}`)
}

watch(
  searchQuery,
  (newValue) => {
    // 기능복구
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 500)

    if (newValue === '') {
      statusMessage.value = '카드를 클릭하거나 검색해 보세요.'
    } else {
      statusMessage.value = `'${newValue}'(으)로 검색 중입니다...`
    }
  },
  { immediate: true },
)

// 기능복구
watch(statusMessage, (newVal) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> ${newVal}`)
})

// 기능복구
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})
</script>

<template>
  <div class="practice-section">
    <header class="app-header">
      <h2>⛅ 종합실습 5: 스토어적용</h2>
      <UnitToggler />
    </header>

    <BaseDashboardCard>
      <template #header> 도시 검색 </template>
      <search-bar :query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <template #header> 지역별 날씨 현황 </template>

      <div v-if="isLoading" class="loading-state">
        <p>⏳ 데이터를 불러오는 중입니다...</p>
      </div>

      <ul v-else-if="filteredWeatherList.length > 0">
        <weather-card
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          v-memo="[weather.temp, weather.status]"
          @select-card="handleSelectCard"
        >
          <template #action>
            <button class="custom-detail-btn" @click.stop="handleClickDetail(weather.id)">
              상세보기 🔍
            </button>
          </template>
        </weather-card>
      </ul>

      <div v-else class="empty-state">
        <p>해당 도시의 날씨 정보가 없습니다.</p>
      </div>

      <template #footer> 검색된 도시 수: {{ filteredWeatherList.length }}개 </template>
    </BaseDashboardCard>

    <p class="status-bar">{{ statusMessage }}</p>
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

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.app-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.loading-state p,
.empty-state p {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  margin: 0;
}

.loading-state p {
  color: #3b82f6;
  font-weight: 600;
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

.custom-detail-btn {
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

.custom-detail-btn:hover {
  background-color: #f3f4f6;
}
</style>
