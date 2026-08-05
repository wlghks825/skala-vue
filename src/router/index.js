import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeViewDeploy.vue'
import WeatherDetailView from '../views/WeatherDetailViewDeploy.vue'
import NotFoundView from '../views/NotFoundView.vue'
import WeatherForecastView from '../views/WeatherForecastView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WeatherHomeView,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: WeatherDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
    // 추가: 시계열 분석 라우팅 - 단일 뷰(현재 날씨)에 국한되지 않고, 향후 24시간의 기상 트렌드를 시각화하는 독립된 분석 대시보드 페이지로의 접근 경로를 추가하여 애플리케이션의 확장성을 높임
    {
      path: '/forecast',
      name: 'forecast',
      component: WeatherForecastView,
    },
  ],
})

export default router
