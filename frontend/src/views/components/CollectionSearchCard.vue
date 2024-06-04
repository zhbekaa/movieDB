<script>
export default {
    props: [
        'collection'
    ],
    data() {
        return {
            isHovered: false,
        }
    }
}
</script>

<template>
    <a class="card text-start w-100"
        :href="'/actors/' + collection.id" 
        :class="{ 'bg-gradient text-secondary': isHovered }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">
        <div class="card-body">
            <h4 class="card-title">{{ collection.name }}
            </h4>
            <p class=" card-text">Collection</p>
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