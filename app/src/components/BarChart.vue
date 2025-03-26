<script setup>
import { defineProps } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartData: Object,
})
</script>

<template>
  <div>
    <Bar
      v-if="chartData"
      :data="chartData"
      :options="{
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Top 10 Parking Violations in NYC' },
        },
      }"
    />
  </div>
</template>
