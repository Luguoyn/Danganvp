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
  /* 设置不可被选中 */
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select:none;
  -khtml-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

*{
  font-family: qing-yuan, serif;
}

@font-face {
  font-family: qing-yuan;
  src: url("assets/font/qing-yuan.ttc");
}

@font-face {
  font-family: dr-font;
  src: url("assets/font/dr-font.otf");
}
</style>
