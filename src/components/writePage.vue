<template>
  <div id="root">
    <div class="top">
      <input :value="this.articleTitleInput" placeholder="请输入文章标题" />
      <el-select
        class="select"
        v-model="value"
        placeholder="请选择"
        @change="selectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button class="add" type="primary" @click="publish">发表</el-button>
    </div>
    <div class="area1">
      <textarea v-model="descriptionInput" placeholder="请输入文章描述信息">
      </textarea>
      <div v-html="compileMarkdown2"></div>
    </div>
    <div class="area2">
      <textarea v-model="articleInput" placeholder="请输入文章内容"> </textarea>
      <div v-html="compileMarkdown"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  name: "writePage",
  data() {
    return {
      artile: {
        articleTitle: "",
        articleCategory:"",
      },
      articleTitleInput: "",
      descriptionInput: "",
      articleInput: "",
      options: [
        {
          value: "1",
          label: "今日墙",
        },
        {
          value: "2",
          label: "学习",
        },
        {
          value: "3",
          label: "考研",
        },
        {
          value: "4",
          label: "恋爱",
        },
        {
          value: "5",
          label: "运动",
        },
      ],
    };
  },
  methods: {
    publish() {
      this.$http
        .post("/article", this.article)
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    selectChange(val) {
      let obj = {};
      obj = this.options.find((item) => {
        return item.value === val;
      });
      this.article.articleCategory = obj.val;
      console.log(this.article)
    },
  },
  computed: {
    compileMarkdown() {
      return marked(this.articleInput, { sanitize: true });
    },
    compileMarkdown2() {
      return marked(this.descriptionInput, { sanitize: true });
    },
  },
};
</script>
<style scoped lang="scss">
#root {
  margin: 0;
  height: 100%;
  color: #333;
}
.area1 {
  display: inline-block;
  width: 100%;
  height: 200px;
  textarea {
    border: none;
    border-right: 1px solid #ccc;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    padding: 20px;
    height: 200px;
    width: 49%;
  }

  div {
    display: inline-block;
    width: 40%;
    height: 200px;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }
}
.area2 {
  display: inline-block;
  width: 100%;
  height: 1000px;
  textarea {
    border: none;
    border-right: 1px solid #ccc;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    padding: 20px;
    height: 1000px;
    width: 49%;
  }

  div {
    display: inline-block;
    width: 40%;
    height: 1000px;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }
}

.top {
  padding: 0px 10px;
}

input {
  -web-kit-appearance: none;
  -moz-appearance: none;
  width: 40%;
  height: 40px;
  font-size: 19px;
  float: left;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  padding-left: 6px;
  margin: 20px 0px;
}

.select {
  margin: 20px 0px 0px 20px;
}

.add {
  margin-left: 20px;
}
</style>