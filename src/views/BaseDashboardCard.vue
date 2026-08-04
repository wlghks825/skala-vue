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
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
}

.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: bold;
}

.card-body {
  padding: 24px;
}

.card-footer {
  padding: 16px 24px;
  background-color: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  text-align: right;
}
</style>
