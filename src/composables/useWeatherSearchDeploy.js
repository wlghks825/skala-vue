import { ref, computed } from 'vue'
import { fetchWeatherByCity } from '@/stores/openweather'
import { ElNotification } from 'element-plus'

// 추가: 로직 캡슐화 (Composable 패턴) - 컴포넌트 내부에 혼재되어 있던 상태 관리와 비즈니스 로직(API 통신, 데이터 가공)을 독립된 함수로 분리하여 유지보수성과 재사용성 극대화
export function useWeatherSearchDeploy() {
  const searchQuery = ref('')
  const weatherList = ref([])
  const isLoading = ref(false)

  // 추가: 로컬 스토리지 Key 정의 - 전역 상수화하여 오타로 인한 버그 방지
  const STORAGE_KEY = 'weather_recent_cities'

  // 추가: 즐겨찾기 저장용 Key 추가, 상태관리, 토글
  const FAVORITE_KEY = 'weather_favorite_cities'
  const favoriteCities = ref(JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [])
  const toggleFavorite = (cityName) => {
    if (favoriteCities.value.includes(cityName)) {
      favoriteCities.value = favoriteCities.value.filter((name) => name !== cityName)
    } else {
      favoriteCities.value.push(cityName)
    }
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteCities.value))
  }

  const getSavedCities = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    // 저장된 내역이 있으면 파싱해서 쓰고, 없으면 기본 6개 도시 반환
    return saved ? JSON.parse(saved) : ['Seoul', 'Busan', 'Incheon', 'Jeju', 'Riyadh', 'McMurdo']
  }

  const loadWeatherData = async (cities = getSavedCities()) => {
    isLoading.value = true
    try {
      // 추가: 비동기 병렬 처리 (Promise.all) - 여러 도시의 API 데이터를 순차적으로 기다리지 않고 동시에 요청하여 네트워크 대기 시간을 최소화하고 로딩 성능 최적화
      const promises = cities.map((city) => fetchWeatherByCity(city))
      const results = await Promise.all(promises)

      // 추가: 데이터 정제 (Data Mapping) - 외부 API의 복잡한 원본 응답 데이터를 프론트엔드 UI(WeatherCard)에서 사용하기 편한 규격화된 객체 형태로 가공하여 결합도를 낮춤
      weatherList.value = results.map((data) => ({
        id: data.id,
        name: data.name,
        cityName: data.name,
        temp: Math.round(data.main.temp),
        status: data.weather[0].description,
        icon: data.weather[0].icon,
      }))
      // 추가: 상태 영구 저장 (Local Storage) - API 호출이 성공하여 데이터가 가공된 직후, 브라우저 스토리지에 도시 리스트를 캐싱하여 새로고침 시에도 사용자 컨텍스트를 유지함
      const cityNames = weatherList.value.map((w) => w.cityName)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cityNames))

      checkTemperatureAlerts(weatherList.value)
    } catch (error) {
      console.error('날씨 데이터를 불러오는데 실패했습니다:', error)
    } finally {
      // 추가: 안정적인 상태 제어 (finally) - API 호출 성공/실패 여부와 무관하게 무조건 실행되는 finally 블록을 활용하여 무한 로딩에 빠지는 버그를 원천 차단
      isLoading.value = false
    }
  }

  // 추가: 이상 징후 감지 및 알림 - 설비 모니터링 시스템의 이상 탐지(Anomaly Detection) 로직을 응용하여, 기온 데이터가 특정 임계치(35도 이상, -10도 이하)를 초과할 경우 즉각적인 시각적 피드백(ElNotification)을 제공함
  const checkTemperatureAlerts = (list) => {
    list.forEach((weather) => {
      if (weather.temp >= 33) {
        ElNotification({
          title: '🔥 폭염 경보',
          message: `${weather.cityName}의 기온이 ${weather.temp}도로 매우 높습니다.`,
          type: 'error',
          duration: 4000,
        })
      } else if (weather.temp <= -10) {
        ElNotification({
          title: '❄️ 한파 경보',
          message: `${weather.cityName}의 기온이 ${weather.temp}도로 매우 낮습니다.`,
          type: 'warning',
          duration: 4000,
        })
      }
    })
  }

  const filteredWeatherList = computed(() => {
    // 추가: 방어적 필터링 (trim) - 사용자가 실수로 공백을 입력해도 정상적으로 전체 리스트를 반환하도록 예외 처리

    let list = weatherList.value
    if (!searchQuery.value.trim()) {
      list = list.filter((item) =>
        item.cityName.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    }

    // 추가: 즐겨찾기 정렬 로직 - 원본 데이터 변형(Mutation)을 막기 위해 스프레드 연산자([...list])로 복사본을 만든 후 정렬(sort) 실행.
    return [...list].sort((a, b) => {
      const isAFav = favoriteCities.value.includes(a.cityName) ? 1 : 0
      const isBFav = favoriteCities.value.includes(b.cityName) ? 1 : 0

      // 추가:내림차순 정렬
      return isBFav - isAFav
    })
  })

  return {
    searchQuery,
    weatherList,
    filteredWeatherList,
    isLoading,
    loadWeatherData,
    favoriteCities,
    toggleFavorite,
  }
}
