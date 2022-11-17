<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld /> -->
  <HelloWorld3 />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HelloWorld3 from './components/HelloWorld3.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    HelloWorld3
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
