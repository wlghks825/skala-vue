<!-- 
==============================================
 * [최종 배포용 파일] BaseDashboardCard.vue
 * 
 * 💡 컴포넌트 역할: 대시보드 내 반복되는 카드 UI 레이아웃을 표준화하는 래퍼(Wrapper) 컴포넌트.
 * 
 * 📊 주요 상태(Variables) 및 함수(Functions)
 * - 내부 상태나 동작 로직 없이 화면(UI)만 담당하므로 스크립트 변수/함수는 없습니다.
 * 
 * 🧩 주요 슬롯(Slots) 정리
 * - name="header" ($slots.header) : 카드의 최상단 제목 영역. 부모가 데이터를 주입할 때만 렌더링.
 * - default slot : 검색바, 리스트 등 부모가 주입하는 메인 콘텐츠가 배치되는 기본 영역.
 * - name="footer" ($slots.footer) : 카드의 하단 요약/상태 메시지 영역. 부모가 데이터를 주입할 때만 렌더링.
============================================== 
-->
<template>
  <!-- 추가: 레이아웃 표준화 (el-card) - 대시보드의 일관된 UI 규격을 맞추기 위해 Element Plus의 카드 컴포넌트로 래핑하고, shadow="hover" 속성으로 마우스 오버 시 시각적 피드백을 제공하여 직관적인 인터랙션을 구현함 -->
  <el-card shadow="hover">
    <!-- 추가: Named Slot 및 조건부 렌더링 ($slots) - 부모 컴포넌트에서 'header' 슬롯 데이터를 주입했을 때만 헤더 UI를 렌더링하여 빈 테두리가 남는 것을 방지 -->
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <!-- 추가: Default Slot - 검색바나 날씨 리스트 등 부모가 주입하는 메인 콘텐츠가 배치되는 기본 영역 -->
    <div class="card-body">
      <slot></slot>
    </div>

    <!-- 추가: Named Slot 및 조건부 렌더링 ($slots) - 부모 컴포넌트에서 'footer' 슬롯 데이터를 주입했을 때만 푸터 UI를 렌더링하여 재사용성 극대화 -->
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<style scoped>
.dashboard-card {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
  font-weight: 600;
  color: #111827;
}

.card-body {
  padding: 24px;
}

.card-footer {
  padding: 16px 24px;
  background-color: #fafafa;
  border-top: 1px solid #f3f4f6;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
