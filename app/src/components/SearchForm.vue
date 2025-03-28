<template>
  <div>
    <input
      v-model="query"
      placeholder="Search by violation..."
      @input="emitSearch"
      @keyup.enter="handleEnter"
    />
    <button @click="handleEnter">Search</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(_, { emit }) {
    const query = ref('')

    const emitSearch = () => {
      emit('search', query.value)
    }

    const handleEnter = () => {
      emitSearch()
    }

    return { query, emitSearch, handleEnter }
  },
}
</script>
