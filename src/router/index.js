import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Stopwatch",
      component: () => import("../views/StopwatchView.vue"),
    },
    {
      path: "/movies",
      name: "Movies",
      component: () => import("../views/MovieListsView.vue"),
    },
  ],
});

export default router;
