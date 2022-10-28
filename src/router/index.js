import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("../views/HomeView.vue");
const AddItem = () => import("../views/AddItem.vue");
const EditItem = () => import("../views/EditItem.vue");

const route = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-item",
    name: "Add",
    component: AddItem,
  },
  {
    path: "/edit-item/:id",
    name: "Edit",
    component: EditItem,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: route,
});

export default router;
