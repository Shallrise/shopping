import axios from 'axios'
import { Message } from 'element-ui'

//请求拦截器
axios.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, err => {
    Message.error({ message: '请求超时!' });
    return Promise.resolve(err);
})

//响应拦截器
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 'error') {
        Message.error({ message: data.data.msg });
        return;
    }
    return data;
}, err => {
    if (err.response.status == 504 || err.response.status == 404) {
        Message.error({ message: '服务器不见了' });
    } else if (err.response.status == 403) {
        Message.error({ message: '权限不足,请联系管理员!' });
    } else {
        Message.error({ message: '未知错误!' });
    }
    return Promise.resolve(err);
})

let base = '';

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`
    });
}
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`
    });
}
export default ({ app: { $axios } }) => {
    $axios.defaults.imgURL = 'http://202.193.53.235:8080';
}