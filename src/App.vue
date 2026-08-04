<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div style="padding: 20px">
    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
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
