<template>
  <div class="dr-name">
    <img class="dr-name-bar" ref="nameBar" :src="require(`../assets/img/ui/daytime/namebar-main-character.png`)" alt=""
         draggable="false">
    <div class="dr-name-bubble" v-for="index of [0,1,2,3]" :key="index">
      <img class="dr-name-bubble-img" v-show="bubbleController===index"
           :src="require(`../assets/img/ui/public/bubble${index+1}.png`)" alt="" draggable="false">
    </div>
    <div class="dr-name-context">
      <span class="dr-dialog-name-text">{{ name }}</span>
    </div>
  </div>
</template>
<script>
import {inject, computed} from "vue";

export default {
  name: 'DialogName',
  props: {
    name: {}
  },
  setup(){
    const timer = inject('timer');

    const bubbleController = computed(() => {
      return Math.floor(timer.value / 100) % 4;
    });


    return{
      bubbleController,
    }
  }
}
</script>
<style scoped>


.dr-name {
  position: fixed;
  bottom: 0;
  left: 0;
}

.dr-name-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100vh;
  width: auto;
}

.dr-name-bubble {
  position: fixed;
  bottom: 16vh;
  left: 4.4vh;
}

.dr-name-bubble-img {
  position: fixed;
  width: 10vh;
  height: auto;
}

.dr-name-context {
  position: fixed;
  bottom: 18vh;
  left: 3vw;
  text-align: center;

  font-weight: bold;

  transform-origin: left;
  /*transform-origin: 0% 100%;*/
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg); /* IE 9 */
  -moz-transform: rotate(-90deg); /* Firefox */
  -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
  -o-transform: rotate(-90deg); /* Opera */

  /*font-size: min(6vh, 4vw);*/
  font-size: 6vh;
}


</style>