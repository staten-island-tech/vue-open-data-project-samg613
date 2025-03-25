<template>
  <input v-model="query" placeholder="Search by violation..." @input="emitSearch" />
</template>

<script>
import { ref } from 'vue';

export default {
  setup(_, { emit }) {
    const query = ref('');

    const emitSearch = () => {
      emit('search', query.value);
    };

    return { query, emitSearch };
  },
};
</script>
