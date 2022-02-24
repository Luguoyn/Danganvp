<template>
  <div class="dr-sprite">

    <transition appear
                enter-active-class="animate__fadeInLeft animate__bounceIn"
                leave-active-class="animate__fadeOutRight animate__bounceOut"
                v-for="(character, index) in characterList"
                :key="index">
      <div v-if="character===name" class="dr-sprite-div">
        <img class="dr-sprite-img" draggable="false"
             :src="require(`../assets/img/sprite/${name}/${expression}.png`)" alt="">
      </div>

    </transition>
  </div>
</template>

<script>
import {reactive, toRefs, markRaw} from "vue";
import characters from "@/assets/dr-script/characters";
import 'animate.css';

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sprite",
  props: ['name', 'expression'],
  setup(props) {
    const character = reactive({
      name: props.name,
      expression: props.expression,
    })

    const characterList = markRaw(Object.keys(characters));

    return {
      ...toRefs(character),
      characterList
    }
  }
}
</script>

<style scoped>

.dr-sprite {
  position: fixed;
  bottom: 0;
}

.dr-sprite-div {
  /*align-content: center;*/
  width: 100%;
  height: auto;

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
}

.dr-sprite-img {
  width: auto;
  height: 100vh;

}
</style>