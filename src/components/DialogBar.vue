<template>
  <div class="dr-dialog">
    <img class="dr-dialog-bar" :src="require(`../assets/img/ui/public/dialog-bar.png`)" alt=""
         draggable="false">
    <div class="dr-dialog-context">
      <span>{{ context }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DialogBar',
  props: {
    context: {}
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
  left: 18vh;
  width: 80vw;
  height: 12.5vw;
  color: aliceblue;

  font-size: min(7vh, 4vw);
  line-height: min(9vh, 5.14vw)
}


</style>