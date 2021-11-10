<!--
    websocket后期功能拓展使用预留。
 -->
<template>
    <div>
       <!-- <el-button @click="sendDataToServer">测试：给后端发送消息。</el-button> -->
    </div>
</template>
<script>
export default {
  name: "WebSocket",
  data() {
    return {
      // ws是否启动
      wsIsRun: false,
      // 定义ws对象
      webSocket: null,
      // ws请求链接（类似于ws后台地址）
      ws: "",
      // ws定时器对象
      wsTimer: null,
    };
  },
  async mounted() {
    this.wsIsRun = true;
    this.wsInit();
  },
  methods: {
    sendDataToServer() {
      if (this.webSocket.readyState === 1) {
        this.webSocket.send(
          "来自前端的数据:生命不必每时每刻都要冲刺。低沉时，就当给自己放了一个悠长的假期"
        );
      } else {
        throw Error("服务未连接");
      }
    },
    /**
     * 初始化ws
     */
    wsInit() {
      let wsuri = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:8080/websocket/' : 'wss://loveandshare-1382294-1304511484.ap-shanghai.run.tcloudbase.com/websocket/'
      // const wsuri = 'ws://loveandshare-1382294-1304511484.ap-shanghai.run.tcloudbase.com/websocket/newh5'
      let user = this.$store.getters.getUserInfo.user;
      if(user!=null){
        wsuri = wsuri + user.id + Math.floor(Math.random()*10000)
      }else{
        return;
      }
      this.ws = wsuri;
      if (!this.wsIsRun) return;
      // 销毁ws
      this.wsDestroy();
      // 初始化ws
      this.webSocket = new WebSocket(this.ws);
      // ws连接建立时触发
      this.webSocket.addEventListener("open", this.wsOpenHanler);
      // ws服务端给客户端推送消息
      this.webSocket.addEventListener("message", this.wsMessageHanler);
      // ws通信发生错误时触发
      this.webSocket.addEventListener("error", this.wsErrorHanler);
      // ws关闭时触发
      this.webSocket.addEventListener("close", this.wsCloseHanler);
      // 检查ws连接状态,readyState值为0表示尚未连接，1表示建立连接，2正在关闭连接，3已经关闭或无法打开
      clearInterval(this.wsTimer);
      this.wsTimer = setInterval(() => {
        if (this.webSocket.readyState === 1) {
          clearInterval(this.wsTimer);
        } else {
          console.log("ws建立连接失败");
          this.wsInit();
        }
      }, 3000);
    },
    wsOpenHanler() {
      console.log("ws建立连接成功");
    },
    wsMessageHanler(e) {
      console.log("wsMessageHanler");
      const nextTodoObj = JSON.parse(e.data);
      console.log('nextTodoObj=========');
      console.log(nextTodoObj);
      // 数组，从倒数第一个开始往前移一个（仅仅内容变换）
      // 配合隐藏、显示动画
      this.$emit('listenChildEventForAddObj',nextTodoObj)
    },
    /**
     * ws通信发生错误
     */ wsErrorHanler(event) {
      console.log(event, "通信发生错误");
      this.wsInit();
    },
    /**
     * ws关闭
     */ wsCloseHanler(event) {
      console.log(event, "ws关闭");
      this.wsInit();
    },
    /**
     * 销毁ws
     */ wsDestroy() {
      if (this.webSocket !== null) {
        this.webSocket.removeEventListener("open", this.wsOpenHanler);
        this.webSocket.removeEventListener("message", this.wsMessageHanler);
        this.webSocket.removeEventListener("error", this.wsErrorHanler);
        this.webSocket.removeEventListener("close", this.wsCloseHanler);
        this.webSocket.close();
        this.webSocket = null;
        clearInterval(this.wsTimer);
      }
    },
  },
};
</script>
 
<style scoped>
</style>