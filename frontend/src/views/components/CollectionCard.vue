<script>
export default {
    props: [
        'collection'
    ],
    data() {
        return {

        }
    }
}
</script>

<template>
    <a :href="`/collections/${collection.id}`" class="d-flex flex-column text-center" style="width: fit-content;">
        <img src="https://placeholder.co/325x180" :alt="collection.name">
        <span class="collection-name">
            {{ collection.name }}
        </span>
    </a>
</template>

<style scoped>
.collection-name {
    font-size: 18px;
    font-weight: 600;
}
</style>