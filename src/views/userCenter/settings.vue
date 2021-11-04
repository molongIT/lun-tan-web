<!-- 用户个人中心页面 -->
<template>
  <div>
    <div class="settings">
        <h2>Settings</h2>
        <h3>个人信息修改</h3>
        <div>请上传你的头像</div>
        <button>选择文件</button>
        <div>用户名</div>
        <input type="text">
        <div>性别</div>
        <el-radio-group>
          <el-radio>男</el-radio>
          <el-radio>女</el-radio>
        </el-radio-group>
        <div>密码</div>
        <input type="text">
        <div>重复密码</div>
        <input type="text">
        <div></div>
        <button>保存</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>