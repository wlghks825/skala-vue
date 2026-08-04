<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'

import { useWeatherSearch } from '../composables/useWeatherSearch'
const { searchQuery, filteredWeatherList } = useWeatherSearch()

const router = useRouter()
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

const handleClickDetail = (id) => {
  router.push(`/weather/${id}`)
}

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSelectCard = (cityName) => {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

watch(
  searchQuery,
  (newValue) => {
    if (newValue === '') {
      statusMessage.value = '카드를 클릭하거나 검색해 보세요.'
    } else {
      statusMessage.value = `'${newValue}'(으)로 검색 중입니다...`
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="practice-section">
    <h2>과제 4: 라우터적용</h2>

    <BaseDashboardCard>
      <template #header>도시 검색</template>
      <search-bar :query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <template #header>지역별 날씨 현황</template>

      <ul v-if="filteredWeatherList.length > 0">
        <weather-card
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          v-memo="[weather.temp, weather.status]"
          @select-card="handleSelectCard"
        >
          <template #action>
            <button class="route-btn" @click.stop="handleClickDetail(weather.id)">
              상세 페이지로 이동
            </button>
          </template>
        </weather-card>
      </ul>

      <div v-else class="empty-state">
        <p>해당 도시의 날씨 정보가 없습니다.</p>
      </div>

      <template #footer>검색된 도시 수: {{ filteredWeatherList.length }}개</template>
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

h2 {
  margin-top: 0;
  margin-bottom: 24px;
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

.empty-state p {
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

.route-btn {
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.route-btn:hover {
  background-color: #2563eb;
}
</style>
