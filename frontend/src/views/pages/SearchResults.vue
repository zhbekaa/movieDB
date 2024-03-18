<script>
import ActorSearchCard from '../components/ActorSearchCard.vue';
import MovieSearchCard from '../components/MovieSearchCard.vue';
import CollectionSearchCard from '../components/CollectionSearchCard.vue';
import { moviesService } from '@/services/movies.service';
export default {
    data() {
        return {
            query: "",
            type: {},
            movies: [],
            actors: [],
            collections: []
        }
    },
    mounted() {
        this.query = this.$route.query.q;
        this.type = this.$route.query.type;
        this.getSearchResults();
    },
    methods: {
        getSearchResults() {
            moviesService.getSearch(this.query, this.type)
                .then((res) => {
                    this.movies = res.movies;
                    this.actors = res.actors;
                    this.collections = res.collections;
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    },
    components: {
        MovieSearchCard,
        ActorSearchCard,
        CollectionSearchCard
    }
}
</script>

<template>
    <div class="container mt-3">
        <div class="d-flex flex-column gap-4 mb-3 col-lg-8 col-12">

            <h1 class="mb-3">Search "{{ query }}"</h1>
            <!-- Movies -->
            <h3 class=""> | Movies</h3>
            <div class="">
                <MovieSearchCard v-for="movie in movies" v-bind:key="movie.id" :movie="movie" />
            </div>
            <!-- Actors -->
            <h3 class=""> | Actors</h3>
            <div class="">
                <ActorSearchCard v-for="actor in actors" v-bind:key="actor.id" :actor="actor" />
            </div>
            <!-- Collections -->
            <h3 class=""> | Collections</h3>
            <div class="">
                <CollectionSearchCard v-for="collection in collections" v-bind:key="collection.id"
                    :collection="collection" />
            </div>
        </div>
    </div>
</template>

<style></style>