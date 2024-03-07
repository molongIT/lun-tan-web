<template>
  <div id="myList" class="myList">
    <div v-for="item,index in list" :key="item.id">
      <div class="box" @click="sendMsgToParent(index)">
        <div class="box-head">
          <img class="box--head-img" :src="item.avatar" alt="" />
          <div class="box-head-right">
            <div class="box-head-right-title">{{ item.username }}</div>
            <div class="box-head-right-date">{{ item.createTime }}</div>
          </div>
          <div class="box-head-title">{{ item.articleTitle }}</div>
        </div>
        <div class="box-tag">
          <span v-for="item1 in item.categoryNameArr"  :key="item1" class="box-tag-item">{{item1}}</span>
        </div>
        <div class="box-content">
          <MyMarkdown
            class="box-content-word"
            :content="item.articleDescription"
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
  created () {
  }
};
</script>
<style scoped>
.box {
  float: left;
  margin: 10px;
  /* 适应父组件的宽度 */
  width: 100%;
  height: 300px;
  background: #ffffff;
  border-radius: 50px;
  box-shadow: 2px 2px 20px #e8e8e9;
  overflow: hidden;
}
.box-head {
  /* background-color: red; */
  margin: 10px 10px 0px 10px;
  padding: 10px 10px 0px 10px;
  width: 90%;
  height: 18%;
  /* border-bottom: rgb(255 236 236) 1px solid; */
}
.box--head-img {
  float: left;
  border-radius: 60%;
  width: 40px;
  height: 40px;
}
.box-head-right {
  float: left;
  /* background-color: orange; */
  width: 250px;
  height: 50%;
  margin-left: 10px;
  font-size: 25px;
}
.box-head-right-title {
  font-weight: bolder;
  position: relative;
  font-size: 70%;
  top: 2%;
}
.box-head-right-date {
  font-size: 40%;
  font-weight: bolder;
  top: 3px;
}
.box-head-title{
  display: inline-block;
  position: relative;
  top: 20%;
  font-family: "微软雅黑", sans-serif;
  font-weight: bolder;
  position: relative;
}
.box-content {
  width: 770px;
  height: 350px;
  /* background-color: pink; */
  position: relative;
  margin-top: 2%;
}
.box-content-word {
  text-align: left;
  font-size: 15px;
  height: 350px;
}
.box-tag{
  background-color:hsl(0, 0%, 96%);
  padding: 6px 25px;
  /* width: 40%; */
  /* float: right; */
}
.box-tag-item{
  box-sizing: border-box;
  margin-right: 8px;
  padding: 3px 6px;
  font-size: 16px;
  background-color: #fdf9f9;
  color: #3d94ebcb;
  border: 1px solid #eaeaef;
  height: 24px;
  line-height: 17px;
  border-radius: 4px;
  display: inline-block;
}
</style>