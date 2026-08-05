<!-- 
==============================================
 * [최종 배포용 파일] WeatherForecastRainView.vue
 * 
 * 💡 컴포넌트 역할: 외부 API의 5일/3시간 간격 예보 데이터를 활용하여, 향후 24시간 동안의 시간별 강수량(Precipitation) 트렌드를 막대 그래프(Bar Chart)로 시각화하는 분석용 대시보드 컴포넌트.
 * 
 * 📊 주요 상태(Variables) 정리
 * - router: vue-router 인스턴스. 홈 화면으로 복귀하는 네비게이션 제어에 사용됨.
 * - cityName (Ref): 예보 데이터를 조회할 기준 도시 상태 (기본값: 'Seoul').
 * - isLoading (Ref): API 통신 및 데이터 가공이 진행 중임을 나타내는 로딩 상태.
 * - chartData (Ref): vue-chartjs 라이브러리의 Bar 차트에 주입될 반응형 데이터 객체. X축 라벨(시간)과 Y축 데이터(강수량) 배열을 포함함.
 * - chartOptions (Object): 화면 크기 변화에 맞춰 차트가 자연스럽게 리사이징되도록 제어하는 반응형 설정 객체.
 * 
 * 🛠 주요 생명주기(Hooks) & 핵심 로직 정리
 * - onMounted(): 컴포넌트가 렌더링될 때 예보 데이터를 비동기로 불러옴.
 * - 데이터 전처리 로직 (Data Preprocessing): 전체 40개(5일 치) 데이터 중 `.slice(0, 8)`을 통해 향후 24시간 분량만 추출함. 서비스 계층(openweather.js)에서 안전하게 정제해 둔 `rainVolume` 속성을 Y축 데이터로 매핑하여 렌더링의 안정성을 확보함.
============================================== 
-->
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
