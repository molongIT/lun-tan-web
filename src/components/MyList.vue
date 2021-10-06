<template>
  <div id="myList" class="myList">
    <div v-for="item in list" :key="item.articleId">
      <div class="box" @click="sendMsgToParent(item.articleIndex)">
        <div class="box-head">
          <img class="box--head-img" :src="item.articleImg" alt="" />
          <div class="box-head-right">
            <div class="box-head-right-title">{{ item.articleAuthor }}</div>
            <div class="box-head-right-data">{{ item.createTime }}</div>
          </div>
        </div>
        <div class="box-content">
          <MyMarkdown
            class="box-content-word"
            :url="item.articleWord"
          ></MyMarkdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyMarkdown from "./MyMarkdown";
export default {
  name: "MyList",
  props: ["list"],
  data() {
    return {};
  },
  methods:{
    sendMsgToParent(articleIndex){
      this.$emit('listenChildEvent',articleIndex)
    }
  },
  components: {
    MyMarkdown,
  },
};
</script>
<style scoped>
.box {
  float: left;
  margin: 10px;
  width: 1000px;
  height: 300px;
  background: #ffffff;
  border-radius: 50px;
  box-shadow: 2px 2px 20px #e8e8e9
}
.box-head {
  /* background-color: red; */
  margin: 10px;
  padding: 10px;
  width: 400px;
  height: 100px;
}
.box--head-img {
  float: left;
  border-radius: 50%;
  width: 50px;
}
.box-head-right {
  float: left;
  /* background-color: orange; */
  width: 250px;
  height: 100px;
  font-size: 25px;
}
.box-head-right-title {
  font-weight: bolder;
  position: relative;
  top: 15px;
}
.box-head-right-data {
  font-size: 15px;
  font-weight: bolder;
  position: relative;
  top: 25px;
}
.box-content {

  width: 970px;
  height: 350px;
  /* background-color: pink; */
}
.box-content-word {
  text-align: left;
  font-size: 15px;
  height: 350px;
}
</style>