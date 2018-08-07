//正式上线--需要改的有图片路径和url和去除打印信息
// const web = 'http://192.168.8.81:8084';//罗宾
// const web = 'http://192.168.8.21:8084';//老孟
// const web = 'http://192.168.8.126:8084';//毛毛
// const web = 'http://192.168.8.197:8084';//金山
//const web = 'http://192.168.8.123:8099';//秦昊

//
const web = 'http://120.55.54.65:8088';//测试test
const urls = 'http://192.168.7.51:8099/Image/upload_image/';//测试图片上传test  之前'http://116.62.165.6/Image/upload_image/'
const vedioUrl = 'http://192.168.7.51:8099';//测试视频

// const web = 'http://47.96.154.252:8080';//线上
// const urls = 'https://file.qqsk.com/Image/upload_image/';//线上图片上传 (之前是http://47.96.154.252:8088,现在换成https://file.qqsk)
// const vedioUrl = 'https://file.qqsk.com';//线上视频

const urldown = 'https://file.qqsk.com';// 线上格式导出时才用 ,其余导出用url(之前是116.62)

export default {
  web,//线下--url
  urls,//图片
  urldown,//导出
  vedioUrl,//视频
};
