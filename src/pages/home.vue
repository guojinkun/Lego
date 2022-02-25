<script setup>
import LeftArea from "../components/LeftArea.vue";
import Edit from "../components/Edit.vue";
import RightProps from "../components/RightProps.vue";
</script>
<template>
  <div class="wrap">
    <section class="left-area">
      <LeftArea />
    </section>
    <section class="edit-area" id="edit-area">
      <div class="left-divided"></div>
      <Edit />
      <div class="right-divided"></div>
    </section>
    <section class="right-area">
      <RightProps />
    </section>
  </div>
</template>

<script>
export default {
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.moves {
  position: fixed;
}
.wrap {
  display: flex;
  height: 100%;
  .left-area {
    width: 320px;
    height: 100%;
  }
  .edit-area {
    display: flex;
    flex: 1;
    height: 100%;
    .left-divided {
      height: 100%;
      width: 20px;
      background: #f0eff2;
    }
    .right-divided {
      height: 100%;
      width: 20px;
      background: #f0eff2;
    }
  }
  .right-area {
    width: 320px;
    height: 100%;
  }
}
</style>
