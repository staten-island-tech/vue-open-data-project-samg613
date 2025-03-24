<template>
  <div>
    <h2>Parking Violations Breakdown</h2>
    <SearchForm @search="handleSearch" />
    <BarChart :violations="filteredViolations" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import BarChart from '../components/BarChart.vue';
import SearchForm from '../components/SearchForm.vue';

export default {
  components: { BarChart, SearchForm },
  setup() {
    const violations = ref([]);
    const searchQuery = ref('');

    const fetchViolations = async () => {
      try {
        const response = await fetch(
          'https://data.cityofnewyork.us/resource/bm4k-52h4.json?$limit=500'
        );
        violations.value = await response.json();
      } catch (error) {
        alert('Failed to fetch data.');
      }
    };

    const filteredViolations = computed(() =>
      violations.value.filter(v =>
        v.violation_description?.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );

    const handleSearch = (query) => {
      searchQuery.value = query;
    };

    onMounted(fetchViolations);

    return { violations, filteredViolations, handleSearch };
  },
};
</script>

