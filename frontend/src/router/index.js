import { createRouter, createWebHistory } from "vue-router";


import Feed from "../views/pages/Feed.vue"; 
import MoviesList from "../views/pages/MoviesList.vue";

const routes = [
  { path: "/", component: Feed },
  { path: "/movies", component: MoviesList}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
