import base from './index';

const { axios } = base;
const { baseUrl } = base;

// 获取好友
export const getFriend = (params) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/friendList`,
    data: params,
  }).then((res) => res.data);
};

// 获取聊天信息
export const getChatMsg = (params) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params,
  }).then((res) => res.data);
};
