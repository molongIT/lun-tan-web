<!-- 用户个人中心页面 -->
<template>
  <div>
    <div class="settings">
      <div class="title">Settings</div>

      <div class="left">
        <div class="row-input">
          <span class="label">用户名</span>
          <input type="text" v-model="user.username" />
        </div>

        <div class="row-input">
          <span class="label">性别</span>
          <el-radio-group v-model="user.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </div>

        <div class="row-input">
          <span class="label">密码</span>
          <input type="text" />
        </div>

        <div class="row-input">
          <span class="label">重复密码</span>
          <input type="text" />
        </div>
      </div>

      <div class="right">
        <img :src="user.avatar" alt="" />
        <div>请上传你的头像</div>
        <input
          class="upload-img"
          type="file"
          value="选择文件"
          ref="fileUpload"
          @change="uploadFile"
        />
      </div>

      <div class="bottom">
        <el-button type="primary" @click="updateInfo()">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
var COS = require("cos-js-sdk-v5");
import axios from "axios";

export default {
  name: "settings",
  created() {
    const user = this.$store.getters.getUserInfo.user;
    this.user.id = user.id;
    this.user.username = user.username;
    this.user.gender = user.gender == "1" ? 1 : 0;
    this.user.avatar = user.avatar;
  },
  data() {
    return {
      user: {
        id: null,
        username: "",
        gender: 1,
        avatar:
          "https://luntan-1304511484.cos.ap-nanjing.myqcloud.com/avatar/0C3E3EC8-F3DF-4A89-8747-69082C383132.jpeg",
      },
    };
  },
  methods: {
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
            console.log(progressData);
          },
        },
        function (err, data) {
          console.log(err || data);
          if (data.statusCode == 200) {
            _this.user.avatar = "http://" + data.Location;
            alert("上传成功");
          }
        }
      );
    },

    updateInfo() {
      this.$http.put("user", this.user).then(() => {
        // 修改store中的数据
        let userObj = JSON.parse(this.$store.state.userInfo);
        console.log(userObj);
        userObj.user.username = this.user.username;
        userObj.user.avatar = this.user.avatar;
        userObj.user.gender = this.user.gender;
        let jsonObj = JSON.stringify(userObj);

        this.$store.state.userInfo = jsonObj;
        sessionStorage.setItem("userInfo", jsonObj);
        // 将userInfo也保存到vuex中，解决跳转后用户信息不能立即更新问题
        alert("修改成功");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  display: inline-block;
  padding: 20px;

  .title {
    font-size: 30px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  .left {
    display: inline-block;
    .row-input {
      margin: 23px 10px 0px;
      .label {
        font-weight: 500;
        font-size: 19px;
        color: #333;
        margin-right: 20px;
        display: inline-block;
        width: 30%;
      }
      input {
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: 16 px 18 px;
        margin-left: 10px;
        width: 55%;
        height: 20px;
      }
    }
  }

  .right {
    display: inline-block;
    position: relative;
    top: -59px;
    margin-left: 110px;
    img {
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  .bottom {
    margin-top: 40px;
    margin-left: 24%;
  }
}
</style>