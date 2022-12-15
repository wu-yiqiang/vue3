
// // import Vue from 'vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// // Vue.use(VueAxios , axios);
// // import { Toast , Dialog } from 'vant';
// import router from '@/router';
 
 
 
// // 全局设置axios发送cookie（axios 默认不发送cookie）
// // axios.defaults.withCredentials = true;
 
// // 创建 axios 实例
// const instance = axios.create({
//   baseURL : '/',
//   timeout : 5000,
//   headers : {
//     // 'Content-Type' : 'application/x-www-form-urlencoded', // Form Data
//     'Content-Type' : 'application/json', // Request Payload
//   },
//   withCredentials: true // 允许携带cookie
// });
 
// // 添加请求拦截器
// instance.interceptors.request.use((config)=>{
//   // 发送请求前做些什么
//   // config.headers.xxx = 'xxx';
//   return config;
// },(error)=>{
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
 
// // 添加响应拦截器
// instance.interceptors.response.use((response)=>{ 
//   // 对响应数据做些什么
//   if(response.data.status == '1002'){
//     // 1002 跳转登录
//     setTimeout(()=>{
//       // Toast('请登录');
//       Toast(response.data.message);
//     },100);
//     return false;
//   }
//   if (response.data.status == '1003') {
//     // 1003 个人信息（补全信息）
//     setTimeout(()=>{
//       // Toast('请补全个人信息');
//       Toast(response.data.message);
//     },100);
//     return false;
//   }else{
//     return response;
//   }
// },(error)=>{
//   // 对响应错误做些什么
//   // Dialog({ message: '系统繁忙,请刷新重试' });
//   return Promise.reject(error);
// });
 
// // export default instance;
 
 
 
// // url : 请求URL
// // data : 后台接收数据，取值：{id:1,...} 或 {}
// // loadingText : 是否需要请求的loading提示，取值：用户传递的值如:'加载中...' 或 ''
// // failDialog : 是否需要显示处理失败 response.data.status==0 的提示，取值：1 或 0
// // successToast : 是否需要显示处理成功 response.data.status==1 的提示，取值：1 或 0
 
// const request = {
//   // get 请求
//   get:function(url,data,loadingText,failDialog,successToast){
//     loadingText && Toast.loading({duration: 0,message: loadingText,forbidClick: true,});
//     data = data || {};
//     return instance.get(url,{params:data}).then(response=>{
//       if(!response){
//         return false;
//       }
//       // return Promise.resolve(response.data);
//       loadingText && (!successToast || response.data.status == 0) && Toast.clear();
//       response.data.status == 0 && failDialog && Dialog({ message: response.data.message });
//       response.data.status == 1 && successToast && Toast.success(response.data.data);
//       return response.data;
//     }).catch(error=>{
//       loadingText && Toast.clear();
//       return Promise.reject(error);
//     })
//   },
//   // post 请求
//   post:function(url,data,loadingText,failDialog,successToast){
//     loadingText && Toast.loading({duration: 0,message: loadingText,forbidClick: true,});
//     data = data || {};
//     return instance.post(url,data).then(response=>{
//       if(!response){
//         return false;
//       }
//       // return Promise.resolve(response.data);
//       loadingText && (!successToast || response.data.status == 0) && Toast.clear();
//       response.data.status == 0 && failDialog && Dialog({ message: response.data.message });
//       response.data.status == 1 && successToast && Toast.success(response.data.data);
//       return response.data;
//     }).catch(error=>{
//       loadingText && Toast.clear();
//       return Promise.reject(error);
//     })
//   }
// }
 
// export default request;