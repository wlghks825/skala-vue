import { ref, computed } from 'vue'
import { fetchWeatherByCity } from '@/stores/openweather'

// 추가: 로직 캡슐화 (Composable 패턴) - 컴포넌트 내부에 혼재되어 있던 상태 관리와 비즈니스 로직(API 통신, 데이터 가공)을 독립된 함수로 분리하여 유지보수성과 재사용성 극대화
export function useWeatherSearchDeploy() {
  const searchQuery = ref('')
  const weatherList = ref([])
  const isLoading = ref(false)

  const loadWeatherData = async (cities = ['Seoul', 'Busan', 'Incheon', 'Jeju']) => {
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
    } catch (error) {
      console.error('날씨 데이터를 불러오는데 실패했습니다:', error)
    } finally {
      // 추가: 안정적인 상태 제어 (finally) - API 호출 성공/실패 여부와 무관하게 무조건 실행되는 finally 블록을 활용하여 무한 로딩에 빠지는 버그를 원천 차단
      isLoading.value = false
    }
  }

  const filteredWeatherList = computed(() => {
    // 추가: 방어적 필터링 (trim) - 사용자가 실수로 공백을 입력해도 정상적으로 전체 리스트를 반환하도록 예외 처리
    if (!searchQuery.value.trim()) return weatherList.value

    // 추가: 검색 UX 강화 (toLowerCase) - 영문 도시명 검색 시 대소문자를 엄격하게 구분하지 않고 일치하는 항목을 찾아주어 사용자 편의성 향상
    return weatherList.value.filter((item) =>
      item.cityName.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  return {
    searchQuery,
    weatherList,
    filteredWeatherList,
    isLoading,
    loadWeatherData,
  }
}
