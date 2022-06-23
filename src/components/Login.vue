<template>
  <div>
    <canvas id="canvas"></canvas>
    <el-form ref="loginRules" :model="loginRules" :rules="rules" class="login">
      <h3>用户登录</h3>
      <el-form-item prop="name">
        <el-input
          v-model="loginRules.name"
          placeholder="请输入用户名"
          class="inputs"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginRules.password"
          placeholder="请输入密码"
          class="i-inputs"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked">记住我</el-checkbox>
      <el-button type="primary" class="login-go" @click="submitlogin"
        >登录</el-button
      >
      <el-button style="margin-top:80px" type="primary" plain>
        <router-link :to="{name:'Loginup'}">
            注册
        </router-link>
        </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginRules: {
        name: "",
        password: "",
      },
      checked: true,
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.initCancas();
  },
  methods: {
    submitlogin() {
      this.$refs.loginRules.validate((valid) => {
        if (valid) {
          this.postRequest("/user/login", {
              name: this.loginRules.name,
              password: this.loginRules.password,
          }).then((resp) => {
            console.log(resp.data);
            console.log(this.loginRules);
            if (resp) {
            //   console.log(resp);
            localStorage.setItem('userId',resp.data);
              const tokenStr = "Bearer" + resp.data;
              window.sessionStorage.setItem("tokenStr", tokenStr);
            //   console.log(tokenStr);
              this.$router.replace("/host");
            }
          }).catch(error=>{
              console.log(error);
          });
        } else {
          this.$message.error("这是错误信息");
          return false;
        }
      });
    },
    initCancas() {
      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        hue = 255,
        stars = [],
        count = 0,
        maxStars = 1100; //星星数量,默认1300
      var canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");
      canvas2.width = 100;
      canvas2.height = 100;
      var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, "#fff");
      gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      // End cache
      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          var hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function maxOrbit(x, y) {
        var max = Math.max(x, y),
          diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
        //星星移动范围，值越大范围越小，
      }

      var Star = function () {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 10; //星星大小,值越大星星越小,默认8
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 100000; //星星移动速度,值越大越慢,默认5W
        this.alpha = random(2, 10) / 10;
        count++;
        stars[count] = this;
      };

      Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
          y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
          twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        );
        this.timePassed += this.speed;
      };
      for (var i = 0; i < maxStars; i++) {
        new Star();
      }

      function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5; //尾巴
        ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }

        window.requestAnimationFrame(animation);
      }
      animation();
    },
  },
};
</script>

<style>
.el-input__inner {
  height: 50px !important;
}
.i-inputs.el-input {
  padding-left: 30px;
  width: 80%;
  padding-top: 20px;
}
.el-checkbox {
  margin-top: 30px;
}
</style>

<style src="../assets/css/loginblog.css" scoped>
</style>