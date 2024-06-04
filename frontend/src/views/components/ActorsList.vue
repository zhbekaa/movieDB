<script>
export default {
    props: [
        'actors'
    ],
    data() {
        return {

        }
    }
}
</script>

<template>
    <div class="w-100 overflow-x-scroll d-inline-flex gap-3">
        <div class="d-flex flex-column" style="min-width: 200px;" v-for="actor in actors" v-bind:key="actor.id">
            <a :href="'/actors/' + actor.id" class="" >{{ actor.name }}</a>
            <span class="text-secondary"> {{ actor.character }}</span>
        </div>
    </div>
</template>

<style>
a:hover {
    color: gray ;
}
</style>