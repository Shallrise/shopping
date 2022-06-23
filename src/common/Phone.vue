<template>
  <div class="box">
    <div class="inner">
    <ul class="phone_wrap">
      <li v-for="(item,index) in phoneData" :key="index">
        <!-- <router-link :to="`/details/${item.id}`"> -->
        <router-link :to="{
          name:'Detail',
          params:{
            id:item.id
          }
        }">
          <div class="item_img">
              <img :src="`http://202.193.53.235:8080/`+item.pthumbnail">
          </div>
          <h3 class="item_title">{{item.name}}</h3>
          <p class="item_price">{{item.price1}}</p>
          </router-link>
      </li>
    </ul> 
    </div>
  </div>
</template>

<script>
export default {
  name: "Phone",
  data() {
    return {
      phoneData: [],
    };
  },
  mounted() {
      this.getRequest("/goods/list")
        .then(res => {
          // console.log(res);
          this.phoneData = res.data;
        }).catch(error=>{
            console.log(error);
        });
  },
};
</script>

<style lang='less'>
.box{
  position:relative;
  .inner{
    position:absolute;
    .phone_wrap{
  li{
    width: 450px;
    height: 300px;
    padding: 20px 0;
    margin-left:14px;
    margin-bottom:14px;
    background: #fff;
    float:left;
    transition:all 0.5s;
    list-style:none;
    &:hover{
      transform: translate(0,-5px);
      box-shadow: 0 5px 10px rgba(0,0,0,.2);
    }
    .item_img{
      text-align: center;
      margin:0 auto 18px;
      img{
        width: 50%;
        height: 50%;
      }
    }
    .item_title{
      text-align: center;
      margin: 0 10px 7px;
      color:rgb(12, 162, 226)
    }
    .item_price{
      color:rgb(29, 161, 216);
      text-align: center;
      margin:0 10px 14px;
      cursor:pointer;
    }
  }
}
  }
}
</style>

 
