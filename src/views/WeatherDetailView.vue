<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const weatherInfo = ref(null)

const mockDetails = {
  city_01: {
    name: '대한민국 서울특별시',
    temp: 28,
    status: '맑음',
    humidity: '55%',
    wind: '2.5m/s',
  },
  city_02: {
    name: '경기도 수원시 영통구',
    temp: 24,
    status: '비',
    humidity: '85%',
    wind: '4.1m/s',
  },
  city_03: {
    name: '부산광역시 해운대구',
    temp: 26,
    status: '구름',
    humidity: '65%',
    wind: '5.0m/s',
  },
}

onMounted(() => {
  const currentCityId = route.params.cityId
  weatherInfo.value = mockDetails[currentCityId]
})

const displayTemp = computed(() => {
  if (!weatherInfo.value) return ''

  const rawTemp = weatherInfo.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const handleGoBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="detail-section">
    <h2>상세 기상관측 정보</h2>

    <div v-if="weatherInfo" class="detail-card">
      <h3>{{ weatherInfo.name }}</h3>

      <div class="info-grid">
        <div class="info-item">
          <span class="label">날씨 상태</span>
          <span class="value">{{ weatherInfo.status }}</span>
        </div>
        <div class="info-item">
          <span class="label">현재 온도</span>
          <span class="value">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
        </div>
        <div class="info-item">
          <span class="label">습도</span>
          <span class="value">{{ weatherInfo.humidity }}</span>
        </div>
        <div class="info-item">
          <span class="label">풍속</span>
          <span class="value">{{ weatherInfo.wind }}</span>
        </div>
      </div>

      <button class="back-button" @click="handleGoBack">목록으로 돌아가기</button>
    </div>

    <div v-else class="error-card">
      <p>해당 지역의 날씨 정보를 찾을 수 없습니다.</p>
      <button class="back-button" @click="handleGoBack">목록으로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.detail-section {
  max-width: 540px;
  margin: 40px auto;
  padding: 32px;
  background-color: #f9fafb;
  border-radius: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h2 {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #111827;
  text-align: center;
}

.detail-card,
.error-card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #1f2937;
  font-size: 1.25rem;
  text-align: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.back-button {
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #2563eb;
}

.error-card p {
  text-align: center;
  color: #ef4444;
  margin-bottom: 20px;
}
</style>
