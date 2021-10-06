<template>
  <div>
    <el-carousel indicator-position="none" arrow="always" trigger="click">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="loveyourself-card">
          <div class="loveyourself-left">
            <div class="loveyourself-card-title">Happy one day</div>
            <div class="loveyourself-card-description">
              去做你喜欢的事情，慢慢来，过好自己的一生。
            </div>
            <div class="loveyourself-card-content">
              每个人都有自己的步伐，每个人都有自己的时区。
              <br />
              生命就是等待正确的时机行动，
              <br />
              一切都很准时。
              <br />
              在你的时区，一切都是最好的安排。
              <br />
            </div>
          </div>
          <div class="loveyourself-right">
            <img class="loveyourself-img" src="../../assets/card1.jpg" alt="" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="split-line"></div>
    <div class="area1">待设计</div>
    <div class="split-line"></div>
    <div class="about">
      <div class="about-left">
        <div>关<br />于<br />站<br />点<br />和<br />大<br />家</div>
        <img src="../../assets/about-left.jpg" alt="" />
      </div>
      <div class="about-center">
        <div class="about-center-top">
          今天，是小破站诞生的第一天、第一个月、第一年~
          <br />让我们一起共同把它当作一只乖猫来呵护，
          <br />每天给自己的生活带来一些浪漫与诗意，
          <br />将自己心灵中的爱慕写进自己的诗篇里，
          <br />醒来睡前，到这所屋子里坐一会、躺一会，待到自己清醒过来、待到自己睡意袭来~
          <br />做自己想做的事，不随波、不焦灼，做这一代清醒的青年，做清新努力踏实的自己！
          <br />无关乎流言蜚语~
        </div>
        <div class="about-center-bottom">
          在这所站点中，价值虽规律性但又随意的流动~
          <br />总会来到你的身边，夹带着温柔，便只是一份安抚。
        </div>
      </div>
      <div class="about-right">
        <img src="../../assets/about-right.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "indexContent",
};
</script>
<style>
.el-carousel__container {
  margin: 0 50px 0 20px;
  height: 350px;
}
.el-carousel__arrow {
  background-color: white;
}
.el-carousel__arrow:hover {
  background-color: white;
}
.el-icon-arrow-left {
  font-size: 100px;
  font-weight: bolder;
  color: pink;
  content: icon;
}
.el-icon-arrow-right {
  font-size: 100px;
  font-weight: bolder;
  color: pink;
  content: icon;
}

/* 卡片相关 */
.loveyourself-card {
  position: relative;
  top: 50px;
  left: 100px;
}

.loveyourself-left {
  margin: 0 50px 0 300px;
  display: inline-block;
}

.loveyourself-card-title {
  font-size: 30px;
  font-family: Comic Sans MS;
  margin-top: 0px;
}

.loveyourself-card-description {
  font-size: 20px;
  font-family: 叶根友疾风草书;
  margin-top: 20px;
  margin-left: 20px;
}

.loveyourself-card-content {
  font-size: 15px;
  margin-top: 20px;
  margin-left: 40px;
  line-height: 30px;
}

.loveyourself-right {
  display: inline-block;
  display: inline-block;
  position: relative;
  top: 20px;
}
.loveyourself-img {
  width: 300px;
}

/* 粉色分割线 */
.split-line {
  border-width: 0px;
  width: 1919px;
  height: 20px;
  background: inherit;
  background-color: rgba(249, 244, 244, 1);
  border: none;
  border-radius: 0px;
  box-shadow: none;
}

/* area1 */
.area1 {
  width: 100%;
  height: 400px;
  /* background-color: skyblue; */
}

/* about */
.about {
  display: inline-block;
  width: 100%;
  position: relative;
  padding: 50px 0;
}
.about-left {
  display: inline-block;
  position: absolute;
  padding-top: 30px;
  height: 100%;
}

.about-left div {
  position: relative;
  top: -30px;
  font-family: "华文新魏 Bold", "华文新魏 Regular", "华文新魏", sans-serif;
  font-weight: 700;
  font-size: 33px;
}

.about-center {
  display: inline-block;
  margin-top: 50px;
  margin-left: 500px;
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 200%;
  font-family: "仿宋", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
}
.about-right {
  display: inline-block;
  height: 100%;
  margin-left: 100px;
}
</style>