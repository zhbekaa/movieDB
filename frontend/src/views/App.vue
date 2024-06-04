<script>
import NavBar from "./components/NavBar.vue"
import FooterComponent from "./components/FooterComponent.vue";
export default {

  components: {
    NavBar,
    FooterComponent
  }
}
</script>

<template>
  <div class="App">
    <NavBar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<style scoped>
.App {
  height: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
