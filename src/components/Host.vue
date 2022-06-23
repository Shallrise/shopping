<template>
  <div>
    <Head></Head>
    <Banner></Banner>
    <Phone></Phone>
  </div>
</template>

<script>
import Banner from './Banner.vue'
import Phone from '../common/Phone.vue'
import Head from './Head.vue'
export default {
    name:"Host",
    components:{
      Banner,
      Phone,
      Head
    }
}
</script>

<style>

</style>