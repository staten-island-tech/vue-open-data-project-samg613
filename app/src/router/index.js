import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ChartView from '../views/ChartView.vue';
import MapView from '../views/MapView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/chart', component: ChartView },
  { path: '/map', component: MapView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
