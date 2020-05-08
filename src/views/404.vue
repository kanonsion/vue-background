<template>
  <div class="notfound">
    <div class="content">
      <div class="top">
        <div>
          <img src="./../assets/few.jpg" />
        </div>
        <h1>404</h1>
      </div>
      <hr class="hr-top" />
      <h3>对不起，您要找的页面被小萌丢失了，(＞人＜；)</h3>
      <hr class="hr-bottom" />
      <h3>欢迎来到我的个人世界!</h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notfound::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #34495e;
  z-index: 1;
  opacity: 0.7;
  filter: blur(20);
}
.notfound {
  height: 100vh;
  background: url("./../assets/bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 50vh;
    height: 80vh;
    z-index: 2;
    position: relative;
    color: #ffffff;
    .top {
      height: 40%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      div {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          position: absolute;
          top: 0px;
          left: 0;
        }
      }
      h1 {
        margin-top: 10px;
        font-size: 30px;
        color: #ffffff;
      }
    }
    .hr-top {
      width: 50%;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      margin: 40px auto;
    }
    h3 {
      text-align: center;
    }
    .hr-bottom {
      width: 100%;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      margin: 40px auto;
    }
  }
}
</style>
