<template>
  <div class="cool-block">
    <div class="decision">
      Make a desicion hardly，save at here , let's no word then, will see~
    </div>
    <div class="go">
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
        v-for="item in card"
        :key="item"
        :style="item.style"
      >
        <img class="item-img" :src="item.img" alt="" />
        <span class="item-date">{{ item.date }}</span>
        <span class="item-content">{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cool",
  data() {
    return {
      test: "dsadsa",
      array: [1, 2, 3],
      card: [
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "0px",
            top: "0px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "30px",
            top: "30px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "80px",
            top: "80px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "150px",
            top: "80px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "400px",
            bottom: "100px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "430px",
            bottom: "300px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "500px",
            bottom: "500px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "500px",
            bottom: "700px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "800px",
            bottom: "700px",
          },
        },
        {
          img: "https://fabian.oss-cn-hangzhou.aliyuncs.com/img/ZWnOQA3kUGKXSjJ.jpg",
          date: "2020/1/1 10:50",
          content: "  放弃现有的团队，去外面工作，更大的环境~",
          style: {
            left: "800px",
            bottom: "600px",
          },
        },
      ],
    };
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
</style>
