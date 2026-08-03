<script setup>
const props = defineProps({
  query: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])
const onInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      :value="props.query"
      @input="onInput"
      placeholder="검색할 도시 이름 입력"
      class="search-input"
    />
    <p class="search-status">
      검색 중인 도시: <strong>{{ props.query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-status {
  font-size: 0.9em;
  color: #666;
}
</style>
