<template>
  <div class="dr-style">

    <img class="dr-style-bar dr-style-bar-chapter" :src="require(`../assets/img/ui/public/chapter-bar.png`)" alt=""
         draggable="false">
    <span class="dr-style-bar dr-style-bar-chapter dr-style-bar-context">CHAPTER 01</span>

    <img class="dr-style-bar" :src="require(`../assets/img/ui/${time}/style-bar.png`)" alt="" draggable="false">
    <span class="dr-style-bar dr-style-bar-context">{{ time.toUpperCase() }}</span>

    <img class="dr-style-bar dr-style-bar-level" :src="require(`../assets/img/ui/public/level-bar.png`)" alt=""
         draggable="false">
    <span class="dr-style-bar dr-style-bar-level dr-style-bar-context" style="color: #e0d8d8">LEVEL 07</span>


    <img class="dr-style-area" :src="require(`../assets/img/ui/${time}/icon-area.png`)" alt=""
         draggable="false">
    <img class="dr-style-area dr-style-area-rotate" :src="require(`../assets/img/ui/${time}/icon-area-rotate.png`)"
         alt=""
         draggable="false">
    <div v-for="index of [0,1,2]" :key="index">
      <img class="dr-style-area" v-show="iconController===index"
           :src="require(`../assets/img/ui/${time}/icon${index+1}.png`)" alt="" draggable="false">
    </div>

  </div>
</template>
<script>
import {inject, computed} from "vue";

export default {
  name: 'DialogIcon',
  props: {
    time: {},
  },
  setup() {
    const timer = inject('timer');

    const iconController = computed(() => {
      return Math.floor(timer.value / 80) % 3;
    });

    const rotateController = computed(() => {
      let time = Math.floor(timer.value / 8);
      // time = timer.value;
      return time - Math.sin(time / 8) * 20 + 'deg';
    })
    return {
      iconController, rotateController
    }
  }
}
</script>
<style scoped>


.dr-style {
  position: absolute;
  top: 0;
  right: 0;
}

.dr-style-area {
  position: absolute;
  top: -4vh;
  right: -4vh;
  width: 23vh;
  height: auto;
}

.dr-style-area-rotate {
  transform: rotate(v-bind(rotateController));
}

.dr-style-bar {
  position: absolute;
  top: 7vh;
  right: 15vh;
  height: 3vh;
}

.dr-style-bar-chapter {
  top: 4vh;
}

.dr-style-bar-context {
  right: 22vh;
  font-size: 2vh;
  color: #262626;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-weight: bolder;

  /*不让他换行*/
  white-space: nowrap;
}

.dr-style-bar-level {
  top: 10vh;
}
</style>