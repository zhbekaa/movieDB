<script>

import MovieSearchCard from "./MovieSearchCard.vue";
import SearchFilter from "./SearchFilter.vue";
import ActorSearchCard from "./ActorSearchCard.vue";
import CollectionSearchCard from "./CollectionSearchCard.vue";
import { moviesService } from "@/services/movies.service";
import router from "@/router";

export default {
    data() {
        return {
            input: "",
            movies: [],
            actors: [],
            collections: [],
            showSearch: false,
            loading: false,
            searchTypes: [
                {
                    num: 0,
                    name: "All",
                },
                {
                    num: 1,
                    name: "Titles",
                },
                {
                    num: 2,
                    name: "Actors",
                },
                {
                    num: 3,
                    name: "Collections",
                },
            ],

            searchType: {},
        }
    },
    mounted() {
        this.searchType = this.searchTypes[0];
        document.addEventListener("mousedown", this.handleClickOutside);
    },
    unmounted() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    },
    methods: {
        handleSubmit() {
            const query = this.input;
            const searchType = this.searchType;
            const route = {
                path: '/search',
                query: {
                    query: query,
                    type: searchType.num
                }
            }
            
            router.push(route);
        },
        handleOnChange() {
            const input = this.input;
            if (input.trim()) {
                this.showSearch = true;
                this.loading = true;
                moviesService.getSearch({query: input, type: this.searchType.num})
                    .then((res) => {
                        this.loading = false;
                        this.movies = res.movies;
                        this.actors = res.actors;
                        this.collections = res.collections
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {
                this.showSearch = false
            }
        },

        handleInputDebounced() {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.handleOnChange();
            }, 300);
        },

        handleClickOutside(event) {
            if (this.$refs.collapseFilter && !this.$refs.collapseFilter.contains(event.target)) {
                // Clicked outside of the collapse area, close the collapse
                // this.$refs.collapse.classList.remove("collapse");
                this.$refs.collapseFilter.classList.add("collapsing");
            }
            if (this.$refs.search && !this.$refs.search.contains(event.target))
                this.showSearch = false;
        }
    },
    components: {
        MovieSearchCard,
        SearchFilter,
        ActorSearchCard,
        CollectionSearchCard
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
            <div class="collapse navbar-collapse justify-content-center mt-3 mt-md-0 position-relative "
                id="navbarSupportedContent">
                <div class="col-12 col-md-8">
                    <form class="input-group" @submit.prevent="handleSubmit">
                        <input class="form-control" name="input" :placeholder="`Search for ${searchType.name}`"
                            aria-label="Search" v-model="input" @input="handleInputDebounced()"
                            @focusin="showSearch = true">
                        <button class="input-group-text gap-2" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
                            {{ searchType.name }}
                        </button>
                    </form>
                </div>
                <div v-if="!showSearch" class="collapse  mt-4 position-absolute top-50 sm-w-100 w-75"
                    id="collapseFilter">
                    <div class="card card-body text-bg-dark btn-group">
                        <div class=" flex-wrap d-inline-flex justify-content-between px-sm-3">
                            <button class="btn" v-for="(type, index) in searchTypes" :key="index"
                                @click="() => searchType = type">
                                <span>
                                    {{ type.name }}
                                </span>
                            </button>
                        </div>
                        <hr>
                        <SearchFilter :searchType="searchType" />
                    </div>
                </div>

                <!-- search -->
                <div v-if="showSearch && input.trim()" class="position-absolute top-100 overflow-auto w-75" ref="search"
                    id="search" style="height: 400px; left: 10%;">
                    <div v-if="loading" class="card d-flex justify-content-center align-items-center p-4">
                        <span class="card-body spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                    </div>
                    <div v-else-if="(collections?.length || movies?.length || actors?.length)">

                        <div v-if="(actors?.length) && (searchType.num == 0 || searchType.num == 2)">
                            <ActorSearchCard v-for="actor in actors" :actor="actor" :key="actor.id" />
                        </div>

                        <div v-if="(movies?.length) && (searchType.num == 0 || searchType.num == 1)">
                            <MovieSearchCard v-for="movie in movies" :key="movie.id" :movie="movie" />
                        </div>

                        <div v-if="(collections?.length) && (searchType.num == 0 || searchType.num == 3)">
                            <CollectionSearchCard v-for="collection in collections" :key="collection.id"
                                :collection="collection" />
                        </div>

                    </div>
                    <div v-else class="card d-flex justify-content-center align-items-center p-4">
                        <span class="card-body" role="status" aria-hidden="true"> Nothing found </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
#collapseFilter {
    left: 10%;
    width: 75%;
}

#search {
    left: 10%;
    width: 75%;
}

@media screen and (max-width: 769px) {
    #collapseFilter {
        left: 0 !important;
        width: 100% !important;
    }

    #search {
        left: 0 !important;
        width: 100% !important;
    }
}
</style>