<script>
import { actorService } from '@/services/actor.service'
import MovieCard from '../components/MovieCard.vue'
export default {

    data() {
        return {
            movies: [],
        }
    },
    mounted() {
        const id = this.$route.params.id 
        actorService.getActor(id)
            .then((res) => {
                this.movies = res
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    components: {
        MovieCard
    }
}
</script>

<template>
     <div class="text-black p-4">
            <h4>Movies played in</h4>
            <div class="d-inline-flex gap-3 overflow-x-auto" style="max-width: 100%;">
                <MovieCard v-for="movie in movies" :movie="movie" :key="movie.movie_id" />
            </div>
        </div>
</template>