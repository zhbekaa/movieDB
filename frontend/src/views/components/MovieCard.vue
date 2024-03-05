<script>
export default {
    props: [
        'movie'
    ],
    data() {
        return {

        }
    }
}
</script>
<template>
    <a class="movie-card" :href="'/movies/' + movie.id">
        <div class="overlay">
            <span class="position-absolute">{{ movie.title }}</span>
        </div>
    </a>
</template>
  
<style>
.overlay {

    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, transparent, black);
    /* Change gradient colors */

}

.movie-card {
    /* background-image: url('https://m.media-amazon.com/images/M/MV5BZmYxZjg3OWEtNzg5Yi00M2YzLWI1YzYtYTQ0NTgwNzhjN2E1XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg'); */
    background-image: url('https://placeholder.co/280x160');
    background-position: center;
    background-size: cover;
    min-width: 280px;
    min-height: 160px;

    /* Ensure the image covers the entire container */

    /* Center the image within the container */
    position: relative;
    /* Ensure absolute positioning works relative to this container */
}

.position-absolute {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    /* background-color: rgba(0, 0, 0, 0.5); */
    /* Add a semi-transparent background for better readability */
}
</style>