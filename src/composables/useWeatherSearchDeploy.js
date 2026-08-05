/* 
==============================================
 * [최종 배포용 파일] useWeatherSearchDeploy.js
 * 
 * 💡 컴포넌트 역할: 날씨 데이터 검색, 필터링, API 호출, 즐겨찾기 상태 및 로컬 스토리지 동기화 등 핵심 비즈니스 로직을 캡슐화하여 분리한 Vue Composable(커스텀 훅).
 * 
 * 📊 주요 상태(Variables) 정리
 * - searchQuery (Ref): 사용자가 입력한 도시 검색어 상태.
 * - weatherList (Ref): API를 통해 성공적으로 불러와 정제(Mapping)된 날씨 데이터 원본 배열.
 * - isLoading (Ref): API 통신 중임을 나타내는 로딩 상태 값 (무한 로딩 방지용).
 * - STORAGE_KEY (String): 최근 검색/조회된 도시 리스트를 로컬 스토리지에 저장하기 위한 상수 식별자.
 * - FAVORITE_KEY (String): 즐겨찾기(⭐) 된 도시 리스트를 로컬 스토리지에 저장하기 위한 상수 식별자.
 * - favoriteCities (Ref): 로컬 스토리지와 실시간으로 동기화되어 유지되는 즐겨찾기 도시 배열.
 * - filteredWeatherList (Computed): 검색어(trim 예외처리 적용)에 따라 리스트를 1차 필터링하고, 즐겨찾기 된 도시가 최상단에 오도록 2차 내림차순 정렬을 수행한 최종 렌더링용 배열.
 * 
 * 🛠 주요 함수(Functions) 정리
 * - toggleFavorite(cityName): 특정 도시를 즐겨찾기 배열에 추가/제거하고 로컬 스토리지에 즉시 덮어씌워 영구 저장함.
 * - getSavedCities(): 로컬 스토리지에서 기존 캐싱된 도시 목록을 불러오며, 최초 접속 시 기본 6개 도시 배열을 반환함.
 * - loadWeatherData(cities): 비동기 병렬 처리(Promise.all)를 통해 네트워크 대기 시간을 최소화하며 날씨 데이터를 요청하고, UI 렌더링에 적합한 형태로 데이터를 정제(가상 시계열 데이터 포함)함.
 * - checkTemperatureAlerts(list): 설비 이상 탐지(Anomaly Detection)를 응용한 로직. 기온이 임계치(33도 이상 폭염, -10도 이하 한파)를 초과하면 화면에 즉각적인 경보 알림(ElNotification)을 발생시킴.
============================================== 
*/
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
      // 추가: 데이터 정제 및 시계열 변화량(Mock) 생성
      weatherList.value = results.map((data) => {
        // 기존에 바로 넣던 값을 currentTemp라는 변수로 먼저 빼냅니다.
        const currentTemp = Math.round(data.main.temp)

        // 추가: 시계열 추세 시각화를 위한 가상의 '어제 기온' 생성 (-4도 ~ +4도 사이 랜덤 증감)
        const randomDiff = Math.floor(Math.random() * 9) - 4
        const yesterdayTemp = currentTemp - randomDiff

        return {
          id: data.id,
          name: data.name,
          cityName: data.name,
          temp: currentTemp,
          yesterdayTemp: yesterdayTemp,
          status: data.weather[0].description,
          icon: data.weather[0].icon,
        }
      })
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
    if (searchQuery.value.trim()) {
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
