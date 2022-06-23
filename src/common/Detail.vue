<template>
    <div class="detail-main">
        <div class="box-left">
            <img :src="`http://202.193.53.235:8080/`+product.pthumbnail">
        </div>
        <div class="box-right">
            <h2 class="box-title">{{product.name}}</h2>
            <h2 class="box-price">单价：{{product.price1}}</h2>
            <div>
            <el-button type="primary" v-on:click="add()">+</el-button>
            <p>数量：{{count}}</p>
            <el-button type="primary" v-on:click="reduce()">-</el-button>
            <div style="margin-top:30px;margin-bottom:30px">总价：{{sum}}</div>
            </div>
            <el-button type="primary" v-on:click="addCart()">加入购物车<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <!-- <h1>{{deid}}</h1> -->
    </div>
</template>

<script>
export default {
    name:"Detail",
    data(){
        return{
            product:{},
            deid:'',
            count:0,
            // sum:0,
        }
    },
    mounted() {
        this.getProduct();
        var that = this;
        that.deid=this.$route.params.id;
        console.log(localStorage.getItem('userId'));
        // console.log(us);
        // console.log(that.deid);
        // console.log(this.$route);
    },
    computed:{
        sum(){
            return this.count*this.product.price1
        }
    },
    methods:{
        getProduct(){
        this.getRequest("/goods/list")
        .then(res => {
            // console.log(res.data[0]);
          for(let i in res.data){
               if(this.deid==res.data[i].id){
                  this.product=res.data[i];
                //   console.log(this.product);
               }
          }
        }).catch(error=>{
            console.log(error);
        })
        },
        add(){
            this.count+=1;
            // console.log(this.sum);
        },
        reduce(){
            if(this.count>0){
                this.count-=1;
            }
            else{
                this.$notify({
                title: '警告',
                message: '不能再减少辣',
                type: 'warning'
                });
            }
        },
        addCart(){
            this.postRequest("/cart/add",{
                userId:localStorage.getItem('userId'),
                goodsId:this.deid,
                num:this.count,
                price:this.product.price1
            }).then((res)=>{
                console.log(res);
                if(res.status){
                    this.$message({
                    message: '购物车添加成功',
                    type: 'success'
                    });
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>

<style lang="less">
.detail-main{
    display:flex;
    justify-content:space-between;
    .box-left{
    width: 642px;
    height: 617px;
    margin-top:5px;
    .img{
        // margin:0 auto 18px;
        width: 100%;
        // height: 200px;
    }
}
.box-right{
    width: 584px;
    height: 840px;
    .box-title{
        padding-top:30px;
        padding-bottom:16px;
        height: 26px;
    }
    .box-price{
        color:pink;
    }
}
}

</style>