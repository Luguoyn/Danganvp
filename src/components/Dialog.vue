<template>

  <transition name="bottom-in" appear>
    <DialogBar :context="context"/>
  </transition>

  <transition name="left-in" appear>
    <DialogName :name="localizedName" :time="time"/>
  </transition>

  <transition name="top-in" appear>
  <DialogBgm :background-music="bgm" :name="name" :time="time"/>
  </transition>

  <transition name="right-in" appear>
    <DialogIcon :time="time"/>
  </transition>

  <audio v-if="se" :src="require(`../assets/audio/se/${se}.wav`)" autoplay hidden></audio>

  <audio v-if="cv" :src="require(`../assets/audio/cv/${name}/${cv}.ogg`)" autoplay hidden></audio>

</template>

<script>
import {computed, reactive, toRefs} from 'vue'
import characters from "@/assets/dr-script/characters";
import DialogIcon from "@/components/DialogIcon";
import DialogBgm from "@/components/DialogBgm";
import DialogBar from "@/components/DialogBar";
import DialogName from "@/components/DialogName";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialog",
  props: ['name', 'context', 'bgm', 'se', 'cv', 'time'],
  setup(props) {
    const dialog = reactive({
      name: props.name,
      context: props.context,
      bgm: props.bgm,
      se: props.se,
      cv: props.cv,
      time: props.time,
    });

    const localizedName = computed(() => {
      return characters[props.name];
    });

    return {
      ...toRefs(dialog), localizedName,
    };
  },
  components: {
    DialogName,
    DialogBar,
    DialogBgm,
    DialogIcon,
  }
}
</script>

<style scoped>

.left-in-enter-from, .left-in-leave-to {
  left:-50vw;
}

.left-in-leave-from, .left-in-enter-to {
  left: 0;
}

.left-in-enter-active, .left-in-leave-active {
  transition: all 0.5s ease;
}



.bottom-in-enter-from, .bottom-in-leave-to {
  bottom:-50vh;
}

.bottom-in-leave-from, .bottom-in-enter-to {
  bottom: 0;
}

.bottom-in-enter-active, .bottom-in-leave-active {
  transition: all 0.5s ease;
}


.top-in-enter-from, .top-in-leave-to {
  top:-50vh;
}

.top-in-leave-from, .top-in-enter-to {
  top: 0;
}

.top-in-enter-active, .top-in-leave-active {
  transition: all 0.5s ease;
}



.right-in-enter-from, .right-in-leave-to {
  right:-50vw;
}

.right-in-leave-from, .right-in-enter-to {
  right: 0;
}

.right-in-enter-active, .right-in-leave-active {
  transition: all 0.5s ease;
}


</style>