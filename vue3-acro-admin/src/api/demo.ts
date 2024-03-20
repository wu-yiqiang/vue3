import axios from 'axios';

const baseURL = 'http://127.0.0.1:9527';

// export const uploadFile = (
//   url: string,
//   formData: object,
//   onUploadProgress = () => {}
// ) => {
//   return axios({
//     method: 'post',
//     url,
//     baseURL,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data: formData,
//     onUploadProgress: onUploadProgress,
//   });
// };
// 上传进度没做好
export const uploadFile = (
  url: string,
  formData: object,
  onUploadProgress = () => {}
) => {
  return axios.post('http://127.0.0.1:9527/file/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
    // onUploadProgress: onUploadProgress,
  });
};

export const mergeChunks = (url: string, data: object) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
};

// export const mergeChunks = (url: string, data: object) => {
//   return axios.post('http://127.0.0.1:9527/file/mergechunks', data, {
//     headers: { 'Content-Type': 'application/json' }, //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
//   });
// };
