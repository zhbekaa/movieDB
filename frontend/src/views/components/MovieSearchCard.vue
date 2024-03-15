<script>
export default {
    props: [
        'movie'
    ],
    data() {
        return {
            id: this.movie.id,
            title: this.movie.title,
            popularity: this.movie.popularity,
            vote_average: this.movie.vote_average,
            isHovered: false
        }
    }
}
</script>

<template>
    <a class="card text-start w-100" :href="'/movies/' + id" :class="{ 'bg-gradient': isHovered }"
        @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div class="card-body">
            <h4 class=" card-title">{{ title }}
            </h4>
            <div class=" card-text">
                <p class="mb-0">
                    <span class="icon">★</span>
                    {{ vote_average }}</p>
                <p class="d-inline-flex gap-1">
                    <svg width="24" height="24"
                         fill="currentColor" role="presentation">
                        <path
                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z">
                        </path>
                    </svg>
                    {{ popularity.toString().substring(0, 4) }}
                </p>
            </div>

        </div>
    </a>
</template>

<style>
a {
    text-decoration: none;
    color: black;
    max-height: auto;
}
.icon {
    min-width: 24px;
    height: 24px;
}
</style>