<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div style="padding: 20px">
    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
      <!-- 추가: 글로벌 네비게이션 바(GNB) 확장 - 예측 대시보드로 즉시 진입할 수 있는 최상위 메뉴 배치 -->
      <RouterLink to="/forecast">Forecast (예측 차트)</RouterLink>
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
