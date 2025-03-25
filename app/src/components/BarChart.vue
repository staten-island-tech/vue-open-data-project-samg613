<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

export default {
  props: ['violations'],
  setup(props) {
    const chartCanvas = ref(null)
    let chartInstance = null

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy()
      }

      const counts = {}
      props.violations.forEach((v) => {
        counts[v.violation_description] = (counts[v.violation_description] || 0) + 1
      })

      const labels = Object.keys(counts)
      const data = Object.values(counts)

      chartInstance = new Chart(chartCanvas.value, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Violations', data, backgroundColor: 'blue' }] },
      })
    }

    watch(() => props.violations, renderChart)

    onMounted(renderChart)

    return { chartCanvas }
  },
}
</script>
