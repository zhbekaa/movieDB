<script>
import { moviesService } from '@/services/movies.service';

export default {
    props: [
        'searchType'
    ],
    data() {
        return {
            searchTypes: [
                "Titles", "Collections", "Actors"
            ],
            years: [],
            genres: [],
            rating: 0
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
        }
    }
}
</script>

<template>
    <form class="container d-flex flex-column gap-3 mt-3 " v-if="searchType == 'Titles'">
        <div class="d-flex gap-3 align-items-center">
            Year
            <select class="form-select w-25" aria-label="Default select example">
                <option selected>date</option>
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select> -
            <select class="form-select w-25" aria-label="Default select example">
                <option selected>date</option>
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
        </div>

        <div class="d-flex gap-3 align-items-center">
            Genres
            <select class="form-select w-25 " aria-label="Default select example" id="genres">
                <option selected>Genres</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre">
                    {{ genre.name }}
                </option>
            </select>
        </div>



        <div class="d-flex gap-2">
            <label for="rating" class="form-label">Rating </label>
            <input type="range" class="form-range w-50" min="0" max="10" step="0.5" id="rating" name="rating" @input="(event) => rating = event.target.value">
            {{ rating }}★
        </div>


    </form>
</template>

<style></style>