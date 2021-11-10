<template>
  <div class="cool-block">
   <iframe class="iframe" src="http://127.0.0.1:5000/"></iframe>
  </div>
</template>
<script>

export default {
  components: {
  },
  name: "crawl",
  data() {
    return {
     
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
   
  },
};
</script>

<style lang="scss" scoped>
.cool-block {
  overflow: hidden;
  width: 100%;
  height: 600px;
  background-color: #e9f1f8;
  // border-radius: 20px;
}

.iframe{
    width: 100%;
    height: 100%;
}
</style>
