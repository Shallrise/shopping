<template>
  <div class="shopping-car">
    <h3>购物车</h3>
    <header>
        <span>
            <input type="checkbox" @click="changAll">全选</span>
        <span>选择</span>
        <span>商品</span>
        <span>价格</span>
        <span>数量</span>
        <span>总计</span>
    </header>
    <main>
    <div v-for="(item, index) in shopData" :key="index">
        <span>
        <input v-model="item.checked" type="checkbox" style="height: 20px; width: 20px;" @change="changCheck(item.checked)">
        </span>
        <span>
            <a href="">
                <img  :src="`http://202.193.53.235:8080/`+item.thumbnail" alt="" style="width: 76px; height: 75px;">
            </a>
            <a href="">
                  {{ item.name }}
            </a>
        </span>
        <span>
            <i>&yen;</i>
            {{ item.price }}
        </span>
        <span>
                {{item.num}}
        </span>
        <span>
            <i>&yen;</i>
            {{item.num*item.price}}
        </span>
        <span>
            <el-button type="danger" plain v-on:click="del(item.cardid)">删除</el-button>
        </span>
    </div>
     </main>
     <footer>
        <span>
            一选择{{count}}
            <strong></strong>
            件商品
        </span>
        <span>
            总价：
            <strong>
                <i>&yen;</i>{{sum}}
            </strong>
        </span>
        <button @click="Settlement">去结算</button>
    </footer>
  </div>
</template>
<script>
export default {
  name: "shopCart",
  data() {
    return {
      shopData: {},
      goods:[],
    };
  },
  mounted() {
    this.postRequest("/cart/listByUser", {
      userId: localStorage.getItem("userId"),
    })
      .then((res) => {
        // console.log(res);
        res.data.forEach(v=>{
            v['checked']=false;
        })
        console.log(res.data);
        this.shopData = res.data;
        // console.log(this.shopData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed:{
      sum(){
          let sum=0;
          this.shopData.forEach((item)=>{
              sum+=parseFloat(item.price*item.num);
          })
          return parseFloat(sum);
        },
      count(){
          let count=0;
          this.shopData.forEach((item)=>{
              count+=parseFloat(item.num);
          })
          return count;
      }
  },
  methods:{
      del(cardId){
          this.postRequest("/cart/deleteById",{
              userId:localStorage.getItem("userId"),
              cartId:cardId
          }).then((res)=>{
              this.$message({
                message: '删除成功',
                type: 'success'
                });
                this.$router.go(0)
              console.log(res);
          }).catch((error)=>{
              console.log(error);
          })
      },
      changAll(){
          this.shopData.forEach((i)=>{
              if(i.checked===false){
                  i.checked=true;
              }
          })
      },
      changCheck(check){
        if(check===false){
            this.shopData.checked=true
        }else{
            this.shopData.checked=false;
        }
      },
      Settlement(){
          let cardlist=""
          for(var i in this.shopData){
              if(this.shopData[i].checked===true){
                  this.goods.push(this.shopData[i].cardid);
              }
          }
          console.log(this.goods);
          this.goods.forEach((self)=>{
              cardlist+=self+','
          })
          cardlist = cardlist.substring(0, cardlist.length - 1)
          this.postRequest("order/addCastOrder",{
              userId:localStorage.getItem("userId"),
              cartList:cardlist
          }).then((res)=>{
              this.$message.success('创建订单成功');
              console.log(res);
          })
      },
  },
};
</script>
<style src="../assets/css/shop.css"></style>