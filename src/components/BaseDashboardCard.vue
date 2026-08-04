<template>
  <div class="dashboard-card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

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
