<!-- 
==============================================
 * [최종 배포용 파일] WeatherAboutView.vue
 * 
 * 💡 컴포넌트 역할: 애플리케이션의 핵심 기능과 아키텍처 설계 의도를 사용자(및 리뷰어)에게 설명하는 서비스 소개 페이지.
 * 
 * 📊 주요 상태(Variables) & 함수(Functions) 정리
 * - router: vue-router의 인스턴스로, 메인 화면으로 돌아가기 위한 프로그래밍 방식 네비게이션에 사용됨.
 * - handleGoHome(): 버튼 클릭 시 메인('/') 라우트로 이동시키는 함수.
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
  <div class="about-section">
    <h2>서비스 소개</h2>

    <div class="content-card">
      <h3>날씨 대시보드 이용 안내</h3>

      <p class="intro-text">
        본 서비스는 전 세계 주요 도시의 실시간 날씨와 24시간 기상 예측 정보를 제공하는
        대시보드입니다. 아래 가이드를 참고하여 서비스를 이용해 보세요.
      </p>

      <div class="feature-list">
        <ul>
          <li>
            <strong>🔍 날씨 검색:</strong> 메인 화면의 검색창에 영문으로 도시 이름(예: Seoul,
            London)을 입력하여 원하시는 지역의 날씨를 바로 확인할 수 있습니다.
          </li>
          <li>
            <strong>⭐ 즐겨찾기:</strong> 도시 카드 우측 상단의 별 아이콘을 클릭하면 즐겨찾기에
            추가됩니다. 추가된 도시는 새로고침을 해도 항상 목록 최상단에 고정됩니다.
          </li>
          <li>
            <strong>🌡️ 온도 단위 변경:</strong> 화면 우측 상단의 '단위변경' 버튼을 클릭하면
            섭씨(℃)와 화씨(℉) 단위를 자유롭게 전환할 수 있습니다.
          </li>
          <li>
            <strong>📈 상세 예보 확인:</strong> 날씨 카드의 '상세보기' 버튼을 누르거나 상단의
            '시계열 분석' 메뉴로 이동하면, 향후 24시간 동안의 기온 변화와 강수량을 차트로 확인할 수
            있습니다.
          </li>
          <li>
            <strong>🚨 기상 특보 알림:</strong> 현재 기온이 33℃ 이상이거나 -10℃ 이하일 경우, 화면
            우측 상단에 자동으로 폭염/한파 경보 알림이 발생합니다.
          </li>
        </ul>
      </div>

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
