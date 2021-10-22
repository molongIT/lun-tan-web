var COS = require('cos-js-sdk-v5');
import axios from 'axios';


var cos = new COS({
    getAuthorization: function () {
        // 异步获取临时密钥
        axios.get('/cos', null)
            .then((res) => {
                var credentials = res.data.credentials;
                this.TmpSecretId = credentials.tmpSecretId
                this.TmpSecretKey = credentials.tmpSecretKey
                this.SecurityToken = credentials.sessionToken
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                this.StartTime = res.data.startTime // 时间戳，单位秒，如：1580000000
                this.ExpiredTime = res.data.expiredTime // 时间戳，单位秒，如：1580000900
            })
    }
});
export default cos;

export default {
    putObject() {}

}