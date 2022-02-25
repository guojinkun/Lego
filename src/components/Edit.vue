<script setup>
import { formatStyles } from "../utils/index";
import { exposeCompData } from "../setup/vuex/index";
const { compDataArray } = exposeCompData();
</script>
<template>
  <div class="edit" ref="edit" id="edit" @click.self="cancelFocus">
    <Shape
      :noFocus="noFocus"
      :compData="item"
      v-for="(item, index) in compDataArray"
      :key="index"
      :style="formatStyles(item.styles)"
      @focused="noFocus = false"
    >
      <template v-slot:comp>
        <component
          :is="item.name"
          :ref="`${item.name}_${index}`"
          class="common"
          :style="formatStyles(item.styles)"
        ></component>
      </template>
    </Shape>
  </div>
</template>

<script>
import { useStore } from "vuex";
import legoText from "../components/Text.vue";
import imgComponent from "../components/ImgComp.vue";
import Shape from "../components/Shape.vue";

export default {
  data() {
    return {
      noFocus: false,
    };
  },
  components: {
    legoText,
    imgComponent,
    Shape,
  },
  methods: {
    cancelFocus() {
      this.noFocus = true;
    },
  },
};
</script>

<style lang="less" scoped>
.edit {
  position: relative;
  width: 375px;
  height: 667px;
  margin: auto;
  overflow-y: scroll;
  background: url("../imgs/edit.png") 50%;
}
.comp {
  width: fit-content;
  cursor: pointer;
}
</style>
