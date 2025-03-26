<script setup>
import { ref, computed, onMounted } from 'vue'
import BarChart from '@/components/BarChart.vue'

const violations = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/bm4k-52h4.json?$limit=1000',
    )
    const data = await response.json()

    console.log('FetchedData:', data)

    const counts = {}
    data.forEach((v) => {
      if (v.violation_description) {
        counts[v.violation_description] = (counts[v.violation_description] || 0) + 1
      }
    })

    console.log('ViolationCounts:', counts)

    violations.value = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    console.log('Top violations:', violations.value)

    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    loading.value = false
  }
})

const chartData = computed(() => {
  if (!violations.value.length) {
    return {
      labels: ['No Data'],
      datasets: [
        {
          label: 'Number of Violations',
          data: [0],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    }
  }

  return {
    labels: violations.value.map((v) => v[0]),
    datasets: [
      {
        label: 'Number of Violations',
        data: violations.value.map((v) => v[1]),
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
    <p v-if="loading">Loading data...</p>
    <BarChart v-else :chartData="chartData" />
  </div>
</template>
