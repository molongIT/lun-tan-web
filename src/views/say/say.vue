<template>
  <el-row :gutter="10">
    <!-- 点击后的文章tab -->
    <!-- todo: 改为计算属性-->
    <div :class="['article-click-tab']" v-show="isShowArticleTab">
      <div class="article-tab-content">
        <img
          class="article-tab-close"
          src="../../assets/svg/close.svg"
          @click="closeAlert"
        />
        <div class="article-content-top">
          <div class="info">
            <img
              class="avator"
              :src="articles[curShowArticleIndex].articleImg"
              alt=""
              v-if="articles.length > 0"
            />
            <div class="username" v-if="articles.length > 0">
              {{ articles[curShowArticleIndex].articleAuthor }}
            </div>
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
          <div class="article-content-title" v-if="articles.length > 0">
            {{ articles[curShowArticleIndex].articleTitle }}
          </div>
          <div class="article-content-word" v-if="articles.length > 0">
            <MyMarkdown :content="articles[curShowArticleIndex].articleUrl">
            </MyMarkdown>
          </div>
        </div>
      </div>

      <div class="article-tab-comment"></div>
    </div>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
      <div :class="['article-left']">
        <div :class="['block', { leftTabFixed: isLeftTabFixed }]">
          <div class="icon">
            <img src="../../assets/svg/category.svg" />
          </div>
          <!-- 左侧分类 -->
          <div class="category">
            <i
              :class="[
                'category-item',
                { 'category-item-ative': curCategoryTab == item },
              ]"
              @click="curCategoryTab = item"
              v-for="item in category"
              v-bind:key="item"
            >
              {{ item }}
            </i>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="21">
      <div class="article-right" v-show="!isShowArticleTab">
          <div class="article-right-area1">
            <div
              :class="['article-right-query', { topTabFixed: isTopTabFixed }]"
            >
              <!-- 查询条件 -->
              <i
                v-for="item in queryWhere"
                :key="item"
                :class="{ queryTabActive: curQueryWhere == item }"
                @click="curQueryWhere = item"
              >
                {{ item }}
              </i>
            </div>
            <div class="article-right-content">
              <MyList
                :list="this.articles"
                v-on:listenChildEvent="showChildClickTab"
              ></MyList>
            </div>
          </div>

          <div class="article-right-area2">
            <div class="search">
              <div class="search-input">
                <input type="text" />
              </div>
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
    this.queryArticles()
  },
  mounted() {
    // 待解决下拉文章列表和点击后跳出详情定位错误
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 离开该页面需要移除这个监听的事件，不然会报错。
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch:{
    curCategoryTab:function(){
      this.queryArticles()
    },
    curQueryWhere:function(){
      this.queryArticles()
    }

  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (190 <= scrollTop) {
        console.log("yes");
        // 固定左边栏和上边栏
        this.isLeftTabFixed = true;
        this.isTopTabFixed = true;
      } else {
        this.isLeftTabFixed = false;
        this.isTopTabFixed = false;
      }
    },
    // 子组件点击事件传过来文章编号
    showChildClickTab(data) {
      this.curShowArticleIndex = data;
      console.log(data);
      console.log(this.articles[data]);
      this.isShowArticleTab = true;
      // 修改body的overflow属性
      document.querySelector("body").setAttribute("style", "overflow:hidden;");
    },
    closeAlert() {
      this.isShowArticleTab = false;
      document.querySelector("body").setAttribute("style", "overflow:auto;");
    },
    // 请求文章列表
    queryArticles(){
      let _this = this;
    // api获取所有的文章列表
    //  携带articleCategoryId、queryWrapper
    let articleCategoryId = 1
    let queryWrapper = 1
    switch(this.curCategoryTab){
      case '今日墙':
          articleCategoryId = 1
          break
      case '运动':
         articleCategoryId = 2
          break
      case '恋爱':
          articleCategoryId = 3
          break
      case '学习':
         articleCategoryId = 4
          break
      case '请教':
         articleCategoryId = 5
         break
    }
    switch(this.curQueryWhere){
      case '最新':
          queryWrapper = 1
          break
      case '最热':
         queryWrapper = 2
          break
      case '收藏':
         queryWrapper = 3
          break
    }
    var articleQueryDto = {'articleCategoryId':articleCategoryId,'queryWrapper':queryWrapper}
    this.$http.get(this.$api.Articles.GetAllArticles,articleQueryDto).then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].articleUrl != null && result.data[i].articleUrl.startsWith('http')) {
          _this.$http.get(result.data[i].articleUrl).then((res) => {
            if (res != null) {
              result.data[i].articleUrl = res.data;
            }
          });
        }else if(result.data[i].articleUrl == null){
          // 解决因为null出现绑定bug问题
          result.data[i].articleUrl = ''
        }
      }
      _this.articles = result.data;
    })
    }
  },
  data() {
    return {
      category: ["今日墙", "运动", "恋爱", "学习", "请教"],
      queryWhere: ["最新", "最热", "收藏"],
      // articles: [
      //   {
      //     articleImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
      //     articleTitle: "什么是新型冠状病毒？又是如何传播的？",
      //     createTime: "2021/3/18 18:10:00",
      //     articleWord: "",
      //     articleUrl:
      //       "https://yocoto.oss-cn-beijing.aliyuncs.com/%E4%BB%80%E4%B9%88%E6%98%AF%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92%EF%BC%9F%E5%8F%88%E6%98%AF%E5%A6%82%E4%BD%95%E4%BC%A0%E6%92%AD%E7%9A%84%EF%BC%9F.md",
      //     articleAuthor: "pxlong",
      //   },
      // ],
      articles: "",
      tipArray: ["破站第一版发布了~", "请期待我们的版本二~"],
      isShowArticleTab: false,
      // 当前点击详情的文章
      curShowArticleIndex: 0,
      // 是否固定
      isLeftTabFixed: false,
      isTopTabFixed: false,
      clickTabStyle: {
        top: "200px",
      },
      curCategoryTab: "今日墙",
      curQueryWhere: "最新",
    }
  }
}
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
  top: 30px;
  left: 30px;
}

.article-left .block {
  width: 80%;
  height: 100%;
  background-color: rgba(246, 249, 252, 1);
  position: relative;
  top: 20px;
  margin: 0 auto;
  border-radius: 32px 0px 0px 32px;
}

.leftTabFixed {
  position: fixed !important ;
  width: 140px !important ;
  top: 18px !important ;
  left: 45px !important ;
  z-index: 14;
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

.category-item-ative {
  font-weight: 800;
  font-size: 20px !important;
}

.article-right {
  display: inline-block;
  background: rgb(249, 249, 249);
  position: relative;
  top: 50px;
  padding: auto;
  width: 230%;
}

.choosed {
  font-weight: 900;
  font-size: 20px;
}

.article-right-area1 {
  width: 66%;
  background-color: rgb(249, 249, 249);
  display: inline-block;
  .article-right-query {
    background-color: #e9f1f9;
    height: 65px;
    width: 95%;
    border-radius: 0px 50px 50px 0px;
    margin-left: 5%;
    // padding-left: 150px;
  }

  .article-right-query i {
    font-family: "方正姚体", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    line-height: 58px;
    margin: 0px 50px;
    display: inline-block;
  }

  .article-right-content {
    display: inline-block;
    width: 95%;
    margin-top: 35px;
    margin-left: 40px;
  }
}

.queryTabActive {
  font-weight: bolder !important;
  font-size: 22px !important;
}

.topTabFixed {
  position: fixed;
  top: 0px;
  z-index: 15;
  left: 10%;
}

.article-right-area2 {
  display: inline-block;
  width: 30%;
  position: absolute;
  top: 10px;
  right: 2px;
}

.search {
  width: 100%;
  height: 50px;
}

.search-input {
  input {
    -web-kit-appearance: none;
    -moz-appearance: none;
    width: 70%;
    height: 33px;
    font-size: 19px;
    float: left;
    color: rgb(0, 0, 0);
    border-radius: 30px;
    border: 2px solid #a0ccee;
    padding-left: 7px;
  }

  input:focus {
    outline: none;
  }
}

.search-icon {
  width: 15%;
  height: 40px;
  float: left;
  margin-left: 5%;
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
  font-size: 120%;
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
  width: 90%;
  height: 50px;
  font-family: "Arial Black", "Arial Normal", Arial, sans-serif;
  font-style: normal;
  font-size: 80%;
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
  font-size: 70%;
  margin: 5px 80px;
}

/* 点击后的article-tab */
.article-click-tab {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 99;
  overflow: auto;

  .article-tab-content {
    width: 70%;
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
          float: left;
          margin-left: 10px;
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