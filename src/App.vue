<template>
  <div id="app">
    <gobang/>
  </div>
</template>

<script>
import gobang from './components/gobang.vue'

export default {
  name: 'App',
  components: {
    gobang
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
