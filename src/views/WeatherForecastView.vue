<!-- 
==============================================
 * [최종 배포용 파일] WeatherForecastView.vue
 * 
 * 💡 컴포넌트 역할: 외부 API의 5일/3시간 간격 예보 데이터를 전처리하여, 향후 24시간 동안의 기온 변화 트렌드를 선 그래프(Line Chart)로 시각화하는 시계열 분석용 대시보드 컴포넌트.
 * 
 * 📊 주요 상태(Variables) 정리
 * - router: vue-router 인스턴스. 홈 화면으로 복귀하는 네비게이션 제어에 사용됨.
 * - cityName (Ref): 예보 데이터를 조회할 기준 도시 상태 (기본값: 'Seoul').
 * - isLoading (Ref): API 통신 및 데이터 가공이 진행 중임을 나타내는 로딩 상태.
 * - chartData (Ref): vue-chartjs 라이브러리에 주입될 반응형 데이터 객체. X축 라벨(시간)과 Y축 데이터(기온) 배열을 포함함.
 * - chartOptions (Object): 화면 크기 변화에 맞춰 차트가 자연스럽게 리사이징되도록 제어하는 반응형 설정 객체.
 * 
 * 🛠 주요 생명주기(Hooks) & 핵심 로직 정리
 * - onMounted(): 컴포넌트가 렌더링될 때 예보 데이터를 비동기로 불러옴.
 * - 데이터 전처리 로직 (Data Preprocessing): 전체 40개(5일 치)의 원본 배열에서 `.slice(0, 8)`을 사용해 향후 24시간 분량의 데이터만 추출함. 이후 map() 함수를 활용해 X축용 시간 문자열(예: '15시')과 Y축용 기온 데이터를 분리하여 차트 데이터 구조에 맞게 완벽히 매핑함.
============================================== 
-->

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

    chartData.value.labels = forecastList.map((item) => {
      const timeString = item.time
        ? item.time.split(' ')[1].substring(0, 2)
        : new Date(item.dt * 1000).getHours()

      return `${parseInt(timeString, 10)}시`
    })

    chartData.value.datasets[0].data = forecastList.map((item) =>
      item.temp !== undefined ? item.temp : Math.round(item.main.temp),
    )
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
