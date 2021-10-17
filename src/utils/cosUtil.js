var COS = require('cos-js-sdk-v5');
var cos = new COS({
   // 必选参数
   getAuthorization: function (options, callback) {
       // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
       // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
       // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
       $.get('http://example.com/server/sts.php', {
           // 可从 options 取需要的参数
       }, function (data) {
           var credentials = data && data.credentials;
           if (!data || !credentials) return console.error('credentials invalid');
           callback({
               TmpSecretId: credentials.tmpSecretId,
               TmpSecretKey: credentials.tmpSecretKey,
               SecurityToken: credentials.sessionToken,
               // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
               StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
               ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
           });
       });
   }
});

export default{
    putObject(){
        cos.putObject({
            Bucket: 'examplebucket-1250000000', /* 必须 */
            Region: 'COS_REGION',     /* 存储桶所在地域，必须字段 */
            Key: 'exampleobject',              /* 必须 */
            StorageClass: 'STANDARD',
            Body: fileObject, // 上传文件对象
            onProgress: function(progressData) {
                console.log(JSON.stringify(progressData));
            }
         }, function(err, data) {
            console.log(err || data);
         });
    }
   
}