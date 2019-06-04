<template>
  <div>
    <transition-group
      enter-active-class="animated pulse"
      leave-active-class="animated fadeOut"
      mode="in-out"
    >
      <img
        :src="img"
        class="bg"
        v-for="(img, index) in imgs"
        :key="index+1"
        v-show="index===bgCurr"
      >
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgCurr: 0,
      imgs: [
        "http://pic1.win4000.com/wallpaper/2019-05-17/5cde49ac0fff5.jpg",
        "http://pic1.win4000.com/wallpaper/2019-05-17/5cde49accc7eb.jpg",
        "http://pic1.win4000.com/wallpaper/d/5991569950166.jpg",
        "http://pic1.win4000.com/wallpaper/0/598d411133c78.jpg",
        "http://pic1.win4000.com/wallpaper/0/598d41150d714.jpg",
        "http://pic1.win4000.com/wallpaper/0/598d4123d60df.jpg",
        "http://pic1.win4000.com/wallpaper/2019-05-17/5cde49b2f1c99.jpg"
      ]
    };
  },
  methods: {
    autoplay() {
      //随机展示图片
      this.bgCurr = parseInt(Math.random() * this.imgs.length);
    },
    play() {
      setInterval(() => {
        this.autoplay();
      }, 5000);
    }
  },
  created() {
    this.play();
  }
};
</script>

<style lang="stylus">
.bg
  width 100%
  height 100%
  position absolute
  z-index -1
  top 0px
  left 0
  background-size cover
  background-position center 0
  background-repeat no-repeat
  min-width 1000px
</style>
