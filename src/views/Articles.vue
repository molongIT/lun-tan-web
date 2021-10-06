<template>
  <div class="goods" id="goods" name="goods">
    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <MyList :list="articles" v-if="articles.length > 0"></MyList>
        <div v-else class="none-article">抱歉没有文章，请看看其他的页面</div>
      </div>
      <!-- 分页 -->
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div> -->
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
import MyList from "../components/MyList";
import axios from "axios";
export default {
  name: "Articles",
  components: {
    MyList,
  },
  data() {
    return {
      articles: [
        {
          articleIndex: 1,
          articlesImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          articleData: "2021/3/18 18:10:00",
          articleContent:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
        },
        {
          articleIndex: 2,
          articlesImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          articleData: "2021/3/18 18:10:00",
          articleContent:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
        },
        {
          articleIndex: 3,
          articlesImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          articleData: "2021/3/18 18:10:00",
          articleContent:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
        },
        {
          articleIndex: 4,
          articlesImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          articleData: "2021/3/18 18:10:00",
          articleContent:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
        },
        {
          articleIndex: 5,
          articlesImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          articleData: "2021/3/18 18:10:00",
          articleContent:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
        },
        {
          articleIndex: 6,
          articlesImg: "https://cdn.yocoto.cn/FjtXYx5K7FPXwdXXcSqKzpv11lI9",
          articleTitle: "睡觉睡觉睡觉",
          articleData: "2021/3/18 18:10:00",
          articleContent:
            "  是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间,是多久啊肯德基ask决定急啊撒娇第几啊时间",
        },
      ],
    };
  },
  mounted() {
    // 获取分类列表
    //this.getArticles();
  },

  methods: {
    getArticles() {
      // 当然如果你需要带登录信息去请求这个接口 可以在 路由后面跟上 true 或者 false 来决定是否在请求的时候带登录信息
      // 我们这样进行封装 就对一个 请求封装好了。
      this.$http
        .get(this.$api.Articles.GetAllArticles)
        .then((result) => {
          this.articles = result.data;
          for (let i = 0; i < this.articles.length; i++) {
            //解析url->str
            axios
              .get(this.articles[i].articleWord, {})
              .then((res) => {
                this.articles[i].articleWord = res.data;
              })
              .catch((err) => {
                console.log(Promise.reject(err));
              });
          }
        });
    },
  },
};
</script>
