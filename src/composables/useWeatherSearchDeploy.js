// src/composables/useWeatherSearchDeploy.js
import { ref, computed } from 'vue'
import { fetchWeatherByCity } from '@/stores/openweather'

export function useWeatherSearchDeploy() {
  const searchQuery = ref('')
  const weatherList = ref([])
  const isLoading = ref(false)

  const loadWeatherData = async (cities = ['Seoul', 'Busan', 'Incheon', 'Jeju']) => {
    isLoading.value = true
    try {
      const promises = cities.map((city) => fetchWeatherByCity(city))
      const results = await Promise.all(promises)

      weatherList.value = results.map((data) => ({
        id: data.id,
        name: data.name,
        cityName: data.name,
        temp: Math.round(data.main.temp),
        status: data.weather[0].description,
        icon: data.weather[0].icon,
      }))
    } catch (error) {
      console.error('날씨 데이터를 불러오는데 실패했습니다:', error)
    } finally {
      isLoading.value = false
    }
  }

  const filteredWeatherList = computed(() => {
    if (!searchQuery.value.trim()) return weatherList.value
    return weatherList.value.filter((item) =>
      item.cityName.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  return {
    searchQuery,
    weatherList,
    filteredWeatherList,
    isLoading,
    loadWeatherData,
  }
}
