<script>
import { moviesService } from '@/services/movies.service';
import ActorsList from "@/views/components/ActorsList.vue"
import CrewList from "@/views/components/CrewList.vue"
import CollectionCard from '@/views/components/CollectionCard.vue';

export default {
    data() {
        return {
            movie: {},
            movieId: this.$route.params.id,
        }
    },
    mounted() {
        moviesService.getSingleMovie(this.movieId)
            .then((res) => {
                this.movie = res;
                this.movie.release_date = new Date(this.movie.release_date);
                document.title = `${this.movie.title} (${this.movie.release_date.getFullYear()}) - MovieDB`;
            })
            .catch((err) => {
                console.error(err);
            })
    },
    methods: {
        formatCurrency(number, symbol = '$'){
            if (number) {
                // Add thousands separator
                const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
                // Format the number as a currency string
                return `${symbol}${formattedNumber}`;
            }
        }
    },
    components: {
        ActorsList,
        CrewList,
        CollectionCard
    }
}
</script>
<template>
    <div class="container d-flex flex-column py-4 gap-4">
        <div class="d-inline-flex justify-content-between align-items-center w-100">
            <div>
                <h2>{{ movie.title }}</h2>
                <span class="text-secondary" v-if="movie.release_date">{{ movie.release_date.getFullYear() }} · {{
                    movie.runtime }}m</span>
            </div>
            <div class="d-flex flex-column">
                <span class="text-center w-100 d-none d-md-block">RATING</span>

                <div class="d-none d-md-flex align-items-center gap-3">
                    <span style="font-size: 30px; color: #FFD700;">★</span>
                    <div class="d-flex flex-column">
                        <span>{{ movie.vote_average }} / 10</span>
                        <span class="text-secondary" style="font-size: 16px;">{{ movie.vote_count }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex">
            <img class=" col-6 col-md-3" :src="movie.poster_path">
            <ul style="list-style:none;">
                <li>
                    Release Date: {{ movie.release_date ? movie.release_date.toLocaleDateString('en-EN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }) : '' }}
                </li>
                <li>
                    Production Country:
                    <a v-for="country in movie.countries" :key="country.id">
                        {{ country.name }}
                    </a>
                </li>
                <li v-if="movie.tagline">
                    Tagline: <span class="fst-italic">{{ movie.tagline }}</span>
                </li>
                <li>
                    Genres:
                    <a v-for="(genre, i) in movie.genres" :key="genre.id" href="">
                        {{ genre.name }}<em v-if="i < movie.genres.length - 1">, </em>
                    </a>
                </li>
            </ul>
        </div>

        <div class="d-flex d-md-none align-items-center gap-3">
            <span style="font-size: 30px; color: #FFD700;">★</span>
            <div class="d-flex flex-column">
                <span>{{ movie.vote_average }} / 10</span>
                <span class="text-secondary" style="font-size: 16px;">{{ movie.vote_count }}</span>
            </div>
        </div>

        <div>
            <h3>Overview</h3>
            {{ movie.overview }}
        </div>
        <div>
            <h3>Cast</h3>
            <ActorsList :actors="movie?.actors" />
        </div>
        <div>
            <h3>Crew</h3>
            <CrewList v-if="movie.crew && movie.crew.length > 0" :crew="movie.crew" />
        </div>

        <div class=" d-flex flex-column gap-1">
            <h3>Box Office</h3>
            <div v-show="movie.budget">
                <h4>Budget</h4>
                <span>{{ formatCurrency(movie.budget) }}</span>
            </div>
            <div v-show="movie.revenue">
                <h4>Revenue</h4>
                <span>{{ formatCurrency(movie.revenue) }}</span>
            </div>
        </div>
        <div v-if="movie.collection_id">
            <h2>Collection</h2>
            <CollectionCard :collection="{id: movie.collection_id, name: movie.collection_name}" />
        </div>
    </div>
</template>
