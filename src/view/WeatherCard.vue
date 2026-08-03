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
    <!-- 추가 -->
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
      <p>현재 기온: {{ props.weather.temp }}°C</p>
    </div>

    <button class="detail-btn" @click.stop="onDetailClick">상세보기</button>
  </li>
</template>

<style scoped>
.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
}
.weather-card:hover {
  background-color: #f9f9f9;
}
.detail-btn {
  padding: 5px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>
