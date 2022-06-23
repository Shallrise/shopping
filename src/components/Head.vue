<template>
    <div>
        <button>
        <router-link :to="{name:'shopCart'}">
            购物车管理
        </router-link>
        </button>
        <button>
        <router-link :to="{name:'Order'}">
            订单管理
        </router-link>
        </button>
    </div>
</template>