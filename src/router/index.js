/* 
==============================================
 * [최종 배포용 파일] index.js (Vue Router)
 * 
 * 💡 파일 역할: 애플리케이션의 전체 URL 경로(라우트)를 정의하고, 각 경로에 맞는 Vue 컴포넌트를 연결하여 페이지 이동을 제어하는 핵심 네비게이션 설정 파일.
 * 
 * 📊 주요 라우팅 기법(Routing Features) 정리
 * - Lazy Loading (지연 로딩): `component: () => import(...)` 패턴을 사용하여, 사용자가 해당 메뉴에 접근하는 순간에만 해당 컴포넌트 파일을 다운로드함. 이를 통해 앱의 초기 로딩 성능(FCP)을 극대화함.
 * - Dynamic Routing (동적 라우팅): `/weather/:cityId` 경로를 사용하여, 단일 상세 뷰(WeatherDetailView) 하나만으로 다양한 도시의 데이터를 동적으로 렌더링할 수 있는 확장성을 확보함.
 * - Catch-all Routing (404 예외 처리): `/:pathMatch(.*)*` 정규식을 활용하여, 사용자가 정의되지 않은 잘못된 URL로 접근했을 때 안전하게 에러 페이지(NotFoundView)로 유도함.
 * 
 * 🛠 주요 객체(Objects) 정리
 * - createWebHistory(): HTML5 History API를 활용하여 URL에 '#' 기호가 남지 않는 깔끔하고 SEO(검색엔진 최적화) 친화적인 주소 체계를 생성함.
 * - router: 모든 라우트 정보가 담긴 인스턴스 객체로, 애플리케이션 진입점(main.js)에서 전역 플러그인으로 등록됨.
============================================== 
*/
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/WeatherHomeViewDeploy.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: () => import('../views/WeatherDetailViewDeploy.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
    // 추가: 시계열 분석 라우팅 - 단일 뷰(현재 날씨)에 국한되지 않고, 향후 24시간의 기상 트렌드를 시각화하는 독립된 분석 대시보드 페이지로의 접근 경로를 추가하여 애플리케이션의 확장성을 높임
    {
      path: '/forecast/temp',
      name: 'forecastTemp',
      component: () => import('../views/WeatherForecastView.vue'),
    },
    {
      path: '/forecast/rain',
      name: 'forecastRain',
      component: () => import('../views/WeatherForecastRainView.vue'),
    },
  ],
})

export default router
