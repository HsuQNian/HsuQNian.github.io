<script setup>
import { reactive } from "vue";
let timeArray = reactive({
  2044: "太空电梯",
  2058: "月球坠落",
  2075: "木星引力",
  2078: "太阳氦闪",
});
</script>
<template>
  <div id="WanderingEarth">
    <div
      id="title"
      style="font-size: 8rem; line-height: 8rem; scroll-snap-align: start"
    >
      流浪 <br />
      地球
    </div>
    <div
      v-for="index in timeArray"
      style="color: var(--theme); scroll-snap-align: end"
    >
      <div id="timeLine">{{ index }}危机</div>
    </div>
  </div>
</template>
<style>
@font-face {
  font-family: "禹卫书法行书简体";
  src: url("@/public/assets/project/Wandering-Earth/禹卫书法行书简体.ttf");
}
#WanderingEarth {
  width: 100vw;
  height: 100vh;
  background: rgb(12, 12, 12);
  color: var(--Deep);
  overflow: scroll;
  font-family: "禹卫书法行书简体";
  scroll-snap-type: y mandatory;
}
#WanderingEarth > div {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#timeLine {
  font-size: 4rem;
  line-height: 4rem;
}
#Sun {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  width: 24em;
  height: 24em;
  background-color: #fb7209;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 12rem rgba(255, 160, 60, 0.4);
  position: relative;
}
#Earth {
  position: absolute;
  bottom: 2.4rem;
  left: 2.4rem;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  width: 0.2em;
  height: 0.2em;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAGBQTFRFGDRdAyFNIDxkQld5CCZTIztsJD1lAAAArsblO230dJfgP2vUnLbbbovAOF2vN1GERnb0Un/yW3asWH3PeY+uhKfyYXaVjafNT2WNeJ3zv9f0nrzzX4rzkLHzrcjzbZX0L9IPbAAAAAh0Uk5TfSC49Uv+4wC/XoCAAAACEUlEQVQoz12T2WKrMAxECWDC4n1fZOv//7IiaXp760cOtkaj0fT8nHXe1LLEmJd5/fk4feDGGFPeR0U/5G39H290zXohhJUi+czY9gs/lhytsM4JvvPEebJZsccH3zSldDrX6uhw8jMl/+Y33nKWibdQChhTsDRzXdbm5Y1nla1LYxAwGjsChvPmcb7xGrMVrtemQdPB0ltt6C6Z80p4y164CxpqMMcBZdRWey9O2rg9p5VlIS5ttMGCiGFUgn20xoXP6zQrJd2JAKW83q11tF5Cb9zZPE9btPIcI5AmLKXXEfoIASGchLeJ5eTCKNA7GMReu8HR26AGLqnUxFRyF3U7aqFrpQVjXrXBOJGXKUexl5fgPsgzqjpIV2sAztk4ZZ/2gVBqfb8NJH/QwcC5j1P0KTU0UOttKrUHh8Y2qL/9jcUZAsCrJTwOHYyG3so3XrJNJ7U1Xn4UfWiAW1nrPPllmqk4v1lrRQMarQ2QPKonBNmyLlScGg1Ik6C6QG8XbA3P5NlKI6EonGHoA2gY5BwZVqAAReIeyXNlyvJ9DJpWozcPU8hzJFNsvAf6pIySOooDUBA6tRBCP5OUav4OE1NSXHu9nQ+kn9LiklXbTxSJS7fvt1kAx+Wc9H57/Aty9FImms3Or+uSBOPy+LUGc/RkT6KgO0lVY57/LpHKlEnrvacV+LtE7xVkSuW8bL9W8AvOdz8ZXmQqKAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 12rem rgba(0, 160, 255, 0.4);
}
</style>
