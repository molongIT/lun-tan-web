<template>
    <div class="login-container">
        <el-form ref="form" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">论坛用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    // import {mapMutations} from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: "admin",
                    password: "123456"
                }
            };
        },
        methods: {
            onSubmit() {
                // 请求登录接口
                this.login();
            },

            // ...mapMutations(['setToken']),
            // ...mapMutations(['setUser']),

            login(){
                let _this = this;
                this.$http
                    .post("/auth",this.form)
                    .then((res) => {
                        // 将用户token和user保存到sessionStorage中
                        sessionStorage.setItem('Authorization', 'Bearer ' + res.data.token);
                        sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
                        // 将userInfo也保存到vuex中，解决跳转后用户信息不能立即更新问题
                        this.$store.state.userInfo = JSON.stringify(res.data.userInfo)
                        _this.toBlogPage();
                    })
                    .catch((err) => {
                        console.log(Promise.reject(err));
                        window.alert("用户名或密码错误，请重新登录");
                    });
            },

            toBlogPage(){
                window.alert("登录成功")
                this.$router.push({ path: '/Index'})
            }
        }
    }
</script>
<style acoped>
    .login-form {
        width: 350px;
        margin: 160px auto; /* 上下间距160px，左右自动居中*/
        background-color: rgba(255, 255, 255, 0.8); /* 透明背景色 */
        padding: 30px;
        border-radius: 20px; /* 圆角 */
    }

    /* 背景 */
    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../../assets/xingkong.png");
    }

    /* 标题 */
    .login-title {
        color: #303133;
        text-align: center;
    }
</style> -->

