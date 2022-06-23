<template>
  <div class="shopping-car" >
     <h3>订单管理</h3>
    <header>
        <span>商品名称</span>
        <span>价格</span>
        <span>数量</span>
        <span>创建时间</span>
    </header>
     <div v-for="(s, index) in orders" :key="index">
    <main>
    <div v-for="item in s.orderDetail" :key="item.goodsId">
        <span>
        
        </span>
        <span>
            <a href="">
                  {{ item.goodsName }}
            </a>
        </span>
        <span>
            <i>&yen;</i>
            {{ item.nums.split('=')[1] }}
        </span>
        <span>
                {{item.nums.split(',')[0]}}
        </span>
        <span>
            {{s.orderTime}}
        </span>
        <span>
            
        </span>
    </div>
     </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data: () => ({
    orders: []
  }),
  mounted() {
    this.postRequest("/order/listByUser",{
        userId: localStorage.getItem("userId"),
    }).then((res) => {
        console.log(res.data);
          this.orders = res.data
          this.$message.info('获取订单列表成功');
        })
  }
}
</script>

<style src="../assets/css/order.css"></style>