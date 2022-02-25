<template>
  <p class="text">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default() {
        return "我是文本组件";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  color: #000000;
}
</style>
