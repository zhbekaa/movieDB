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
  <div class="">
    <NavBar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<style scoped></style>
../router