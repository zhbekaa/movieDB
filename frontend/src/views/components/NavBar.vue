<script>

import MovieSearchCard from "./MovieSearchCard.vue";
import SearchFilter from "./SearchFilter.vue";
import { moviesService } from "@/services/movies.service";

export default {
    data() {
        return {
            input: "",
            movies: [],
            showMovies: false,
            loading: false,
            searchType: "All",
            searchTypes: ["All", "Titles", "Actors", "Collections"]
        }
    },
    mounted() {
        document.addEventListener("mousedown", this.handleClickOutside);
    },
    unmounted() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    },
    methods: {
        handleSubmit() {
            const input = this.input;
            if (input.trim()) {
                this.showMovies = true;
                this.loading = true;
                moviesService.getMovies(input)
                    .then((res) => {
                        this.loading = false;
                        this.movies = res;
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {
                this.showMovies = false
            }
        },

        handleInputDebounced() {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.handleSubmit();
            }, 300);
        },

        handleClickOutside(event) {
            if (this.$refs.collapse && !this.$refs.collapse.contains(event.target)) {
                // Clicked outside of the collapse area, close the collapse
                // this.$refs.collapse.classList.remove("collapse");
                this.$refs.collapse.classList.add("collapsing");
            }
        }
    },
    components: {
        MovieSearchCard,
        SearchFilter
    }
}
</script>

<template>
    <nav class="h-30 navbar navbar-expand-md bg-dark border-bottom border-body px-3 z-3" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">MovieDB</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center position-relative w-100"
                id="navbarSupportedContent">


                <form class="input-group w-75">
                    <input class="form-control" name="input" :placeholder="`Search for ${searchType}`"
                        aria-label="Search" v-model="input" @input="handleInputDebounced()" @focusin="showMovies = true"
                        @focusout="showMovies = false">
                    <button class="input-group-text gap-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
                        {{ searchType }}
                    </button>
                </form>
                <div class="collapse  mt-4 position-absolute top-50 w-75" id="collapseFilter" ref="collapse"
                    style="left: 10%;">
                    <div class="card card-body text-bg-dark btn-group">
                        <div class=" d-inline-flex justify-content-between px-5">
                            <button class="btn" v-for="(type, index) in searchTypes" :key="index"
                                @click="() => searchType = type">
                                {{ type }}
                            </button>
                        </div>
                        <hr>
                        <SearchFilter :searchType="searchType" />
                    </div>
                </div>
                <div v-if="showMovies && input.trim()" class="position-absolute top-100 overflow-auto w-75"
                    style="height: 400px; left: 10%;">
                    <div v-if="loading" class="card d-flex justify-content-center align-items-center p-4">
                        <span class="card-body spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                    </div>
                    <div v-else-if="(movies.length)" v-for="movie in movies" :key="movie.id">
                        <MovieSearchCard :movie="movie"></MovieSearchCard>
                    </div>
                    <div v-else-if="input.trim()" class="card d-flex justify-content-center align-items-center p-4">
                        <span class="card-body" role="status" aria-hidden="true"> Nothing found </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
