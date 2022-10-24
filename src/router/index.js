import { createRouter, createWebHistory } from "vue-router";

const route = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route,
});

export default router;
