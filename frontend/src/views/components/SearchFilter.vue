<script>
import router from '@/router';
import { moviesService } from '@/services/movies.service';

export default {
    props: [
        'searchType'
    ],
    data() {
        return {
            years: [],
            genres: [],
            rating: this.$route.query.rating || '',
            selectedStartYear: this.$route.query.start_year || '',
            selectedEndYear: this.$route.query.end_year || '',
            selectedGenre: this.$route.query.genre || ''
        }
    },
    async mounted() {
        this.years = this.getYears();


        this.genres = await this.getGenres();
    },
    methods: {
        getYears() {
            const currentYear = new Date().getFullYear();
            const endYear = 1874;
            const years = [];

            for (let year = currentYear; year >= endYear; year--) {
                years.push(year);
            }

            return years;
        },
        getGenres() {
            const genres = moviesService.getGenres()
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    throw err;
                })
            return genres;
        },
        handleSubmit() {
            // console.log(e.target.genres.value)
            const formData = {
                startYear: this.selectedStartYear,
                endYear: this.selectedEndYear,
                genre: this.selectedGenre,
                rating: this.rating
            };
            const route = {
                path: '/search',
                query: {
                    type: 1,
                    query: this.$route.query.query || '',
                    start_year: formData.startYear,
                    end_year: formData.endYear,
                    genre: formData.genre,
                    rating: formData.rating,
                }
            }

            router.replace(route)
        }

    }
}
</script>

<template>
    <form class="container d-flex flex-column gap-3 mt-3 " v-if="searchType.name == 'Titles'" @submit.prevent="handleSubmit">
        <div class="d-flex gap-3 align-items-center">
            Year
            <select class="form-select w-25" aria-label="Default select example" v-model="selectedStartYear">
                <option selected>date</option>
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select> -
            <select class="form-select w-25" aria-label="Default select example" v-model="selectedEndYear">
                <option selected>date</option>
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <div class="d-flex gap-3 align-items-center">
            Genres
            <select class="form-select w-25 " aria-label="Default select example" v-if="genres.length"
                @input="(e) => selectedGenre = e.target.value">
                <option selected>Genres</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre.name">
                    {{ genre.name }}
                </option>
            </select>
        </div>



        <div class="d-flex gap-2">
            <label for="rating" class="form-label">Rating </label>
            <input type="range" class="form-range w-50" min="0" max="10" step="0.5" v-model="rating">
            ★ {{ rating }}
        </div>
        <button class="btn btn-primary">
            Search
        </button>

    </form>
</template>

<style></style>