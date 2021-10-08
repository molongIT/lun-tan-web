<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown :source="content"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "MyMarkdown",
  props: ["content"],
  components: {
    VueMarkdown
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>
<style>
@import "../assets/css/github-markdown.css";
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
  overflow: hidden;
}
</style>