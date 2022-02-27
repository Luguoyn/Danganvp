<template>
  <div class="dr-dialog">

    <img class="dr-dialog-bar" :src="require(`../assets/img/ui/public/dialog-bar.png`)" alt=""
         draggable="false">

    <div class="dr-dialog-cube dr-dialog-cube-1"></div>
    <div class="dr-dialog-cube dr-dialog-cube-2"></div>
    <div class="dr-dialog-cube dr-dialog-cube-3"></div>
    <div class="dr-dialog-cube dr-dialog-cube-4"></div>
    <div class="dr-dialog-cube dr-dialog-cube-5"></div>


    <div class="dr-dialog-context">
      <span>{{ context }}</span>
    </div>
  </div>
</template>
<script>
import {computed, inject, reactive, toRefs} from "vue";

export default {
  name: 'DialogBar',
  props: {
    context: {}
  },

  setup() {
    const timer = inject('timer');

    const cubeOpacity = reactive({
      cubeOpacity01: computed(() => Math.sin(timer.value / 370 - 591) / 2),
      cubeOpacity02: computed(() => Math.sin(timer.value / 530 + 51) / 3),
      cubeOpacity03: computed(() => Math.sin(timer.value / 300 - 213) / 2.7),
      cubeOpacity04: computed(() => Math.sin(timer.value / 400 + 842)/ 3.5),
      cubeOpacity05: computed(() => Math.sin(timer.value / 480 + 552)/ 3.2),
    })


    return {
      ...toRefs(cubeOpacity),
    }
  }
}
</script>
<style scoped>
.dr-dialog {
  position: fixed;
  bottom: 0;
  left: 0;
}

.dr-dialog-bar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: auto;
}

.dr-dialog-context {
  position: fixed;
  bottom: 0;
  left: 18vh;
  width: 80vw;
  height: 12.5vw;
  color: aliceblue;

  font-size: min(7vh, 4vw);
  line-height: min(9vh, 5.14vw)
}

.dr-dialog-cube {
  position: fixed;
  width: 5.8vw;
  height: 5.8vw;
  border-radius: 0.1vw;
  transform: rotate(-10deg);
}

.dr-dialog-cube-1 {
  bottom: 0.6vw;
  left: 9.8vw;
  background-color: firebrick;
  opacity: v-bind(cubeOpacity01);
}

.dr-dialog-cube-2 {
  bottom: 7.2vw;
  left: 14.5vw;
  background-color: yellowgreen;
  opacity: v-bind(cubeOpacity02);
}

.dr-dialog-cube-3 {
  bottom: 4.7vw;
  left: 32.7vw;
  background-color: cornflowerblue;
  opacity: v-bind(cubeOpacity03);
}

.dr-dialog-cube-4 {
  bottom: 2.7vw;
  left: 21.4vw;
  background-color: darksalmon;
  opacity: v-bind(cubeOpacity04);
}

.dr-dialog-cube-5 {
  bottom: -2.1vw;
  left: 27.9vw;
  background-color: blueviolet;
  opacity: v-bind(cubeOpacity05);
}


</style>