<template>


  <DialogBar :context="context"/>

  <DialogName :name="localizedName" :time="time"/>

  <DialogBgm :background-music="bgm" :sound-effect="se" :character-voice="cv" :name="name" :time="time"/>

  <DialogIcon :time="time"/>

</template>

<script>
import {computed, reactive, ref, toRefs} from 'vue'
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

    const nameBar = ref(null);

    const localizedName = computed(() => {
      return characters[props.name];
    });

    return {
      ...toRefs(dialog), localizedName,
      nameBar,
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

