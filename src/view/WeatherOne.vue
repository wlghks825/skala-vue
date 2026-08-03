<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')

const updateSearch = (event) => {
  searchQuery.value = event.target.value
}

const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

const selectCity = (cityName) => {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-container">
    <h2>☁️ 과제 1: 날씨 (Mockup)</h2>

    <div class="box search-box">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="updateSearch"
        placeholder="검색할 도시 이름 입력"
      />
      <p>검색 중인 도시: {{ searchQuery }}</p>
    </div>

    <div class="box list-box">
      <h3>🗺️ 지역별 날씨 현황</h3>

      <div
        v-for="weather in weatherList"
        :key="weather.id"
        class="weather-card"
        @click="selectCity(weather.name)"
      >
        <div class="info">
          <p class="city-name">{{ weather.name }} ({{ weather.status }})</p>
          <p class="temp">현재 기온: {{ weather.temp }}℃</p>

          <span v-if="weather.temp >= 25" class="badge hot"> 🔥 더움 (25도 이상) </span>
          <span v-else class="badge cool"> ❄️ 선선함 (25도 미만) </span>
        </div>

        <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
      </div>
    </div>

    <div class="status-bar">
      {{ statusMessage }}
    </div>
  </div>
</template>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  color: #333;
}
.box {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fafafa;
}
h2,
h3 {
  margin-top: 0;
  color: #2c3e50;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.weather-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.weather-card:last-child {
  margin-bottom: 0;
}
.info p {
  margin: 5px 0;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85em;
  color: #fff;
  margin-top: 5px;
}
.badge.hot {
  background-color: #ff6b6b;
}
.badge.cool {
  background-color: #74c0fc;
}
button {
  padding: 6px 12px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
}
.status-bar {
  background-color: #e6fcf5;
  color: #0ca678;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
}
</style>
