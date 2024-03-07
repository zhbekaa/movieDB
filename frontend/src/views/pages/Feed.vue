<!-- eslint-disable vue/multi-word-component-names -->
<script>
import MovieCard from '../components/MovieCard.vue';
import CollectionCard from '../components/CollectionCard.vue';
export default {
    data() {
        return {
            bestRated: [
                {
                    "id": 5731,
                    "title": "Summer City",
                    "rating": 10.0
                },
                {
                    "id": 19993,
                    "title": "George Lopez: America's Mexican",
                    "rating": 10.0
                },
                {
                    "id": 21317,
                    "title": "Paramore: The Final Riot!",
                    "rating": 10.0
                },
                {
                    "id": 21466,
                    "title": "Mera Naam Joker",
                    "rating": 10.0
                },
                {
                    "id": 27079,
                    "title": "High Roller: The Stu Ungar Story",
                    "rating": 10.0
                },
                {
                    "id": 28469,
                    "title": "Der Herr Karl",
                    "rating": 10.0
                },
                {
                    "id": 34662,
                    "title": "Li'l Abner",
                    "rating": 10.0
                },
                {
                    "id": 37255,
                    "title": "Ween: Live in Chicago",
                    "rating": 10.0
                },
                {
                    "id": 38971,
                    "title": "Pavement: Slow Century",
                    "rating": 10.0
                },
                {
                    "id": 42173,
                    "title": "Chilly Scenes of Winter",
                    "rating": 10.0
                },
                {
                    "id": 43034,
                    "title": "Hell to Eternity",
                    "rating": 10.0
                },
                {
                    "id": 43147,
                    "title": "Blessed Event",
                    "rating": 10.0
                },
                {
                    "id": 43823,
                    "title": "Tom Brown's School Days",
                    "rating": 10.0
                },
                {
                    "id": 46016,
                    "title": "Road to Redemption",
                    "rating": 10.0
                },
                {
                    "id": 47282,
                    "title": "Little Dorrit",
                    "rating": 10.0
                },
                {
                    "id": 47683,
                    "title": "Love at 16",
                    "rating": 10.0
                },
                {
                    "id": 49099,
                    "title": "Images of a Relief",
                    "rating": 10.0
                },
                {
                    "id": 49477,
                    "title": "Gendernauts: A Journey Through Shifting Identities",
                    "rating": 10.0
                },
                {
                    "id": 53315,
                    "title": "The Kreutzer Sonata",
                    "rating": 10.0
                },
                {
                    "id": 53543,
                    "title": "Claymation Comedy of Horrors",
                    "rating": 10.0
                }
            ],
            featured: [
                {
                    "id": 211672,
                    "title": "Minions",
                    "rating": 6.4
                },
                {
                    "id": 297762,
                    "title": "Wonder Woman",
                    "rating": 7.2
                },
                {
                    "id": 321612,
                    "title": "Beauty and the Beast",
                    "rating": 6.8
                },
                {
                    "id": 339403,
                    "title": "Baby Driver",
                    "rating": 7.2
                },
                {
                    "id": 177572,
                    "title": "Big Hero 6",
                    "rating": 7.8
                },
                {
                    "id": 293660,
                    "title": "Deadpool",
                    "rating": 7.4
                },
                {
                    "id": 283995,
                    "title": "Guardians of the Galaxy Vol. 2",
                    "rating": 7.6
                },
                {
                    "id": 19995,
                    "title": "Avatar",
                    "rating": 7.2
                },
                {
                    "id": 245891,
                    "title": "John Wick",
                    "rating": 7.0
                },
                {
                    "id": 210577,
                    "title": "Gone Girl",
                    "rating": 7.9
                },
                {
                    "id": 131631,
                    "title": "The Hunger Games: Mockingjay - Part 1",
                    "rating": 6.6
                },
                {
                    "id": 281338,
                    "title": "War for the Planet of the Apes",
                    "rating": 6.7
                },
                {
                    "id": 271110,
                    "title": "Captain America: Civil War",
                    "rating": 7.1
                },
                {
                    "id": 680,
                    "title": "Pulp Fiction",
                    "rating": 8.3
                },
                {
                    "id": 166426,
                    "title": "Pirates of the Caribbean: Dead Men Tell No Tales",
                    "rating": 6.6
                },
                {
                    "id": 155,
                    "title": "The Dark Knight",
                    "rating": 8.3
                },
                {
                    "id": 78,
                    "title": "Blade Runner",
                    "rating": 7.9
                },
                {
                    "id": 24428,
                    "title": "The Avengers",
                    "rating": 7.4
                },
                {
                    "id": 268531,
                    "title": "Captain Underpants: The First Epic Movie",
                    "rating": 6.5
                },
                {
                    "id": 339988,
                    "title": "The Circle",
                    "rating": 5.4
                }
            ],
            collections: [
                {
                    "id": 468552,
                    "name": "Wonder Woman Collection"
                },
                {
                    "id": 448150,
                    "name": "Deadpool Collection"
                },
                {
                    "id": 87096,
                    "name": "Avatar Collection"
                },
                {
                    "id": 404609,
                    "name": "John Wick Collection"
                },
                {
                    "id": 263,
                    "name": "The Dark Knight Collection"
                },
                {
                    "id": 422837,
                    "name": "Blade Runner Collection"
                },
                {
                    "id": 86311,
                    "name": "The Avengers Collection"
                },
                {
                    "id": 295130,
                    "name": "The Maze Runner Collection"
                },
                {
                    "id": 284433,
                    "name": "Guardians of the Galaxy Collection"
                },
                {
                    "id": 295,
                    "name": "Pirates of the Caribbean Collection"
                },
                {
                    "id": 10,
                    "name": "Star Wars Collection"
                },
                {
                    "id": 173710,
                    "name": "Planet of the Apes (Reboot) Collection"
                },
                {
                    "id": 230,
                    "name": "The Godfather Collection"
                },
                {
                    "id": 435259,
                    "name": "Fantastic Beasts Collection"
                },
                {
                    "id": 1241,
                    "name": "Harry Potter Collection"
                }
            ]
        }
    },
    components: {
        MovieCard,
        CollectionCard
    }
}

</script>



<template>
    <div class="feed">
        <div class="best-rated text-black text-bg-dark p-4">
            <h4>Best Rated</h4>
            <div class="d-inline-flex gap-3 overflow-x-auto" style="max-width: 100%;">
                <MovieCard v-for="movie in bestRated" :movie="movie" :key="movie.id" />
            </div>
        </div>
        <div class="featured text-black text-bg-dark p-4">
            <h4>Featured</h4>

            <div class="d-inline-flex gap-3 overflow-x-auto" style="max-width: 100%;">
                <MovieCard v-for="movie in featured" :movie="movie" :key="movie.id" />
            </div>
        </div>
        <div class="w-100 py-2 text-bg-dark d-flex justify-content-center align-items-center best-collections">
            <span style="font-size: 30px;">BEST COLLECTIONS</span>
        </div>
        <div class="d-inline-flex gap-3 overflow-x-auto pt-2 px-2" style="max-width: 100%;">
            <CollectionCard v-for="collection in collections" :collection="collection" :key="collection.id" />
        </div>
    </div>
</template>

<style>
.feed {
    margin-bottom: 20%;
}
.best-rated {
    background-color: #B3B3B3 !important;
}

.featured {
    background-color: #E6E6E6 !important;
}

.best-collections {
    background-color: #757575 !important;
}
</style>