import Vue from 'vue'
//全局引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import Resource from 'vue-resource'
import App from './App.vue'
import echarts from 'echarts'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(Resource)
Vue.use(moment)
Vue.config.productionTip = false;
//用途就是允许跨域请求携带cookie做身份认证
Vue.http.options.xhr = {withCredentials: true}
Vue.http.options.emulateJSON = true
//拦截器，作用是可以在请求前和发送请求后做一些处理
Vue.http.interceptors.push(function (request, next) {//拦截器
// 跨域携带cookie
  request.credentials = true;
  //全局403 刷新页面
  next((res) => {
    console.log(res);
    console.log(res.data.status);
    if (res.data.status == 403) {
      sessionStorage.clear();
      window.location.reload();
      this.$router.push({path:'/App'})
      if(res.data.msg=='密码修改成功'){
        alert('密码修改成功')
      }
    }
    if (res.status == 0||res.status==500) {
      this.$message({
        type: 'error',
        message: '服务器中断...'
      })
    }
  })
});

//全局url
import global from './global'

Vue.prototype.url = global.web;//后台路径
Vue.prototype.urldown = global.urldown;//导出
Vue.prototype.urls = global.urls;//图片上传
Vue.prototype.vedioUrl = global.vedioUrl;//视频上传
//全局时间函数
import {formatDate} from './methods'

Vue.filter('time', function (value) {
  let date = new Date(value);
  // return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
  return formatDate(date, 'yyyy-MM-dd hh:mm');
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // template: '<App/>',
  // components: { App }
});
