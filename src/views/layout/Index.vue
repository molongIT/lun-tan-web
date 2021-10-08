<template>
  <!--  tab 分三块主内容显示 -->
  <div>
    <div class="top">
      <div class="top-left">
        <div v-for="tab in tabs" v-bind:key="tab">
          <div class="tab">
            <div
              v-bind:class="['tab-item1', { 'tab-active': tab === currentTab }]"
              @click="currentTab = tab"
            >
              {{ tab }}
            </div>
            <div v-show="tab === currentTab" class="tab-item2"></div>
          </div>
        </div>
      </div>
      <div class="top-right" @mouseleave="userCircleHoverOut">
        <div
          :class="['hover-tab', { isdisplay: !isShowTab }]"
          @mouseleave="userCircleHoverOut"
        >
          <div class="hover-tab-line"></div>
          <div class="hover-tab-items">
            <div class="hover-tab-write hover-tab-item" @click="toWritePage">
              <img src="../../assets/svg/yly_编辑.svg" alt="" />
              <span>写文章</span>
            </div>
            <div class="hover-tab-center hover-tab-item" @click="toUserCenter">
              <img src="../../assets/svg/User.svg" alt="" />
              <span>用户中心</span>
            </div>
            <div class="hover-tab-logout hover-tab-item">
              <img src="../../assets/svg/Log_Out.svg" alt="" />
              <span>退出</span>
            </div>
          </div>
        </div>
        <button
          v-if="!this.$store.getters.getUserInfo"
          type="primary"
          class="user-circle"
          @click="login"
          @mouseenter="userCircleHoverOn"
        >
          Login
        </button>
        <button v-else class="user-circle" @mouseenter="userCircleHoverOn">
          {{ this.$store.getters.getUserInfo.user.username }}
        </button>
      </div>
    </div>
    <component :is="currentTabComponent" class="content"></component>
  </div>
</template>
<script>
import say from "../say/say.vue";
import cool from "../cool/cool.vue";
import indexContent from "../indexContent/indexContent.vue";
import userCenter from "../userCenter/userCenter.vue";
import activity from "../activity/acticity.vue";
import writePage from "../../components/writePage.vue"

export default {
  components: {
    say,
    cool,
    indexContent,
    userCenter,
    activity,
    writePage
  },
  name: "Index",
  data() {
    return {
      currentTab: "畅所言",
      tabs: ["首页", "畅所言", "酷Cool", "活动"],
      isShowTab: false,
    };
  },
  computed: {
    currentTabComponent() {
      var resultComponent;
      switch (this.currentTab) {
        case "首页":
          resultComponent = "index-content";
          break;
        case "畅所言":
          resultComponent = "say";
          break;
        case "酷Cool":
          resultComponent = "cool";
          break;
        case "活动":
          resultComponent = "activity";
          break;
        case "userCenter":
          resultComponent = "userCenter";
      }
      return resultComponent;
    },
  },
  methods: {
    login() {
      this.$router.push({ path: "login" });
    },
    userCircleHoverOn() {
      this.isShowTab = true;
    },
    userCircleHoverOut() {
      this.isShowTab = false;
    },
    toUserCenter() {
      this.currentTab = "userCenter";
    },
    toWritePage() {
      this.$router.push({ path: "writePage" });
    },
  },
};
</script>
<style scoped lang="scss">
.isdisplay {
  display: none;
}
.top {
  width: 100%;
  height: 198px;
  background-color: white;
  border-bottom: 1px solid rgba(215, 215, 215, 1);
}
.top-left {
  float: left;
  /* background-color: red; */
  display: inline-flex;
  width: 80%;
  height: 100%;
  flex-direction: row;
  justify-content: space-around;
}
.tab {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.tab-item1 {
  color: black;
  width: 100%;
  font-family: "Vladimir Script Normal", "Vladimir Script", sans-serif;
  font-size: 150%;
  margin-top: 80px;
}
.tab-item2 {
  background-color: black;
  width: 10px;
  height: 10px;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 50%;
  /* position:absolute; */
}
.tab-active {
  font-weight: bolder;
}

.top-right {
  float: left;
  /* background-color: green; */
  width: 20%;
  height: 100%;
  font-size: 150%;
  position: relative;
  .hover-tab {
    width: 180px;
    height: 220px;
    background-color: #ffffff;
    position: absolute;
    top: 110px;
    left: 143px;

    box-shadow: 5px 5px 10px rgb(179, 179, 179);
    z-index: 14;

    .hover-tab-line {
      width: 100%;
      height: 1px;
      background: inherit;
      background-color: rgb(117, 116, 116);
      position: absolute;
      top: 30%;
    }

    .hover-tab-items {
      position: absolute;
      top: 38%;
      left: 22px;

      .hover-tab-item {
        font-size: 20px;
        margin-bottom: 18px;

        font-family: "Arial Normal", "Arial", sans-serif;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        color: #333333;

        img {
          width: 20px;
          margin-right: 10px;
        }
      }
    }
  }

  .user-circle {
    background-color: rgb(250, 205, 145);
    border-radius: 50%;
    width: 63px;
    height: 58px;
    margin: 75px 20% 0 0;
    font-size: 17px;
    font-weight: bolder;
    text-align: center;
    line-height: 58px;
    border: 1px solid #797979;
    box-shadow: 4px 4px 5px #888888;

    position: absolute;
    top: 10px;
    left: 200px;

    z-index: 15;
  }
}
</style>
