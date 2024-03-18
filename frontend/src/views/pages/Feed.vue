<!-- eslint-disable vue/multi-word-component-names -->

<script>
import MovieCard from '../components/MovieCard.vue';
import CollectionCard from '../components/CollectionCard.vue';
import { moviesService } from '@/services/movies.service';
export default {
    data() {
        return {
            bestRated: [],
            featured: [],
            collections: [
                {
                    "id": 468552,
                    "name": "Wonder Woman Collection"
                },
                {
                    "id": 448150,
                    "name": "Deadpool Collection"
                },
                {
                    "id": 87096,
                    "name": "Avatar Collection"
                },
                {
                    "id": 404609,
                    "name": "John Wick Collection"
                },
                {
                    "id": 263,
                    "name": "The Dark Knight Collection"
                },
                {
                    "id": 422837,
                    "name": "Blade Runner Collection"
                },
                {
                    "id": 86311,
                    "name": "The Avengers Collection"
                },
                {
                    "id": 295130,
                    "name": "The Maze Runner Collection"
                },
                {
                    "id": 284433,
                    "name": "Guardians of the Galaxy Collection"
                },
                {
                    "id": 295,
                    "name": "Pirates of the Caribbean Collection"
                },
                {
                    "id": 10,
                    "name": "Star Wars Collection"
                },
                {
                    "id": 173710,
                    "name": "Planet of the Apes (Reboot) Collection"
                },
                {
                    "id": 230,
                    "name": "The Godfather Collection"
                },
                {
                    "id": 435259,
                    "name": "Fantastic Beasts Collection"
                },
                {
                    "id": 1241,
                    "name": "Harry Potter Collection"
                }
            ]
        }
    },
    mounted() {
        moviesService.getBestRatedMovies()
            .then((res) => {
                this.bestRated = res;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
        moviesService.getFeaturedMovies()
            .then((res) => {
                this.featured = res;
            }).catch((err) => {
                console.log(err);
                throw err;
            })
    },

    methods: {
    },

    components: {
        MovieCard,
        CollectionCard
    }
}

</script>



<template>
    <div class="feed">
        <div class="best-rated text-black text-bg-dark p-4">
            <h4>Best Rated</h4>
            <div class="d-inline-flex gap-3 overflow-x-auto" style="max-width: 100%;">
                <MovieCard v-for="movie in bestRated" :movie="movie" :key="movie.id" />
            </div>
        </div>
        <div class="featured text-black text-bg-dark p-4">
            <h4>Featured</h4>
            <div class="d-inline-flex gap-3 overflow-x-auto" style="max-width: 100%;">
                <MovieCard v-for="movie in featured" :movie="movie" :key="movie.id" />
            </div>
        </div>
        <div class="w-100 py-2 text-bg-dark d-flex justify-content-center align-items-center best-collections">
            <span style="font-size: 30px;">BEST COLLECTIONS</span>
        </div>
        <div class="d-inline-flex gap-3 overflow-x-auto pt-2 px-2" style="max-width: 100%;">
            <CollectionCard v-for="collection in collections" :collection="collection" :key="collection.id" />
        </div>
    </div>
</template>

<style>
.feed {
    margin-bottom: 20%;
}

.best-rated {
    background-color: #B3B3B3 !important;
}

.featured {
    background-color: #E6E6E6 !important;
}

.best-collections {
    background-color: #757575 !important;
}
</style>