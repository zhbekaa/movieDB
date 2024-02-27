<script>
import NavBar from "./components/NavBar.vue"

export default {

  components: {
    NavBar,

  }
}
</script>

<template>
  <div class="">
    <NavBar /> 
    <div class="d-flex">
      <router-view />
    </div>
  </div> 
</template>

<style scoped></style>
../router