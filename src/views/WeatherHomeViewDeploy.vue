<script setup>
import { ref, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import UnitToggler from '../components/UnitToggler.vue'

// 추가: 로직 분리 (Composable 패턴) 적용 - 데이터 검색 및 필터링, API 통신 등의 비즈니스 로직을 컴포넌트 뷰(UI)와 완벽히 분리하여 코드 가독성과 재사용성을 높임
import { useWeatherSearchDeploy } from '../composables/useWeatherSearchDeploy.js'

const {
  searchQuery,
  filteredWeatherList,
  isLoading,
  loadWeatherData,
  favoriteCities,
  toggleFavorite,
} = useWeatherSearchDeploy()

const router = useRouter()
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSelectCard = (cityName) => {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

const handleClickDetail = (id) => {
  router.push(`/weather/${id}`)
}

onMounted(() => {
  loadWeatherData()
})

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

// 추가: 디버깅 로직 (watch) - 상태 바 문구 등 반응형 변수의 변화를 감지하여 콘솔에 추적 로그를 남기는 실무형 디버깅 패턴 적용
watch(statusMessage, (newVal) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> ${newVal}`)
})

// 추가: 디버깅 로직 (watchEffect) - 검색어 입력 시 관련 의존성을 자동으로 추적하여 상태를 모니터링
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})
</script>

<template>
  <div class="practice-section">
    <header class="app-header">
      <h2>⛅ 종합실습</h2>
      <UnitToggler />
    </header>

    <BaseDashboardCard>
      <!-- 추가: Named Slot 적용 - BaseDashboardCard 내부의 특정 위치(#header)에 부모의 콘텐츠를 유연하게 주입 -->
      <template #header> 도시 검색 </template>
      <search-bar :query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <!-- 추가: Named Slot 적용 -->
      <template #header> 지역별 날씨 현황 </template>

      <div v-if="isLoading" class="loading-state">
        <p>⏳ 데이터를 불러오는 중입니다...</p>
      </div>

      <ul v-else-if="filteredWeatherList.length > 0">
        <!-- 추가: 렌더링 최적화 (v-memo) - 온도와 상태 값이 변경되지 않은 카드는 불필요하게 리렌더링하지 않도록 성능 최적화 -->
        <weather-card
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          :isFavorite="favoriteCities.includes(weather.cityName)"
          v-memo="[weather.temp, weather.status, favoriteCities.includes(weather.cityName)]"
          @select-card="handleSelectCard"
          @toggle-fav="toggleFavorite"
        >
          <!-- 추가: Action Slot 적용 - WeatherCard 내부에 슬롯을 뚫어 상세 보기 버튼의 디자인과 클릭 이벤트(Router 이동)를 부모 컴포넌트가 제어하도록 확장성 부여 -->
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

      <!-- 추가: Named Slot 적용 -->
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
