<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchForecastByCity } from '@/stores/openweather'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const router = useRouter()
const cityName = ref('Seoul')
const isLoading = ref(true)

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '강수량 (mm)',
      backgroundColor: '#0ea5e9',
      borderColor: '#0ea5e9',
      data: [],
      borderRadius: 4,
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

    const forecastList = data.list.slice(0, 8)

    chartData.value.labels = forecastList.map((item) => {
      // openweather.js에서 가공한 time 문자열 혹은 dt 타임스탬프 활용
      const date = new Date(item.time || item.dt * 1000)
      return `${date.getHours()}시`
    })

    chartData.value.datasets[0].data = forecastList.map((item) => item.rainVolume)
  } catch (error) {
    console.error('강수량 차트 데이터를 불러오지 못했습니다.', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="practice-section">
    <header class="app-header">
      <h2>☔ 시간별 강수량 관제 차트</h2>
      <el-button @click="router.push('/')">홈으로 돌아가기</el-button>
    </header>

    <el-card shadow="hover">
      <template #header>
        <strong>{{ cityName }}</strong> 향후 24시간 강수량 트렌드
      </template>

      <div v-if="isLoading" class="loading-state">
        <p>⏳ 강수량 차트 데이터를 불러오는 중입니다...</p>
      </div>

      <div v-else class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
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
