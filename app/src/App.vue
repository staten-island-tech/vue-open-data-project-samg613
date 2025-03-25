<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/chart">Charts</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: #333;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 2rem;
}
</style>
