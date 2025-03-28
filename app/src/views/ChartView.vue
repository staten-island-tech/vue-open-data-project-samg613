<script setup>
import { ref, computed, onMounted } from 'vue'
import BarChart from '@/components/BarChart.vue'
import SearchForm from '@/components/SearchForm.vue'

const violations = ref([])
const filteredViolations = ref([])
const loading = ref(true)
const searchQuery = ref('')

const handleSearch = (query) => {
  searchQuery.value = query
  filterViolations(query)
}

const filterViolations = (query) => {
  if (query) {
    filteredViolations.value = violations.value.filter((v) => {
      const contributingFactor = v.contributing_factor_1 || ''
      return contributingFactor.toLowerCase().includes(query.toLowerCase())
    })
  } else {
    filteredViolations.value = violations.value
  }
}

const fetchData = async () => {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/bm4k-52h4.json?$limit=1000',
    )
    const data = await response.json()

    const counts = {}
    data.forEach((v) => {
      if (v.contributing_factor_1) {
        counts[v.contributing_factor_1] = (counts[v.contributing_factor_1] || 0) + 1
      }
    })

    violations.value = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    filteredViolations.value = violations.value

    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const chartData = computed(() => {
  if (!filteredViolations.value.length) {
    return null
  }

  return {
    labels: filteredViolations.value.map((v) => v[0]),
    datasets: [
      {
        label: 'Number of Violations',
        data: filteredViolations.value.map((v) => v[1]),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
})
</script>

<template>
  <div>
    <h1>Most Common Parking Violations</h1>
    <SearchForm @search="handleSearch" />
    <p v-if="loading">Loading data...</p>
    <p v-if="!loading && !filteredViolations.length">No violations found</p>
    <BarChart v-if="chartData" :chartData="chartData" />
  </div>
</template>
