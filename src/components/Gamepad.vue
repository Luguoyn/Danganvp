<template>
  <div @click="goNext">
    <Background :background="background"></Background>
    <Sprite :name="name" :expression="expression" :sprite-direction="spriteDirection"></Sprite>
    <Dialog :name="name" :context="context" :bgm="bgm" :se="se" :cv="cv" :time="time"></Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Sprite from "@/components/Sprite";
import Background from "@/components/Background";
import script from "@/assets/dr-script/script";

import {ref, markRaw, reactive, onMounted, onUnmounted, toRefs, watch, provide} from "vue";
import useTimer from "@/hooks/useTimer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Gamepad",
  components: {
    Dialog, Sprite, Background
  },
  setup() {
    const drScript = markRaw(script);
    const scriptP = ref(localStorage.getItem('scriptP') || 0);
    const modelP = ref(localStorage.getItem('modelP') || 0);
    let s;
    watch([modelP, scriptP], () => {
      s = drScript[modelP.value].script[scriptP.value];
    }, {immediate: true});
    const gameState = reactive({
      name: s.name,
      context: s.context,
      expression: s.expression,
      background: s.background,
      style: s.style,
      bgm: s.bgm,
      se: s.se,
      cv: s.cv,
      time: s.time,
      spriteDirection: s.spriteDirection,
    })

    let flag = true;
    let index = 0;
    let targetContent = '';
    let scriptFlag = false;

    function goNext() {
      let length = drScript[modelP.value].script.length;
      if (scriptP.value >= length) scriptP.value = 0;
      if (flag) {
        gameState.style = s.style || gameState.style || 'dialog';
        while (gameState.style !== 'dialog') {
          scriptP.value++;
          if (scriptP.value >= length) scriptP.value = 0;
          gameState.style = s.style || gameState.style;
          //先暂时跳过不是对话的属性
        }


        gameState.name = s.name || gameState.name;
        gameState.expression = s.expression || gameState.expression;
        gameState.background = s.background || gameState.background;
        gameState.bgm = s.bgm || gameState.bgm;
        gameState.se = s.se || null;
        gameState.cv = s.cv || null;
        gameState.time = s.time || gameState.time || 'daytime';
        gameState.spriteDirection = s.spriteDirection || 'left';

        if (s.context) {
          index = 0;
          flag = false;
          scriptFlag = true;
          targetContent = s.context;
        }

      } else {
        if (scriptP.value >= length) {
          scriptP.value = 0;
        } else {
          index = s.context.length;
        }
      }
    }

    let printerId;
    onMounted(() => {
      printerId = setInterval(() => {
        if (index <= targetContent.length) {
          gameState.context = targetContent.slice(0, index++);
        } else {
          if (scriptFlag) {
            flag = true;
            scriptP.value++;
            scriptFlag = false;
          }
        }
      }, 50);
    });
    onUnmounted(() => {
      window.clearInterval(printerId);
    })


    const timer = useTimer();
    provide('timer', timer);


    return {
      drScript, p: scriptP, ...toRefs(gameState),
      goNext,
    }
  }
}
</script>

<style scoped>

</style>