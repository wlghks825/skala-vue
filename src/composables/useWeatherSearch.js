import { ref, computed } from 'vue'
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs } from 'pinia'

export function useWeatherSearch() {
  const searchStore = useSearchStore()
  const { searchQuery } = storeToRefs(searchStore)

  const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 24, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  ])

  const filteredWeatherList = computed(() => {
    return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
  })

  return {
    weatherList,
    searchQuery,
    filteredWeatherList,
  }
}
