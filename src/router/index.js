import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Host from '../components/Host.vue'
import Detail from '../common/Detail.vue'
import shopCart from '../common/shopCart.vue'
import Order from '../common/Order.vue'
import LoginUp from '../components/Loginup.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login', component: Login },
    { path: '/login', component: Login },
    { path: '/host', name: 'Host', component: Host },
    { path: '/details/:id', name: 'Detail', component: Detail },
    { path: '/shopCart', name: 'shopCart', component: shopCart },
    { path: '/order', name: 'Order', component: Order },
    { path: '/loginup', name: 'Loginup', component: LoginUp }
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router