<template>
  <img :src="imgSrc" alt="" class="img-comp" />
</template>

<script>
import love from "../imgs/love.png";
export default {
  props: {
    imgSrc: {
      type: String,
      default() {
        return love;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.img-comp {
  display: block;
}
</style>
