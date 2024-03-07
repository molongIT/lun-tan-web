// SPA入口
<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0px 0px 0px 0px;
  padding: 0;
}
@media screen and (max-width: 300px) {
    body {
        background-color:rgb(16, 221, 153);
    }
}
</style>

