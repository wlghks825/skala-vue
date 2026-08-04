<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { weatherApi } from '../stores/openweather'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const weatherInfo = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const currentCityId = route.params.cityId

  try {
    const response = await weatherApi.get('/weather', {
      params: { id: currentCityId },
    })

    const data = response.data

    // 화면에 맞게 데이터 매핑
    weatherInfo.value = {
      name: `${data.name}, ${data.sys.country}`,
      temp: data.main.temp,
      status: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      wind: `${data.wind.speed}m/s`,
    }
  } catch (error) {
    console.error('상세 날씨 정보를 불러오는데 실패했습니다:', error)
    weatherInfo.value = null
  } finally {
    isLoading.value = false
  }
})

const displayTemp = computed(() => {
  if (!weatherInfo.value) return ''

  const rawTemp = weatherInfo.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})

const handleGoBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="detail-section">
    <h2>상세 기상관측 정보</h2>

    <div v-if="isLoading" class="loading-state">
      <p>⏳ 상세 정보를 불러오는 중입니다...</p>
    </div>

    <div v-else-if="weatherInfo" class="detail-card">
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
/* 기존 스타일 그대로 유지 */
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
.error-card,
.loading-state {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
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

.error-card p,
.loading-state p {
  color: #4b5563;
  margin-bottom: 20px;
}
</style>
