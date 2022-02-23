<template>
  <div @click="goNext">
    <Background :background="drScript[p].background"></Background>
    <Sprite :name="name" :expression="expression"></Sprite>
    <Dialog :name="name" :context="context"></Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Sprite from "@/components/Sprite";
import Background from "@/components/Background";
import script from "@/assets/dr-script/script";

import {ref, markRaw, reactive, onMounted, onUnmounted, provide, toRefs} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Gamepad",
  components: {
    Dialog, Sprite, Background
  },
  setup() {
    const drScript = markRaw(script);
    const p = ref(localStorage.getItem('p') || 0);
    const gameState = reactive({
      name: drScript[p.value].name,
      context: drScript[p.value].context,
      expression: drScript[p.value].expression,
      background: drScript[p.value].background,
    })

    let flag = true;
    let index = 0;
    let targetContent = '';
    let pflag = false;

    function goNext() {
      if (flag) {
        while (p.value < drScript.length && drScript[p.value].style !== '对话') {
          //先暂时跳过不是对话的属性
          p.value++;
        }
        if (p.value === drScript.length) p.value = 0;


        gameState.name = drScript[p.value].name;
        gameState.expression = drScript[p.value].expression;
        gameState.background = drScript[p.value].background;

        index = 0;
        flag = false;
        pflag = true;
        targetContent = drScript[p.value].context;
      } else {
        if (p.value >= drScript.length) {
          p.value = 0;
        } else {
          index = drScript[p.value].context.length;
        }
      }
    }

    let printerId;
    onMounted(() => {
      printerId = setInterval(() => {
        flag = index > targetContent.length;
        if (!flag) {
          gameState.context = targetContent.slice(0, index++);
        } else {
          if (pflag) {
            p.value++;
            pflag = false;
          }
        }
      }, 50);
    });
    onUnmounted(() => {
      window.clearInterval(printerId);
    })


    //暴露出全局的时间
    const timer = ref(0);
    let timerId;
    onMounted(() => {
      timerId = setInterval(() => {
        timer.value++;
      }, 16);
    })
    onUnmounted(() => {
      window.clearInterval(timerId);
    })
    provide('timer', timer);

    return {
      drScript, p, ...toRefs(gameState),
      goNext,
    }
  }
}
</script>

<style scoped>

</style>