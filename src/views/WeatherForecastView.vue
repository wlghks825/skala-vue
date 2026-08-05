<!-- 차트를 그려줄 새로운 페이지 파일 -->
<!-- 추가: 시계열 데이터 시각화 뷰 - 외부 API의 5일/3시간 간격 예보 데이터를 전처리하여, 향후 24시간의 기온 변화 트렌드를 직관적인 선 그래프(Line Chart)로 렌더링하는 독립된 분석용 페이지 컴포넌트 -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchForecastByCity } from '@/stores/openweather'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const router = useRouter()
const cityName = ref('Seoul')
const isLoading = ref(true)

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '기온 (°C)',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      data: [],
      tension: 0.3,
    },
  ],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

onMounted(async () => {
  try {
    const data = await fetchForecastByCity(cityName.value)

    // 추가: 데이터 전처리 - 전체 40개(5일치) 데이터 중 향후 24시간(8개) 트렌드만 추출
    const forecastList = data.list.slice(0, 8)

    // X축 데이터 가공 (시간 추출)
    chartData.value.labels = forecastList.map((item) => {
      const date = new Date(item.dt * 1000)
      return `${date.getHours()}시`
    })

    // Y축 데이터 가공 (기온 반올림)
    chartData.value.datasets[0].data = forecastList.map((item) => Math.round(item.main.temp))
  } catch (error) {
    console.error('차트 데이터를 불러오지 못했습니다.', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="practice-section">
    <header class="app-header">
      <h2>📈 시계열 기상 예측 차트</h2>
      <el-button @click="router.push('/')">홈으로 돌아가기</el-button>
    </header>

    <el-card shadow="hover">
      <template #header>
        <strong>{{ cityName }}</strong> 향후 24시간 기온 트렌드
      </template>

      <div v-if="isLoading" class="loading-state">
        <p>⏳ 차트 데이터를 불러오는 중입니다...</p>
      </div>

      <div v-else class="chart-container">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 700px;
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>
