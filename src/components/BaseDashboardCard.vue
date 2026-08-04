<template>
  <div class="dashboard-card">
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
  </div>
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
