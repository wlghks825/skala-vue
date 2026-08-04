<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="about-section">
    <h2>서비스 소개</h2>

    <div class="content-card">
      <h3>Vue Router 실습 대시보드</h3>
      <p>
        이 웹 애플리케이션은 Vue Router의 핵심 기능인 <strong>지연 로딩(Lazy Loading)</strong>과
        <strong>동적 경로 매칭(Dynamic Routing)</strong>을 실습하기 위해 제작된 UI 프로토타입입니다.
      </p>
      <p>
        향후 백엔드에서 대규모 시계열 센서 데이터를 실시간으로 연동하여, 설비의 상태를 모니터링하고
        이상 징후를 판별하는 통합 대시보드로 확장할 수 있는 기반 구조를 갖추고 있습니다.
      </p>

      <button class="home-button" @click="handleGoHome">메인 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.about-section {
  max-width: 540px;
  margin: 40px auto;
  padding: 32px;
  background-color: #f9fafb;
  border-radius: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h2 {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #111827;
  text-align: center;
}

.content-card {
  background-color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #374151;
  font-size: 1.2rem;
}

p {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 16px;
  word-break: keep-all;
}

.home-button {
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-button:hover {
  background-color: #059669;
}
</style>
