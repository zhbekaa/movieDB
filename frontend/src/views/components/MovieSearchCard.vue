<script>
export default {
    props: [
        'movie'
    ],
    data() {
        return {
            id: this.movie.id,
            title: this.movie.title,
            release_date: this.movie.release_date.split('-')[0],
            vote_average: this.movie.vote_average,
            actor1: this.movie.actor_name1 ?? "",
            actor2: this.movie.actor_name2,
            isHovered: false
        }
    }
}
</script>

<template>
    <a class="card" :href="'/movies/' + id" 
        :class="{ 'bg-gradient': isHovered }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <div class="card-body">
            <h4 class="mb-0">{{ title }}</h4>
            <p class="mb-0">{{ release_date }}</p>
            <p>{{ vote_average + " ★" }}</p>
            <p>{{ actor1 + ", " + actor2 }}</p>
        </div>
    </a>
</template>

<style>
a {
    text-decoration: none;
    color: black;
    max-height: auto;
    /* min-width: 100%;  */
}
</style>