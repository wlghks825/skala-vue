<script setup>
const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const onCardClick = () => {
  emit('select-card', props.weather.name)
}
const onDetailClick = () => {
  emit('click-detail', props.weather.name, props.weather.status)
}
</script>

<template>
  <li class="weather-card" @click="onCardClick">
    <div class="info">
      <h4
        :class="{
          'text-red': props.weather.status === '맑음',
          'text-blue': props.weather.status === '비',
          'text-gray': props.weather.status === '구름',
        }"
      >
        {{ props.weather.name }} ({{ props.weather.status }})
      </h4>
      <p class="temp">현재 기온: {{ props.weather.temp }}°C</p>

      <span v-if="props.weather.temp >= 28" class="badge hot">🔥 더움 (28도 이상)</span>
      <span v-else-if="props.weather.temp >= 20" class="badge normal">⛅ 보통 (20~27도)</span>
      <span v-else class="badge cool">❄️ 선선함 (20도 미만)</span>
    </div>

    <slot name="action">
      <button class="detail-btn" @click.stop="onDetailClick">상세보기</button>
    </slot>
  </li>
</template>

<style scoped>
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-color: #d1d5db;
}

.info p {
  margin: 0;
  padding: 0;
}

.city-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px !important;
}

.temp {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 0px !important;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-top: 0px;
}

.badge.hot {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge.normal {
  background-color: #f3f4f6;
  color: #374151;
}

.badge.cool {
  background-color: #dbeafe;
  color: #1e40af;
}

button {
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #f3f4f6;
}

.info h4 {
  margin-top: 0;
  margin-bottom: 4px;
}
</style>
