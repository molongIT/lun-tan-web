<template>
  <div id="page1">
    <!-- 顶部导航栏 -->
    <div class="topbar">
      <div class="nav">
        <ul>
          <!-- <li v-if="!this.$store.getters.getUser"> -->
          <li>
            <el-button type="text" @click="toLoginPage">登录/注册</el-button>
          </li>
          <!--<li v-else>
            欢迎
          </li>-->
<!--          <li v-else>-->
<!--            欢迎-->
<!--            &lt;!&ndash;<el-popover placement="top" width="180" v-model="visible">-->
<!--              <p>确定退出登录吗？</p>-->
<!--              <div style="text-align: right; margin: 10px 0 0">-->
<!--                <el-button size="mini" type="text" @click="visible = false"-->
<!--                  >取消</el-button-->
<!--                >-->
<!--                <el-button type="primary" size="mini" @click="logout"-->
<!--                  >确定</el-button-->
<!--                >-->
<!--              </div>-->
<!--              <el-button type="text" slot="reference">{{-->
<!--                this.$store.getters.getUser.userName-->
<!--              }}</el-button>-->
<!--            </el-popover>&ndash;&gt;-->
<!--          </li>-->
          <!--<li>
            <router-link to="/collect">我的收藏</router-link>
          </li>-->
        </ul>
      </div>
    </div>
    <!-- 顶部导航栏END -->
    <div id="head">
      <router-link
        class="head-word"
        :to="{ path: '/Page11', query: { id: '1' } }"
        >热门</router-link
      >
      <router-link
        class="head-word"
        :to="{ path: '/Page12', query: { id: '1' } }"
        >发现</router-link
      >
      <router-link
        class="head-word"
        :to="{ path: '/Page1', query: { id: '1' } }"
        >话题</router-link
      >
    </div>

    <div id="toolbar">
      <span class="toolbar-ele">所有</span>
      <span class="toolbar-ele">文字</span>
      <span class="toolbar-ele">动漫</span>
      <span class="toolbar-ele">所有</span>
      <span class="toolbar-ele">所有</span>
      <span class="toolbar-ele">所有</span>
      <span class="toolbar-ele">所有</span>
    </div>
    <div id="content">
      <Articles></Articles>
    </div>
  </div>
</template>

<script>
  import Articles from "./Articles";
  import {mapMutations} from "vuex";

  export default {
    components: {
      Articles,
    },
    data(){
      return {
        userInfo: {},
      }
    },
    methods: {
      toLoginPage(){
        console.log(this.getUserInfo());
        this.$router.push({ path: 'Login'})
      },

      ...mapMutations(['getUserInfo']),

    },
  };
</script>

<style scoped>
*{
  list-style: none;
}
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 100%;
  margin: 0 auto;
}
.topbar .nav ul {
  margin-top: 5px;
  float: right;
}
.topbar .nav ul li {
  float: left;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#page1 #head {
  width: 100%;
  height: 50px;
  padding: 0 0 0 0;
  text-align: center;
}

#page1 #head .head-word {
  text-align: center;
  font-size: 28px;
  font-family: fantasy;
  font-weight: bolder;
  color: black;
  padding: 10px;
}
#page1 #toolbar {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 70px;
  border-top: 1px solid rgba(95, 90, 90, 0.198);
  border-bottom: 0.5px solid rgba(109, 103, 103, 0.198);
}
#page1 #toolbar .toolbar-ele {
  float: none;
  font-size: 25px;
  color: black;
  margin: 20px;
  position: relative;
  top: 15px;
}

#page1 #content {
  /* background-color: yellow; */
  width: 100%;
  height: 1000px;
}
</style>
