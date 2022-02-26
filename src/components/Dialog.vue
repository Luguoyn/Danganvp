<template>


  <div class="dr-dialog">
    <img class="dr-dialog-bar" ref="dialogBar" :src="require(`../assets/img/ui/public/dialog-bar.png`)" alt=""
         draggable="false">
    <div class="dr-dialog-context">
      <span>{{ context }}</span>
    </div>
  </div>

  <div class="dr-name">
    <img class="dr-name-bar" ref="nameBar" :src="require(`../assets/img/ui/daytime/namebar-main-character.png`)" alt=""
         draggable="false">
    <div class="dr-name-bubble" v-for="index of [0,1,2,3]" :key="index">
      <img class="dr-name-bubble-img" v-show="bubbleController===index"
           :src="require(`../assets/img/ui/public/bubble${index+1}.png`)" alt="" draggable="false">
    </div>
    <div class="dr-name-context">
      <span class="dr-dialog-name-text">{{ localizedName }}</span>
    </div>
  </div>

  <div class="dr-bgm">

    <img class="dr-bgm-bar" ref="bgmBar" :src="require(`../assets/img/ui/daytime/audio-bar.png`)" alt=""
         draggable="false">


    <audio ref="bgm" :src="require(`../assets/audio/bgm/beautiful days.mp3`)" autoplay hidden loop></audio>
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

    <div class="dr-bgm-name">
      <marquee class="dr-bgm-name-loop" behavior="scroll" direction="left">{{ backgroundMusic }}</marquee>
    </div>

    <img class="dr-bgm-guitar" ref="bgmGuitar" :src="require(`../assets/img/ui/daytime/guitar01.png`)" alt=""
         draggable="false">


  </div>

  <div class="dr-style">

    <img class="dr-style-bar dr-style-bar-chapter" :src="require(`../assets/img/ui/public/chapter-bar.png`)" alt="" draggable="false">
    <span class="dr-style-bar dr-style-bar-chapter dr-style-bar-context">Chapter 01</span>

    <img class="dr-style-bar" :src="require(`../assets/img/ui/daytime/style-bar.png`)" alt="" draggable="false">
    <span class="dr-style-bar dr-style-bar-context">DAYTIME</span>

    <img class="dr-style-bar dr-style-bar-level" :src="require(`../assets/img/ui/public/level-bar.png`)" alt="" draggable="false">
    <span class="dr-style-bar dr-style-bar-level dr-style-bar-context" style="color: #e0d8d8">LEVEL 07</span>



    <img class="dr-style-area" :src="require(`../assets/img/ui/daytime/icon-area.png`)" alt=""
         draggable="false">
    <img class="dr-style-area dr-style-area-rotate" :src="require(`../assets/img/ui/daytime/icon-area-rotate.png`)"
         alt=""
         draggable="false">
    <div class="dr-style-area" v-for="index of [0,1,2]" :key="index">
      <img class="dr-style-area" v-show="iconController===index"
           :src="require(`../assets/img/ui/daytime/icon${index+1}.png`)" alt="" draggable="false">
    </div>

  </div>

</template>

<script>
import {toRefs, reactive, computed, ref, inject} from 'vue'
import characters from "@/assets/dr-script/characters";
import useWindows from "@/hooks/useWindows";
import AvBars from "vue-audio-visual/src/components/AvBars";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialog",
  props: ['name', 'context'],
  setup(props) {
    const dialog = reactive({
      name: props.name,
      context: props.context,
      backgroundMusic: 'beautiful days'
    });

    const win = useWindows();

    const nameBar = ref(null);
    const dialogBar = ref(null);
    const bgmBar = ref(null);
    const bgmGuitar = ref(null);

    const dialogH = computed(() => {
      let height = dialogBar.value.height / dialogBar.value.width * win.width * 0.8 || 305 / 1920 * win.width * 0.8
      return height + 'px';
    });

    const dialogL = computed(() => {
      let left = nameBar.value.width / nameBar.value.height * win.height || 180 / 1080 * win.height;
      return left + 'px';
    });

    const bubbleL = computed(() => {
      let left = nameBar.value.width / nameBar.value.height * win.height || 180 / 1080 * win.height;
      return left * 0.27 + 'px';
    });

    const bgmS = computed(() => {
      let left = bgmBar.value.width / bgmBar.value.height * win.height || 333 / 346 * win.height;
      return 100 * left / 333 / 3 + '%';
    });

    const bgmL = computed(() => {
      let left = bgmGuitar.value.width || 94 / 262 * win.height * 0.32;
      return left / 2 + 'px';
    });

    const localizedName = computed(() => {
      return characters[props.name];
    });


    const timer = inject('timer')
    const bubbleController = computed(() => {
      return Math.floor(timer.value / 100) % 4;
    })
    const rotateController = computed(() => {
      let time = Math.floor(timer.value / 8);
      // time = timer.value;
      return time - Math.sin(time / 8) * 20 + 'deg';
    })
    const iconController = computed(() => {
      return Math.floor(timer.value / 80) % 3;
    })

    return {
      ...toRefs(dialog), localizedName,
      nameBar, dialogBar, bgmBar, bgmGuitar,
      dialogH, dialogL, bubbleL, bgmS, bgmL,
      bubbleController, rotateController, iconController,
    };
  },
  components: {
    AvBars,
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
  left: v-bind(dialogL);
  width: 100vw;
  height: v-bind(dialogH);
  color: aliceblue;

  font-size: min(5vh, 4vw);
}


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
  left: v-bind(bubbleL);
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


.dr-bgm {
  position: fixed;
  top: 0;
  left: 0;
}

.dr-bgm-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: 30vh;
}

.dr-bgm-guitar {
  position: fixed;
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
  left: v-bind(bgmL);
  /*transform-origin: left;*/
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */

}

.dr-bgm-bars-scale-control {
  transform-origin: 0 100%;
  transform: scale(v-bind(bgmS), v-bind(bgmS));
}

.dr-bgm-name {
  position: fixed;
  left: v-bind(bgmL);
  top: 1.5vh;
  width: 17vh;
}

.dr-bgm-name-loop {
  font-size: 3vh;
  color: brown;
}


.dr-style {
  position: fixed;
  top: 0;
  right: 0;
}

.dr-style-area {
  position: fixed;
  top: -4vh;
  right: -4vh;
  width: 23vh;
  height: auto;
}

.dr-style-area-rotate {
  transform: rotate(v-bind(rotateController));
}

.dr-style-bar {
  position: fixed;
  top: 7vh;
  right: 6vh;
  height: 3vh;
}
.dr-style-bar-chapter {
  top: 4vh;
}

.dr-style-bar-context{
  right: 21vh;
  font-size: 2vh;
  color: #262626;
  font-family: "Microsoft YaHei UI", sans-serif;
  font-weight: bolder;
}

.dr-style-bar-level {
  top: 10vh;
}
</style>