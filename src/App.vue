<template>
  <Gamepad/>
</template>

<script>
import Gamepad from "@/components/Gamepad";

export default {
  name: 'App',
  components: {
    Gamepad,
  }
}
</script>

<style>
*{
  /*moz-user-select: -moz-none;*/
  -moz-user-select: none;
  /*-o-user-select:none;*/
  /*-khtml-user-select:none;*/
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
</style>
