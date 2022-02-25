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

    <audio ref="bgm" :src="require(`../assets/audio/bgm/beautiful days.mp3`)" autoplay></audio>
<!--    <av-bars-->
<!--        class="dr-bgm-bars"-->
<!--        ref-link="bgm"-->
<!--        :canv-width="100"-->
<!--        :bar-width="12"-->
<!--        :bar-space="5"-->
<!--        bar-color="#222"-->
<!--    />-->
  </div>
</template>

<script>
import {toRefs, reactive, computed, ref, inject} from 'vue'
import characters from "@/assets/dr-script/characters";
import useWindows from "@/hooks/useWindows";

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

    const dialogH = computed(() => {
      let height = dialogBar.value.height / dialogBar.value.width * win.width * 0.8 || 305 / 1920 * win.width * 0.8
      return height + 'px';
    });

    const dialogL = computed(() => {
      let left = nameBar.value.width / nameBar.value.height * win.height || 180 / 1080 * win.height;
      return left + 'px';
    });

    const bgmL = computed(() => {
      let left = bgmBar.value.width / bgmBar.value.height * win.height || 333 / 346 * win.height;
      console.log(left);
      return left * 0.3 + 'px';
    })

    const bubbleL = computed(() => {
      let left = nameBar.value.width / nameBar.value.height * win.height || 180 / 1080 * win.height;

      return left * 0.27 + 'px';
    })

    const localizedName = computed(() => {
      return characters[props.name];
    });


    const timer = inject('timer')
    const bubbleController = computed(() => {
      return Math.floor(timer.value / 40) % 4;
    })

    return {
      ...toRefs(dialog), localizedName,
      nameBar, dialogBar, bgmBar,
      dialogH, dialogL, bubbleL, bgmL,
      bubbleController
    };
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
  left: 2.2vw;
  text-align: center;

  transform-origin: left;
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg); /* IE 9 */
  -moz-transform: rotate(-90deg); /* Firefox */
  -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
  -o-transform: rotate(-90deg); /* Opera */

  font-size: min(6vh, 4vw);
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

.dr-bgm-bars {
  position: fixed;
  left: v-bind(bgmL);
  top:0;
  transform-origin: left;
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */
}
</style>