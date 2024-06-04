<script>
export default {
    props: [
        'crew'
    ],
    data() {
        return {
            page1: [],
            page2: []
        }
    },
    mounted() {
        if (this.crew && this.crew.length > 0) {
            this.page1 = this.crew.slice(0, 5);
            this.page2 = this.crew.slice(5);
        }
    }
}
</script>

<template>
    <div>
        <ul class="d-flex flex-column px-0 gap-1" style="list-style: none;">
            <li class=" d-flex flex-column" v-for="member in page1" v-bind:key="member.id">
                <a :href="`/crew/${member.id}`">{{ member.name }}</a>
                <span class=" text-secondary">{{ member.job }}</span>
            </li>


        </ul>
        <ul class="collapse px-0" id="collapseExample">
            <li class=" d-flex flex-column" v-for="member in page2" v-bind:key="member.id">
                <a :href="`/crew/${member.id}`">{{ member.name }}</a>
                <span class=" text-secondary">{{ member.job }}</span>
            </li>
        </ul>
        <a v-if="page2 && page2.length > 0" class=" text-secondary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
            aria-controls="collapseExample">
            Show All...
        </a>

    </div>
</template>