<template>


  <div class="dr-dialog">
    <img class="dr-dialog-bar" ref="dialogBar" :src="require(`../assets/img/ui/public/dialog-bar.png`)" alt="">
    <div class="dr-dialog-context">
      <span>{{ context }}</span>
    </div>
  </div>

  <div class="dr-name">
    <img class="dr-name-bar" ref="nameBar" :src="require(`../assets/img/ui/daytime/namebar-main-character.png`)" alt="">
    <div class="dr-name-bubble" v-for="index of [0,1,2,3]" :key="index">
      <img class="dr-name-bubble-img" v-show="(bubbleTimer)%4===index" :src="require(`../assets/img/ui/public/bubble${index+1}.png`)" alt="">
    </div>
    <div class="dr-name-context">
      <span class="dr-dialog-name-text">{{ localizedName }}</span>
    </div>
  </div>
</template>

<script>
import {toRefs, reactive, computed, ref} from 'vue'
import characters from "@/assets/dr-script/characters";
import useWindows from "@/hooks/useWindows";
import {onMounted, onUnmounted} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialog",
  props: ['name', 'context'],
  setup(props) {
    const dialog = reactive({
      name: props.name,
      context: props.context,

    });

    const win = useWindows();

    const nameBar = ref(null);
    const dialogBar = ref(null);

    const dialogH = computed(() => {
      let height = dialogBar.value.height / dialogBar.value.width * win.width * 0.8 || 305 / 1920 * win.width * 0.8
      return height + 'px';
    });

    const dialogL = computed(() => {
      return nameBar.value.width / nameBar.value.height * win.height + 'px';
    })

    const bubbleL = computed(() => {
      return nameBar.value.width / nameBar.value.height * win.height * 0.27 + 'px';
    })

    const localizedName = computed(() => {
      return characters[props.name];
    });


    const bubbleTimer = ref(0);
    let bubbleTimerId;
    onMounted(() => {
      bubbleTimerId = setInterval(() => {
        bubbleTimer.value++;
      }, 500);
    })
    onUnmounted(() => {
      window.clearInterval(bubbleTimerId);
    })

    return {
      ...toRefs(dialog), localizedName,
      nameBar, dialogBar,
      dialogH, dialogL, bubbleL,
      bubbleTimer
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

.dr-name-bubble-img{
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
</style>