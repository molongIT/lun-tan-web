<template>
  <div class="cool-block">
    <!--  -->
    <div class="window" v-if="isShowWindow">
      <img
        class="window-tab-close"
        src="../../assets/svg/close.svg"
        @click="closeWindow"
      />
      <el-input
        class="window-input"
        placeholder="请输入todo"
        type="textarea"
        :rows="7"
        v-model="todoInput"
      ></el-input>
      <el-button class="window-publish" @click="publish">发表</el-button>
    </div>
    <!--  -->
    <div class="decision">
      Make a desicion hardly，save at here , let's no word then, will see~
    </div>
    <div class="go" @click="showWindow">
      <img class="cool_add" src="../../assets/svg/cool_add.svg" alt="" />
      <img class="seg0" src="../../assets/svg/u375_seg0.svg" alt="" />
      <img class="seg1" src="../../assets/svg/u375_seg1.svg" alt="" />
      <img class="car" src="../../assets/car.png" alt="" />
      <div class="add-line"></div>
    </div>
    <div class="card">
      <!-- 内容卡片 -->
      <div
        class="card-item"
        v-for="item in getCardsUpdated"
        :key="item.id"
        v-bind:style="item.mystyle"
      >
        <img class="item-img" :src="item.avatar" alt="" />
        <span class="item-date">{{ item.createTime }}</span>
        <span class="item-content">{{ item.content }}</span>
      </div>
    </div>
    <!-- websocket测试 -->
    <WebSocket v-on:listenChildEventForAddObj="addCardObj"></WebSocket>
  </div>
</template>
<script>
import WebSocket from "../../components/WebSocket.vue";

export default {
  components: {
    WebSocket,
  },
  name: "cool",
  data() {
    return {
      test: "dsadsa",
      array: [1, 2, 3],
      card: [
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "0px",
        //     top: "0px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "30px",
        //     top: "30px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "80px",
        //     top: "80px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "150px",
        //     top: "80px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "400px",
        //     bottom: "100px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "430px",
        //     bottom: "300px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "500px",
        //     bottom: "500px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "500px",
        //     bottom: "700px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "800px",
        //     bottom: "700px",
        //   },
        // },
        // {
        //   avatar:
        //     "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
        //   createTime: "2020/1/1 10:50",
        //   content: "  放弃现有的团队，去外面工作，更大的环境~",
        //   mystyle: {
        //     left: "800px",
        //     bottom: "600px",
        //   },
        // },
      ],
      // 记录当前要覆盖的card的索引
      coverCardIndex: 0,
      isShowWindow: false,
      todoInput: "",
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    getCards() {
      console.log("请求nextTo");
      let _this = this;
      this.$http.get("/nextTodo").then((res) => {
        _this.card = res.data.data;
        // 初始化位置
        var positions = [
          {
            top: "0px",
            left: "0px",
          },
          {
            top: "30px",
            left: "30px",
          },
          {
            top: "80px",
            left: "80px",
          },
          {
            top: "80px",
            left: "150px",
          },
          {
            left: "400px",
            bottom: "100px",
          },
          {
            left: "430px",
            bottom: "300px",
          },
          {
            left: "500px",
            bottom: "500px",
          },
          {
            left: "500px",
            bottom: "700px",
          },
        ];
        for (let i = 0; i < _this.card.length; i++) {
          _this.card[i].mystyle = positions[i];
        }
        console.log(_this.card.length);
      });
    },
    addCardObj(cardObj) {
      // // 删除第一个元素，旧日期
      // this.card.shift();
      // // 头部插入
      // this.card.unshift(cardObj);

      // ---- 覆盖值
      cardObj.mystyle = this.card[this.coverCardIndex].mystyle;
      // 先删除数组指定下标对应的值，再在该下标插入新值。
      this.card.splice(this.coverCardIndex, 1, cardObj);
      this.coverCardIndex = (this.coverCardIndex + 1) % 8;
      console.log(this.card);
    },
    showWindow() {
      this.isShowWindow = true;
    },
    closeWindow() {
      this.isShowWindow = false;
    },
    publish() {
      // 会报错！！
      const user = this.$store.getters.getUserInfo.user;
      var nextTodoDto = {
        userId: user.id,
        content: this.todoInput,
      };
      this.$http
        .post("/nextTodo", nextTodoDto)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    getCardsUpdated() {
      return this.card;
    },
  },
};
</script>

<style lang="scss" scoped>
.cool-block {
  width: 98%;
  height: 600px;
  background-color: #fbf1df;
  margin: 5px auto;
  border-radius: 20px;
}

.decision {
  position: relative;
  top: 50px;
  left: 50px;
  font-family: "Comic Sans MS Normal", "Comic Sans MS", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 30px;

  transform: rotate(2deg);
}

.go {
  display: inline-block;
  position: relative;
  top: 56%;
  left: 72%;
  width: 400px;
}

.seg0 {
  transform: rotate(-71deg);
  margin-bottom: 40px;
  position: relative;
  left: -13px;
}

.seg1 {
  transform: rotate(-48deg);
  margin-bottom: 73px;
  position: relative;
  left: -32px;
}

.car {
  position: relative;
  left: -39px;
}

.add-line {
  width: 500px;
  height: 41px;
  background: inherit;
  background-color: rgba(211, 209, 209, 1);
  border: none;
  border-radius: 0px;
}

.card {
  height: 70%;
  width: 95%;
  margin: 0 auto;

  position: relative;
  top: -150px;

  // :nth-child(1) {
  //   background-color: red;
  //   position: relative;
  //   left: "0px";
  //   top: "0px";
  // }

  // :nth-child(2) {
  //   background: #ff0000;
  //   left: "30px";
  //   top: "30px";
  // }
}

.card-item {
  background-color: #e0eaf1;
  width: 230px;
  height: 100px;
  position: relative;
  border-radius: 20px 50px 50px 35px;

  .item-img {
    width: 15%;
    border-radius: 50%;
    position: relative;
    top: -10%;
    left: -5%;
  }

  .item-date {
    display: inline-block;
    position: relative;
    top: -15px;
    font-size: 17px;
  }

  .item-content {
    display: inline-block;
    position: absolute;
    word-wrap: break-word;
    font-family: "楷体", sans-serif;
    font-weight: 400;
    font-size: 19px;
    text-indent: 15px;
    padding: 5px;
    top: 30px;
    left: 0px;
  }
}

.window {
  position: absolute;
  top: 250px;
  width: 30%;
  height: 230px;
  background-color: white;
  left: 34%;
  z-index: 15;
  box-shadow: 5px 5px 5px rgb(179, 179, 179);

  .window-tab-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    border: #000 0.5px solid;
    top: 5px;
    left: 5px;
  }

  .window-publish {
    width: 100%;
  }
}
</style>
