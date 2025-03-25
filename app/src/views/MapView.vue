<template>
  <div>
    <h2>Parking Violation Map</h2>
    <div id="map"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import L from 'leaflet'

export default {
  setup() {
    const initMap = async () => {
      const map = L.map('map').setView([40.7128, -74.006], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

      try {
        const response = await fetch(
          'https://data.cityofnewyork.us/resource/bm4k-52h4.json?$limit=500',
        )
        const data = await response.json()

        data.forEach((v) => {
          if (v.latitude && v.longitude) {
            L.marker([v.latitude, v.longitude])
              .addTo(map)
              .bindPopup(`<b>${v.violation_description}</b>`)
          }
        })
      } catch (error) {
        alert('Error loading map data.')
      }
    }

    onMounted(initMap)
  },
}
</script>

<style>
#map {
  height: 500px;
}
</style>
