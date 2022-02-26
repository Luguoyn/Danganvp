<template>
  <div class="dr-background dr-background-div" ref="div">
    <!--  <img class="dr-background-img" src="../assets/img/background/bg000.png">-->
    <img class="dr-background-img" ref="bg" :src="require(`../assets/img/background/${name}.png`)" alt=""  draggable="false">
  </div>
</template>

<script>
import {reactive, watch, toRefs, ref} from "vue";
import useWindows from "@/hooks/useWindows";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Background",
  props: ['background'],
  setup(props) {
    const img = reactive({
      name: props.background,
      width: '100%', height: '100%'
    })

    const bg = ref(null);
    const div = ref(null);

    const win = useWindows();

    watch([bg, win], () => {
      if (bg.value !== null && win.height !== 0 && win.width !== 0) {
        let width;
        let height;

        //img的长宽比
        let bghw = bg.value.height / bg.value.width;
        //window的长宽比
        let winhw = win.height / win.width;
        if (bghw > winhw) {
          width = win.width;
          height = width * bghw;
        } else {
          height = win.height;
          width = height / bghw;

        }
        img.width = width + 'px';
        img.height = height + 'px';
      }
    }, {immediate: true})

    return {
      ...toRefs(img), bg, div,
    }
  }

}
</script>

<style scoped>
.dr-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  bottom: 0;
}

.dr-background-div {
  /*align-content: center;*/
  width: 100%;
  height: auto;

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
}

.dr-background-img {
  width: v-bind(width);
  height: v-bind(height);

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
}
</style>