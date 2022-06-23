<template>
  <div id="topBanner" style="padding-top: 5px" class="slide">
    <div
      v-for="(imgUrl, index) in bannerList"
      v-show="index === mark"
      :key="index"
      class="slideshow"
    >
      <a href="#">
        <img :src="imgUrl" style="width: 100%; height: 480px" />
      </a>
    </div>
    <div class="bar">
      <span
        v-for="(item, index) in bannerList"
        :class="{ active: index === mark }"
        :key="index"
      ></span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mark: 0, //比对图片索引的变量
      bannerList: [
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ddcb54245895a5a0d45fa40f82abc9ca.jpg?w=2452&h=920",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=1533&h=575&f=webp&q=90",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ddcb54245895a5a0d45fa40f82abc9ca.jpg?w=2452&h=920",
      ],
    };
  },
  methods: {
    autoPlay() {
      this.mark++;
      if (this.mark === 3) {
        //当遍历到最后一张图片置零
        this.mark = 0;
      }
    },
    play() {
      setInterval(this.autoPlay, 2500);
    },
    change(i) {
      this.mark = i;
    },
  },
  created() {
    this.play();
  },
};
</script> 


<style scoped>
.slide {
  width: 1226px;
  height: 600px;
  margin: 0 auto;
  margin-top: 50px;
  overflow: hidden;
  position: relative;
}
.slideshow {
  width: 100%;
  height: 100%;
}
li {
  position: absolute;
}
img {
  width: 100%;
  height: 500px;
}
.bar {
  position: absolute;
  width: 100%;
  bottom: 10px;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
}
.bar span {
  width: 20px;
  height: 5px;
  border: 1px solid;
  background: white;
  display: inline-block;
  margin-right: 10px;
}
.active {
  background: #bfd6b6 !important;
}
</style>  