<!-- 用户个人中心页面 -->
<template>
  <div>
    <div class="left-tab">
      <div
        v-for="item in this.leftTabItems"
        :key="item"
        @click="changeTab(item)"
        v-bind:class="['tab-item', { 'tab-active': item === currentTab }]"
      >
        {{ item }}
      </div>
    </div>

    <div class="right-content">
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import settings from "./settings.vue";
export default {
  name: "userCenter",
  components: {
    settings,
  },
  data() {
    return {
      currentTab: "个人设置",
      leftTabItems: ['个人设置', '个人文章', '动态'],
    };
  },
  computed: {
    currentTabComponent() {
      var resultComponent;
      switch (this.currentTab) {
        case "个人设置":
          resultComponent = "settings";
          break;
        case "畅所言":
          resultComponent = "say";
          break;
      }
      return resultComponent;
    },
  },
  methods: {
    changeTab(name) {
      console.log(1);
      this.currentTab = name;
    },
  },
};
</script>

<style lang="scss" scoped>
 .tab-active{
    font-weight: bolder;
  }
.left-tab {
  margin-left: 10%;
  width: 20%;
  display: inline-block;
  margin-top: 60px;
  .tab-item {
    font-family: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif';
    font-size: 130%;
    padding: 10% 0;
    text-align: center;
  }
 
}

.right-content {
  display: inline-block;
  // width: 50%;
  // height: 80px;
  display: inline-block;
  position: absolute;
  top: 34%;

  
  .content{
    display: inline-block;
  }
}
</style>