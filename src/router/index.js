import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/HomeView.vue";

const route = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route,
});

export default router;
