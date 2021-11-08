<template>
  <div id="root">
    <div class="top">
      <input v-model="article.articleTitle" placeholder="请输入文章标题" />
      <el-select
        class="select"
        v-model="article.articleCategoryId"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 上传图片辅助功能 -->
      <input
        class="upload-img"
        type="file"
        value="选择文件"
        ref="fileUpload"
        @change="uploadFile"
      />
      <el-progress :percentage="this.percent"></el-progress>
      <el-button class="add" type="primary" @click="publish">发表</el-button>
    </div>
    <div class="area1">
      <textarea
        v-model="article.articleDescription"
        placeholder="请输入文章描述信息"
      >
      </textarea>
      <div v-html="compileMarkdown"></div>
    </div>
    <div class="area2">
      <textarea v-model="article.articleUrl" placeholder="请输入文章内容">
      </textarea>
      <div v-html="compileMarkdown2"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
var COS = require("cos-js-sdk-v5");
import axios from "axios";
export default {
  name: "writePage",
  data() {
    return {
      article: {
        articleTitle: "",
        articleDescription: "",
        articleCategoryId: "",
        articleUrl: "",
        userId:"",
      },
      options: [
        {
          value: "1",
          label: "学习",
        },
        {
          value: "2",
          label: "运动",
        },
        {
          value: "3",
          label: "恋爱",
        },
        {
          value: "4",
          label: "今日墙",
        },
        {
          value: "5",
          label: "请教",
        },
      ],
      percent: 0,
    };
  },
  methods: {
    publish() {
      // todo:抽取公共方法：是否已经登陆。
      this.article.userId = this.$store.getters.getUserInfo.user.id
      console.log(this.article);
      this.$http
        .post("/article", this.article)
        .then(() => {
          window.alert("添加成功");
          this.$router.push({ path: "index" });
        })
        .catch((res) => {
          console.log(res);
        });
    },
    uploadFile(e) {
      let _this = this;
      const file = e.target.files[0];
      const bucketPath = `avatar/${file.name}`; // Key: 对象键（Object 的名称），对象在存储桶中的唯一标识
      const cos = new COS({
        // 请求后端api获取临时凭证
        getAuthorization: (options, callback) => {
          axios.get("/cos", null).then((res) => {
            const data = res.data;
            const obj = {
              TmpSecretId: data.credentials.tmpSecretId,
              TmpSecretKey: data.credentials.tmpSecretKey,
              XCosSecurityToken: data.credentials.sessionToken,
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
            };
            callback(obj);
          });
        },
      });
      // 分片上传
      cos.sliceUploadFile(
        {
          Bucket: "luntan-1304511484", // 存储桶名称，必须;Bucket 格式：test-1250000000
          Region: "ap-nanjing", // 存储桶所在地域, 必须
          Key: bucketPath,
          StorageClass: "STANDARD", //官方默认值
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
           console.log("11");console.log(_this.percent);
            _this.percent=progressData.percent * 100;
          },
        },
        function (err, data) {
          console.log(err || data);
          const fileUrl = "http://" + data.Location;
          var mdUrl = "![avatar](" + fileUrl + ")";
          var input = document.createElement("input"); // js创建一个input输入框
          input.value = mdUrl; // 将需要复制的文本赋值到创建的input输入框中
          document.body.appendChild(input); // 将输入框暂时创建到实例里面
          input.select(); // 选中输入框中的内容
          document.execCommand("Copy"); // 执行复制操作
          document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
          alert("已复制好，可贴粘。");
        }
      );
    },
  },
  computed: {
    compileMarkdown() {
      return marked(this.article.articleDescription, { sanitize: true });
    },
    compileMarkdown2() {
      return marked(this.article.articleUrl, { sanitize: true });
    },
  },
  created() {
    if(this.$store.getters.getUserInfo == ''){
        alert("请先登录")
         this.$router.push({ path: "login" });
      }
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

.upload-img {
  width: 20%;
  margin-left: 2%;
}
</style>