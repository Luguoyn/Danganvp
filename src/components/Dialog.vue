<template>
  <div class="dr-dialog">

    <div class="dr-dialog-context">
      <span>{{ context }}</span>
    </div>

    <div class="dr-dialog-name">
      <span class="dr-dialog-name-text">{{ name }}</span>
    </div>
  </div>
</template>

<script>
import {toRefs, reactive} from 'vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialog",
  props:['name', 'context'],
  setup(props) {
    const dialog = reactive({
      name: props.name,
      context: props.context,
    })
    return {
      ...toRefs(dialog),
    }
  }

}
</script>

<style scoped>
.dr-dialog {
  background-color: gray;
  border: solid 1px black;

  width: 80%;
  height: 30%;

  position: fixed;
  bottom: 2%;
  left: 10%;
}

.dr-dialog-context {
  font-size: min(4vh, 2.7vw);
  padding: 1% 5%;
}


.dr-dialog-name {
  background-color: skyblue;
  border: solid 1px black;

  width: 15%;
  height: 7%;

  position: fixed;
  left: 13%;
  bottom: 33%;

  text-align: center;
}

.dr-dialog-name-text {
  text-align: center;

  font-size: min(5vh, 3.5vw);
}
</style>