import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const savedUnit = localStorage.getItem('weather-unit') || 'celsius'
  const unit = ref(savedUnit)

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  watch(unit, (newValue) => {
    localStorage.setItem('weather-unit', newValue)
  })

  return {
    unit,
    unitSymbol,
    toggleUnit,
  }
})
