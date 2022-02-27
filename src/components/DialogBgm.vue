<template>

  <div class="dr-bgm">

    <img class="dr-bgm-bar" :src="require(`../assets/img/ui/${time}/audio-bar.png`)" alt=""
         draggable="false">


    <template v-if="backgroundMusic">
      <audio ref="bgm" :src="require(`../assets/audio/bgm/${backgroundMusic}.mp3`)" autoplay hidden loop></audio>
      <div class="dr-bgm-bars">
        <av-bars
            class=" dr-bgm-bars-scale-control"
            ref-link="bgm"
            :canv-width="100"
            :bar-width="10"
            :bar-space="7"
            :bar-color="`#343434`"
            :fft-size="2**9"
        ></av-bars>
      </div>
    </template>


    <div class="dr-bgm-name">
      <marquee class="dr-bgm-name-loop" behavior="scroll" direction="left">{{ backgroundMusic }}</marquee>
    </div>

    <img class="dr-bgm-guitar" :src="require(`../assets/img/ui/${time}/guitar01.png`)" alt=""
         draggable="false">


  </div>

</template>
<script>
import AvBars from "vue-audio-visual/src/components/AvBars"
import {computed} from "vue";
import useWindows from "@/hooks/useWindows";

export default {
  name: 'DialogBgm',
  components: {AvBars},
  props: {
    backgroundMusic: {},
    time:{},
  },
  setup() {
    const win = useWindows();
    const bgmS = computed(() => {
      return 100 / 346 * win.height / 3 + '%';
    })

    return {
      bgmS,
    }
  }
}
</script>
<style scoped>


.dr-bgm {
  position: absolute;
  top: 0;
  left: 0;
}

.dr-bgm-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 30vh;
}

.dr-bgm-guitar {
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 32vh;
}

.dr-bgm-bars {
  position: absolute;

  /*left: v-bind(bgmL);*/
  top: 8vh;
  /*left: 2vw;*/
  left: 5vh;
  /*transform-origin: left;*/
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */

}

.dr-bgm-bars-scale-control {
  transform-origin: 0 100%;

  transform: scale(v-bind(bgmS));
}

.dr-bgm-name {
  position: absolute;
  /*left: v-bind(bgmL);*/
  left: 5vh;
  top: 1.5vh;
  width: 17vh;
}

.dr-bgm-name-loop {
  font-size: 3vh;
  color: brown;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-weight: bold;
}


</style>