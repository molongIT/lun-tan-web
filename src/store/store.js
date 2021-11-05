import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        // 存储token
        Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
        // 存储用户信息
        userInfo: sessionStorage.getItem('userInfo') ? sessionStorage.getItem('userInfo') : '',
    },

    mutations: {
        setToken: tokenStr => {
            sessionStorage.setItem('Authorization', 'Bearer ' + tokenStr);
        },
        setUser: userInfo => {
            sessionStorage.setItem('userInfo', 'Bearer ' + userInfo);
        },
        removeAll: function(){
            console.log(1111);
            sessionStorage.removeItem('Authorization')
            sessionStorage.removeItem('userInfo')
            this.state.Authorization = ''
            this.state.userInfo = ''
        }
    },
    getters: {
        getUserInfo: (state) => {
            if (state.userInfo != '') {
                const userObj = JSON.parse(state.userInfo)
                return userObj;
            }
            return state.userInfo;
        }
    }

});

export default store;