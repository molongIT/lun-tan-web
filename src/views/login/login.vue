<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <div class="title">
        <div
          class="login-title"
          :class="{ chooseModel: model == 'login' }"
          @click="model = 'login'"
        >
          登录
        </div>
        <div
          class="register-title"
          :class="{ chooseModel: model == 'register' }"
          @click="model = 'register'"
        >
          注册
        </div>
      </div>

      <el-input
        class="input"
        placeholder="请输入用户名"
        v-model="form.username"
      ></el-input>
      <el-input
        class="input"
        placeholder="请输入密码"
        v-model="form.password"
      ></el-input>
      <el-button
        v-if="model == 'login'"
        type="primary"
        @click="login"
        class="btn"
        >登录</el-button
      >
      <el-button
        v-if="model == 'register'"
        type="primary"
        @click="register"
        class="btn"
        >注册</el-button
      >
    </el-form>
  </div>
</template>
<script>
// import {mapMutations} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      model: "login",
      form: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    // ...mapMutations(['setToken']),
    // ...mapMutations(['setUser']),

    login() {
      let _this = this;
      this.$http
        .post("/auth", this.form)
        .then((res) => {
          // 将用户token和user保存到sessionStorage中
          sessionStorage.setItem("Authorization", "Bearer " + res.data.token);
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          // 将userInfo也保存到vuex中，解决跳转后用户信息不能立即更新问题
          this.$store.state.userInfo = JSON.stringify(res.data.userInfo);
          _this.toBlogPage();
        })
        .catch(() => {
          window.alert("用户名或密码错误，请重新登录");
        });
    },

    register() {
      console.log("注册");
      // 判断用户名是否重复
      this.$http
        .get("/user", { username: this.form.username })
        .then((res) => {
          console.log(res);
          if (res.data.data != null) {
            window.alert("该用户已被注册");
            return;
          }
          this.$http
            .post("/user", this.form)
            .then(() => {
              alert("注册成功，请登陆");
            })
            .catch((err) => {
              console.log(Promise.reject(err));
            });
        })
        .catch((err) => {
          console.log(Promise.reject(err));
          window.alert("用户名或密码错误，请重新登录");
        });
    },

    toBlogPage() {
      window.alert("登录成功");
      this.$router.push({ path: "/Index" });
    },
  },
};
</script>
<style lang="scss">
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(38, 38, 38); /* 透明背景色 */
  padding: 50px 100px 100px;
  border-radius: 10px; /* 圆角 */
  position: absolute;
  right: 5%;
  top: 8%;

  .chooseModel {
    color: white;
    background-color: #393939;
    border-radius: 20px;
  }

  .btn {
    background-color: #4868c9;
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 20px;
    text-align: center;
    font-size: 20px;
  }
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../assets/loginBg.png");
  background-size: 100% 100%;

  .input {
    margin-bottom: 20px;
  }
  .el-input__inner {
    background-color: #393939;
    border: none;
    border-radius: 20px;
    height: 46px;
    padding-left: 10%;
    color: white;
  }
}

/* 标题 */

.title {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  background-color: black;
  border-radius: 20px;
  height: 45px;
  font-size: 20px;
}
.login-title {
  display: inline-block;
  color: white;
  text-align: center;
  width: 50%;
  height: 45px;
  line-height: 45px;
}

.register-title {
  display: inline-block;
  color: #303133;
  text-align: center;
  width: 50%;
  height: 45px;
  line-height: 45px;
}

.label {
  color: black;
  font-weight: bolder;
}
</style> -->

