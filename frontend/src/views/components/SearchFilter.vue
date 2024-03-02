<script>
export default {
    data() {
        return {
            searchType: '',
            searchTypes: [
                "Titles", "Collections", "Actors"
            ],
            years: []
        }
    },
    mounted() {
        this.years = this.getYears();
    },
    methods: {
        getYears() {
            const currentYear = new Date().getFullYear();
            const endYear = 1874;
            const years = [];

            for (let year = currentYear; year >= endYear; year--) {
                years.push(year);
            }

            return years;
        }
    }
}
</script>

<template>
    <div class="card card-body text-bg-dark btn-group">
        <div class=" d-inline-flex justify-content-between px-5">
            <button class="btn" v-for="(type, index) in searchTypes" :key="index" @click="() => searchType = type">
                {{ type }}
            </button>
        </div>
        <form class="d-flex " v-if="searchType == 'Titles'">
            <div class=" d-inline-flex justify-content-between align-items-center">
                Year  
                <select class="form-select"  aria-label="Default select example">
                    <option selected>date</option>
                    <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select> -
                <select class="form-select" aria-label="Default select example">
                    <option selected>date</option>
                    <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select>
            </div>
            <!-- <div class=" d-inline-flex justify-content-between align-items-center">
                Genres: 
                <select class="form-select"  aria-label="Default select example">
                    <option selected>date</option>
                    <option v-for="year in years" :key="year" :value="year">
                        {{ year }}
                    </option>
                </select>
            </div> -->


        </form>
    </div>
</template>

<style></style>