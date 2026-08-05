<!-- 
==============================================
 * [최종 배포용 파일] NotFoundView.vue
 * 
 * 💡 컴포넌트 역할: 사용자가 존재하지 않는 잘못된 URL 경로로 접근했을 때(Catch-all 라우팅) 표시되는 404 에러 안내 페이지(Fallback UI).
 * 
 * 📊 주요 상태(Variables) 정리
 * - router: vue-router의 useRouter() 인스턴스. 페이지 이동(Navigation)을 프로그래밍 방식으로 제어하기 위해 사용함.
 * 
 * 🛠 주요 함수(Functions) 정리
 * - handleGoHome(): '메인 대시보드로 돌아가기' 버튼 클릭 시 호출되며, router.push('/')를 통해 사용자를 안전하게 최상위 루트(홈 화면)로 복귀시킴.
============================================== 
-->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-section">
    <h2>404 - 페이지를 찾을 수 없습니다</h2>

    <div class="error-card">
      <p>요청하신 페이지의 주소가 잘못되었거나, 삭제되어 접근할 수 없습니다.</p>
      <button class="home-button" @click="handleGoHome">메인 대시보드로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-section {
  max-width: 540px;
  margin: 40px auto;
  padding: 32px;
  background-color: #f9fafb;
  border-radius: 16px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h2 {
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #111827;
}

.error-card {
  background-color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

p {
  color: #4b5563;
  margin-bottom: 24px;
  line-height: 1.6;
  word-break: keep-all;
}

.home-button {
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-button:hover {
  background-color: #2563eb;
}
</style>
