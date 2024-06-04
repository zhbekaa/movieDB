<script>
export default {
    props: [
        'movie'
    ],
    data() {
        return {
            poster_url: '',
        }
    },
    mounted() {
        this.poster_url = this.movie?.poster_path ?? 'https://placeholder.co/200x300';
    },
}
</script>

<template>
    <a class="movie-card card bg-dark" :href="'/movies/' + movie.id">
        <div class="img-container">
            <img class="card-img-top" height="290" :src="poster_url">
        </div>

        <div class="card-body d-flex flex-column">
            <span class="text-white card-text">★ {{ movie.vote_average }}</span>
            <span class=" text-white card-text">{{ movie.title }}</span>
        </div>
    </a>
</template>

<style>
.overlay {

    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, transparent, black);

}

.movie-card {
    min-width: 200px;
    min-height: 293px;

    position: relative;
}
 

.img-container:hover {
    opacity: 0.5;

    background-color: gray;
}

</style>