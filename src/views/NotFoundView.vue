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
