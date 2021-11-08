import axios from 'axios';

// 请求拦截
axios.interceptors.request.use(config => {
    // 1. 这个位置就请求前最后的配置
    // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
    config.headers['Content-Type'] = 'application/json'
    //如果有 token 就带上
    config.headers.Authorization = sessionStorage.getItem('Authorization');
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据
    return response;
}, error => {
    // 请求失败
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                // 对400错误您的处理\
                break
            case 401:
                // 对 401 错误进行处理
                break
            case 403:
                // token过期
                sessionStorage.removeItem('Authorization')
                sessionStorage.removeItem('userInfo')
                alert("用户登陆已过期，请重新登陆")
                return Promise.reject(error);
            default:
                // 如果以上都不是的处理
                return Promise.reject(error);
        }
    }

})
// console.log(process.env);
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080' : 'https://loveandshare-1382294-1304511484.ap-shanghai.run.tcloudbase.com'
export default {
    /**
     * get 请求
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    get(url,data) {
        return axios.get(url,{params:data});
    },

    /**
     * post 请求
     *
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    post(url, data) {
        return axios.post(url, data);
    },

    /**
     * put请求
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    put(url, data, auth = false) {
        if (auth) {
            return axios.put(url, data, {
                headers: {
                    Authorization: 'Your back-end user authenticates information'
                }
            });
        } else {
            return axios.put(url, data);
        }
    },

    /**
     * 删除
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise}
     */
    del(url, auth = false) {
        if (auth) {
            return axios.delete(url, {
                headers: {
                    Authorization: 'Your back-end user authenticates information'
                }
            });
        } else {
            return axios.delete(url);
        }
    },

    /**
     * 上传文件
     * @param url 接口路由
     * @param file 接口文件
     * @param auth 是否需要带登录信息
     */
    uploader(url, file, auth = false) {
        let param = new FormData();
        param.append('file', file)
        if (auth) {
            return axios.post(url, param, {
                headers: {
                    Authorization: 'Your back-end user authenticates information'
                }
            })
        } else {
            return axios.post(url, param)
        }
    },
}
