<!-- 
==============================================
 * [최종 배포용 파일] App.vue
 * 
 * 💡 컴포넌트 역할: 애플리케이션의 최상위 루트(Root) 컴포넌트. 전역 네비게이션 바(GNB)를 제공하고, 현재 URL에 맞는 하위 페이지(View) 컴포넌트들을 렌더링하는 뼈대 역할을 함.
 * 
 * 📊 주요 상태 및 함수
 * - 전역 레이아웃 및 라우팅 렌더링을 담당하는 순수 컨테이너 컴포넌트이므로, 내부에 별도의 스크립트 상태(Variables)나 동작 함수(Functions)는 없습니다.
 * 
 * 🛠 주요 라우팅 요소(Router Features) 정리
 * - <RouterLink>: vue-router에서 제공하는 네비게이션 앵커. 페이지 새로고침 없이(SPA 방식) 부드럽게 URL을 이동시킴. 현재 주소와 일치하는 메뉴에는 `.router-link-exact-active` 클래스가 자동으로 부여되어 시각적 피드백(초록색 텍스트)을 제공함.
 * - <RouterView>: 현재 브라우저 URL 경로(router/index.js 설정 기준)에 매핑된 뷰 컴포넌트(예: WeatherHomeViewDeploy, WeatherForecastView 등)가 실제로 렌더링되어 화면에 표시되는 동적 출력 영역(Outlet).
============================================== 
-->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div style="padding: 20px">
    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
      <!-- 추가: 글로벌 네비게이션 바(GNB) 확장 - 예측 대시보드로 즉시 진입할 수 있는 최상위 메뉴 배치 -->
      <RouterLink to="/forecast/temp">시간별 온도 🌡️</RouterLink> |
      <RouterLink to="/forecast/rain">시간별 강수량 ☔</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e7eb;
}

.nav-bar a {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #6b7280;
}

/* 추가 */
.nav-bar a.router-link-exact-active {
  color: #10b981;
}
</style>
