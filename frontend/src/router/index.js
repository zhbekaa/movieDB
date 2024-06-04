import { createRouter, createWebHistory } from 'vue-router'

import Feed from '@/views/pages/Feed.vue'
import SearchResults from '@/views/pages/SearchResults.vue'
import MoviePage from '@/views/pages/MoviePage.vue'
import ActorPage from '@/views/pages/ActorPage.vue'
const routes = [
  { path: '/', component: Feed },
  { path: '/search', component: SearchResults },
  { path: '/movies/:id', component: MoviePage },
  { path: '/actors/:id', component: ActorPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
