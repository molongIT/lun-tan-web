import Vue from 'vue'
import App from './App.vue'
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入路由和路由配置
import VueRouter from 'vue-router'
import routerConfig from './router.config.js'
// axios:
import api from './axios/http/api';
import http from './axios/http/http';
// 装载VueX
import store from "./store/store";

// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.$http = http;


//使用:
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter(routerConfig);

//阻止显示生产模式的消息
Vue.config.productionTip = false;

//挂载
new Vue({
  router,
  //render函数是vue通过js渲染dom结构的函数createElement，约定可以简写为h
  store,
  render: h => h(App),
}).$mount('#app')