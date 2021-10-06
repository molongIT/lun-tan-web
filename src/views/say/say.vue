<template>
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
      <div class="article-left">
        <div class="block">
          <div class="icon">
            <img src="../../assets/svg/category.svg" />
          </div>
          <div class="category">
            <i class="category-item" v-for="item in category" v-bind:key="item">
              {{ item }}
            </i>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="21">
      <div v-show="!isShowArticleTab" class="article">
        <div class="article-right-area1">
          <div class="article-right-query">
            <i v-for="item in queryWhere" :key="item">
              {{ item }}
            </i>
          </div>
          <div class="article-right-content">
            <MyList
              :list="articles"
              v-on:listenChildEvent="showChildClickTab"
            ></MyList>
          </div>
        </div>

        <div class="article-right-area2">
          <div class="search">
            <div class="search-input"></div>
            <svg
              class="search-icon"
              t="1633229029693"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2418"
              width="200"
              height="200"
            >
              <path
                d="M622.4 682.453333l60.330667-60.309333 256.405333 256.405333-60.330667 60.309334z"
                fill="#616161"
                p-id="2419"
              ></path>
              <path
                d="M426.666667 426.666667m-341.333334 0a341.333333 341.333333 0 1 0 682.666667 0 341.333333 341.333333 0 1 0-682.666667 0Z"
                fill="#616161"
                p-id="2420"
              ></path>
              <path
                d="M692.266667 753.92l60.309333-60.330667 185.514667 185.514667-60.330667 60.330667z"
                fill="#37474F"
                p-id="2421"
              ></path>
              <path
                d="M426.666667 426.666667m-277.333334 0a277.333333 277.333333 0 1 0 554.666667 0 277.333333 277.333333 0 1 0-554.666667 0Z"
                fill="#64B5F6"
                p-id="2422"
              ></path>
              <path
                d="M573.866667 302.933333c-36.266667-42.666667-89.6-68.266667-147.2-68.266666s-110.933333 25.6-147.2 68.266666c-8.533333 8.533333-6.4 23.466667 2.133333 29.866667 8.533333 8.533333 23.466667 6.4 29.866667-2.133333C341.333333 296.533333 381.866667 277.333333 426.666667 277.333333s85.333333 19.2 115.2 53.333334c4.266667 4.266667 10.666667 8.533333 17.066666 8.533333 4.266667 0 10.666667-2.133333 12.8-4.266667 8.533333-8.533333 8.533333-23.466667 2.133334-32z"
                fill="#BBDEFB"
                p-id="2423"
              ></path>
            </svg>
          </div>
          <div class="tips">
            <div class="tips-item-title">Tip:</div>
            <li class="tips-item" v-for="item in tipArray" :key="item">
              {{ item }}
            </li>
          </div>
          <div class="hot">
            <div class="hot-title">Hop things</div>
            <li class="hot-item" v-for="item in tipArray" :key="item">
              {{ item }}
            </li>
          </div>
        </div>
      </div>

      <!-- 点击后的文章tab -->
      <!-- todo: 改为计算属性-->
      <div class="article-click-tab" v-show="isShowArticleTab">
        <div class="article-tab-content">
          <img
            class="article-tab-close"
            src="../../assets/svg/close.svg"
            @click="isShowArticleTab = false"
          />
          <div class="article-content-top">
            <div class="info">
              <img class="avator" src="../../assets/card1.jpg" alt="" />
              <div class="username">pxlong</div>
            </div>
            <div class="actions">
              <div class="like">
                <img class="icon" src="../../assets/svg/赞.svg" alt="" />
                <span class="like-nums">99</span>
              </div>
              <div class="view">
                <img class="icon" src="../../assets/svg/观看.svg" alt="" />
                <span class="view-nums">99</span>
              </div>
            </div>
          </div>
          <div class="article-content-block">
            <div class="article-content-title">
              {{ articles[curShowArticleIndex].articleTitle }}
            </div>
            <div class="article-content-word">
              <MyMarkdown :url="articles[curShowArticleIndex].articleWord">
              </MyMarkdown>
            </div>
          </div>
        </div>

        <div class="article-tab-comment"></div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import MyList from "../../components/MyList.vue";
import MyMarkdown from "../../components/MyMarkdown.vue";

export default {
  name: "say",
  components: {
    MyList,
    MyMarkdown,
  },
  created() {
    const _this = this;
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].articleUrl != null) {
        this.$http.get(this.articles[i].articleUrl).then((res) => {
          if (res != null) {
            console.log(res.data);
            console.log(_this.articles[i]);
            _this.articles[i].articleWord = res.data;
          }
        });
      }
    }
  },
   methods: {
    // 子组件点击事件传过来文章编号
    showChildClickTab(data){
      this.curShowArticleIndex = data-1;
      this.isShowArticleTab = true;
    },
  },
  data() {
    return {
      category: ["今日墙", "运动", "恋爱", "学习", "请教"],
      queryWhere: ["最新", "最热", "关注", "收藏"],
      articles: [
        {
          articleIndex: 1,
          articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "什么是新型冠状病毒？又是如何传播的？",
          createTime: "2021/3/18 18:10:00",
          articleWord: "",
          articleUrl:
            "https://yocoto.oss-cn-beijing.aliyuncs.com/%E4%BB%80%E4%B9%88%E6%98%AF%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92%EF%BC%9F%E5%8F%88%E6%98%AF%E5%A6%82%E4%BD%95%E4%BC%A0%E6%92%AD%E7%9A%84%EF%BC%9F.md",
          articleAuthor: "pxlong",
        },
        {
          articleIndex: 2,
          articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          createTime: "2021/3/18 18:10:00",
          articleWord:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
          articleAuthor: "pxlong",
        },
        {
          articleIndex: 3,
          articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          createTime: "2021/3/18 18:10:00",
          articleWord:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
          articleAuthor: "pxlong",
        },
        {
          articleIndex: 4,
          articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          createTime: "2021/3/18 18:10:00",
          articleWord:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
          articleAuthor: "pxlong",
        },
        {
          articleIndex: 5,
          articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          createTime: "2021/3/18 18:10:00",
          articleWord:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
          articleAuthor: "pxlong",
        },
        {
          articleIndex: 6,
          articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          createTime: "2021/3/18 18:10:00",
          articleWord:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
          articleAuthor: "pxlong",
        },
      ],
      tipArray: ["破站第一版发布了~", "请期待我们的版本二~"],
      isShowArticleTab: true,
      curShowArticleIndex: 0,
    };
  },
 
};
</script>
<style lang="scss">
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

/* 左边导航 */
.article-left {
  background-color: white;
  width: 175px;
  height: 1500px;
  position: relative;
  top: 25px;
  left: 30px;
}

.article-left .block {
  width: 80%;
  height: 90%;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
  top: 20px;
  margin: 0 auto;
  border-radius: 32px 0px 0px 32px;
}
.article-left .block .icon {
  width: 100%;
  height: 50px;
  position: relative;
  top: 35px;
  left: 20px;
}
.article-left .block .category-item {
  display: inline-block;
  width: 100%;
  font-family: "Arial Black", "Arial Normal", "Arial", sans-serif;
  font-style: normal;
  font-size: 18px;
  height: 61px;
  text-align: center;
  margin-top: 70px;
}

.choosed {
  font-weight: 900;
  font-size: 20px;
}

/* 中间板块 */
/* .bg-purple-light {
  background: rgb(249, 249, 249);
  width: 100%;
  position: relative;
  top: 50px;
  height: 1400px;
} */

.article {
  background: rgb(249, 249, 249);
  width: 100.5%;
  position: relative;
  top: 50px;
  height: 1400px;
  padding: auto;
}

.article-right-area1 {
  width: 66%;
  position: relative;
  top: 0px;
  background-color: rgb(249, 249, 249);

  float: left;
}

.article-right-query {
  background-color: #e9f1f9;
  height: 65px;
  border-radius: 0px 50px 50px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.article-right-query i {
  font-family: "方正姚体", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  line-height: 58px;
}

.article-right-content {
  display: inline-block;
  width: 100%;
  margin-top: 35px;
  height: 1300px;
  margin-left: 40px;
}

.article-right-area2 {
  float: left;
  margin-left: 55px;
}

.search {
  width: 500px;
  height: 50px;
}

.search-input {
  position: relative;
  top: 2px;
  width: 245px;
  height: 33px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(162, 209, 232, 1);
  border-radius: 196px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;

  display: inline-block;
}
.search-icon {
  width: 40px;
  height: 40px;
  position: relative;
  top: 7px;
  left: 15px;
  display: inline-block;
}

.tips {
  background-color: white;
  width: 100%;
  border-width: 0px;
  height: 254px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 127px;
  border-radius: 10px;
  box-shadow: 3px 3px 15px 1px #c7c6c6;
  margin-top: 50px;
}

.tips-item-title {
  font-size: 33px;
  padding: 20px 0 20px 20px;
  font-family: "Comic Sans MS Normal", "Comic Sans MS", sans-serif;
  font-weight: 400;
}

.tips-item {
  font-family: "微软雅黑", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  line-height: 40px;
  padding-left: 40px;
}

.hot {
  width: 100%;
  height: 862px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 127px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  box-shadow: 3px 3px 15px 1px #c7c6c6;
  font-size: 28px;
  margin-top: 40px;
}

.hot-title {
  width: 453px;
  height: 50px;
  font-family: "Arial Black", "Arial Normal", Arial, sans-serif;
  font-weight: 900;
  font-style: normal;
  font-size: 28px;
  color: black;
  background-color: #8881f5;
  line-height: 50px;
  text-align: center;
  border-radius: 50px;

  display: inline-block;
  margin-left: 5%;
  margin-top: 35px;
  margin-bottom: 20px;
}

.hot-item {
  font-family: "Comic Sans MS Normal", "Comic Sans MS", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 23px;
  margin: 5px 80px;
}

/* 点击后的article-tab */
.article-click-tab {
  background-color: white;
  width: 98%;
  // height: 1200px;
  z-index: 15;
  margin-top: 50px;

  // 变为内联块，可以根据内容来伸缩
  display: inline-block;

  .article-tab-content {
    width: 70%;
    height: 100%;
    background-color: white;
    border: #d3dce6 1px solid;
    box-shadow: 3px 3px 15px 1px #c7c6c6;
    border-radius: 20px;
    padding: 10px;
    display: inline-block;

    .article-tab-close {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: relative;
      border: #000 0.5px solid;
      top: 5px;
      left: 5px;
    }

    .article-content-top {
      width: 75%;
      height: 100px;
      // background: skyblue;
      margin: 0 auto;

      .info {
        width: 25%;
        height: 70%;
        // background-color: red;
        display: inline-block;
        margin-top: 13px;
        margin-left: 12px;

        .avator {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          line-height: 60px;
          float: left;
        }

        .username {
          font-size: 24px;
          font-weight: bolder;
          line-height: 65px;
          float: right;
          margin-right: 50px;
        }
      }

      .actions {
        display: inline-flex;
        // background-color: red;
        width: 15%;
        height: 70%;
        margin-top: 13px;
        float: right;
        margin-right: 20px;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 30px;

        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .like {
        }
      }
    }

    .article-content-block {
      width: 75%;
      // height: 80%;
      margin: 15px auto;

      .article-content-title {
        text-align: center;
        font-size: 25px;
        font-family: "黑体";
        font-weight: 400;
        margin: 20px 0px;
      }
    }
  }
  .article-tab-comment {
    display: inline-block;

    width: 20%;
    height: 100%;
    background-color: red;
    position: absolute;
    right: 50px;
  }
}
</style>