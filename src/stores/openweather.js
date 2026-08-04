import axios from 'axios'

// 추가: 환경변수(Environment Variable) 활용 - 보안상 민감한 API Key를 소스코드에 직접 하드코딩하지 않고 런타임 환경변수(.env)로 분리하여 보안 사고를 예방하고 배포 안정성을 높임
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

// 추가: Axios 인스턴스 모듈화 (axios.create) - baseURL과 공통 파라미터(appid, units, lang)를 하나의 전역 인스턴스로 묶어 설정함으로써, 향후 다른 API 엔드포인트(예: 5일치 예보 등)를 추가할 때 중복 코드를 방지하고 유지보수성을 극대화함
export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  },
})

export const fetchWeatherByCity = async (cityName) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: cityName },
    })
    return response.data
  } catch (error) {
    // 추가: 에러 전파 (Error Propagation) - 통신 에러 발생 시 단순 콘솔 로그만 남기는 것에 그치지 않고 error를 다시 던져(throw), 호출부(Composable)에서 로딩 상태(isLoading)를 종료시키거나 사용자에게 실패 UI를 안전하게 띄울 수 있도록 제어권을 넘김
    console.error(`Failed to fetch weather for ${cityName}:`, error)
    throw error
  }
}
