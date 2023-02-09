import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stopwatch",
      name: "stopwatch",
      component: () => import("../views/StopwatchView.vue"),
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("../views/MovieListsView.vue"),
    },
  ],
});

export default router;
