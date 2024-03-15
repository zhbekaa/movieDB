<script>
export default {
    props: [
        'actor'
    ],
    data() {
        return {
            isHovered: false
        }
    },
}
</script>

<template>
    <a class="card text-start w-100"
        :href="'/actors/' + actor.id" 
        :class="{ 'bg-gradient text-secondary': isHovered }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <div class="card-body">
            <h4 class="card-title">{{ actor.name }}
            </h4>
            <p class=" card-text">Actor, {{ actor.top_movie }} ({{ actor.top_movie_date.substring(0, 4) }})</p>
        </div>
    </a>
</template>

<style>
a {
    text-decoration: none;
    color: black;
    max-height: auto;
}
</style>