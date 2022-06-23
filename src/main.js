import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { postRequest } from './axios/api'
import { getRequest } from './axios/api'
import { putRequest } from './axios/api'
import { deleteRequest } from './axios/api'
import VueLazyload from 'vue-lazyload'

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyload)

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next) => {
    if (to.path === '/host') {
        const tokenStr = window.sessionStorage.getItem('tokenStr');
        if (tokenStr) {
            //判断用户信息是否存在
            if (!window.sessionStorage.getItem('user')) {
                return postRequest('/user/login').then(resp => {
                    if (resp) {
                        //存入用户信息
                        window.sessionStorage.setItem('user', JSON.stringify(resp));
                        next();
                    }
                })
            }
            next();
        } else {
            next('/login')
        }
    } else {
        next();
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')