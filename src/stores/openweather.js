/* 
==============================================
 * [최종 배포용 파일] openweather.js
 * 
 * 💡 파일 역할: 외부 OpenWeather API와의 비동기 HTTP 통신을 전담하고, 프론트엔드 UI 컴포넌트 및 차트 라이브러리에서 사용하기 편리한 형태로 데이터를 정제(Data Mapping)하는 서비스 계층(Service Layer) 모듈.
 * 
 * 📊 주요 상수(Variables & Constants) 정리
 * - API_KEY: 환경변수(.env)에서 안전하게 주입받은 API 인증 키 (소스코드 내 하드코딩 방지 및 보안 강화).
 * - weatherApi: 커스텀 Axios 인스턴스. baseURL과 공통 파라미터(appid, metric 단위, 한국어 언어팩)를 전역 설정하여 API 호출 시 발생하는 중복 코드를 원천 차단함.
 * 
 * 🛠 주요 함수(Functions) & 핵심 로직 정리
 * - fetchWeatherByCity(cityName): 특정 도시의 '현재 날씨' 단건 데이터를 비동기로 요청함. 실패 시 단순 로그에 그치지 않고 호출부(Composable)로 에러를 전파(throw)하여 로딩 상태 종료 및 실패 UI 처리를 위임함.
 * - fetchForecastByCity(cityName): 특정 도시의 '5일/3시간 간격 예보' 데이터를 요청함. 복잡한 원본 응답 배열(list)을 순회하며, 차트 렌더링에 필요한 핵심 지표(시간, 온도 반올림, 강수 확률, 강수량)만 추출해 `mappedList`로 규격화하는 강력한 데이터 정제 로직을 포함함.
============================================== 
*/
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

export const fetchForecastByCity = async (cityName) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: { q: cityName },
    })

    // 추가: 데이터 정제 (Data Mapping)
    // 차트 라이브러리(막대형, 꺾은선형)에 데이터를 바로 밀어 넣을 수 있도록, 복잡한 원본 응답에서 필요한 시계열 지표만 추출하여 규격화합니다.
    const mappedList = response.data.list.map((item) => ({
      time: item.dt_txt,
      temp: Math.round(item.main.temp),
      precipitationProb: Math.round(item.pop * 100),
      // 강수량(rain) 객체가 아예 없거나 '3h' 속성이 없을 경우를 완벽하게 방어하기 위한 옵셔널 체이닝/조건부 처리
      rainVolume: item.rain && item.rain['3h'] ? item.rain['3h'] : 0,

      icon: item.weather[0].icon,
      status: item.weather[0].description,
    }))

    // 기존 UI 컴포넌트가 고장 나지 않도록 원본 객체 구조는 유지하되,
    // 복잡했던 원본 list 배열만 우리가 깔끔하게 가공한 mappedList로 교체(Overriding)해서 던져줍니다.
    return {
      ...response.data,
      list: mappedList,
    }
  } catch (error) {
    console.error(`Failed to fetch forecast for ${cityName}:`, error)
    throw error
  }
}
